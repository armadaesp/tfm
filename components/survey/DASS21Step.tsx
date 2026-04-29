"use client";

import { useState } from "react";
import { DASS_ITEMS, DASS_LABELS } from "@/lib/survey-data";

interface Props {
  onNext: (answers: number[]) => void;
  onBack: () => void;
}

export default function DASS21Step({ onNext, onBack }: Props) {
  const items = DASS_ITEMS;
  const labels = DASS_LABELS;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(items.length).fill(null));
  const [cursor, setCursor] = useState(0);
  const [showError, setShowError] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const answeredCount = answers.filter((a) => a !== null).length;
  const innerPercent = (answeredCount / items.length) * 100;
  const totalPercent = Math.round(62 + innerPercent * 0.2);

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

  const stepperHeader = (
    <div>
      <div className="stepper">
        {["Consentimiento", "Datos", "PSS-14", "DASS-21", "Comentarios"].map((label, i) => {
          const n = i + 1;
          const state = n < 4 ? "is-done" : n === 4 ? "is-active" : "";
          return (
            <span key={label}>
              <span className={`stepper-item ${state}`}>
                <span className="stepper-num">{n < 4 ? "✓" : n}</span>
                {n === 4 && <span>{label}</span>}
              </span>
              {i < 4 && <span className="stepper-sep">·</span>}
            </span>
          );
        })}
      </div>
      <div className="progress-wrap">
        <span className="progress-label">Estado emocional · DASS-21</span>
        <span className="progress-counter tnum">{totalPercent}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${totalPercent}%` }} />
      </div>
    </div>
  );

  // Intro screen
  if (!introDismissed) {
    return (
      <main className="page animate-in">
        {stepperHeader}
        <div style={{ marginTop: 24 }}>
          <span className="smallcaps smallcaps-muted">Sección III · DASS-21</span>
          <h2 className="section-title serif" style={{ marginTop: 8, fontSize: 28 }}>
            Estado emocional<br />
            <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>la última semana</em>
          </h2>
          <p className="body" style={{ marginTop: 12, maxWidth: 580 }}>
            Lea cada afirmación e indique cuánto le fue aplicable durante la{" "}
            <strong>semana pasada</strong>. La escala mide tres dimensiones del estado emocional:
          </p>

          <div className="subscale-legend">
            <div className="subscale-row">
              <span className="subscale-bar depression" />
              <span className="subscale-name">Depresión</span>
              <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
                Anhedonia, desmotivación, desesperanza
              </span>
            </div>
            <div className="subscale-row">
              <span className="subscale-bar anxiety" />
              <span className="subscale-name">Ansiedad</span>
              <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
                Síntomas físicos, miedo, pánico
              </span>
            </div>
            <div className="subscale-row">
              <span className="subscale-bar stress" />
              <span className="subscale-name">Estrés</span>
              <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
                Tensión, irritabilidad, agitación
              </span>
            </div>
          </div>

          <p className="body-sm muted" style={{ fontStyle: "italic" }}>
            21 preguntas · aproximadamente 3 minutos.
          </p>

          <div className="btn-row" style={{ marginTop: 32 }}>
            <button type="button" className="btn btn-link" onClick={onBack}>
              ← Volver a PSS-14
            </button>
            <button
              type="button"
              className="btn btn-accent flex-1"
              onClick={() => setIntroDismissed(true)}
            >
              Comenzar DASS-21 →
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentItem = items[cursor];
  const accentClass = currentItem.subscale;

  return (
    <main className="page animate-in">
      {stepperHeader}

      <div style={{ marginTop: 24 }}>
        <span className="smallcaps smallcaps-muted">Sección III · DASS-21</span>
        <h2 className="section-title serif" style={{ marginTop: 8, fontSize: 28 }}>
          Estado emocional
        </h2>
        <p className="body" style={{ marginTop: 8, maxWidth: 580 }}>
          Indique cuánto le fue aplicable cada afirmación durante la{" "}
          <strong>semana pasada</strong>.
        </p>
      </div>

      {/* Likert card */}
      <div className="q-card animate-in" key={cursor}>
        <div className="q-card-header">
          <span className="q-card-section">
            DASS-21 ·{" "}
            {accentClass === "depression"
              ? "Depresión"
              : accentClass === "anxiety"
              ? "Ansiedad"
              : "Estrés"}
          </span>
          <span className="q-card-num">
            Pregunta {cursor + 1}{" "}
            <span style={{ opacity: 0.6 }}>de</span> {items.length}
          </span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span className={`q-accent q-accent-${accentClass}`} />
          <div style={{ flex: 1 }}>
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
        </div>
      </div>

      {/* Navigation */}
      <div className="q-nav" style={{ marginTop: 16 }}>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => cursor > 0 ? setCursor(cursor - 1) : setIntroDismissed(false)}
        >
          ← {cursor > 0 ? "Anterior" : "Intro"}
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
            ? "Finalizar encuesta →"
            : `Responda las ${items.length - answeredCount} preguntas restantes`}
        </button>
      </div>
    </main>
  );
}
