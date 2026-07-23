import { CAP_COLOR_CONFIG, FIELD_COLUMNS } from "../config/traitConfig.js";
import { getCheckboxValue, getCheckedTerms, getNumberValue, getRadioValue, getSelectValue } from "../ui/formState.js";
import { makeNumericCondition, makeTextAnyTermsCondition, makeTextContainsCondition, makeTextEqualsCondition } from "./conditionBuilders.js";

export function buildSearchPayload() {
    const conditions = [];

    addColorConditions(conditions);
    addMajorTraitConditions(conditions);
    addMoreTraitConditions(conditions);
    addAnnulusConditions(conditions);
    addBasalBulbConditions(conditions);
    addStipeConditions(conditions);
    addUniversalVeilConditions(conditions);

    return {
        resultLevel: "species",
        groupBy: FIELD_COLUMNS.species,
        matchingLogic: {
            acrossFields: "AND",
            withinTextField: "OR",
            caseSensitive: false,
            missingDatabaseValuesDisqualify: true,
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
}

function addMoreTraitConditions(conditions) {
    const diameterBucket = getRadioValue("diameter");
    if (diameterBucket === "small") {
        conditions.push({ field: FIELD_COLUMNS.diameter, mode: "numeric_less_than", value: 40 });
    } else if (diameterBucket === "medium") {
        conditions.push({ field: FIELD_COLUMNS.diameter, mode: "numeric_range", min: 40, max: 80 });
    } else if (diameterBucket === "large") {
        conditions.push({ field: FIELD_COLUMNS.diameter, mode: "numeric_greater_than", value: 80 });
    }

    const surfaceTextureCondition = makeTextAnyTermsCondition(
        FIELD_COLUMNS.surfaceTexture,
        getCheckedTerms("surface_texture")
    );
    if (surfaceTextureCondition) conditions.push(surfaceTextureCondition);

    // "umbonate" is a substring of both "minutely umbonate" and "not umbonate" --
    // exact match required, same as veilBaseLayered below.
    const umbonateCondition = makeTextEqualsCondition(
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

function addAnnulusConditions(conditions) {
    // Presence/absence is derived from annulus_form rather than row existence --
    // every specimen has an annulus row, but the trait columns are simply blank
    // when there's no annulus. "not observed" (used for specimens too immature
    // to assess) deliberately matches neither present nor absent.
    const presence = getRadioValue("annulusPresence");

    if (presence === "present") {
        conditions.push({ field: FIELD_COLUMNS.annulusForm, mode: "text_has_content" });

        const positionCondition = makeTextContainsCondition(
            FIELD_COLUMNS.annulusPosition,
            getSelectValue("annulusPosition")
        );
        if (positionCondition) conditions.push(positionCondition);

        const formCondition = makeTextContainsCondition(
            FIELD_COLUMNS.annulusForm,
            getSelectValue("annulusForm")
        );
        if (formCondition) conditions.push(formCondition);

        const colorTerms = [
            ...getCheckedTerms("annulus_color_value"),
            ...getCheckedTerms("annulus_color_modifier")
        ];
        const colorCondition = makeTextAnyTermsCondition(FIELD_COLUMNS.annulusColor, colorTerms);
        if (colorCondition) conditions.push(colorCondition);
    } else if (presence === "absent") {
        conditions.push({ field: FIELD_COLUMNS.annulusForm, mode: "text_is_blank" });
    }
}

function addBasalBulbConditions(conditions) {
    const shape = getSelectValue("basalBulbShape");
    const shapeCondition = makeTextContainsCondition(FIELD_COLUMNS.basalBulbShape, shape);
    if (shapeCondition) conditions.push(shapeCondition);

    // Length/width inputs are hidden in the UI once "No bulb" is selected, but
    // guard here too in case a value was entered before switching shapes.
    if (shape === "no bulb") return;

    const lengthCondition = makeNumericCondition(
        FIELD_COLUMNS.basalBulbLength,
        getNumberValue("basal-bulb-length-mm"),
        getCheckboxValue("basal-bulb-length-approximate")
    );
    if (lengthCondition) conditions.push(lengthCondition);

    const widthCondition = makeNumericCondition(
        FIELD_COLUMNS.basalBulbWidth,
        getNumberValue("basal-bulb-width-mm"),
        getCheckboxValue("basal-bulb-width-approximate")
    );
    if (widthCondition) conditions.push(widthCondition);
}

function addStipeConditions(conditions) {
    const lengthBucket = getRadioValue("stipeLength");
    if (lengthBucket === "short") {
        conditions.push({ field: FIELD_COLUMNS.stipeLength, mode: "numeric_less_than", value: 50 });
    } else if (lengthBucket === "medium") {
        conditions.push({ field: FIELD_COLUMNS.stipeLength, mode: "numeric_range", min: 50, max: 120 });
    } else if (lengthBucket === "tall") {
        conditions.push({ field: FIELD_COLUMNS.stipeLength, mode: "numeric_greater_than", value: 120 });
    }

    const widthCondition = makeNumericCondition(
        FIELD_COLUMNS.stipeWidth,
        getNumberValue("stipe-width-mm"),
        getCheckboxValue("stipe-width-approximate")
    );
    if (widthCondition) conditions.push(widthCondition);

    const colorTerms = [
        ...getCheckedTerms("stipe_color_value"),
        ...getCheckedTerms("stipe_color_modifier")
    ];
    const colorCondition = makeTextAnyTermsCondition(FIELD_COLUMNS.stipeColor, colorTerms);
    if (colorCondition) conditions.push(colorCondition);

    const shapeCondition = makeTextContainsCondition(FIELD_COLUMNS.stipeShape, getSelectValue("stipeShape"));
    if (shapeCondition) conditions.push(shapeCondition);

    const decorationTopCondition = makeTextAnyTermsCondition(
        FIELD_COLUMNS.stipeDecorationTop,
        getCheckedTerms("stipe_decoration_top")
    );
    if (decorationTopCondition) conditions.push(decorationTopCondition);

    const decorationBottomCondition = makeTextAnyTermsCondition(
        FIELD_COLUMNS.stipeDecorationBottom,
        getCheckedTerms("stipe_decoration_bottom")
    );
    if (decorationBottomCondition) conditions.push(decorationBottomCondition);

    const stainingState = getRadioValue("stipe_staining_state");
    if (stainingState === "present") {
        const stainingColorTerms = getCheckedTerms("stipe_staining_color");

        if (stainingColorTerms.length > 0) {
            conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.stipeStaining, stainingColorTerms));
        } else {
            conditions.push({
                field: FIELD_COLUMNS.stipeStaining,
                mode: "text_not_contains_case_insensitive",
                value: "not apparent"
            });
        }
    } else if (stainingState === "absent") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.stipeStaining, ["not apparent"]));
    }
}

