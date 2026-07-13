--
-- Extend specimen_search to also join universal_veil_pileus and
-- universal_veil_stipe_base, for the new "Universal veil" search section.
--
-- Both tables have their own "texture" and "color" columns (colliding
-- with each other, not with anything already in the view), so every
-- column from both is prefixed: veil_cap_* for universal_veil_pileus
-- (cap-side veil remnants), veil_base_* for universal_veil_stipe_base
-- (stipe-base-side veil remnants).
--
-- Presence/absence for both sides is already a clean, explicit column
-- (pileus.universalveilpresent, stipe.universal_veil -- already exposed
-- as stipe_universal_veil_present) -- unlike annulus, no blank-inference
-- trick is needed here.
--
-- This is purely additive (CREATE OR REPLACE VIEW, only new columns
-- appended at the end) -- nothing existing changes.
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
    st.context_stain AS stipe_context_stain,

    uvp.form AS veil_cap_form,
    uvp.color AS veil_cap_color,
    uvp.texture AS veil_cap_texture,
    uvp.attachment AS veil_cap_attachment,
    uvp.distribution AS veil_cap_distribution,

    uvsb.type AS veil_base_type,
    uvsb.texture AS veil_base_texture,
    uvsb.color AS veil_base_color,
    uvsb.layered AS veil_base_layered,
    uvsb.toughorflimsy AS veil_base_toughorflimsy

FROM public.specimens s
LEFT JOIN public.pileus p ON p.specimen_id = s.specimen_id
LEFT JOIN public.annulus a ON a.specimen_id = s.specimen_id
LEFT JOIN public.basal_bulb bb ON bb.specimen_id = s.specimen_id
LEFT JOIN public.stipe st ON st.specimen_id = s.specimen_id
LEFT JOIN public.universal_veil_pileus uvp ON uvp.specimen_id = s.specimen_id
LEFT JOIN public.universal_veil_stipe_base uvsb ON uvsb.specimen_id = s.specimen_id;

GRANT SELECT ON public.specimen_search TO anon, authenticated;
