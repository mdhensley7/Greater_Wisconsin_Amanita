--
-- Add PRIMARY KEY (specimen_id) to every trait table.
--
-- Only public.specimens had a primary key -- every trait table just had
-- a plain index on specimen_id. Without a PK, Supabase's Table Editor
-- can't uniquely target a row to update, which is why inline edits were
-- being refused.
--
-- Safe to add: verified specimen_id is 100% unique and non-null across
-- every trait table (142 rows, 142 distinct values, 0 duplicates, 0
-- blanks each) -- this holds because repeat-observation rows already
-- carry a suffixed id (e.g. "30187_2"), not the bare specimen number.
--
-- Each table's existing idx_<table>_specimen_id index is now redundant
-- (the PK creates its own unique index), so those are dropped.
--

ALTER TABLE ONLY public.pileus
    ADD CONSTRAINT pileus_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_pileus_specimen_id;

ALTER TABLE ONLY public.annulus
    ADD CONSTRAINT annulus_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_annulus_specimen_id;

ALTER TABLE ONLY public.basal_bulb
    ADD CONSTRAINT basal_bulb_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_basal_bulb_specimen_id;

ALTER TABLE ONLY public.stipe
    ADD CONSTRAINT stipe_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_stipe_specimen_id;

ALTER TABLE ONLY public.lamellae
    ADD CONSTRAINT lamellae_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_lamellae_specimen_id;

ALTER TABLE ONLY public.lamellulae
    ADD CONSTRAINT lamellulae_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_lamellulae_specimen_id;

ALTER TABLE ONLY public.universal_veil_pileus
    ADD CONSTRAINT universal_veil_pileus_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_universal_veil_pileus_specimen_id;

ALTER TABLE ONLY public.universal_veil_stipe_base
    ADD CONSTRAINT universal_veil_stipe_base_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_universal_veil_stipe_base_specimen_id;

ALTER TABLE ONLY public.basidia
    ADD CONSTRAINT basidia_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_basidia_specimen_id;

ALTER TABLE ONLY public.basidiospore
    ADD CONSTRAINT basidiospore_pkey PRIMARY KEY (specimen_id);
DROP INDEX IF EXISTS public.idx_basidiospore_specimen_id;
