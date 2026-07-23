import {
    ANNULUS_FORM_OPTIONS,
    ANNULUS_POSITION_OPTIONS,
    BASAL_BULB_SHAPE_OPTIONS,
    COLOR_MODIFIERS,
    COLOR_OPTIONS,
    DIAMETER_BUCKET_OPTIONS,
    SHAPE_OPTIONS,
    STAINING_COLOR_OPTIONS,
    STAINING_STATE_OPTIONS,
    STIPE_DECORATION_OPTIONS,
    STIPE_LENGTH_BUCKET_OPTIONS,
    STIPE_SHAPE_OPTIONS,
    SURFACE_TEXTURE_OPTIONS,
    TRI_STATE_OPTIONS,
    UMBONATE_OPTIONS,
    VEIL_BASE_LAYERED_OPTIONS,
    VEIL_BASE_TOUGH_OR_FLIMSY_OPTIONS,
    VEIL_BASE_TYPE_OPTIONS,
    VEIL_CAP_ATTACHMENT_OPTIONS,
    VEIL_CAP_DISTRIBUTION_OPTIONS,
    VEIL_CAP_FORM_OPTIONS,
    VEIL_TEXTURE_OPTIONS
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
    staining: "staining",
    annulusPosition: "annulus_position",
    annulusForm: "annulus_form",
    annulusColor: "annulus_color",
    basalBulbShape: "basal_bulb_shape",
    basalBulbLength: "basal_bulb_length_mm",
    basalBulbWidth: "basal_bulb_width_mm",
    stipeLength: "stipe_length_mm",
    stipeWidth: "stipe_width_mm",
    stipeColor: "stipe_color",
    stipeShape: "stipe_shape",
    stipeDecorationTop: "stipe_decoration_top",
    stipeDecorationBottom: "stipe_decoration_bottom",
    stipeStaining: "stipe_staining",
    stipeVeilPresent: "stipe_universal_veil_present",
    veilCapForm: "veil_cap_form",
    veilCapColor: "veil_cap_color",
    veilCapTexture: "veil_cap_texture",
    veilCapAttachment: "veil_cap_attachment",
    veilCapDistribution: "veil_cap_distribution",
    veilBaseType: "veil_base_type",
    veilBaseTexture: "veil_base_texture",
    veilBaseColor: "veil_base_color",
    veilBaseLayered: "veil_base_layered",
    veilBaseToughOrFlimsy: "veil_base_toughorflimsy"
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
        helpText: "**Convex** = rounded outward. **Plano-convex** = flat-rounded. **Applanate** = flat. **Campanulate** = bell-shaped. **Concave** = rounded inward. **Plano-concave** = flat-rounded inward."
    },
    {
        id: "striations",
        type: "triState",
        label: "Striations",
        column: FIELD_COLUMNS.striationLength,
        options: TRI_STATE_OPTIONS,
        note: "Look for fine lines or grooves near the cap margin.",
        helpSummary: "What are striations?",
        helpText: "**Striations** are fine radial lines at the cap margin, often caused by the gills showing through thin cap tissue."
    }
];

