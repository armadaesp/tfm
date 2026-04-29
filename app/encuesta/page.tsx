"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConsentStep from "@/components/survey/ConsentStep";
import DemographicsStep, { DemographicsData } from "@/components/survey/DemographicsStep";
import PSS14Step from "@/components/survey/PSS14Step";
import DASS21Step from "@/components/survey/DASS21Step";
import CommentsStep from "@/components/survey/CommentsStep";

type Phase = "consent" | "demographics" | "pss14" | "dass21" | "comments" | "submitting";

const PHASE_ORDER: Phase[] = ["consent", "demographics", "pss14", "dass21", "comments"];

export default function EncuestaPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("consent");
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);
  const [treatment, setTreatment] = useState("");
  const [treatmentDescription, setTreatmentDescription] = useState("");
  const [pssAnswers, setPssAnswers] = useState<number[] | null>(null);
  const [dassAnswers, setDassAnswers] = useState<number[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

      // Store scores for the thank-you page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("survey_pss", JSON.stringify(pssAnswers));
        sessionStorage.setItem("survey_dass", JSON.stringify(dassAnswers));
      }

      router.push("/gracias");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Error desconocido");
      setPhase("comments");
      setIsSubmitting(false);
    }
  }

  if (phase === "submitting") {
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

  if (phase === "dass21") {
    return (
      <DASS21Step
        onNext={(answers) => { setDassAnswers(answers); setPhase("comments"); }}
        onBack={goBack}
      />
    );
  }

  return (
    <CommentsStep
      onNext={submitSurvey}
      onBack={goBack}
      isSubmitting={isSubmitting}
      submitError={submitError}
    />
  );
}
