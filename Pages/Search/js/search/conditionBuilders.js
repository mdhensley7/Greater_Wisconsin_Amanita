// js/search/conditionBuilders.js
import { ANY_VALUE } from "../config/options.js";

/**
 * Normalize any incoming string value to a comparable form.
 */
function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}

/**
 * Returns true if the caller gave "no input" (blank/whitespace/null/undefined).
 * Important: does NOT treat "0" as blank.
 */
function isBlankInput(rawValue) {
  if (rawValue === null || rawValue === undefined) return true;
  if (typeof rawValue === "string") return rawValue.trim() === "";
  return false;
}

/**
 * Build a condition that matches if the field contains ANY of the given terms.
 * Terms are normalized to lowercase and deduplicated.
 */
export function makeTextAnyTermsCondition(field, terms) {
  const uniqueTerms = Array.from(
    new Set(
      (terms ?? [])
        .map(term => normalize(term))
        .filter(Boolean)
        // Guard: if ANY_VALUE somehow appears in a terms array, ignore it.
        .filter(term => term !== normalize(ANY_VALUE))
    )
  );

  if (uniqueTerms.length === 0) return null;

  return {
    field,
    mode: "text_any_terms_case_insensitive",
    joinWithinField: "OR",
    terms: uniqueTerms
  };
}

/**
 * Build a condition that matches if the field contains the given string.
 * Skips if value is blank OR if value is the ANY_VALUE sentinel ("Any / not sure").
 */
export function makeTextContainsCondition(field, value) {
  if (isBlankInput(value)) return null;
  if (value === ANY_VALUE) return null;

  const normalizedValue = normalize(value);
  if (!normalizedValue) return null;

  return {
    field,
    mode: "text_contains_case_insensitive",
    value: normalizedValue
  };
}

/**
 * Build a numeric condition. This enforces "intentional filtering":
 * - If the input is blank => return null (NO accidental 0).
 * - If user typed 0 => rawValue === "0" => Number("0") => 0 => VALID.
 *
 * approximate=false => numeric_exact
 * approximate=true  => numeric_range_approximate
 */
export function makeNumericCondition(field, rawValue, approximate) {
  // ✅ Prevent accidental filters caused by Number("") === 0
  if (isBlankInput(rawValue)) return null;

  const numericValue = Number(rawValue);

  // Reject NaN/Infinity
  if (!Number.isFinite(numericValue)) return null;

  // If the user typed a negative, you can either reject or clamp.
  // For now, reject negatives to avoid surprising filters.
  if (numericValue < 0) return null;

  if (!approximate) {
    return {
      field,
      mode: "numeric_exact",
      value: numericValue
    };
  }

  // Field-observation tolerance. Tune later after testing with real searches.
  const tolerance = Math.max(Math.round(numericValue * 0.2), 5);

  return {
    field,
    mode: "numeric_range_approximate",
    value: numericValue,
    min: Math.max(0, numericValue - tolerance),
    max: numericValue + tolerance,
    tolerance_mm: tolerance
  };
}
