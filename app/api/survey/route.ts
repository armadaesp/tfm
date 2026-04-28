import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getSupabaseAdmin } from "@/lib/supabase";
import { computePSS, computeDASS } from "@/lib/scoring";
import type { DemographicsData } from "@/components/survey/DemographicsStep";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
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

    // Compute scores server-side (never trust client-supplied scores)
    const pssTotal = computePSS(pss);
    const { depression, anxiety, stress } = computeDASS(dass);

    const participantId = uuidv4();

    const record = {
      participant_id: participantId,

      // Demographics
      sex:                       demographics.sex,
      age:                       parseInt(demographics.age, 10),
      education_level:           demographics.educationLevel,
      employment_status:         demographics.employmentStatus,
      occupational_sector:       demographics.occupationalSector || null,
      children_under_18:         demographics.childrenUnder18,
      dependents:                demographics.dependents,
      dependent_care_frequency:  demographics.dependentCareFrequency || null,
      region:                    demographics.region,
      marital_status:            demographics.maritalStatus  || null,
      household_size:            demographics.householdSize  || null,
      income_level:              demographics.incomeLevel    || null,

      // PSS-14 raw + total
      pss_1: pss[0],  pss_2: pss[1],  pss_3: pss[2],  pss_4: pss[3],
      pss_5: pss[4],  pss_6: pss[5],  pss_7: pss[6],  pss_8: pss[7],
      pss_9: pss[8],  pss_10: pss[9], pss_11: pss[10], pss_12: pss[11],
      pss_13: pss[12], pss_14: pss[13],
      pss_total: pssTotal,

      // DASS-21 raw + subscale totals
      dass_1: dass[0],   dass_2: dass[1],   dass_3: dass[2],   dass_4: dass[3],
      dass_5: dass[4],   dass_6: dass[5],   dass_7: dass[6],   dass_8: dass[7],
      dass_9: dass[8],   dass_10: dass[9],  dass_11: dass[10], dass_12: dass[11],
      dass_13: dass[12], dass_14: dass[13], dass_15: dass[14], dass_16: dass[15],
      dass_17: dass[16], dass_18: dass[17], dass_19: dass[18], dass_20: dass[19],
      dass_21: dass[20],
      dass_depression: depression,
      dass_anxiety:    anxiety,
      dass_stress:     stress,

      comments: comments?.trim() || null,
    };

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("survey_responses").insert(record);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Error al guardar los datos" }, { status: 500 });
    }

    return NextResponse.json({ participant_id: participantId });
  } catch (e) {
    console.error("Survey API error:", e);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
