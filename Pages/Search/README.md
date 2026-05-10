# Amanita Search Refactor

This is a modular refactor of the cap-trait search page.

## File structure

```txt
index.html
css/search.css
js/main.js
js/config/options.js
js/config/traitConfig.js
js/ui/domHelpers.js
js/ui/renderForm.js
js/ui/formState.js
js/search/conditionBuilders.js
js/search/buildSearchPayload.js
js/search/searchAdapter.js
js/search/renderResults.js
```

## How to edit fields

Most edits should happen in:

```txt
js/config/traitConfig.js
js/config/options.js
```

Add new trait fields to `MAJOR_FIELDS` or `MORE_FIELDS`. The form renderer will build the HTML automatically.

## Supabase integration

Replace the preview implementation in:

```txt
js/search/searchAdapter.js
```

The current `buildSearchPayload()` output is designed to be passed to a future Supabase RPC function, for example:

```js
const { data, error } = await supabase.rpc("search_amanita_species", {
    search_payload: payload
});
```

The recommended long-term approach is to let Postgres group matching specimen rows into species-level results.
