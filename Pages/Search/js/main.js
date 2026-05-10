import { CAP_COLOR_CONFIG, MAJOR_FIELDS, MORE_FIELDS } from "./config/traitConfig.js";
import { renderFields } from "./ui/renderForm.js";
import { getCheckboxValue, getRadioValue } from "./ui/formState.js";
import { buildSearchPayload } from "./search/buildSearchPayload.js";
import { renderResults } from "./search/renderResults.js";
import { searchSpecies } from "./search/searchAdapter.js";

initializePage();

function initializePage() {
    loadSharedHeader();
    renderFields(document.getElementById("major-fields"), MAJOR_FIELDS);
    renderFields(document.getElementById("more-fields"), MORE_FIELDS);
    wireConditionalFields();
    wireSearchForm();
}

function loadSharedHeader() {
    fetch("../../Components/header.html")
        .then(response => response.ok ? response.text() : "")
        .then(html => {
            document.getElementById("header-placeholder").innerHTML = html;
        })
        .catch(() => {
            // Header is optional. The page still works if the shared component fails to load.
        });
}

function wireConditionalFields() {
    const marginToggle = document.getElementById(CAP_COLOR_CONFIG.marginColor.toggleId);
    const marginPanel = document.getElementById(CAP_COLOR_CONFIG.marginColor.panelId);

    marginToggle.addEventListener("change", () => {
        marginPanel.classList.toggle("is-visible", marginToggle.checked);
    });

    const stainingPanel = document.getElementById("staining-color-panel");
    document.querySelectorAll('input[name="staining_state"]').forEach(input => {
        input.addEventListener("change", () => {
            stainingPanel.classList.toggle("is-visible", getRadioValue("staining_state") === "present");
        });
    });

    document.querySelectorAll("[data-visible-when-radio]").forEach(panel => {
        const radioName = panel.dataset.visibleWhenRadio;
        const expectedValue = panel.dataset.visibleWhenValue;

        const updateVisibility = () => {
            panel.style.display = getRadioValue(radioName) === expectedValue ? "block" : "none";
        };

        document.querySelectorAll(`input[name="${radioName}"]`).forEach(input => {
            input.addEventListener("change", updateVisibility);
        });

        updateVisibility();
    });
}

function wireSearchForm() {
    const form = document.getElementById("search-form");
    const results = document.getElementById("results");

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const payload = buildSearchPayload();
        const response = await searchSpecies(payload);
        renderResults(results, response);
    });

    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            const marginPanel = document.getElementById(CAP_COLOR_CONFIG.marginColor.panelId);
            marginPanel.classList.toggle("is-visible", getCheckboxValue(CAP_COLOR_CONFIG.marginColor.toggleId));

            const stainingPanel = document.getElementById("staining-color-panel");
            stainingPanel.classList.toggle("is-visible", getRadioValue("staining_state") === "present");

            document.querySelectorAll("[data-visible-when-radio]").forEach(panel => {
                const radioName = panel.dataset.visibleWhenRadio;
                const expectedValue = panel.dataset.visibleWhenValue;
                panel.style.display = getRadioValue(radioName) === expectedValue ? "block" : "none";
            });

            results.innerHTML = "";
        }, 0);
    });
}
