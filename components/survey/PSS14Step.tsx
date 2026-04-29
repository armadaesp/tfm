"use client";

import { useState } from "react";
import { PSS_ITEMS, PSS_LABELS } from "@/lib/survey-data";

interface Props {
  onNext: (answers: number[]) => void;
  onBack: () => void;
}

export default function PSS14Step({ onNext, onBack }: Props) {
  const items = PSS_ITEMS;
  const labels = PSS_LABELS;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(items.length).fill(null));
  const [cursor, setCursor] = useState(0);
  const [showError, setShowError] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const answeredCount = answers.filter((a) => a !== null).length;
  const innerPercent = (answeredCount / items.length) * 100;
  const totalPercent = Math.round(40 + innerPercent * 0.2);

  function set(idx: number, val: number) {
    const newAnswers = [...answers];
    newAnswers[idx] = val;
    setAnswers(newAnswers);

    if (idx === cursor) {
      if (cursor < items.length - 1) {
        setTimeout(() => setCursor(cursor + 1), 280);
      } else {
        const allNow = newAnswers.every((a) => a !== null);
        if (allNow) {
          setTimeout(() => onNext(newAnswers as number[]), 280);
        }
      }
    }
  }

  function handleContinue() {
    if (!allAnswered) {
      setShowError(true);
      const firstUnanswered = answers.findIndex((a) => a === null);
      if (firstUnanswered >= 0) setCursor(firstUnanswered);
      return;
    }
    onNext(answers as number[]);
  }

  const currentItem = items[cursor];

  return (
    <main className="page animate-in">
      {/* Progress header */}
      <div>
        <div className="stepper">
          {["Consentimiento", "Datos", "PSS-14", "DASS-21", "Comentarios"].map((label, i) => {
            const n = i + 1;
            const state = n < 3 ? "is-done" : n === 3 ? "is-active" : "";
            return (
              <span key={label}>
                <span className={`stepper-item ${state}`}>
                  <span className="stepper-num">{n < 3 ? "✓" : n}</span>
                  {n === 3 && <span>{label}</span>}
                </span>
                {i < 4 && <span className="stepper-sep">·</span>}
              </span>
            );
          })}
        </div>
        <div className="progress-wrap">
          <span className="progress-label">{`Estrés percibido · ${answeredCount}/${items.length}`}</span>
          <span className="progress-counter tnum">{totalPercent}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${totalPercent}%` }} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <span className="smallcaps smallcaps-muted">Sección II · PSS-14</span>
        <h2 className="section-title serif" style={{ marginTop: 8, fontSize: 28 }}>
          Escala de Estrés Percibido
        </h2>
        <p className="body" style={{ marginTop: 8, maxWidth: 580 }}>
          Las preguntas se refieren a sus sentimientos y pensamientos durante el{" "}
          <strong>último mes</strong>. Para cada una, indique con qué frecuencia se ha sentido de
          esa manera.
        </p>
      </div>

      {/* Likert card */}
      <div className="q-card animate-in" key={cursor}>
        <div className="q-card-header">
          <span className="q-card-section">PSS-14</span>
          <span className="q-card-num">
            Pregunta {cursor + 1}{" "}
            <span style={{ opacity: 0.6 }}>de</span> {items.length}
          </span>
        </div>
        <p className="q-card-text">{currentItem.text}</p>
        <div className="q-options">
          {labels.map((label, i) => (
            <button
              key={i}
              type="button"
              className={`q-option${answers[cursor] === i ? " is-selected" : ""}`}
              onClick={() => set(cursor, i)}
            >
              <span className="q-option-num">{i}</span>
              <span className="q-option-label">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="q-nav" style={{ marginTop: 16 }}>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => cursor > 0 ? setCursor(cursor - 1) : onBack()}
        >
          ← {cursor > 0 ? "Anterior" : "Volver"}
        </button>
        <div className="q-nav-dots">
          {items.map((_, i) => (
            <span
              key={i}
              onClick={() => setCursor(i)}
              className={`q-dot${i === cursor ? " is-current" : ""}${answers[i] !== null ? " is-answered" : ""}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => cursor < items.length - 1 ? setCursor(cursor + 1) : undefined}
          disabled={cursor === items.length - 1}
        >
          Siguiente →
        </button>
      </div>

      {showError && !allAnswered && (
        <div className="notice" style={{ marginTop: 16 }}>
          Faltan {items.length - answeredCount}{" "}
          {items.length - answeredCount === 1 ? "pregunta" : "preguntas"} por responder.
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <button
          type="button"
          className="btn btn-accent btn-block"
          onClick={handleContinue}
        >
          {allAnswered
            ? "Continuar a DASS-21 →"
            : `Responda las ${items.length - answeredCount} preguntas restantes`}
        </button>
      </div>
    </main>
  );
}
