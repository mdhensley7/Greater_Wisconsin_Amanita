import { CAP_COLOR_CONFIG, FIELD_COLUMNS } from "../config/traitConfig.js";
import { getCheckboxValue, getCheckedTerms, getNumberValue, getRadioValue, getSelectValue } from "../ui/formState.js";
import { makeNumericCondition, makeTextAnyTermsCondition, makeTextContainsCondition } from "./conditionBuilders.js";

export function buildSearchPayload() {
    const conditions = [];

    addColorConditions(conditions);
    addMajorTraitConditions(conditions);
    addMoreTraitConditions(conditions);

    return {
        resultLevel: "species",
        groupBy: FIELD_COLUMNS.species,
        matchingLogic: {
            acrossFields: "AND",
            withinTextField: "OR",
            caseSensitive: false,
            missingDatabaseValuesDisqualify: false,
            matchScore: "not implemented yet"
        },
        conditions: conditions.filter(Boolean)
    };
}

function addColorConditions(conditions) {
    const centerTerms = [
        ...getCheckedTerms(CAP_COLOR_CONFIG.centerColor.inputName),
        ...getCheckedTerms(CAP_COLOR_CONFIG.centerColor.modifierName)
    ];

    const centerCondition = makeTextAnyTermsCondition(FIELD_COLUMNS.centerColor, centerTerms);
    if (centerCondition) conditions.push(centerCondition);

    if (!getCheckboxValue(CAP_COLOR_CONFIG.marginColor.toggleId)) return;

    const marginTerms = [
        ...getCheckedTerms(CAP_COLOR_CONFIG.marginColor.inputName),
        ...getCheckedTerms(CAP_COLOR_CONFIG.marginColor.modifierName)
    ];

    const marginCondition = makeTextAnyTermsCondition(FIELD_COLUMNS.marginColor, marginTerms);
    if (marginCondition) conditions.push(marginCondition);
}

function addMajorTraitConditions(conditions) {
    const shape = getSelectValue("shape");
    const shapeCondition = makeTextContainsCondition(FIELD_COLUMNS.shape, shape);
    if (shapeCondition) conditions.push(shapeCondition);

    const striationState = getRadioValue("striations");
    if (striationState === "present") {
        conditions.push({
            field: FIELD_COLUMNS.striationLength,
            mode: "numeric_greater_than",
            value: 0
        });
    } else if (striationState === "absent") {
        conditions.push({
            field: FIELD_COLUMNS.striationLength,
            mode: "numeric_equals",
            value: 0
        });
    }

    const universalVeilState = getRadioValue("universalVeil");
    if (universalVeilState === "present") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.universalVeil, ["present"]));
    } else if (universalVeilState === "absent") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.universalVeil, ["absent"]));
    }
}

function addMoreTraitConditions(conditions) {
    const diameterCondition = makeNumericCondition(
        FIELD_COLUMNS.diameter,
        getNumberValue("diameter-mm"),
        getCheckboxValue("diameter-approximate")
    );
    if (diameterCondition) conditions.push(diameterCondition);

    const surfaceTextureCondition = makeTextAnyTermsCondition(
        FIELD_COLUMNS.surfaceTexture,
        getCheckedTerms("surface_texture")
    );
    if (surfaceTextureCondition) conditions.push(surfaceTextureCondition);

    const umbonateCondition = makeTextContainsCondition(
        FIELD_COLUMNS.umbonate,
        getSelectValue("umbonate")
    );
    if (umbonateCondition) conditions.push(umbonateCondition);

    const striationLengthCondition = makeNumericCondition(
        FIELD_COLUMNS.striationLength,
        getNumberValue("striation-length-mm"),
        getCheckboxValue("striation-length-approximate")
    );
    if (striationLengthCondition) conditions.push(striationLengthCondition);

    const stainingState = getRadioValue("staining_state");
    if (stainingState === "present") {
        const stainingColorTerms = getCheckedTerms("staining_color");

        if (stainingColorTerms.length > 0) {
            conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.staining, stainingColorTerms));
        } else {
            conditions.push({
                field: FIELD_COLUMNS.staining,
                mode: "text_not_contains_case_insensitive",
                value: "no staining"
            });
        }
    } else if (stainingState === "absent") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.staining, ["no staining"]));
    }
}
