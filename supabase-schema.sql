-- Run this in: Supabase Dashboard → SQL Editor
-- Creates the survey_responses table with RLS (insert-only for anonymous users)

CREATE TABLE IF NOT EXISTS survey_responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id  UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),

  -- Sociodemographics (required)
  sex                       TEXT NOT NULL,
  age                       INTEGER NOT NULL,
  education_level           TEXT NOT NULL,
  employment_status         TEXT NOT NULL,
  occupational_sector       TEXT,
  children_under_18         TEXT NOT NULL,
  dependents                TEXT NOT NULL,
  dependent_care_frequency  TEXT,
  region                    TEXT NOT NULL,

  -- Sociodemographics (optional)
  marital_status  TEXT,
  household_size  TEXT,
  income_level    TEXT,

  -- PSS-14 raw items (0–4)
  pss_1  SMALLINT, pss_2  SMALLINT, pss_3  SMALLINT, pss_4  SMALLINT,
  pss_5  SMALLINT, pss_6  SMALLINT, pss_7  SMALLINT, pss_8  SMALLINT,
  pss_9  SMALLINT, pss_10 SMALLINT, pss_11 SMALLINT, pss_12 SMALLINT,
  pss_13 SMALLINT, pss_14 SMALLINT,
  pss_total SMALLINT,

  -- DASS-21 raw items (0–3)
  dass_1  SMALLINT, dass_2  SMALLINT, dass_3  SMALLINT, dass_4  SMALLINT,
  dass_5  SMALLINT, dass_6  SMALLINT, dass_7  SMALLINT, dass_8  SMALLINT,
  dass_9  SMALLINT, dass_10 SMALLINT, dass_11 SMALLINT, dass_12 SMALLINT,
  dass_13 SMALLINT, dass_14 SMALLINT, dass_15 SMALLINT, dass_16 SMALLINT,
  dass_17 SMALLINT, dass_18 SMALLINT, dass_19 SMALLINT, dass_20 SMALLINT,
  dass_21 SMALLINT,
  dass_depression SMALLINT,
  dass_anxiety    SMALLINT,
  dass_stress     SMALLINT,

  comments TEXT
);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT only (no SELECT, UPDATE, DELETE)
CREATE POLICY "anon_insert_only"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- The service_role key bypasses RLS — use it in the API route for inserts,
-- or add a separate policy for your researcher role if you want SELECT access.

-- Optional: index for time-based queries / CSV exports
CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_responses (created_at DESC);
