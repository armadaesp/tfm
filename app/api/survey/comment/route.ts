import { NextRequest, NextResponse } from "next/server";
import { getDB, ensureSchema } from "@/lib/db";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { participantId, comment } = (await request.json()) as {
      participantId?: string;
      comment?: string;
    };

    if (!participantId || typeof participantId !== "string") {
      return NextResponse.json({ error: "participantId requerido" }, { status: 400 });
    }

    const text = typeof comment === "string" ? comment.trim() : "";

    await ensureSchema();
    const db = getDB();

    const result = await db
      .prepare(`UPDATE survey_responses SET comments = ? WHERE participant_id = ?`)
      .bind(text || null, participantId)
      .run();

    if (!result.meta?.changes) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Comment API error:", e);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
