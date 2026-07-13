--
-- specimen_search: one row per specimen, joining specimens + pileus +
-- annulus + basal_bulb + stipe on specimen_id.
--
-- This is a VIEW, not a copy of the data -- it's a saved query computed
-- fresh from the real tables on every read. The underlying tables stay
-- fully normalized and independently maintainable (per-table CSV
-- reuploads, per-table TRUNCATE, etc. all still work exactly as before).
--
-- The Search tool's adapter (Pages/Search/js/search/searchAdapter.js)
-- points at this view instead of querying "pileus" directly, so cap
-- fields keep working unchanged while stipe/annulus/basal_bulb fields
-- become queryable too.
--
-- Column naming: pileus columns keep their original bare names (shape,
-- staining, etc.) since existing search fields already reference those
-- exact names. Every column from annulus/basal_bulb/stipe is prefixed
-- with its table name -- both to resolve real collisions (shape appears
-- in pileus/basal_bulb/stipe; staining in pileus/annulus/stipe; color
-- and length_mm/width_mm collide between annulus/stipe and
-- basal_bulb/stipe) and to keep the convention predictable as more
-- tables get added to this view later.
--
-- To extend later: add another LEFT JOIN + prefix that table's columns
-- the same way, via CREATE OR REPLACE VIEW (only ever append columns --
-- removing/reordering existing ones can break the search adapter).
--

CREATE OR REPLACE VIEW public.specimen_search
WITH (security_invoker = true)
AS
SELECT
    s.specimen_id,
    s.species,
    s.sectionid,
    s.collector,
    s.lat,
    s.long,
    s.county,
    s.site,
    s.datecollected,
    s.microscopy,
    s.hosttree1_common,
    s.hosttree1_scientific,
    s.hosttree2_common,
    s.hosttree2_scientific,

    p.diameter_mm,
    p.centercolor,
    p.margincolor,
    p.shape,
    p.surfacetexture,
    p.umbonate,
    p.striationlength_mm,
    p.appendiculate,
    p.universalveilpresent,
    p.staining,
    p.contextcolor,

    a.position AS annulus_position,
    a.form AS annulus_form,
    a.color AS annulus_color,
    a.staining AS annulus_staining,
    a.remainingpercent AS annulus_remainingpercent,
    a.condition AS annulus_condition,

    bb.length_mm AS basal_bulb_length_mm,
    bb.width_mm AS basal_bulb_width_mm,
    bb.shape AS basal_bulb_shape,

    st.length_mm AS stipe_length_mm,
    st.width_mm AS stipe_width_mm,
    st.color AS stipe_color,
    st.shape AS stipe_shape,
    st.decoration_bottom AS stipe_decoration_bottom,
    st.decoration_top AS stipe_decoration_top,
    st.staining AS stipe_staining,
    st.annulus AS stipe_annulus_present,
    st.universal_veil AS stipe_universal_veil_present,
    st.context_type AS stipe_context_type,
    st.context_color AS stipe_context_color,
    st.context_stain AS stipe_context_stain

FROM public.specimens s
LEFT JOIN public.pileus p ON p.specimen_id = s.specimen_id
LEFT JOIN public.annulus a ON a.specimen_id = s.specimen_id
LEFT JOIN public.basal_bulb bb ON bb.specimen_id = s.specimen_id
LEFT JOIN public.stipe st ON st.specimen_id = s.specimen_id;

--
-- security_invoker = true (above) makes this view run as the querying
-- role rather than the view's owner. Without it, a plain view defaults
-- to running as its owner, which would bypass the underlying tables'
-- RLS policies entirely for anyone querying through the view -- a real
-- security hole, and something Supabase's own linter flags. With it
-- set, the view correctly enforces the same anon/authenticated
-- SELECT-only policies already on specimens/pileus/annulus/basal_bulb/
-- stipe. The view still needs its own GRANT, separately:
--

GRANT SELECT ON public.specimen_search TO anon, authenticated;
