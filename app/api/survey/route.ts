import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getDB, ensureSchema } from "@/lib/db";
import { computePSS, computeDASS } from "@/lib/scoring";
import type { DemographicsData } from "@/components/survey/DemographicsStep";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      demographics: DemographicsData;
      pss: number[];
      dass: number[];
      comments?: string;
    };

    const { demographics, pss, dass, comments } = body;

    // Basic validation
    if (!demographics || !Array.isArray(pss) || pss.length !== 14) {
      return NextResponse.json({ error: "Datos PSS-14 incompletos" }, { status: 400 });
    }
    if (!Array.isArray(dass) || dass.length !== 21) {
      return NextResponse.json({ error: "Datos DASS-21 incompletos" }, { status: 400 });
    }

    // Scores computed server-side — never trust client
    const pssTotal = computePSS(pss);
    const { depression, anxiety, stress } = computeDASS(dass);

    await ensureSchema();
    const db = await getDB();

    const id            = uuidv4();
    const participantId = uuidv4();

    await db
      .prepare(
        `INSERT INTO survey_responses (
          id, participant_id,
          sex, age, education_level, employment_status, occupational_sector,
          children_under_18, dependents, dependent_care_frequency, region,
          marital_status, household_size, income_level,
          pss_1, pss_2, pss_3, pss_4, pss_5, pss_6, pss_7,
          pss_8, pss_9, pss_10, pss_11, pss_12, pss_13, pss_14, pss_total,
          dass_1, dass_2, dass_3, dass_4, dass_5, dass_6, dass_7,
          dass_8, dass_9, dass_10, dass_11, dass_12, dass_13, dass_14,
          dass_15, dass_16, dass_17, dass_18, dass_19, dass_20, dass_21,
          dass_depression, dass_anxiety, dass_stress,
          comments
        ) VALUES (
          ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?,
          ?
        )`,
      )
      .bind(
        id, participantId,
        demographics.sex,
        parseInt(demographics.age, 10),
        demographics.educationLevel,
        demographics.employmentStatus,
        demographics.occupationalSector || null,
        demographics.childrenUnder18,
        demographics.dependents,
        demographics.dependentCareFrequency || null,
        demographics.region,
        demographics.maritalStatus  || null,
        demographics.householdSize  || null,
        demographics.incomeLevel    || null,
        // PSS-14
        pss[0],  pss[1],  pss[2],  pss[3],  pss[4],  pss[5],  pss[6],
        pss[7],  pss[8],  pss[9],  pss[10], pss[11], pss[12], pss[13],
        pssTotal,
        // DASS-21
        dass[0],  dass[1],  dass[2],  dass[3],  dass[4],  dass[5],  dass[6],
        dass[7],  dass[8],  dass[9],  dass[10], dass[11], dass[12], dass[13],
        dass[14], dass[15], dass[16], dass[17], dass[18], dass[19], dass[20],
        depression, anxiety, stress,
        comments?.trim() || null,
      )
      .run();

    return NextResponse.json({ participant_id: participantId });
  } catch (e) {
    console.error("Survey API error:", e);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
