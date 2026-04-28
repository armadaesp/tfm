"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  onNext: (data: { treatment: string }) => void;
}

export default function ConsentStep({ onNext }: Props) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [treatment, setTreatment] = useState<string>("");
  const [showExcluded, setShowExcluded] = useState(false);

  function handleSubmit() {
    if (treatment === "Sí") {
      setShowExcluded(true);
      return;
    }
    onNext({ treatment });
  }

  if (showExcluded) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-4">🙏</div>
        <h2 className="text-xl font-bold text-text-primary mb-3">Gracias por tu interés</h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Este estudio está dirigido a población general que no esté recibiendo actualmente
          tratamiento psicológico o psiquiátrico. Agradecemos tu tiempo y participación.
        </p>
      </div>
    );
  }

  const canProceed = ageConfirmed && dataConsent && treatment === "No";

  return (
    <div className="space-y-6">
      {/* Study header */}
      <div>
        <p className="section-label mb-2">Estudio de investigación · UNIR 2026</p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Estrés percibido y bienestar emocional en población adulta española
        </h1>
        <p className="text-text-secondary text-sm">
          Tiempo estimado de cumplimentación: <strong>8–10 minutos</strong>
        </p>
      </div>

      {/* Study info */}
      <div className="card space-y-4 text-sm text-text-secondary">
        <div>
          <h3 className="font-semibold text-text-primary mb-1">Propósito del estudio</h3>
          <p>
            Analizar la relación entre el estrés percibido y la sintomatología emocional (depresión,
            ansiedad y estrés) en población adulta no clínica, examinando el papel modulador de
            variables sociodemográficas y laborales.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-1">Participación y anonimato</h3>
          <p>
            Su participación es completamente voluntaria y anónima. No se recogen datos identificativos
            (nombre, correo ni dirección IP). Puede retirarse en cualquier momento sin ninguna
            consecuencia.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-1">Tratamiento de datos</h3>
          <p>
            UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A. tratará sus datos con la finalidad de llevar
            a cabo un Trabajo de Fin de Estudios. Puede ejercer sus derechos en{" "}
            <a href="mailto:ppd@unir.net" className="text-primary underline">ppd@unir.net</a>.
            Más información en nuestra{" "}
            <Link href="/privacidad" className="text-primary underline" target="_blank">
              política de privacidad
            </Link>
            .
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-1">Investigador responsable</h3>
          <p>
            Daniel Lara Becerra · Universidad Internacional de La Rioja (UNIR) ·{" "}
            <a href="mailto:danituring@gmail.com" className="text-primary underline">
              danituring@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Consent checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={ageConfirmed}
            onChange={(e) => setAgeConfirmed(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-surface-border accent-primary shrink-0 cursor-pointer"
          />
          <span className="text-sm text-text-primary">
            Confirmo que tengo <strong>18 años o más</strong>.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={dataConsent}
            onChange={(e) => setDataConsent(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-surface-border accent-primary shrink-0 cursor-pointer"
          />
          <span className="text-sm text-text-primary">
            He leído la información del estudio y consiento el tratamiento de mis datos con fines
            de investigación académica.
          </span>
        </label>
      </div>

      {/* Exclusion filter */}
      <div className="card">
        <p className="text-sm font-semibold text-text-primary mb-3">
          ¿Está recibiendo actualmente tratamiento psicológico o psiquiátrico?{" "}
          <span className="text-accent">*</span>
        </p>
        <div className="flex gap-3">
          {["No", "Sí"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTreatment(opt)}
              className={`option-radio flex-1 text-center ${
                treatment === opt ? "option-radio-selected" : "option-radio-unselected"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {treatment === "Sí" && (
          <p className="mt-2 text-xs text-text-muted">
            Este estudio está dirigido a población general no clínica. Si participas en este
            tratamiento no podrás continuar, pero te agradecemos tu interés.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canProceed}
        className="btn-primary w-full"
      >
        Comenzar encuesta →
      </button>
    </div>
  );
}
