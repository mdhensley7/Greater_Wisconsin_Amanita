import {
    COLOR_MODIFIERS,
    COLOR_OPTIONS,
    SHAPE_OPTIONS,
    STAINING_COLOR_OPTIONS,
    STAINING_STATE_OPTIONS,
    SURFACE_TEXTURE_OPTIONS,
    TRI_STATE_OPTIONS,
    UMBONATE_OPTIONS
} from "./options.js";

export const FIELD_COLUMNS = {
    specimenId: "specimen_id",
    species: "species",
    diameter: "diameter_mm",
    centerColor: "centercolor",
    marginColor: "margincolor",
    shape: "shape",
    surfaceTexture: "surfacetexture",
    umbonate: "umbonate",
    striationLength: "striationlength_mm",
    universalVeil: "universalveilpresent",
    staining: "staining"
};

export const CAP_COLOR_CONFIG = {
    id: "capColor",
    type: "capColor",
    label: "Cap color",
    note: "Select as many colors as seem reasonable. The search will cast a wide net.",
    centerColor: {
        inputName: "center_color",
        modifierName: "center_modifier",
        column: FIELD_COLUMNS.centerColor,
        options: COLOR_OPTIONS,
        modifiers: COLOR_MODIFIERS
    },
    marginColor: {
        toggleId: "use-margin-color",
        panelId: "margin-color-panel",
        inputName: "margin_color",
        modifierName: "margin_modifier",
        column: FIELD_COLUMNS.marginColor,
        options: COLOR_OPTIONS,
        modifiers: COLOR_MODIFIERS
    }
};

export const MAJOR_FIELDS = [
    CAP_COLOR_CONFIG,
    {
        id: "shape",
        type: "select",
        label: "Cap shape",
        column: FIELD_COLUMNS.shape,
        options: SHAPE_OPTIONS,
        note: "Select the closest overall cap shape. Skip this if the mushroom is old or distorted.",
        helpSummary: "Shape terms",
        helpText: "Convex = rounded outward. Plano-convex = flat-rounded. Applanate = flat. Campanulate = bell-shaped. Concave = rounded inward. Plano-concave = flat-rounded inward."
    },
    {
        id: "striations",
        type: "triState",
        label: "Striations",
        column: FIELD_COLUMNS.striationLength,
        options: TRI_STATE_OPTIONS,
        note: "Look for fine lines or grooves near the cap margin.",
        helpSummary: "What are striations?",
        helpText: "Striations are fine radial lines at the cap margin, often caused by the gills showing through thin cap tissue."
    },
    {
        id: "universalVeil",
        type: "triState",
        label: "Universal veil remnants on cap",
        column: FIELD_COLUMNS.universalVeil,
        options: TRI_STATE_OPTIONS,
        note: "Look for warts, patches, powder, or other veil material on the cap surface.",
        helpSummary: "What is the universal veil?",
        helpText: "The universal veil is the outer tissue layer that encloses young Amanita mushrooms. Remnants may remain as warts or patches on the cap."
    }
];

export const MORE_FIELDS = [
    {
        id: "diameter",
        type: "numberWithApprox",
        label: "Cap diameter",
        column: FIELD_COLUMNS.diameter,
        inputId: "diameter-mm",
        approximateId: "diameter-approximate",
        placeholder: "e.g., 55",
        unit: "mm",
        note: "Enter the approximate cap diameter in millimeters."
    },
    {
        id: "surfaceTexture",
        type: "multiChip",
        label: "Surface texture",
        column: FIELD_COLUMNS.surfaceTexture,
        inputName: "surface_texture",
        options: SURFACE_TEXTURE_OPTIONS,
        note: "Choose one or more texture words if they seem clear."
    },
    {
        id: "umbonate",
        type: "select",
        label: "Umbonate",
        column: FIELD_COLUMNS.umbonate,
        options: UMBONATE_OPTIONS,
        helpSummary: "What does umbonate mean?",
        helpText: "Umbonate means the cap has a central bump or knob."
    },
    {
        id: "striationLength",
        type: "numberWithApprox",
        label: "Striation length",
        column: FIELD_COLUMNS.striationLength,
        inputId: "striation-length-mm",
        approximateId: "striation-length-approximate",
        placeholder: "e.g., 8",
        unit: "mm",
        note: "Optional. Enter the approximate length of marginal striations in millimeters.",
        visibleWhen: {
            radioName: "striations",
            value: "present"
        }
    },
    {
        id: "staining",
        type: "staining",
        label: "Staining",
        column: FIELD_COLUMNS.staining,
        stateInputName: "staining_state",
        colorInputName: "staining_color",
        colorPanelId: "staining-color-panel",
        stateOptions: STAINING_STATE_OPTIONS,
        colorOptions: STAINING_COLOR_OPTIONS,
        note: "Is there a color change when the mushroom is bruised or cut?",
    }
];
