"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { computePSS, computeDASS } from "@/lib/scoring";

function pssSeverity(score: number): string {
  if (score <= 18) return "Bajo";
  if (score <= 36) return "Moderado";
  return "Alto";
}

function dassDepressionSeverity(score: number): string {
  if (score <= 4) return "Normal";
  if (score <= 6) return "Leve";
  if (score <= 10) return "Moderado";
  if (score <= 13) return "Grave";
  return "Muy grave";
}

function dassAnxietySeverity(score: number): string {
  if (score <= 3) return "Normal";
  if (score <= 5) return "Leve";
  if (score <= 7) return "Moderado";
  if (score <= 9) return "Grave";
  return "Muy grave";
}

function dassStressSeverity(score: number): string {
  if (score <= 7) return "Normal";
  if (score <= 9) return "Leve";
  if (score <= 12) return "Moderado";
  if (score <= 16) return "Grave";
  return "Muy grave";
}

export default function GraciasPage() {
  const [pssAnswers, setPssAnswers]   = useState<number[] | null>(null);
  const [dassAnswers, setDassAnswers] = useState<number[] | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [comment, setComment]         = useState("");
  const [commentStatus, setCommentStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    try {
      const p = sessionStorage.getItem("survey_pss");
      const d = sessionStorage.getItem("survey_dass");
      const pid = sessionStorage.getItem("survey_pid");
      if (p) setPssAnswers(JSON.parse(p));
      if (d) setDassAnswers(JSON.parse(d));
      if (pid) setParticipantId(pid);
    } catch {
      // sessionStorage not available — scores won't display
    }
  }, []);

  const pssScore   = pssAnswers  ? computePSS(pssAnswers)   : null;
  const dassScores = dassAnswers ? computeDASS(dassAnswers) : null;

  async function sendComment() {
    if (!comment.trim() || !participantId) return;
    setCommentStatus("sending");
    try {
      const res = await fetch("/api/survey/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, comment }),
      });
      setCommentStatus(res.ok ? "sent" : "error");
    } catch {
      setCommentStatus("error");
    }
  }

  return (
    <main className="page page-narrow animate-in thank-you">
      <div className="seal-mark">
        <span>E</span>
      </div>
      <span className="smallcaps smallcaps-muted">Estudio completado</span>
      <h1 className="display" style={{ fontSize: 36, marginTop: 16 }}>
        Muchas <em>gracias</em><br />por su participación.
      </h1>
      <p className="lede" style={{ marginTop: 16, fontSize: 16 }}>
        Sus respuestas se han registrado de forma <strong>anónima</strong> y segura. Su
        contribución es valiosa para el avance de la investigación sobre bienestar emocional.
      </p>

      <ul className="checklist">
        <li><span className="tick">✓</span> Sus respuestas se han guardado correctamente.</li>
        <li><span className="tick">✓</span> No se han recogido datos identificativos (nombre, correo, IP).</li>
        <li><span className="tick">✓</span> Los datos se utilizarán únicamente para investigación académica de la UNIR.</li>
      </ul>

      {pssScore !== null && dassScores && (
        <div className="card-flat" style={{ marginTop: 32 }}>
          <span className="smallcaps smallcaps-muted" style={{ display: "block", marginBottom: 12 }}>
            Sus puntuaciones · uso orientativo
          </span>

          <div className="scores-row">
            <span className="scores-label">Estrés percibido (PSS-14)</span>
            <span className="scores-value serif tnum">
              {pssScore} <span className="scores-max">/ 56</span>
            </span>
            <span className="scores-severity">{pssSeverity(pssScore)}</span>
          </div>
          <div className="scores-row">
            <span className="scores-label">
              <span className="subscale-bar depression" />
              Depresión (DASS-21)
            </span>
            <span className="scores-value serif tnum">
              {dassScores.depression} <span className="scores-max">/ 21</span>
            </span>
            <span className="scores-severity">{dassDepressionSeverity(dassScores.depression)}</span>
          </div>
          <div className="scores-row">
            <span className="scores-label">
              <span className="subscale-bar anxiety" />
              Ansiedad (DASS-21)
            </span>
            <span className="scores-value serif tnum">
              {dassScores.anxiety} <span className="scores-max">/ 21</span>
            </span>
            <span className="scores-severity">{dassAnxietySeverity(dassScores.anxiety)}</span>
          </div>
          <div className="scores-row">
            <span className="scores-label">
              <span className="subscale-bar stress" />
              Estrés (DASS-21)
            </span>
            <span className="scores-value serif tnum">
              {dassScores.stress} <span className="scores-max">/ 21</span>
            </span>
            <span className="scores-severity">{dassStressSeverity(dassScores.stress)}</span>
          </div>

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
            <p className="body-sm muted" style={{ fontStyle: "italic" }}>
              Estas puntuaciones tienen fines orientativos y <strong>no constituyen un
              diagnóstico</strong>. Si experimenta malestar emocional persistente, le
              recomendamos consultar a un profesional de la salud mental.
            </p>
          </div>

          {participantId && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
              {commentStatus === "sent" ? (
                <p className="body-sm" style={{ color: "var(--ink-2)" }}>
                  ✓ Su comentario ha sido registrado. Gracias.
                </p>
              ) : (
                <>
                  <label className="field-label" style={{ marginBottom: 8, display: "block" }}>
                    ¿Desea añadir algún comentario o consulta?
                    <span className="optional">(opcional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Sus comentarios aquí…"
                    maxLength={1000}
                    disabled={commentStatus === "sending"}
                    style={{ width: "100%" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 12 }}>
                    <span className="body-sm muted tnum">{comment.length}/1000</span>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={sendComment}
                      disabled={!comment.trim() || commentStatus === "sending"}
                    >
                      {commentStatus === "sending" ? "Enviando…" : "Enviar comentario"}
                    </button>
                  </div>
                  {commentStatus === "error" && (
                    <p className="field-error" style={{ marginTop: 8 }}>
                      Error al enviar. Puede contactarnos en{" "}
                      <a className="inline-link" href="mailto:ppd@unir.net">ppd@unir.net</a>.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      <p className="body-sm muted" style={{ marginTop: 32 }}>
        Si tiene alguna pregunta sobre el estudio, contacte al DPD de UNIR:{" "}
        <a className="inline-link" href="mailto:ppd@unir.net">ppd@unir.net</a>.
      </p>

      <div style={{ marginTop: 24 }}>
        <Link href="/" className="btn btn-ghost">← Volver al inicio</Link>
      </div>
    </main>
  );
}
