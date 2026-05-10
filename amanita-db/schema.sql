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




