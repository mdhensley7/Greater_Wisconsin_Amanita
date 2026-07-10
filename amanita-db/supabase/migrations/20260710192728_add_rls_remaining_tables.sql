--
-- Row level security: public (anon) read-only access.
--
-- Brings the original 9 tables in line with basidia/basidiospore, which
-- already had this policy applied. The Search tool only ever SELECTs,
-- so no other operation is granted to anon/authenticated on any table.
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
