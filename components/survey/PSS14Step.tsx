"use client";

import { useState } from "react";
import { PSS_ITEMS, PSS_LABELS } from "@/lib/survey-data";
import LikertItem from "./LikertItem";

interface Props {
  onNext: (answers: number[]) => void;
  onBack: () => void;
}

export default function PSS14Step({ onNext, onBack }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(PSS_ITEMS.length).fill(null)
  );
  const [attempted, setAttempted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const unansweredCount = answers.filter((a) => a === null).length;

  function setAnswer(idx: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  function handleNext() {
    if (!allAnswered) {
      setAttempted(true);
      return;
    }
    onNext(answers as number[]);
  }

  const visibleItems = attempted && !allAnswered
    ? PSS_ITEMS.filter((_, idx) => answers[idx] === null)
    : PSS_ITEMS;

  const colTemplate = `3fr repeat(${PSS_LABELS.length}, minmax(32px, 48px))`;

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label mb-1">Sección A · PSS-14</p>
        <h2 className="text-xl font-bold text-text-primary">Escala de Estrés Percibido</h2>
        <p className="text-sm text-text-secondary mt-2">
          Las preguntas en esta escala hacen referencia a sus sentimientos y pensamientos durante el{" "}
          <strong>último mes</strong>. Para cada pregunta, indique con qué frecuencia se ha sentido
          de esa manera.
        </p>
      </div>

      {/* Mobile: static legend */}
      <div className="sm:hidden card bg-blue-50 border-primary/20 text-xs text-text-secondary">
        <div className="flex flex-col gap-1">
          {PSS_LABELS.map((l, i) => (
            <span key={i}><strong>{i}</strong> = {l}</span>
          ))}
        </div>
      </div>

      {/* Desktop: sticky header row */}
      <div
        className="hidden sm:grid sticky top-16 z-20 bg-white border-b border-t border-surface-border py-2 -mx-4 sm:-mx-6 px-4 sm:px-6"
        style={{ gridTemplateColumns: colTemplate }}
      >
        <div className="text-xs text-text-muted font-medium">Afirmación</div>
        {PSS_LABELS.map((l, i) => (
          <div key={i} className="text-center text-xs text-text-muted font-medium leading-tight px-0.5">{l}</div>
        ))}
      </div>

      {/* Unanswered warning */}
      {attempted && !allAnswered && (
        <p className="text-sm text-accent font-medium">
          Faltan {unansweredCount} {unansweredCount === 1 ? "pregunta" : "preguntas"} por responder:
        </p>
      )}

      <div>
        {visibleItems.map((item) => {
          const idx = PSS_ITEMS.indexOf(item);
          return (
            <LikertItem
              key={item.id}
              questionNumber={item.id}
              text={item.text}
              labels={PSS_LABELS}
              value={answers[idx]}
              onChange={(v) => setAnswer(idx, v)}
            />
          );
        })}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-outline">
          ← Volver
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-primary flex-1"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
