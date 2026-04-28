"use client";

import { useState } from "react";

interface Props {
  onNext: (comments: string) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function CommentsStep({ onNext, onBack, isSubmitting }: Props) {
  const [comments, setComments] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <p className="section-label mb-1">Último paso</p>
        <h2 className="text-xl font-bold text-text-primary">Comentarios adicionales</h2>
        <p className="text-sm text-text-secondary mt-2">
          Si desea añadir algún comentario sobre su experiencia con la encuesta o el estudio,
          puede hacerlo a continuación. Este campo es completamente opcional.
        </p>
      </div>

      <div>
        <label className="form-label">
          ¿Desea añadir algún comentario? <span className="text-text-muted font-normal">(opcional)</span>
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={5}
          placeholder="Sus comentarios aquí..."
          className="form-select resize-none"
          maxLength={1000}
        />
        <p className="text-xs text-text-muted mt-1 text-right">
          {comments.length}/1000 caracteres
        </p>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} disabled={isSubmitting} className="btn-outline">
          ← Volver
        </button>
        <button
          type="button"
          onClick={() => onNext(comments)}
          disabled={isSubmitting}
          className="btn-primary flex-1"
        >
          {isSubmitting ? "Enviando..." : "Enviar respuestas →"}
        </button>
      </div>

      <p className="text-xs text-text-muted text-center">
        Sus respuestas son anónimas y se utilizarán exclusivamente para fines de investigación académica.
      </p>
    </div>
  );
}
