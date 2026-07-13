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
    const paragraph = createElement("p");
    appendBoldedText(paragraph, text);

    appendChildren(details, [summaryElement, paragraph]);
    return details;
}

// Splits on **term** markers and renders them as <strong>, everything else
// as plain text. Lets help text bold defined terms without using innerHTML.
function appendBoldedText(paragraph, text) {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    parts.forEach((part, index) => {
        if (index % 2 === 1) {
            paragraph.appendChild(createElement("strong", { textContent: part }));
        } else if (part) {
            paragraph.appendChild(document.createTextNode(part));
        }
    });
}
