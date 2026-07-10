--
-- Add basidia and basidiospore trait tables
--
-- Source data: raw_csv/basidia_clean.csv, raw_csv/basidiospore_clean.csv
--
-- A few CSV columns were renamed to be valid plain SQL identifiers
-- (Postgres identifiers can't start with a digit or contain "/" without
-- being double-quoted everywhere, forever):
--   basidia_clean.csv:       4s/basidia -> spores_4
--                             3s/basidia -> spores_3
--                             2s/basidia -> spores_2
--                             s/basidia  -> spores_1
--   basidiospore_clean.csv:  10_length  -> p10_length
--                             90_length  -> p90_length
--                             10_width   -> p10_width
--                             90_width   -> p90_width
--

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

CREATE INDEX idx_basidia_specimen_id ON public.basidia USING btree (specimen_id);

ALTER TABLE ONLY public.basidia
    ADD CONSTRAINT basidia_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;

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

CREATE INDEX idx_basidiospore_specimen_id ON public.basidiospore USING btree (specimen_id);

ALTER TABLE ONLY public.basidiospore
    ADD CONSTRAINT basidiospore_specimen_id_fkey FOREIGN KEY (specimen_id) REFERENCES public.specimens(specimen_id) ON DELETE CASCADE;

--
-- Row level security: public (anon) read-only access.
-- The Search tool only ever SELECTs from these tables, so no other
-- operation is granted to anon/authenticated.
--

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
