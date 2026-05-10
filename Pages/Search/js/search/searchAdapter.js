// This adapter is intentionally small. For now it previews the query payload.
// Later, replace searchSpecies() with a Supabase call, ideally to a Postgres RPC
// function that handles grouping, missing values, and match scoring server-side.

export async function searchSpecies(payload) {
    if (payload.conditions.length === 0) {
        return {
            status: "empty",
            message: "Select at least one trait to search."
        };
    }

    return {
        status: "preview",
        payload
    };
}

// Future shape:
// export async function searchSpecies(payload) {
//     const { data, error } = await supabase.rpc("search_amanita_species", {
//         search_payload: payload
//     });
//
//     if (error) throw error;
//     return {
//         status: "results",
//         results: data
//     };
// }
