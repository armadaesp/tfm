import { getEnv } from "./cloudflare-env";

export function getDB(): D1Database {
  const env = getEnv();
  return env.TFM_DB;
}

/**
 * Ensure the survey_responses table exists.
 * Called once at startup (or on first request) — idempotent.
 */
export async function ensureSchema() {
  const db = getDB();

  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS survey_responses (
        id                       TEXT PRIMARY KEY,
        participant_id           TEXT NOT NULL,
        created_at               TEXT DEFAULT (datetime('now')),

        sex                      TEXT NOT NULL,
        age                      INTEGER NOT NULL,
        education_level          TEXT NOT NULL,
        employment_status        TEXT NOT NULL,
        occupational_sector      TEXT,
        children_under_18        TEXT NOT NULL,
        dependents               TEXT NOT NULL,
        dependent_care_frequency TEXT,
        region                   TEXT NOT NULL,

        marital_status           TEXT,
        household_size           TEXT,
        income_level             TEXT,

        pss_1  INTEGER, pss_2  INTEGER, pss_3  INTEGER, pss_4  INTEGER,
        pss_5  INTEGER, pss_6  INTEGER, pss_7  INTEGER, pss_8  INTEGER,
        pss_9  INTEGER, pss_10 INTEGER, pss_11 INTEGER, pss_12 INTEGER,
        pss_13 INTEGER, pss_14 INTEGER,
        pss_total INTEGER,

        dass_1  INTEGER, dass_2  INTEGER, dass_3  INTEGER, dass_4  INTEGER,
        dass_5  INTEGER, dass_6  INTEGER, dass_7  INTEGER, dass_8  INTEGER,
        dass_9  INTEGER, dass_10 INTEGER, dass_11 INTEGER, dass_12 INTEGER,
        dass_13 INTEGER, dass_14 INTEGER, dass_15 INTEGER, dass_16 INTEGER,
        dass_17 INTEGER, dass_18 INTEGER, dass_19 INTEGER, dass_20 INTEGER,
        dass_21 INTEGER,
        dass_depression INTEGER,
        dass_anxiety    INTEGER,
        dass_stress     INTEGER,

        comments TEXT
      )`,
    )
    .run();

  await db
    .prepare(
      `CREATE INDEX IF NOT EXISTS idx_survey_created_at
       ON survey_responses (created_at DESC)`,
    )
    .run();
}
