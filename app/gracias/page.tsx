"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { computePSS, computeDASS } from "@/lib/scoring";

export default function GraciasPage() {
  const [pssAnswers, setPssAnswers] = useState<number[] | null>(null);
  const [dassAnswers, setDassAnswers] = useState<number[] | null>(null);

  useEffect(() => {
    try {
      const p = sessionStorage.getItem("survey_pss");
      const d = sessionStorage.getItem("survey_dass");
      if (p) setPssAnswers(JSON.parse(p));
      if (d) setDassAnswers(JSON.parse(d));
    } catch {
      // sessionStorage not available or parse error — scores won't display
    }
  }, []);

  const pssScore = pssAnswers ? computePSS(pssAnswers) : null;
  const dassScores = dassAnswers ? computeDASS(dassAnswers) : null;

  return (
    <main className="page page-narrow animate-in thank-you">
      <div className="seal-mark">
        <span>E</span>
      </div>
      <span className="smallcaps smallcaps-muted">Estudio completado · Folio anónimo</span>
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
        <details className="scores-summary">
          <summary>Ver mis puntuaciones (uso orientativo, no diagnóstico)</summary>
          <div className="card-flat" style={{ marginTop: 12 }}>
            <div className="scores-row">
              <span className="scores-label">Estrés percibido (PSS-14)</span>
              <span className="scores-value serif tnum">
                {pssScore} <span className="scores-max">/ 56</span>
              </span>
            </div>
            <div className="scores-row">
              <span className="scores-label">
                <span className="subscale-bar depression" />
                Depresión (DASS-21)
              </span>
              <span className="scores-value serif tnum">
                {dassScores.depression} <span className="scores-max">/ 21</span>
              </span>
            </div>
            <div className="scores-row">
              <span className="scores-label">
                <span className="subscale-bar anxiety" />
                Ansiedad (DASS-21)
              </span>
              <span className="scores-value serif tnum">
                {dassScores.anxiety} <span className="scores-max">/ 21</span>
              </span>
            </div>
            <div className="scores-row">
              <span className="scores-label">
                <span className="subscale-bar stress" />
                Estrés (DASS-21)
              </span>
              <span className="scores-value serif tnum">
                {dassScores.stress} <span className="scores-max">/ 21</span>
              </span>
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--rule)" }}>
              <p className="body-sm muted" style={{ fontStyle: "italic" }}>
                Estas puntuaciones tienen fines orientativos y <strong>no constituyen un
                diagnóstico</strong>. Si experimenta malestar emocional persistente, le
                recomendamos consultar a un profesional de la salud mental.
              </p>
            </div>
          </div>
        </details>
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
