
export const ANY_VALUE = "__ANY__";

// These options are used in the search form. Each option has a label (for display), a value (for the query), and terms (for matching against the database).
// The "Any / not sure" option has a special value of ANY_VALUE, which is handled in the search logic to match any value for that trait.

// CAP SHAPE OPTIONS
export const COLOR_OPTIONS = [
    { label: "White", value: "white", terms: ["white"] },
    { label: "Yellow", value: "yellow", terms: ["yellow"] },
    { label: "Orange", value: "orange", terms: ["orange"] },
    { label: "Red", value: "red", terms: ["red"] },
    { label: "Brown", value: "brown", terms: ["brown"] },
    { label: "Gray/Grey", value: "gray", terms: ["gray", "grey"] },
    { label: "Green", value: "green", terms: ["green"] },
    { label: "Pink", value: "pink", terms: ["pink"] }
];

export const COLOR_MODIFIERS = [
    { label: "Light", value: "light", terms: ["light"] },
    { label: "Dark", value: "dark", terms: ["dark"] },
    { label: "Bright", value: "bright", terms: ["bright"] },
    { label: "Dingy", value: "dingy", terms: ["dingy"] },
    { label: "Shiny", value: "shiny", terms: ["shiny"] }
];

export const SHAPE_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE  },
    { label: "Applanate", value: "applanate" },
    { label: "Campanulate", value: "campanulate" },
    { label: "Concave", value: "concave" },
    { label: "Convex", value: "convex" },
    { label: "Plano-concave", value: "plano-concave" },
    { label: "Plano-convex", value: "plano-convex" }
];

export const UMBONATE_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Umbonate", value: "umbonate" },
    { label: "Minutely umbonate", value: "minutely umbonate" },
    { label: "Not umbonate", value: "not umbonate" }
];

export const SURFACE_TEXTURE_OPTIONS = [
    { label: "Dry", value: "dry", terms: ["dry"] },
    { label: "Smooth / glabrous", value: "smooth", terms: ["smooth", "glabrous", "glaborous"] },
    { label: "Viscid / sticky", value: "viscid", terms: ["viscid", "sticky"] },
    { label: "Silky", value: "silky", terms: ["silky"] },
    { label: "Wrinkly", value: "wrinkly", terms: ["wrinkly", "wrinkled"] }
];

export const STAINING_COLOR_OPTIONS = [
    { label: "Brown", value: "brown", terms: ["brown"] },
    { label: "Red-brown", value: "red brown", terms: ["red", "brown"] },
    { label: "Gray/Grey", value: "gray", terms: ["gray", "grey"] },
    { label: "Lavender", value: "lavender", terms: ["lavender"] }
];

export const TRI_STATE_OPTIONS = [
    { label: "Present", value: "present" },
    { label: "Absent", value: "absent" }
];

export const STAINING_STATE_OPTIONS = [
    { label: "Any", value: ANY_VALUE },
    { label: "Present", value: "present" },
    { label: "No staining", value: "absent" }
];

// ANNULUS OPTIONS
export const ANNULUS_POSITION_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Superior", value: "superior" },
    { label: "At apex", value: "at apex" },
    { label: "Mid", value: "mid" }
];

export const ANNULUS_FORM_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Membranous", value: "membranous" },
    { label: "Submembranous", value: "submembranous" },
    { label: "Line", value: "line" },
    { label: "Pulverulent", value: "pulverulent" }
];

// BASAL BULB OPTIONS
export const BASAL_BULB_SHAPE_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "No bulb", value: "no bulb" },
    { label: "Subglobose", value: "subglobose" },
    { label: "Ovoid", value: "ovoid" },
    { label: "Globose", value: "globose" },
    { label: "Fusiform", value: "fusiform" },
    { label: "Napiform", value: "napiform" }
];

// STIPE OPTIONS
export const STIPE_SHAPE_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Narrowing upward", value: "narrowing upward" },
    { label: "Cylindrical", value: "cylindrical" },
    { label: "Narrowing downward", value: "narrowing downward" }
];

// UNIVERSAL VEIL OPTIONS (shared between cap-side and stipe-base-side remnants)
export const VEIL_TEXTURE_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Membranous", value: "membranous" },
    { label: "Submembranous", value: "submembranous" },
    { label: "Pulverulent", value: "pulverulent" },
    { label: "Friable", value: "friable" }
];

export const VEIL_CAP_FORM_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Patches", value: "patches" },
    { label: "Warts", value: "warts" },
    { label: "Powder", value: "powder" },
    { label: "Scales", value: "scales" }
];

export const VEIL_CAP_ATTACHMENT_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Easily removed", value: "easily removed" },
    { label: "Adnate", value: "adnate" }
];

export const VEIL_CAP_DISTRIBUTION_OPTIONS = [
    { label: "Sparse", value: "sparse", terms: ["sparse"] },
    { label: "Common", value: "common", terms: ["common"] },
    { label: "Dense", value: "dense", terms: ["dense"] },
    { label: "Even", value: "even", terms: ["even"] },
    { label: "Uneven", value: "uneven", terms: ["uneven"] },
    { label: "Center", value: "center", terms: ["center"] },
    { label: "Margin", value: "margin", terms: ["margin"] },
    { label: "Rings", value: "rings", terms: ["rings"] },
    { label: "Dispersed", value: "dispersed", terms: ["dispersed"] }
];

export const VEIL_BASE_TYPE_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Saccate", value: "saccate" },
    { label: "Limbate", value: "limbate" },
    { label: "Sheathing", value: "sheathing" },
    { label: "Collared", value: "collared" },
    { label: "Loose patches", value: "loose patches" },
    { label: "Warts", value: "warts" }
];

export const VEIL_BASE_LAYERED_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Layered", value: "layered" },
    { label: "Not layered", value: "not layered" }
];

export const VEIL_BASE_TOUGH_OR_FLIMSY_OPTIONS = [
    { label: "Any / not sure", value: ANY_VALUE },
    { label: "Tough", value: "tough" },
    { label: "Toughish", value: "toughish" },
    { label: "Flimsy", value: "flimsy" }
];

export const STIPE_DECORATION_OPTIONS = [
    { label: "Smooth", value: "smooth", terms: ["smooth"] },
    { label: "Fibrillose", value: "fibrillose", terms: ["fibrillose"] },
    { label: "Minutely fibrillose", value: "minutely fibrillose", terms: ["minutely fibrillose"] },
    { label: "Floccose", value: "floccose", terms: ["floccose"] },
    { label: "Flocculose", value: "flocculose", terms: ["flocculose"] },
    { label: "Minutely scabrous", value: "minutely scabrous", terms: ["minutely scabrous"] },
    { label: "Scabrous", value: "scabrous", terms: ["scabrous"] },
    { label: "Streaking", value: "streaking", terms: ["streaking"] },
    { label: "Fuzzy", value: "fuzzy", terms: ["fuzzy"] },
    { label: "Transverse cracks", value: "transverse cracks", terms: ["transverse cracks"] }
];
