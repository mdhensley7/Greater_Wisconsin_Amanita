export function getCheckedTerms(name) {
    const terms = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .flatMap(input => {
            try {
                return JSON.parse(input.dataset.terms || "[]");
            } catch {
                return [input.value];
            }
        })
        .map(term => String(term).toLowerCase().trim())
        .filter(Boolean);

    return Array.from(new Set(terms));
}

export function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
}

export function getSelectValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
}

export function getNumberValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
}

export function getCheckboxValue(id) {
    const element = document.getElementById(id);
    return Boolean(element && element.checked);
}
