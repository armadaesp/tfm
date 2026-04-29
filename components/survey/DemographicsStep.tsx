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

function RadioGroup({ name, options, value, onChange }: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`option-radio text-left ${value === opt ? "option-radio-selected" : "option-radio-unselected"}`}
        >
          <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full border-2 mr-2 shrink-0 align-middle ${
            value === opt ? "border-primary bg-primary" : "border-surface-border"
          }`} />
          {opt}
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

  const set = (key: keyof DemographicsData) => (value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const isEmployed = EMPLOYED_STATUSES.includes(data.employmentStatus);

  const ageNum = parseInt(data.age, 10);
  const ageValid = !isNaN(ageNum) && ageNum >= 18 && ageNum <= 99;

  const canProceed =
    data.sex && ageValid && data.educationLevel && data.employmentStatus &&
    (!isEmployed || data.occupationalSector) &&
    (data.occupationalSector !== "Otro" || data.occupationalSectorOther.trim()) &&
    data.childrenUnder18 && data.dependents &&
    (data.dependents !== "Sí" || data.dependentCareFrequency) &&
    data.region;

  return (
    <div className="space-y-8">
      <div>
        <p className="section-label mb-1">Datos sociodemográficos</p>
        <h2 className="text-xl font-bold text-text-primary">Información sobre usted</h2>
        <p className="text-sm text-text-muted mt-1">
          Los campos marcados con <span className="text-accent">*</span> son obligatorios.
        </p>
      </div>

      {/* Sexo */}
      <div>
        <label className="form-label">1. Sexo <span className="text-accent">*</span></label>
        <RadioGroup name="sex" options={SEX_OPTIONS} value={data.sex} onChange={set("sex")} />
      </div>

      {/* Edad */}
      <div>
        <label className="form-label">2. Edad <span className="text-accent">*</span></label>
        <input
          type="number"
          min={18}
          max={99}
          placeholder="Introduce tu edad (18–99)"
          value={data.age}
          onChange={(e) => set("age")(e.target.value)}
          className="form-select max-w-xs"
        />
        {data.age && !ageValid && (
          <p className="mt-1 text-xs text-accent">La edad debe estar entre 18 y 99 años.</p>
        )}
      </div>

      {/* Nivel de estudios */}
      <div>
        <label className="form-label">3. Nivel de estudios <span className="text-accent">*</span></label>
        <RadioGroup name="education" options={EDUCATION_OPTIONS} value={data.educationLevel} onChange={set("educationLevel")} />
      </div>

      {/* Situación laboral */}
      <div>
        <label className="form-label">4. Situación laboral actual <span className="text-accent">*</span></label>
        <RadioGroup name="employment" options={EMPLOYMENT_OPTIONS} value={data.employmentStatus} onChange={set("employmentStatus")} />
      </div>

      {/* Sector (condicional) */}
      {isEmployed && (
        <div>
          <label className="form-label">5. Sector ocupacional <span className="text-accent">*</span></label>
          <select
            value={data.occupationalSector}
            onChange={(e) => set("occupationalSector")(e.target.value)}
            className="form-select"
          >
            <option value="">Selecciona un sector...</option>
            {SECTOR_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {data.occupationalSector === "Otro" && (
            <input
              type="text"
              placeholder="Especifica el sector"
              value={data.occupationalSectorOther}
              onChange={(e) => set("occupationalSectorOther")(e.target.value)}
              className="form-select mt-2"
            />
          )}
        </div>
      )}

      {/* Hijos menores */}
      <div>
        <label className="form-label">6. Hijos menores de 18 años en el hogar <span className="text-accent">*</span></label>
        <RadioGroup name="children" options={CHILDREN_OPTIONS} value={data.childrenUnder18} onChange={set("childrenUnder18")} />
      </div>

      {/* Personas dependientes */}
      <div>
        <label className="form-label">
          7. Personas dependientes a cargo (mayores, discapacidad, enfermedad crónica){" "}
          <span className="text-accent">*</span>
        </label>
        <RadioGroup name="dependents" options={DEPENDENTS_OPTIONS} value={data.dependents} onChange={set("dependents")} />
        {data.dependents === "Sí" && (
          <div className="mt-3 pl-4 border-l-2 border-primary/30">
            <label className="form-label">
              ¿Con qué frecuencia asume su cuidado? <span className="text-accent">*</span>
            </label>
            <RadioGroup
              name="careFreq"
              options={CARE_FREQUENCY_OPTIONS}
              value={data.dependentCareFrequency}
              onChange={set("dependentCareFrequency")}
            />
          </div>
        )}
      </div>

      {/* Comunidad autónoma */}
      <div>
        <label className="form-label">8. Comunidad autónoma de residencia <span className="text-accent">*</span></label>
        <select
          value={data.region}
          onChange={(e) => set("region")(e.target.value)}
          className="form-select"
        >
          <option value="">Selecciona una comunidad...</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <hr className="border-surface-border" />
      <p className="text-xs text-text-muted -mt-4">Las siguientes preguntas son opcionales.</p>

      {/* Estado civil (opcional) */}
      <div>
        <label className="form-label">9. Estado civil / situación de pareja <span className="text-text-muted font-normal">(opcional)</span></label>
        <RadioGroup name="marital" options={MARITAL_OPTIONS} value={data.maritalStatus} onChange={set("maritalStatus")} />
      </div>

      {/* Nº personas en el hogar (opcional) */}
      <div>
        <label className="form-label">10. Número de personas en el hogar <span className="text-text-muted font-normal">(opcional)</span></label>
        <RadioGroup name="household" options={HOUSEHOLD_OPTIONS} value={data.householdSize} onChange={set("householdSize")} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-outline">
          ← Volver
        </button>
        <button
          type="button"
          onClick={() => onNext(data)}
          disabled={!canProceed}
          className="btn-primary flex-1"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
