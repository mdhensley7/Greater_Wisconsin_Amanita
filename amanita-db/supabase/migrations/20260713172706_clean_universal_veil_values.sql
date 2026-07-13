--
-- Data cleanup for the universal veil tables, mirroring the fixes already
-- applied to raw_csv/universal_veil_stipe_base_clean.csv and
-- raw_csv/universal_veil_pileus_clean.csv.
--
-- Safe to re-run: each WHERE clause only matches the messy source value,
-- so running this against already-clean data is a no-op.
--

-- toughorflimsy: canonicalize typo + compound variants down to "tough"
-- (expected: 4 rows -- 1 "tough.", 2 "tough thick", 1 "thick")
UPDATE public.universal_veil_stipe_base
SET toughorflimsy = 'tough'
WHERE toughorflimsy IN ('tough.', 'tough thick', 'thick');

-- attachment: "removable" and "easily removed" are the same concept
-- recorded two ways (expected: 4 rows)
UPDATE public.universal_veil_pileus
SET attachment = 'easily removed'
WHERE attachment = 'removable';
