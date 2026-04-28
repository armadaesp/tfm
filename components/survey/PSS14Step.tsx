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

  const allAnswered = answers.every((a) => a !== null);

  function setAnswer(idx: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="section-label mb-1">Sección A · PSS-14</p>
        <h2 className="text-xl font-bold text-text-primary">Escala de Estrés Percibido</h2>
        <p className="text-sm text-text-secondary mt-2">
          Las preguntas en esta escala hacen referencia a sus sentimientos y pensamientos durante el{" "}
          <strong>último mes</strong>. Para cada pregunta, indique con qué frecuencia se ha sentido
          de esa manera.
        </p>
      </div>

      {/* Scale legend */}
      <div className="card bg-blue-50 border-primary/20 text-xs text-text-secondary">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {PSS_LABELS.map((l, i) => (
            <span key={i}><strong>{i}</strong> = {l}</span>
          ))}
        </div>
      </div>

      <div>
        {PSS_ITEMS.map((item, idx) => (
          <LikertItem
            key={item.id}
            questionNumber={item.id}
            text={item.text}
            labels={PSS_LABELS}
            value={answers[idx]}
            onChange={(v) => setAnswer(idx, v)}
            showLabels={idx === 0}
          />
        ))}
      </div>

      {!allAnswered && (
        <p className="text-xs text-accent">* Debe responder todas las preguntas para continuar.</p>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-outline">
          ← Volver
        </button>
        <button
          type="button"
          onClick={() => onNext(answers as number[])}
          disabled={!allAnswered}
          className="btn-primary flex-1"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
