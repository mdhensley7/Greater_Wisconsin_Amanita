--
-- PostgreSQL database dump
--

-- Dumped from database version 15.15 (Homebrew)
-- Dumped by pg_dump version 15.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: annulus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.annulus (
    specimen_id text,
    species text,
    "position" text,
    form text,
    color text,
    staining text,
    remainingpercent double precision,
    condition text
);


--
-- Name: basal_bulb; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.basal_bulb (
    specimen_id text,
    species text,
    length_mm double precision,
    width_mm double precision,
    shape text
);


--
-- Name: basidia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.basidia (
    specimen_id text,
    species text,
    sectionid text,
    basidia_count double precision,
    min_length double precision,
    avg_length double precision,
    max_length double precision,
    min_width double precision,
    avg_width double precision,
    max_width double precision,
    spores_4 double precision,
    spores_3 double precision,
    spores_2 double precision,
    spores_1 double precision,
    min_s_length double precision,
    avg_s_length double precision,
    max_s_length double precision
);


--
-- Name: basidiospore; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.basidiospore (
    specimen_id text,
    species text,
    sectionid text,
    spore_count double precision,
    min_length double precision,
    p10_length double precision,
    avg_length double precision,
    p90_length double precision,
    max_length double precision,
    min_width double precision,
    p10_width double precision,
    avg_width double precision,
    p90_width double precision,
    max_width double precision,
    min_q double precision,
    avg_q double precision,
    max_q double precision
);


--
-- Name: lamellae; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lamellae (
    specimen_id text,
    species text,
    attachment text,
    colorinmasse text,
    distribution text,
    staining text,
    breadth text,
    edge text,
    othercomment text
);


--
-- Name: lamellulae; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lamellulae (
    specimen_id text,
    species text,
    form text,
    amount text,
    distribution text,
    ending text
);


--
-- Name: pileus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pileus (
    specimen_id text,
    species text,
    diameter_mm double precision,
    centercolor text,
    margincolor text,
    shape text,
    surfacetexture text,
    umbonate text,
    striationlength_mm double precision,
    appendiculate text,
    universalveilpresent text,
    staining text,
    contextcolor text
);


--
-- Name: specimens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specimens (
    specimen_id text NOT NULL,
    species text,
    sectionid text,
    collector text,
    lat double precision,
    long double precision,
    county text,
    site text,
    datecollected date,
    microscopy text,
    hosttree1_common text,
    hosttree1_scientific text,
    hosttree2_common text,
    hosttree2_scientific text
);


--
-- Name: stipe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stipe (
    specimen_id text,
    species text,
    length_mm double precision,
    width_mm double precision,
    color text,
    shape text,
    decoration_bottom text,
    decoration_top text,
    staining text,
    annulus text,
    universal_veil text,
    context_type text,
    context_color text,
    context_stain text
);


--
-- Name: universal_veil_pileus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.universal_veil_pileus (
    specimen_id text,
    species text,
    form text,
    color text,
    texture text,
    attachment text,
    distribution text
);


--
-- Name: universal_veil_stipe_base; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.universal_veil_stipe_base (
    specimen_id text,
    species text,
    type text,
    texture text,
    color text,
    layered text,
    toughorflimsy text
);


--
-- Name: specimens specimens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specimens
    ADD CONSTRAINT specimens_pkey PRIMARY KEY (specimen_id);


--
-- Name: annulus annulus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annulus
    ADD CONSTRAINT annulus_pkey PRIMARY KEY (specimen_id);


--
-- Name: basal_bulb basal_bulb_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basal_bulb
    ADD CONSTRAINT basal_bulb_pkey PRIMARY KEY (specimen_id);


--
-- Name: basidia basidia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basidia
    ADD CONSTRAINT basidia_pkey PRIMARY KEY (specimen_id);


--
-- Name: basidiospore basidiospore_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basidiospore
    ADD CONSTRAINT basidiospore_pkey PRIMARY KEY (specimen_id);


--
-- Name: lamellae lamellae_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lamellae
    ADD CONSTRAINT lamellae_pkey PRIMARY KEY (specimen_id);


--
-- Name: lamellulae lamellulae_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lamellulae
    ADD CONSTRAINT lamellulae_pkey PRIMARY KEY (specimen_id);


--
-- Name: pileus pileus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pileus
    ADD CONSTRAINT pileus_pkey PRIMARY KEY (specimen_id);


--
-- Name: stipe stipe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stipe
    ADD CONSTRAINT stipe_pkey PRIMARY KEY (specimen_id);


--
-- Name: universal_veil_pileus universal_veil_pileus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.universal_veil_pileus
    ADD CONSTRAINT universal_veil_pileus_pkey PRIMARY KEY (specimen_id);


--
-- Name: universal_veil_stipe_base universal_veil_stipe_base_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.universal_veil_stipe_base
    ADD CONSTRAINT universal_veil_stipe_base_pkey PRIMARY KEY (specimen_id);


--
-- Name: annulus annulus_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annulus
    ADD CONSTRAINT annulus_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: basal_bulb basal_bulb_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basal_bulb
    ADD CONSTRAINT basal_bulb_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: basidia basidia_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basidia
    ADD CONSTRAINT basidia_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: basidiospore basidiospore_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basidiospore
    ADD CONSTRAINT basidiospore_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: lamellae lamellae_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lamellae
    ADD CONSTRAINT lamellae_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: lamellulae lamellulae_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lamellulae
    ADD CONSTRAINT lamellulae_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: pileus pileus_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pileus
    ADD CONSTRAINT pileus_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: stipe stipe_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stipe
    ADD CONSTRAINT stipe_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: universal_veil_pileus universal_veil_pileus_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.universal_veil_pileus
    ADD CONSTRAINT universal_veil_pileus_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Name: universal_veil_stipe_base universal_veil_stipe_base_specimen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.universal_veil_stipe_base
    ADD CONSTRAINT universal_veil_stipe_base_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;


--
-- Row level security: public (anon) read-only access.
-- Every table is SELECT-only for anon/authenticated; the Search tool
-- never writes, so no other operation is granted anywhere.
--

ALTER TABLE public.specimens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.specimens
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.annulus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.annulus
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.basal_bulb ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.basal_bulb
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.basidia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.basidia
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.basidiospore ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.basidiospore
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.lamellae ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.lamellae
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.lamellulae ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.lamellulae
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.pileus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.pileus
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.stipe ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.stipe
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.universal_veil_pileus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.universal_veil_pileus
    FOR SELECT
    TO anon, authenticated
    USING (true);

ALTER TABLE public.universal_veil_stipe_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.universal_veil_stipe_base
    FOR SELECT
    TO anon, authenticated
    USING (true);


--
-- Name: specimen_search; Type: VIEW; Schema: public; Owner: -
--
-- One row per specimen, joining specimens + pileus + annulus +
-- basal_bulb + stipe + universal_veil_pileus + universal_veil_stipe_base
-- on specimen_id. Used by the Search tool instead of querying pileus
-- directly. security_invoker = true makes the view enforce the
-- querying role's RLS policies on the underlying tables, rather than
-- running as the view owner. See
-- amanita-db/supabase/migrations/20260713144647_add_specimen_search_view.sql
-- and .../20260713165627_extend_specimen_search_view_veil.sql
-- for full column-naming rationale.
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