function addUniversalVeilConditions(conditions) {
    // Unlike annulus, both presence columns are already clean, explicit
    // present/absent text -- no blank-inference needed here.
    const capVeilState = getRadioValue("universalVeil");
    if (capVeilState === "present") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.universalVeil, ["present"]));

        const formCondition = makeTextContainsCondition(FIELD_COLUMNS.veilCapForm, getSelectValue("veilCapForm"));
        if (formCondition) conditions.push(formCondition);

        const textureCondition = makeTextContainsCondition(FIELD_COLUMNS.veilCapTexture, getSelectValue("veilCapTexture"));
        if (textureCondition) conditions.push(textureCondition);

        const colorTerms = [
            ...getCheckedTerms("veil_cap_color_value"),
            ...getCheckedTerms("veil_cap_color_modifier")
        ];
        const colorCondition = makeTextAnyTermsCondition(FIELD_COLUMNS.veilCapColor, colorTerms);
        if (colorCondition) conditions.push(colorCondition);

        const attachmentCondition = makeTextContainsCondition(
            FIELD_COLUMNS.veilCapAttachment,
            getSelectValue("veilCapAttachment")
        );
        if (attachmentCondition) conditions.push(attachmentCondition);

        const distributionCondition = makeTextAnyTermsCondition(
            FIELD_COLUMNS.veilCapDistribution,
            getCheckedTerms("veil_cap_distribution")
        );
        if (distributionCondition) conditions.push(distributionCondition);
    } else if (capVeilState === "absent") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.universalVeil, ["absent"]));
    }

    const baseVeilState = getRadioValue("stipeVeilPresence");
    if (baseVeilState === "present") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.stipeVeilPresent, ["present"]));

        const typeCondition = makeTextContainsCondition(FIELD_COLUMNS.veilBaseType, getSelectValue("veilBaseType"));
        if (typeCondition) conditions.push(typeCondition);

        const textureCondition = makeTextContainsCondition(FIELD_COLUMNS.veilBaseTexture, getSelectValue("veilBaseTexture"));
        if (textureCondition) conditions.push(textureCondition);

        const colorTerms = [
            ...getCheckedTerms("veil_base_color_value"),
            ...getCheckedTerms("veil_base_color_modifier")
        ];
        const colorCondition = makeTextAnyTermsCondition(FIELD_COLUMNS.veilBaseColor, colorTerms);
        if (colorCondition) conditions.push(colorCondition);

        // "layered" is a substring of "not layered" -- exact match required,
        // makeTextContainsCondition would wrongly match both from either pick.
        const layeredCondition = makeTextEqualsCondition(FIELD_COLUMNS.veilBaseLayered, getSelectValue("veilBaseLayered"));
        if (layeredCondition) conditions.push(layeredCondition);

        const toughOrFlimsyCondition = makeTextContainsCondition(
            FIELD_COLUMNS.veilBaseToughOrFlimsy,
            getSelectValue("veilBaseToughOrFlimsy")
        );
        if (toughOrFlimsyCondition) conditions.push(toughOrFlimsyCondition);
    } else if (baseVeilState === "absent") {
        conditions.push(makeTextAnyTermsCondition(FIELD_COLUMNS.stipeVeilPresent, ["absent"]));
    }
}
