"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ConsentStep from "@/components/survey/ConsentStep";
import DemographicsStep, { DemographicsData } from "@/components/survey/DemographicsStep";
import PSS14Step from "@/components/survey/PSS14Step";
import DASS21Step from "@/components/survey/DASS21Step";
import CommentsStep from "@/components/survey/CommentsStep";

type Phase = "consent" | "demographics" | "pss14" | "dass21" | "comments" | "submitting";

const PHASE_ORDER: Phase[] = ["consent", "demographics", "pss14", "dass21", "comments"];
const PHASE_LABELS: Record<Phase, string> = {
  consent:      "Consentimiento",
  demographics: "Datos personales",
  pss14:        "Estrés percibido",
  dass21:       "Estado emocional",
  comments:     "Comentarios",
  submitting:   "Enviando...",
};

export default function EncuestaPage() {
  const router = useRouter();
  const [phase, setPhase]               = useState<Phase>("consent");
  const [demographics, setDemographics]               = useState<DemographicsData | null>(null);
  const [treatment, setTreatment]                     = useState<string>("");
  const [treatmentDescription, setTreatmentDescription] = useState<string>("");
  const [pssAnswers, setPssAnswers]                   = useState<number[] | null>(null);
  const [dassAnswers, setDassAnswers]                 = useState<number[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);

  const stepIndex = PHASE_ORDER.indexOf(phase) + 1;

  function goBack() {
    const idx = PHASE_ORDER.indexOf(phase);
    if (idx > 0) setPhase(PHASE_ORDER[idx - 1]);
  }

  async function submitSurvey(comments: string) {
    setPhase("submitting");
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demographics,
          treatment,
          treatmentDescription,
          pss: pssAnswers,
          dass: dassAnswers,
          comments,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      router.push("/gracias");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Error desconocido");
      setPhase("comments");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {stepIndex > 0 && phase !== "submitting" && (
        <div className="mb-8">
          <ProgressBar
            current={stepIndex}
            total={PHASE_ORDER.length}
            label={PHASE_LABELS[phase]}
          />
        </div>
      )}

      {phase === "consent" && (
        <ConsentStep onNext={(data) => {
          setTreatment(data.treatment);
          setTreatmentDescription(data.treatmentDescription);
          setPhase("demographics");
        }} />
      )}

      {phase === "demographics" && (
        <DemographicsStep
          onNext={(data) => { setDemographics(data); setPhase("pss14"); }}
          onBack={goBack}
        />
      )}

      {phase === "pss14" && (
        <PSS14Step
          onNext={(answers) => { setPssAnswers(answers); setPhase("dass21"); }}
          onBack={goBack}
        />
      )}

      {phase === "dass21" && (
        <DASS21Step
          onNext={(answers) => { setDassAnswers(answers); setPhase("comments"); }}
          onBack={goBack}
        />
      )}

      {phase === "comments" && (
        <>
          {submitError && (
            <div className="mb-4 p-4 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
              Error al enviar: {submitError}. Por favor, inténtelo de nuevo.
            </div>
          )}
          <CommentsStep
            onNext={submitSurvey}
            onBack={goBack}
            isSubmitting={isSubmitting}
          />
        </>
      )}

      {phase === "submitting" && (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-text-secondary">Enviando sus respuestas de forma segura...</p>
        </div>
      )}
    </main>
  );
}
