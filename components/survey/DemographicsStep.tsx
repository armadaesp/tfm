"use client";

import { useState } from "react";
import {
  SEX_OPTIONS, EDUCATION_OPTIONS, EMPLOYMENT_OPTIONS, EMPLOYED_STATUSES,
  SECTOR_OPTIONS, CHILDREN_OPTIONS, DEPENDENTS_OPTIONS, CARE_FREQUENCY_OPTIONS,
  REGIONS, MARITAL_OPTIONS, HOUSEHOLD_OPTIONS,
} from "@/lib/survey-data";

export interface DemographicsData {
  sex: string;
  age: string;
  educationLevel: string;
  employmentStatus: string;
  occupationalSector: string;
  occupationalSectorOther: string;
  childrenUnder18: string;
  dependents: string;
  dependentCareFrequency: string;
  region: string;
  maritalStatus: string;
  householdSize: string;
}

interface Props {
  onNext: (data: DemographicsData) => void;
  onBack: () => void;
}

function RadioGroup({
  options, value, onChange, twoCol,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  twoCol?: boolean;
}) {
  return (
    <div className={`radio-group${twoCol ? " radio-group-2col" : ""}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`radio-option${value === opt ? " is-selected" : ""}`}
          onClick={() => onChange(opt)}
        >
          <span className="radio-dot" />
          <span>{opt}</span>
        </button>
      ))}
    </div>
  );
}

export default function DemographicsStep({ onNext, onBack }: Props) {
  const [data, setData] = useState<DemographicsData>({
    sex: "", age: "", educationLevel: "", employmentStatus: "",
    occupationalSector: "", occupationalSectorOther: "", childrenUnder18: "",
    dependents: "", dependentCareFrequency: "", region: "",
    maritalStatus: "", householdSize: "",
  });
  const [errorMode, setErrorMode] = useState(false);

  const isEmployed = EMPLOYED_STATUSES.includes(data.employmentStatus);
  const ageNum = parseInt(data.age, 10);
  const ageValid = !isNaN(ageNum) && ageNum >= 18 && ageNum <= 99;

  function getMissingFields(d: DemographicsData, av: boolean): string[] {
    const employed = EMPLOYED_STATUSES.includes(d.employmentStatus);
    const missing: string[] = [];
    if (!d.sex) missing.push("sex");
    if (!d.age || !av) missing.push("age");
    if (!d.educationLevel) missing.push("educationLevel");
    if (!d.employmentStatus) missing.push("employmentStatus");
    if (employed && !d.occupationalSector) missing.push("occupationalSector");
    if (employed && d.occupationalSector === "Otro" && !d.occupationalSectorOther.trim()) missing.push("occupationalSectorOther");
    if (!d.childrenUnder18) missing.push("childrenUnder18");
    if (!d.dependents) missing.push("dependents");
    if (d.dependents === "Sí" && !d.dependentCareFrequency) missing.push("dependentCareFrequency");
    if (!d.region) missing.push("region");
    return missing;
  }

  const canProceed =
    data.sex && ageValid && data.educationLevel && data.employmentStatus &&
    (!isEmployed || data.occupationalSector) &&
    (data.occupationalSector !== "Otro" || data.occupationalSectorOther.trim()) &&
    data.childrenUnder18 && data.dependents &&
    (data.dependents !== "Sí" || data.dependentCareFrequency) &&
    data.region;

  const currentMissing = errorMode ? getMissingFields(data, ageValid) : [];

  const set = (key: keyof DemographicsData) => (value: string) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (errorMode) {
      const nextAgeNum = parseInt(next.age, 10);
      const nextAgeValid = !isNaN(nextAgeNum) && nextAgeNum >= 18 && nextAgeNum <= 99;
      if (getMissingFields(next, nextAgeValid).length === 0) onNext(next);
    }
  };

  function handleNext() {
    if (!canProceed) { setErrorMode(true); return; }
    onNext(data);
  }

  return (
    <main className="page animate-in">
      {/* Progress header */}
      <div>
        <div className="stepper">
          {["Consentimiento", "Datos", "PSS-14", "DASS-21", "Comentarios"].map((label, i) => {
            const n = i + 1;
            const state = n < 2 ? "is-done" : n === 2 ? "is-active" : "";
            return (
              <span key={label}>
                <span className={`stepper-item ${state}`}>
                  <span className="stepper-num">{n < 2 ? "✓" : n}</span>
                  {(n === 2) && <span>{label}</span>}
                </span>
                {i < 4 && <span className="stepper-sep">·</span>}
              </span>
            );
          })}
        </div>
        <div className="progress-wrap">
          <span className="progress-label">Datos sociodemográficos</span>
          <span className="progress-counter tnum">28%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: "28%" }} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <span className="smallcaps smallcaps-muted">Sección I · Sociodemografía</span>
        <h2 className="section-title serif" style={{ marginTop: 8, fontSize: 28 }}>
          Información sobre usted
        </h2>
        {!errorMode && (
          <p className="body" style={{ marginTop: 8 }}>
            Los campos marcados con <span style={{ color: "var(--accent)" }}>*</span> son
            obligatorios. Las últimas dos preguntas son opcionales.
          </p>
        )}
      </div>

      {errorMode && (
        <div className="notice" style={{ marginTop: 20 }}>
          Faltan {currentMissing.length} {currentMissing.length === 1 ? "campo obligatorio" : "campos obligatorios"}.
          Responda {currentMissing.length === 1 ? "la pregunta que aparece" : "las preguntas que aparecen"} a continuación para continuar.
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        {(!errorMode || currentMissing.includes("sex")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">1.</span>Sexo<span className="required">*</span>
            </label>
            <RadioGroup options={SEX_OPTIONS} value={data.sex} onChange={set("sex")} twoCol />
          </div>
        )}

        {(!errorMode || currentMissing.includes("age")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">2.</span>Edad<span className="required">*</span>
            </label>
            <input
              type="number"
              min={18}
              max={99}
              className="input-narrow"
              placeholder="18–99"
              value={data.age}
              onChange={(e) => set("age")(e.target.value)}
            />
            {data.age && !ageValid && (
              <p className="field-error">La edad debe estar entre 18 y 99 años.</p>
            )}
          </div>
        )}

        {(!errorMode || currentMissing.includes("educationLevel")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">3.</span>Nivel de estudios<span className="required">*</span>
            </label>
            <RadioGroup options={EDUCATION_OPTIONS} value={data.educationLevel} onChange={set("educationLevel")} />
          </div>
        )}

        {(!errorMode || currentMissing.includes("employmentStatus")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">4.</span>Situación laboral actual<span className="required">*</span>
            </label>
            <RadioGroup options={EMPLOYMENT_OPTIONS} value={data.employmentStatus} onChange={set("employmentStatus")} />
          </div>
        )}

        {isEmployed && (!errorMode || currentMissing.includes("occupationalSector") || currentMissing.includes("occupationalSectorOther")) && (
          <div className="field sub-field">
            <label className="field-label">
              <span className="field-num">5.</span>Sector ocupacional<span className="required">*</span>
            </label>
            <select
              value={data.occupationalSector}
              onChange={(e) => set("occupationalSector")(e.target.value)}
            >
              <option value="">Selecciona un sector…</option>
              {SECTOR_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {data.occupationalSector === "Otro" && (
              <input
                type="text"
                placeholder="Especifica el sector"
                style={{ marginTop: 8 }}
                value={data.occupationalSectorOther}
                onChange={(e) => set("occupationalSectorOther")(e.target.value)}
              />
            )}
          </div>
        )}

        {(!errorMode || currentMissing.includes("childrenUnder18")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">6.</span>Hijos menores de 18 años en el hogar
              <span className="required">*</span>
            </label>
            <RadioGroup options={CHILDREN_OPTIONS} value={data.childrenUnder18} onChange={set("childrenUnder18")} twoCol />
          </div>
        )}

        {(!errorMode || currentMissing.includes("dependents") || currentMissing.includes("dependentCareFrequency")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">7.</span>Personas dependientes a cargo
              <span className="optional">(mayores, discapacidad, enfermedad crónica)</span>
              <span className="required">*</span>
            </label>
            <RadioGroup options={DEPENDENTS_OPTIONS} value={data.dependents} onChange={set("dependents")} twoCol />
            {data.dependents === "Sí" && (
              <div className="sub-field">
                <label className="field-label">
                  ¿Con qué frecuencia asume su cuidado?<span className="required">*</span>
                </label>
                <RadioGroup
                  options={CARE_FREQUENCY_OPTIONS}
                  value={data.dependentCareFrequency}
                  onChange={set("dependentCareFrequency")}
                />
              </div>
            )}
          </div>
        )}

        {(!errorMode || currentMissing.includes("region")) && (
          <div className="field">
            <label className="field-label">
              <span className="field-num">8.</span>Comunidad autónoma de residencia
              <span className="required">*</span>
            </label>
            <select
              value={data.region}
              onChange={(e) => set("region")(e.target.value)}
            >
              <option value="">Selecciona una comunidad…</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {!errorMode && (
          <>
            <hr className="divider" />
            <p className="body-sm muted" style={{ marginTop: -16, marginBottom: 16, fontStyle: "italic" }}>
              Las siguientes preguntas son opcionales.
            </p>

            <div className="field">
              <label className="field-label">
                <span className="field-num">9.</span>Estado civil / situación de pareja
                <span className="optional">(opcional)</span>
              </label>
              <RadioGroup options={MARITAL_OPTIONS} value={data.maritalStatus} onChange={set("maritalStatus")} />
            </div>

            <div className="field">
              <label className="field-label">
                <span className="field-num">10.</span>Número de personas en el hogar
                <span className="optional">(opcional)</span>
              </label>
              <RadioGroup options={HOUSEHOLD_OPTIONS} value={data.householdSize} onChange={set("householdSize")} twoCol />
            </div>
          </>
        )}
      </div>

      <div className="btn-row" style={{ marginTop: 32 }}>
        <button type="button" className="btn btn-link" onClick={onBack}>← Volver</button>
        <button type="button" className="btn btn-accent flex-1" onClick={handleNext}>
          Continuar a PSS-14 →
        </button>
      </div>
    </main>
  );
}
