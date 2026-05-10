export function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;
    if (options.textContent !== undefined) element.textContent = options.textContent;
    if (options.html !== undefined) element.innerHTML = options.html;

    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, value);
            }
        });
    }

    return element;
}

export function appendChildren(parent, children) {
    children.filter(Boolean).forEach(child => parent.appendChild(child));
    return parent;
}

export function renderHelp(summary, text) {
    if (!summary || !text) return null;

    const details = createElement("details", { className: "field-help" });
    const summaryElement = createElement("summary", { textContent: summary });
    const paragraph = createElement("p", { textContent: text });

    appendChildren(details, [summaryElement, paragraph]);
    return details;
}