export const MORE_FIELDS = [
    {
        id: "diameter",
        type: "triState",
        label: "Cap diameter",
        column: FIELD_COLUMNS.diameter,
        options: DIAMETER_BUCKET_OPTIONS,
        note: "Choose the size range that best matches the cap.",
        helpSummary: "Size ranges",
        helpText: "**Small** = less than 40mm (~1.5 in). **Medium** = 40–80mm (~1.5–3 in). **Large** = greater than 80mm (~3+ in)."
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
        helpText: "**Umbonate** means the cap has a central bump or knob."
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

// STIPE SECTION (also covers annulus and basal bulb, combined on the front end
// since neither has enough distinct traits to warrant its own section)

export const ANNULUS_COLOR_CONFIG = {
    id: "annulusColor",
    type: "colorChips",
    label: "Annulus color",
    note: "Select as many colors as seem reasonable.",
    colorInputName: "annulus_color_value",
    modifierInputName: "annulus_color_modifier",
    column: FIELD_COLUMNS.annulusColor,
    options: COLOR_OPTIONS,
    modifiers: COLOR_MODIFIERS,
    visibleWhen: {
        radioName: "annulusPresence",
        value: "present"
    }
};

export const STIPE_COLOR_CONFIG = {
    id: "stipeColor",
    type: "colorChips",
    label: "Stipe color",
    note: "Select as many colors as seem reasonable.",
    colorInputName: "stipe_color_value",
    modifierInputName: "stipe_color_modifier",
    column: FIELD_COLUMNS.stipeColor,
    options: COLOR_OPTIONS,
    modifiers: COLOR_MODIFIERS
};

export const STIPE_MAJOR_FIELDS = [
    STIPE_COLOR_CONFIG,
    {
        id: "stipeDecorationBottom",
        type: "multiChip",
        label: "Stipe decoration (lower, near base)",
        column: FIELD_COLUMNS.stipeDecorationBottom,
        inputName: "stipe_decoration_bottom",
        options: STIPE_DECORATION_OPTIONS,
        note: "Choose one or more texture words for the lower stipe surface, near the base.",
        helpSummary: "Decoration terms",
        helpText: "**Smooth** = even, no visible texture. **Fibrillose** = covered in fine thread-like fibers. **Minutely fibrillose** = very finely fibrillose, fibers barely visible. **Floccose** = covered in loose, cottony tufts. **Flocculose** = finely floccose, small soft tufts. **Scabrous** = The appearance of scales or a chevron-like pattern. **Minutely scabrous** = small scales or hard to see. **Streaking** = fine lines running lengthwise down the surface. **Fuzzy** = covered in short, soft fine hairs. **Transverse cracks** = cracks running perpendicular across the stipe."
    },
    {
        id: "stipeLength",
        type: "triState",
        label: "Stipe length",
        column: FIELD_COLUMNS.stipeLength,
        options: STIPE_LENGTH_BUCKET_OPTIONS,
        note: "Choose the length range that best matches the stipe.",
        helpSummary: "Length ranges",
        helpText: "**Short** = less than 50mm (~2 in). **Medium** = 50–120mm (~2–5 in). **Tall** = greater than 120mm (~5+ in)."
    },
    {
        id: "stipeWidth",
        type: "numberWithApprox",
        label: "Stipe width",
        column: FIELD_COLUMNS.stipeWidth,
        inputId: "stipe-width-mm",
        approximateId: "stipe-width-approximate",
        placeholder: "e.g., 10",
        unit: "mm",
        note: "Enter the approximate stipe width in millimeters."
    },
    {
        id: "annulusPresence",
        type: "triState",
        label: "Annulus (ring)",
        column: FIELD_COLUMNS.annulusForm,
        options: TRI_STATE_OPTIONS,
        note: "Is there a ring of tissue on the stipe? This is one of the strongest identifying features -- its presence or absence narrows things down more than its exact form or color.",
        helpSummary: "What is the annulus?",
        helpText: "The **annulus** is a ring of tissue left on the stipe after the partial veil separates from the cap margin as the mushroom expands. Not every Amanita has one."
    },
    {
        id: "basalBulbShape",
        type: "select",
        label: "Basal bulb shape",
        column: FIELD_COLUMNS.basalBulbShape,
        options: BASAL_BULB_SHAPE_OPTIONS,
        helpSummary: "Bulb shape terms",
        helpText: "**Globose** = spherical. **Subglobose** = nearly round, slightly flattened or elongated. **Ovoid** = egg-shaped. **Fusiform** = cone-shaped, tapering at both ends. **Napiform** = turnip-shaped, widening abruptly then rounding to a point below."
    },
];

export const STIPE_MORE_FIELDS = [
    {
        id: "stipeShape",
        type: "select",
        label: "Stipe shape",
        column: FIELD_COLUMNS.stipeShape,
        options: STIPE_SHAPE_OPTIONS,
        note: "Select the closest overall stipe shape."
    },
    {
        id: "basalBulbLength",
        type: "numberWithApprox",
        label: "Basal bulb length",
        column: FIELD_COLUMNS.basalBulbLength,
        inputId: "basal-bulb-length-mm",
        approximateId: "basal-bulb-length-approximate",
        placeholder: "e.g., 15",
        unit: "mm",
        note: "Enter the approximate basal bulb length in millimeters.",
        visibleWhen: {
            selectId: "basalBulbShape",
            hiddenValue: "no bulb"
        }
    },
    {
        id: "basalBulbWidth",
        type: "numberWithApprox",
        label: "Basal bulb width",
        column: FIELD_COLUMNS.basalBulbWidth,
        inputId: "basal-bulb-width-mm",
        approximateId: "basal-bulb-width-approximate",
        placeholder: "e.g., 12",
        unit: "mm",
        note: "Enter the approximate basal bulb width in millimeters.",
        visibleWhen: {
            selectId: "basalBulbShape",
            hiddenValue: "no bulb"
        }
    },
    {
        id: "stipeDecorationTop",
        type: "multiChip",
        label: "Stipe decoration (upper, near cap)",
        column: FIELD_COLUMNS.stipeDecorationTop,
        inputName: "stipe_decoration_top",
        options: STIPE_DECORATION_OPTIONS,
        note: "Choose one or more texture words for the upper stipe surface, near the cap."
    },
    {
        id: "stipeStaining",
        type: "staining",
        label: "Stipe staining",
        column: FIELD_COLUMNS.stipeStaining,
        stateInputName: "stipe_staining_state",
        colorInputName: "stipe_staining_color",
        colorPanelId: "stipe-staining-color-panel",
        stateOptions: STAINING_STATE_OPTIONS,
        colorOptions: STAINING_COLOR_OPTIONS,
        note: "Is there a color change when the stipe is bruised or cut?"
    },
    {
        id: "annulusPosition",
        type: "select",
        label: "Annulus position",
        column: FIELD_COLUMNS.annulusPosition,
        options: ANNULUS_POSITION_OPTIONS,
        note: "Where on the stipe is the annulus located?",
        visibleWhen: {
            radioName: "annulusPresence",
            value: "present"
        }
    },
    {
        id: "annulusForm",
        type: "select",
        label: "Annulus form",
        column: FIELD_COLUMNS.annulusForm,
        options: ANNULUS_FORM_OPTIONS,
        note: "What does the annulus tissue look like?",
        visibleWhen: {
            radioName: "annulusPresence",
            value: "present"
        }
    },
    ANNULUS_COLOR_CONFIG
];

// UNIVERSAL VEIL SECTION (cap-side remnants and stipe-base-side remnants,
// combined on the front end since both come from the same tissue layer)

export const VEIL_CAP_COLOR_CONFIG = {
    id: "veilCapColor",
    type: "colorChips",
    label: "Cap veil color",
    note: "Select as many colors as seem reasonable.",
    colorInputName: "veil_cap_color_value",
    modifierInputName: "veil_cap_color_modifier",
    column: FIELD_COLUMNS.veilCapColor,
    options: COLOR_OPTIONS,
    modifiers: COLOR_MODIFIERS,
    visibleWhen: {
        radioName: "universalVeil",
        value: "present"
    }
};

export const VEIL_BASE_COLOR_CONFIG = {
    id: "veilBaseColor",
    type: "colorChips",
    label: "Stipe base veil color",
    note: "Select as many colors as seem reasonable.",
    colorInputName: "veil_base_color_value",
    modifierInputName: "veil_base_color_modifier",
    column: FIELD_COLUMNS.veilBaseColor,
    options: COLOR_OPTIONS,
    modifiers: COLOR_MODIFIERS,
    visibleWhen: {
        radioName: "stipeVeilPresence",
        value: "present"
    }
};

export const UNIVERSAL_VEIL_MAJOR_FIELDS = [
    {
        id: "universalVeil",
        type: "triState",
        label: "Cap veil remnants",
        column: FIELD_COLUMNS.universalVeil,
        options: TRI_STATE_OPTIONS,
        note: "Look for warts, patches, powder, or other veil material on the cap surface.",
        helpSummary: "What is the universal veil?",
        helpText: "The **universal veil** is the outer tissue layer that encloses young Amanita mushrooms. Remnants may remain as warts or patches on the cap, or as tissue around the stipe base."
    },
    {
        id: "veilCapForm",
        type: "select",
        label: "Cap veil form",
        column: FIELD_COLUMNS.veilCapForm,
        options: VEIL_CAP_FORM_OPTIONS,
        note: "What do the veil remnants on the cap look like?",
        visibleWhen: {
            radioName: "universalVeil",
            value: "present"
        }
    },
    {
        id: "stipeVeilPresence",
        type: "triState",
        label: "Stipe base veil remnants",
        column: FIELD_COLUMNS.stipeVeilPresent,
        options: TRI_STATE_OPTIONS,
        note: "Look for a sac, collar, or other veil tissue at the base of the stipe.",
        helpSummary: "What is the stipe base veil?",
        helpText: "Remnants of the **universal veil** can also remain at the base of the stipe, e.g. as a cup-like sac (volva) or a collar of tissue -- separate from the annulus higher up on the stipe."
    },
    {
        id: "veilBaseType",
        type: "select",
        label: "Stipe base veil type",
        column: FIELD_COLUMNS.veilBaseType,
        options: VEIL_BASE_TYPE_OPTIONS,
        note: "What shape does the veil tissue at the stipe base take?",
        helpSummary: "Veil type terms",
        helpText: "**Saccate** = forms a cup or sac around the base. **Limbate** = forms a rimmed edge. **Sheathing** = wraps around the stipe like a sleeve. **Collared** = forms a distinct ring-like collar. **Loose patches** = scattered, unattached fragments. **Warts** = small, wart-like fragments.",
        visibleWhen: {
            radioName: "stipeVeilPresence",
            value: "present"
        }
    }
];

export const UNIVERSAL_VEIL_MORE_FIELDS = [
    {
        id: "veilCapTexture",
        type: "select",
        label: "Cap veil texture",
        column: FIELD_COLUMNS.veilCapTexture,
        options: VEIL_TEXTURE_OPTIONS,
        helpSummary: "Texture terms",
        helpText: "**Membranous** = a thin, skin-like continuous layer. **Submembranous** = partially skin-like, not fully continuous. **Pulverulent** = powdery or mealy. **Friable** = crumbly, breaks apart easily.",
        visibleWhen: {
            radioName: "universalVeil",
            value: "present"
        }
    },
    VEIL_CAP_COLOR_CONFIG,
    {
        id: "veilCapAttachment",
        type: "select",
        label: "Cap veil attachment",
        column: FIELD_COLUMNS.veilCapAttachment,
        options: VEIL_CAP_ATTACHMENT_OPTIONS,
        helpSummary: "Attachment terms",
        helpText: "**Easily removed** = comes off the cap surface with a light touch. **Adnate** = firmly attached, doesn't rub off easily.",
        visibleWhen: {
            radioName: "universalVeil",
            value: "present"
        }
    },
    {
        id: "veilCapDistribution",
        type: "multiChip",
        label: "Cap veil distribution",
        column: FIELD_COLUMNS.veilCapDistribution,
        inputName: "veil_cap_distribution",
        options: VEIL_CAP_DISTRIBUTION_OPTIONS,
        note: "Choose one or more words for how the remnants are spread across the cap.",
        helpSummary: "Distribution terms",
        helpText: "**Sparse** = few remnants, widely spaced. **Common** = a moderate, regular amount. **Dense** = many remnants, closely packed. **Even** = spread uniformly. **Uneven** = clumped in places. **Center** = concentrated at the cap's center. **Margin** = concentrated at the cap's edge. **Rings** = arranged in ring-like bands. **Dispersed** = scattered loosely.",
        visibleWhen: {
            radioName: "universalVeil",
            value: "present"
        }
    },
    {
        id: "veilBaseTexture",
        type: "select",
        label: "Stipe base veil texture",
        column: FIELD_COLUMNS.veilBaseTexture,
        options: VEIL_TEXTURE_OPTIONS,
        helpSummary: "Texture terms",
        helpText: "**Membranous** = a thin, skin-like continuous layer. **Submembranous** = partially skin-like, not fully continuous. **Pulverulent** = powdery or mealy. **Friable** = crumbly, breaks apart easily.",
        visibleWhen: {
            radioName: "stipeVeilPresence",
            value: "present"
        }
    },
    VEIL_BASE_COLOR_CONFIG,
    {
        id: "veilBaseLayered",
        type: "select",
        label: "Stipe base veil layering",
        column: FIELD_COLUMNS.veilBaseLayered,
        options: VEIL_BASE_LAYERED_OPTIONS,
        visibleWhen: {
            radioName: "stipeVeilPresence",
            value: "present"
        }
    },
    {
        id: "veilBaseToughOrFlimsy",
        type: "select",
        label: "Stipe base veil sturdiness",
        column: FIELD_COLUMNS.veilBaseToughOrFlimsy,
        options: VEIL_BASE_TOUGH_OR_FLIMSY_OPTIONS,
        visibleWhen: {
            radioName: "stipeVeilPresence",
            value: "present"
        }
    }
];
