export function makeTextAnyTermsCondition(field, terms) {
    const uniqueTerms = Array.from(
        new Set(terms.map(term => String(term).toLowerCase().trim()).filter(Boolean))
    );

    if (uniqueTerms.length === 0) return null;

    return {
        field,
        mode: "text_any_terms_case_insensitive",
        joinWithinField: "OR",
        terms: uniqueTerms
    };
}

export function makeTextContainsCondition(field, value) {
    if (!value) return null;

    return {
        field,
        mode: "text_contains_case_insensitive",
        value: String(value).toLowerCase().trim()
    };
}

export function makeNumericCondition(field, value, approximate) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return null;

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
