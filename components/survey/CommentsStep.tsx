"use client";

import { useState } from "react";

interface Props {
  onNext: (comments: string) => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError?: string | null;
}

export default function CommentsStep({ onNext, onBack, isSubmitting, submitError }: Props) {
  const [comments, setComments] = useState("");

  return (
    <main className="page animate-in">
      {/* Progress header */}
      <div>
        <div className="stepper">
          {["Consentimiento", "Datos", "PSS-14", "DASS-21", "Comentarios"].map((label, i) => {
            const n = i + 1;
            const state = n < 5 ? "is-done" : "is-active";
            return (
              <span key={label}>
                <span className={`stepper-item ${state}`}>
                  <span className="stepper-num">{n < 5 ? "✓" : n}</span>
                  {n === 5 && <span>{label}</span>}
                </span>
                {i < 4 && <span className="stepper-sep">·</span>}
              </span>
            );
          })}
        </div>
        <div className="progress-wrap">
          <span className="progress-label">Comentarios finales</span>
          <span className="progress-counter tnum">92%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: "92%" }} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <span className="smallcaps smallcaps-muted">Sección IV · Cierre</span>
        <h2 className="section-title serif" style={{ marginTop: 8, fontSize: 28 }}>
          Comentarios adicionales
        </h2>
        <p className="body" style={{ marginTop: 8 }}>
          Si desea añadir algún comentario sobre su experiencia con la encuesta o el estudio,
          puede hacerlo aquí. Este campo es completamente opcional.
        </p>
      </div>

      {submitError && (
        <div className="notice" style={{ marginTop: 20 }}>
          Error al enviar: {submitError}. Por favor, inténtelo de nuevo.
        </div>
      )}

      <div className="field" style={{ marginTop: 24 }}>
        <label className="field-label">
          ¿Desea añadir algún comentario?<span className="optional">(opcional)</span>
        </label>
        <textarea
          rows={6}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Sus comentarios aquí…"
          maxLength={1000}
        />
        <p className="field-helper tnum" style={{ textAlign: "right" }}>
          {comments.length}/1000 caracteres
        </p>
      </div>

      <div className="btn-row" style={{ marginTop: 24 }}>
        <button
          type="button"
          className="btn btn-link"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Volver
        </button>
        <button
          type="button"
          className="btn btn-accent flex-1"
          onClick={() => onNext(comments)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando…" : "Enviar respuestas →"}
        </button>
      </div>

      <p className="body-sm muted text-center" style={{ marginTop: 16 }}>
        Sus respuestas son anónimas y se utilizarán exclusivamente para investigación académica.
      </p>
    </main>
  );
}
