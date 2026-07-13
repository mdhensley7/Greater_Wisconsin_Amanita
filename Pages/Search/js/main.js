import { CAP_COLOR_CONFIG, MAJOR_FIELDS, MORE_FIELDS, STIPE_MAJOR_FIELDS, STIPE_MORE_FIELDS, UNIVERSAL_VEIL_MAJOR_FIELDS, UNIVERSAL_VEIL_MORE_FIELDS } from "./config/traitConfig.js";
import { renderFields } from "./ui/renderForm.js";
import { getCheckboxValue, getRadioValue, getSelectValue } from "./ui/formState.js";
import { buildSearchPayload } from "./search/buildSearchPayload.js";
import { renderResults } from "./search/renderResults.js";
import { searchSpecies } from "./search/searchAdapter.js";

initializePage();

function initializePage() {
    loadSharedHeader();
    renderFields(document.getElementById("major-fields"), MAJOR_FIELDS);
    renderFields(document.getElementById("more-fields"), MORE_FIELDS);
    renderFields(document.getElementById("stipe-major-fields"), STIPE_MAJOR_FIELDS);
    renderFields(document.getElementById("stipe-more-fields"), STIPE_MORE_FIELDS);
    renderFields(document.getElementById("veil-major-fields"), UNIVERSAL_VEIL_MAJOR_FIELDS);
    renderFields(document.getElementById("veil-more-fields"), UNIVERSAL_VEIL_MORE_FIELDS);
    wireConditionalFields();
    wireSectionTabs();
    wireSearchForm();
}

function wireSectionTabs() {
    const tabs = document.querySelectorAll(".section-tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(other => {
                const isActive = other === tab;
                other.classList.toggle("is-active", isActive);
                other.setAttribute("aria-selected", String(isActive));
                document.getElementById(other.getAttribute("aria-controls")).hidden = !isActive;
            });
        });
    });
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

    wireStainingPanel("staining_state", "staining-color-panel");
    wireStainingPanel("stipe_staining_state", "stipe-staining-color-panel");

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

    document.querySelectorAll("[data-visible-when-select]").forEach(panel => {
        const selectId = panel.dataset.visibleWhenSelect;
        const hiddenValue = panel.dataset.visibleWhenHiddenValue;
        const select = document.getElementById(selectId);

        const updateVisibility = () => {
            panel.style.display = getSelectValue(selectId) === hiddenValue ? "none" : "block";
        };

        if (select) select.addEventListener("change", updateVisibility);
        updateVisibility();
    });
}

function wireStainingPanel(stateInputName, panelId) {
    const stainingPanel = document.getElementById(panelId);
    document.querySelectorAll(`input[name="${stateInputName}"]`).forEach(input => {
        input.addEventListener("change", () => {
            stainingPanel.classList.toggle("is-visible", getRadioValue(stateInputName) === "present");
        });
    });
}

function wireSearchForm() {
    const form = document.getElementById("search-form");
    const results = document.getElementById("results");

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const payload = buildSearchPayload();
        console.log("payload:", payload);
        const response = await searchSpecies(payload);     
        console.log("searchSpecies response:", response);
        renderResults(results, response);
    });

    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            const marginPanel = document.getElementById(CAP_COLOR_CONFIG.marginColor.panelId);
            marginPanel.classList.toggle("is-visible", getCheckboxValue(CAP_COLOR_CONFIG.marginColor.toggleId));

            document.getElementById("staining-color-panel").classList.toggle(
                "is-visible", getRadioValue("staining_state") === "present"
            );
            document.getElementById("stipe-staining-color-panel").classList.toggle(
                "is-visible", getRadioValue("stipe_staining_state") === "present"
            );

            document.querySelectorAll("[data-visible-when-radio]").forEach(panel => {
                const radioName = panel.dataset.visibleWhenRadio;
                const expectedValue = panel.dataset.visibleWhenValue;
                panel.style.display = getRadioValue(radioName) === expectedValue ? "block" : "none";
            });

            document.querySelectorAll("[data-visible-when-select]").forEach(panel => {
                const selectId = panel.dataset.visibleWhenSelect;
                const hiddenValue = panel.dataset.visibleWhenHiddenValue;
                panel.style.display = getSelectValue(selectId) === hiddenValue ? "none" : "block";
            });

            results.innerHTML = "";
        }, 0);
    });
}
