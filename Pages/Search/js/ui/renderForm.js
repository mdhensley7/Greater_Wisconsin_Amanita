import { appendChildren, createElement, renderHelp } from "./domHelpers.js";

export function renderFields(container, fields) {
    container.innerHTML = "";
    fields.forEach(field => container.appendChild(renderField(field)));
}

export function renderField(field) {
    switch (field.type) {
        case "capColor":
            return renderCapColorField(field);
        case "colorChips":
            return renderColorChipsField(field);
        case "select":
            return renderSelectField(field);
        case "triState":
            return renderRadioChipField(field);
        case "multiChip":
            return renderMultiChipField(field);
        case "numberWithApprox":
            return renderNumberWithApproxField(field);
        case "staining":
            return renderStainingField(field);
        default:
            throw new Error(`Unsupported field type: ${field.type}`);
    }
}

function renderFieldShell(field) {
    const shell = createElement("div", {
        className: "field-group",
        id: `${field.id}-field`
    });
    shell.dataset.fieldId = field.id;

    if (field.visibleWhen) {
        if (field.visibleWhen.radioName) {
            shell.dataset.visibleWhenRadio = field.visibleWhen.radioName;
            shell.dataset.visibleWhenValue = field.visibleWhen.value;
        } else if (field.visibleWhen.selectId) {
            shell.dataset.visibleWhenSelect = field.visibleWhen.selectId;
            shell.dataset.visibleWhenHiddenValue = field.visibleWhen.hiddenValue;
        }
        shell.style.display = "none";
    }

    return shell;
}

function renderLabel(field) {
    return createElement("span", {
        className: "field-label",
        textContent: field.label
    });
}

function renderNote(field) {
    if (!field.note) return null;
    return createElement("p", {
        className: "field-note",
        textContent: field.note
    });
}

function renderSubfieldTitle(text) {
    return createElement("span", {
        className: "subfield-title",
        textContent: text
    });
}

function renderChipGroup(inputName, options, chipType = "checkbox") {
    const container = createElement("div", { className: "chip-grid" });

    options.forEach(option => {
        const label = createElement("label", { className: "chip" });
        const input = createElement("input", {
            attributes: {
                type: chipType,
                name: inputName,
                value: option.value
            }
        });

        if (option.terms) {
            input.dataset.terms = JSON.stringify(option.terms);
        }

        if (chipType === "radio" && option.value === "") {
            input.checked = true;
        }

        const text = createElement("span", { textContent: option.label });
        appendChildren(label, [input, text]);
        container.appendChild(label);
    });

    return container;
}

function renderCapColorField(field) {
    const shell = renderFieldShell(field);

    const centerColor = createElement("div", { className: "subfield" });
    appendChildren(centerColor, [
        renderSubfieldTitle("Center color"),
        renderChipGroup(field.centerColor.inputName, field.centerColor.options)
    ]);

    const centerModifiers = createElement("div", { className: "subfield" });
    appendChildren(centerModifiers, [
        renderSubfieldTitle("Center color modifiers"),
        renderChipGroup(field.centerColor.modifierName, field.centerColor.modifiers)
    ]);

    const marginToggleWrapper = createElement("div", { className: "subfield" });
    const marginToggleLabel = createElement("label", {
        className: "checkbox-row",
        attributes: { for: field.marginColor.toggleId }
    });
    const marginToggle = createElement("input", {
        id: field.marginColor.toggleId,
        attributes: { type: "checkbox" }
    });
    appendChildren(marginToggleLabel, [marginToggle, document.createTextNode("Add separate margin color")]);
    marginToggleWrapper.appendChild(marginToggleLabel);

    const marginPanel = createElement("div", {
        className: "conditional-panel",
        id: field.marginColor.panelId
    });

    const marginColor = createElement("div", { className: "subfield" });
    appendChildren(marginColor, [
        renderSubfieldTitle("Margin color"),
        renderChipGroup(field.marginColor.inputName, field.marginColor.options)
    ]);

    const marginModifiers = createElement("div", { className: "subfield" });
    appendChildren(marginModifiers, [
        renderSubfieldTitle("Margin color modifiers"),
        renderChipGroup(field.marginColor.modifierName, field.marginColor.modifiers)
    ]);

    appendChildren(marginPanel, [marginColor, marginModifiers]);

    appendChildren(shell, [
        renderLabel(field),
        renderNote(field),
        centerColor,
        centerModifiers,
        marginToggleWrapper,
        marginPanel
    ]);

    return shell;
}

