
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
    { label: "Any", value: ANY_VALUE },
    { label: "Present", value: "present" },
    { label: "Absent", value: "absent" }
];

export const STAINING_STATE_OPTIONS = [
    { label: "Any", value: ANY_VALUE },
    { label: "Present", value: "present" },
    { label: "No staining", value: "absent" }
];
