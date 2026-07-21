export function renderResults(container, response) {
    if (response.status === "empty") {
        container.innerHTML = `
            <div class="warning-box">
                ${escapeHtml(response.message)}
            </div>
        `;
        return;
    }

    if (response.status === "preview") {
        container.innerHTML = `
            <h3>Search payload preview</h3>
            <p class="field-note">
                This is the object to send to Supabase or to a matching API.
                Results should be grouped by species.
            </p>
            <pre class="query-preview">${escapeHtml(JSON.stringify(response.payload, null, 2))}</pre>
        `;
        return;
    }

    if (response.status === "results") {
        container.innerHTML = response.results.map(renderSpeciesCard).join("");
    }
}

function renderSpeciesCard(result) {
    const href = `../Species_Descriptions/${slugifySpecies(result.species)}/`;
    const specimenIds = result.matched_specimen_ids.map(escapeHtml).join(", ");
    return `
        <article class="species-card">
            <h3><a href="${escapeHtml(href)}">${escapeHtml(result.species)}</a></h3>
            <p>Specimen ID(s): ${specimenIds}</p>
        </article>
    `;
}

// Mirrors the slug convention used to generate species pages: strip the
// "Amanita " genus prefix, replace anything non-alphanumeric with "_",
// prefix with "A_". e.g. "Amanita cf. lavendula" -> "A_cf_lavendula".
function slugifySpecies(species) {
    let s = String(species ?? "").trim();
    s = s.replace(/^Amanita\s+/i, "");
    s = s.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return `A_${s}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