function renderColorChipsField(field) {
    const shell = renderFieldShell(field);

    const color = createElement("div", { className: "subfield" });
    appendChildren(color, [
        renderSubfieldTitle("Color"),
        renderChipGroup(field.colorInputName, field.options)
    ]);

    const modifiers = createElement("div", { className: "subfield" });
    appendChildren(modifiers, [
        renderSubfieldTitle("Color modifiers"),
        renderChipGroup(field.modifierInputName, field.modifiers)
    ]);

    appendChildren(shell, [
        renderLabel(field),
        renderNote(field),
        color,
        modifiers
    ]);

    return shell;
}

function renderSelectField(field) {
    const shell = renderFieldShell(field);
    const label = createElement("label", {
        textContent: field.label,
        attributes: { for: field.id }
    });
    const select = createElement("select", { id: field.id, attributes: { name: field.id } });

    field.options.forEach(option => {
        const optionElement = createElement("option", {
            textContent: option.label,
            attributes: { value: option.value }
        });
        select.appendChild(optionElement);
    });

    appendChildren(shell, [
        label,
        renderNote(field),
        select,
        renderHelp(field.helpSummary, field.helpText)
    ]);

    return shell;
}

function renderRadioChipField(field) {
    const shell = renderFieldShell(field);
    const row = createElement("div", { className: "radio-row" });
    row.appendChild(renderChipGroup(field.id, field.options, "radio"));

    appendChildren(shell, [
        renderLabel(field),
        renderNote(field),
        row,
        renderHelp(field.helpSummary, field.helpText)
    ]);

    return shell;
}

function renderMultiChipField(field) {
    const shell = renderFieldShell(field);
    appendChildren(shell, [
        renderLabel(field),
        renderNote(field),
        renderChipGroup(field.inputName, field.options),
        renderHelp(field.helpSummary, field.helpText)
    ]);

    return shell;
}

function renderNumberWithApproxField(field) {
    const shell = renderFieldShell(field);
    const label = createElement("label", {
        textContent: field.label,
        attributes: { for: field.inputId }
    });

    const row = createElement("div", { className: "inline-number-row" });
    const input = createElement("input", {
        id: field.inputId,
        attributes: {
            type: "number",
            min: "0",
            step: "1",
            inputmode: "numeric",
            placeholder: field.placeholder || ""
        }
    });

    const approxLabel = createElement("label", {
        className: "checkbox-row",
        attributes: { for: field.approximateId }
    });
    const approxInput = createElement("input", {
        id: field.approximateId,
        attributes: { type: "checkbox" }
    });
    appendChildren(approxLabel, [approxInput, document.createTextNode("Approximate")]);
    appendChildren(row, [input, approxLabel]);

    appendChildren(shell, [
        label,
        renderNote(field),
        row,
        renderHelp(field.helpSummary, field.helpText)
    ]);

    return shell;
}

function renderStainingField(field) {
    const shell = renderFieldShell(field);
    const stateRow = createElement("div", { className: "radio-row" });
    stateRow.appendChild(renderChipGroup(field.stateInputName, field.stateOptions, "radio"));

    const colorPanel = createElement("div", {
        className: "conditional-panel",
        id: field.colorPanelId
    });

    const colorSubfield = createElement("div", { className: "subfield" });
    appendChildren(colorSubfield, [
        renderSubfieldTitle("Staining color"),
        renderChipGroup(field.colorInputName, field.colorOptions)
    ]);
    colorPanel.appendChild(colorSubfield);

    appendChildren(shell, [
        renderLabel(field),
        renderNote(field),
        stateRow,
        colorPanel,
        renderHelp(field.helpSummary, field.helpText)
    ]);

    return shell;
}
