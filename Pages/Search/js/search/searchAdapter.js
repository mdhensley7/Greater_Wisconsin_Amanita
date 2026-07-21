// js/search/searchAdapter.js
import { supabase } from "../supabaseClient.js";

const TABLE = "specimen_search"; // view joining specimens + pileus + annulus + basal_bulb + stipe + universal_veil_pileus + universal_veil_stipe_base

const MISSING_SENTINELS = new Set([
  "", "not observed", "unknown", "n/a", "na", "null"
]);

// Sentinel values that mean "not assessed", distinct from "" (truly blank,
// used where absence of a structure is recorded by leaving the field empty).
const UNINFORMATIVE_SENTINELS = new Set([
  "not observed", "unknown", "n/a", "na", "null"
]);

function isMissing(value) {
  if (value === null || value === undefined) return true;
  const s = String(value).trim().toLowerCase();
  return MISSING_SENTINELS.has(s);
}

function isBlank(value) {
  return String(value ?? "").trim() === "";
}

function hasRealContent(value) {
  const s = String(value ?? "").trim().toLowerCase();
  if (s === "") return false;
  return !UNINFORMATIVE_SENTINELS.has(s);
}

function normalizeText(value) {
  return String(value ?? "").toLowerCase().trim();
}

function textIncludesAnyTerms(fieldValue, terms) {
  const hay = normalizeText(fieldValue);
  if (!hay) return false;
  return terms.some(term => hay.includes(String(term).toLowerCase()));
}

function textEquals(fieldValue, value) {
  return normalizeText(fieldValue) === normalizeText(value);
}

function textIncludes(fieldValue, value) {
  const hay = normalizeText(fieldValue);
  const needle = normalizeText(value);
  if (!needle) return true;
  return hay.includes(needle);
}

function textNotIncludes(fieldValue, value) {
  const hay = normalizeText(fieldValue);
  const needle = normalizeText(value);
  if (!needle) return true;
  return !hay.includes(needle);
}

function numericEquals(fieldValue, value) {
  // Number(null) and Number("") both coerce to 0, which would otherwise
  // silently satisfy a "less than"/exact-0 filter for unmeasured specimens.
  if (isMissing(fieldValue)) return false;
  const n = Number(fieldValue);
  const target = Number(value);
  if (!Number.isFinite(n) || !Number.isFinite(target)) return false;
  // tolerate float storage
  return Math.abs(n - target) < 1e-6;
}

function numericGreaterThan(fieldValue, value) {
  if (isMissing(fieldValue)) return false;
  const n = Number(fieldValue);
  const target = Number(value);
  if (!Number.isFinite(n) || !Number.isFinite(target)) return false;
  return n > target;
}

function numericLessThan(fieldValue, value) {
  if (isMissing(fieldValue)) return false;
  const n = Number(fieldValue);
  const target = Number(value);
  if (!Number.isFinite(n) || !Number.isFinite(target)) return false;
  return n < target;
}

function numericExact(fieldValue, value) {
  return numericEquals(fieldValue, value);
}

function numericInRange(fieldValue, min, max) {
  if (isMissing(fieldValue)) return false;
  const n = Number(fieldValue);
  if (!Number.isFinite(n)) return false;
  return n >= min && n <= max;
}

function rowMatchesCondition(row, condition, missingOk) {
  const fieldValue = row[condition.field];

  // text_is_blank / text_has_content intentionally test missingness itself
  // (used for presence/absence traits like the annulus), so they must run
  // before -- and not be short-circuited by -- the "missing values don't
  // disqualify" rule below, which would otherwise make every row match both.
  if (condition.mode === "text_is_blank") return isBlank(fieldValue);
  if (condition.mode === "text_has_content") return hasRealContent(fieldValue);

  // Missing values do not disqualify
  if (missingOk && isMissing(fieldValue)) return true;

  switch (condition.mode) {
    case "text_any_terms_case_insensitive":
      return textIncludesAnyTerms(fieldValue, condition.terms ?? []);
    case "text_contains_case_insensitive":
      return textIncludes(fieldValue, condition.value);
    case "text_equals_case_insensitive":
      return textEquals(fieldValue, condition.value);
    case "text_not_contains_case_insensitive":
      return textNotIncludes(fieldValue, condition.value);
    case "numeric_exact":
      return numericExact(fieldValue, condition.value);
    case "numeric_range_approximate":
    case "numeric_range":
      return numericInRange(fieldValue, condition.min, condition.max);
    case "numeric_greater_than":
      return numericGreaterThan(fieldValue, condition.value);
    case "numeric_less_than":
      return numericLessThan(fieldValue, condition.value);
    case "numeric_equals":
      return numericEquals(fieldValue, condition.value);
    default:
      console.warn("Unknown condition mode:", condition.mode, condition);
      return true;
  }
}

function filterRows(rows, payload) {
  const missingOk = payload?.matchingLogic?.missingDatabaseValuesDisqualify === false;
  const conditions = payload.conditions ?? [];

  // AND across fields (your payload says acrossFields: "AND") [3](https://uwprod-my.sharepoint.com/personal/mdhensley_wisc_edu/Documents/Microsoft%20Copilot%20Chat%20Files/renderForm.js)
  return rows.filter(row =>
    conditions.every(condition => rowMatchesCondition(row, condition, missingOk))
  );
}

function groupBySpecies(rows) {
  const bySpecies = new Map();
  for (const row of rows) {
    const sp = row.species ?? "Unknown species";
    if (!bySpecies.has(sp)) bySpecies.set(sp, []);
    bySpecies.get(sp).push(row.specimen_id);
  }
  return Array.from(bySpecies.entries())
    .map(([species, matched_specimen_ids]) => ({ species, matched_specimen_ids }))
    .sort((a, b) =>
      b.matched_specimen_ids.length - a.matched_specimen_ids.length ||
      a.species.localeCompare(b.species)
    );
}

export async function searchSpecies(payload) {
  if (!payload?.conditions?.length) {
    return { status: "empty", message: "Select at least one trait to search." };
  }

  // Only fetch the columns we might use (plus species/specimen_id for grouping/debugging)
  const fields = new Set(["specimen_id", "species"]);
  for (const c of payload.conditions) fields.add(c.field);

  const selectList = Array.from(fields).join(",");

  const { data, error } = await supabase
    .from(TABLE)
    .select(selectList)
    .limit(2000); // safe ceiling; you currently have ~142 rows

  if (error) {
    return { status: "error", message: error.message, details: error };
  }

  const matchedRows = filterRows(data ?? [], payload);
  const results = groupBySpecies(matchedRows);

  return { status: "results", results };
}


// This adapter is intentionally small. For now it previews the query payload.
// Later, replace searchSpecies() with a Supabase call, ideally to a Postgres RPC
// function that handles grouping, missing values, and match scoring server-side.

//export async function searchSpecies(payload) {
  //  if (payload.conditions.length === 0) {
    //    return {
      //      status: "empty",
        //    message: "Select at least one trait to search."
        //};
    //}

//    return {
//        status: "preview",
//        payload
//    };
//}

// Future shape:
// export async function searchSpecies(payload) {
//     const { data, error } = await supabase.rpc("search_amanita_species", {
//         search_payload: payload
//     });
//
//     if (error) throw error;
//     return {
//         status: "results",
//         results: data
//     };
// }
