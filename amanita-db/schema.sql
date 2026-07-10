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
-- Name: idx_annulus_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_annulus_specimen_id ON public.annulus USING btree (specimen_id);


--
-- Name: idx_basal_bulb_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_basal_bulb_specimen_id ON public.basal_bulb USING btree (specimen_id);


--
-- Name: idx_basidia_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_basidia_specimen_id ON public.basidia USING btree (specimen_id);


--
-- Name: idx_basidiospore_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_basidiospore_specimen_id ON public.basidiospore USING btree (specimen_id);


--
-- Name: idx_lamellae_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lamellae_specimen_id ON public.lamellae USING btree (specimen_id);


--
-- Name: idx_lamellulae_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lamellulae_specimen_id ON public.lamellulae USING btree (specimen_id);


--
-- Name: idx_pileus_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pileus_specimen_id ON public.pileus USING btree (specimen_id);


--
-- Name: idx_stipe_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stipe_specimen_id ON public.stipe USING btree (specimen_id);


--
-- Name: idx_universal_veil_pileus_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_universal_veil_pileus_specimen_id ON public.universal_veil_pileus USING btree (specimen_id);


--
-- Name: idx_universal_veil_stipe_base_specimen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_universal_veil_stipe_base_specimen_id ON public.universal_veil_stipe_base USING btree (specimen_id);


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


