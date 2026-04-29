"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConsentStep from "@/components/survey/ConsentStep";
import DemographicsStep, { DemographicsData } from "@/components/survey/DemographicsStep";
import PSS14Step from "@/components/survey/PSS14Step";
import DASS21Step from "@/components/survey/DASS21Step";

type Phase = "consent" | "demographics" | "pss14" | "dass21" | "submitting";

const PHASE_ORDER: Phase[] = ["consent", "demographics", "pss14", "dass21"];

export default function EncuestaPage() {
  const router = useRouter();
  const [phase, setPhase]               = useState<Phase>("consent");
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);
  const [treatment, setTreatment]       = useState("");
  const [treatmentDescription, setTreatmentDescription] = useState("");
  const [pssAnswers, setPssAnswers]     = useState<number[] | null>(null);
  const [dassAnswers, setDassAnswers]   = useState<number[] | null>(null);
  const [submitError, setSubmitError]   = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  function goBack() {
    const idx = PHASE_ORDER.indexOf(phase);
    if (idx > 0) setPhase(PHASE_ORDER[idx - 1]);
  }

  async function submitSurvey(dass: number[]) {
    setPhase("submitting");
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
          dass,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const { participant_id } = await res.json() as { participant_id?: string };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("survey_pss", JSON.stringify(pssAnswers));
        sessionStorage.setItem("survey_dass", JSON.stringify(dass));
        if (participant_id) sessionStorage.setItem("survey_pid", participant_id);
      }

      router.push("/gracias");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Error desconocido");
    }
  }

  if (phase === "submitting") {
    if (submitError) {
      return (
        <main className="page animate-in" style={{ paddingTop: 60 }}>
          <div className="notice" style={{ marginBottom: 24 }}>
            Error al enviar las respuestas: {submitError}
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn-link" onClick={() => {
              setSubmitError(null);
              setPhase("dass21");
            }}>
              ← Volver al cuestionario
            </button>
            <button type="button" className="btn btn-accent" onClick={() => {
              if (dassAnswers) { setSubmitError(null); submitSurvey(dassAnswers); }
            }}>
              Reintentar →
            </button>
          </div>
        </main>
      );
    }
    return (
      <main className="page text-center animate-in" style={{ paddingTop: 80 }}>
        <div className="spinner" />
        <p className="lede" style={{ marginTop: 24, fontSize: 16 }}>
          Enviando sus respuestas de forma segura…
        </p>
      </main>
    );
  }

  if (phase === "consent") {
    return (
      <ConsentStep
        onNext={(data) => {
          setTreatment(data.treatment);
          setTreatmentDescription(data.treatmentDescription);
          setPhase("demographics");
        }}
      />
    );
  }

  if (phase === "demographics") {
    return (
      <DemographicsStep
        onNext={(data) => { setDemographics(data); setPhase("pss14"); }}
        onBack={goBack}
      />
    );
  }

  if (phase === "pss14") {
    return (
      <PSS14Step
        onNext={(answers) => { setPssAnswers(answers); setPhase("dass21"); }}
        onBack={goBack}
      />
    );
  }

  return (
    <DASS21Step
      onNext={(answers) => {
        setDassAnswers(answers);
        submitSurvey(answers);
      }}
      onBack={goBack}
    />
  );
}
