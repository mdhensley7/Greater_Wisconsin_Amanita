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
    return `
        <article class="species-card">
            <h3>${escapeHtml(result.species)}</h3>
            <p>${escapeHtml(result.matched_specimen_count)} matching specimen(s)</p>
        </article>
    `;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
