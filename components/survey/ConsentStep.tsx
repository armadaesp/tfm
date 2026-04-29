"use client";

import { useState, useRef } from "react";

interface Props {
  onNext: (data: { treatment: string; treatmentDescription: string }) => void;
}

const CONSENT_SECTIONS = [
  { letter: "a", title: "Instrucciones básicas", body: "Antes de dar consentimiento para participar en este estudio, es importante leer y entender la siguiente explicación. Describe el objetivo, procedimientos, beneficios y riesgos del estudio, las alternativas disponibles, y el derecho a retirarse del estudio en cualquier momento. Si no se desea participar, esto no afectará a su tratamiento." },
  { letter: "b", title: "Propósito del estudio", body: "Analizar la relación entre el estrés percibido y la sintomatología emocional de depresión, ansiedad y estrés en población adulta no clínica, examinando el papel modulador de variables sociodemográficas y laborales." },
  { letter: "c", title: "Procedimiento y explicación", body: "Solicitamos la colaboración de adultos con edad igual o superior a 18 años pertenecientes a población general no clínica que hayan acudido al cuestionario online autoadministrado. Se realizará una visita en plataforma online (cuestionario web) durante el periodo establecido para la recogida de datos del estudio." },
  { letter: "d", title: "Riesgos y beneficios", body: "Los participantes no se beneficiarán directamente de este estudio, salvo la oportunidad de poder contribuir al avance científico. No existe riesgo alguno derivado de la participación, salvo la molestia ocasionada por el tiempo de cumplimentación." },
  { letter: "e", title: "Coste y compensación", body: "No existe ningún coste por participar. Tampoco recibirán compensación económica." },
  { letter: "f", title: "Participación voluntaria", body: "Su participación es completamente voluntaria, pudiendo retirarse en cualquier momento." },
  { letter: "g", title: "Protección de datos personales", body: "UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A. tratará sus datos de carácter personal con la finalidad de llevar a cabo el estudio de investigación. Los datos podrán publicarse de manera anonimizada. Puede ejercer los derechos reconocidos en los artículos 15 a 22 del Reglamento (UE) 2016/679 dirigiéndose a ppd@unir.net." },
];

export default function ConsentStep({ onNext }: Props) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [dataOk, setDataOk] = useState(false);
  const [treatment, setTreatment] = useState("");
  const [treatmentDescription, setTreatmentDescription] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setHasScrolled(true);
  }

  const canProceed = ageOk && dataOk && treatment !== "";

  return (
    <main className="page animate-in">
      {/* Progress header */}
      <div>
        <div className="stepper">
          {["Consentimiento", "Datos", "PSS-14", "DASS-21", "Comentarios"].map((label, i) => {
            const n = i + 1;
            const state = n === 1 ? "is-active" : "";
            return (
              <span key={label}>
                <span className={`stepper-item ${state}`}>
                  <span className="stepper-num">{n}</span>
                  {(n === 1) && <span>{label}</span>}
                </span>
                {i < 4 && <span className="stepper-sep">·</span>}
              </span>
            );
          })}
        </div>
        <div className="progress-wrap">
          <span className="progress-label">Consentimiento informado</span>
          <span className="progress-counter tnum">10%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: "10%" }} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <span className="smallcaps smallcaps-muted">Documento I · Hoja informativa</span>
        <h2 className="section-title serif" style={{ marginTop: 8, fontSize: 28 }}>
          Información sobre el estudio<br />y consentimiento informado
        </h2>
        <p className="body" style={{ marginTop: 10 }}>
          Lea el documento completo. Sus respuestas se almacenan de forma <strong>anónima</strong>.
        </p>
      </div>

      <div className="scroll-doc-wrap" style={{ marginTop: 20 }}>
        <div className="scroll-doc" ref={scrollRef} onScroll={handleScroll}>
          {CONSENT_SECTIONS.map((s) => (
            <div key={s.letter}>
              <h3>
                <span style={{ fontStyle: "italic", color: "var(--ink-3)", marginRight: 8 }}>
                  {s.letter})
                </span>
                {s.title}
              </h3>
              <p>{s.body}</p>
            </div>
          ))}
          <p style={{ borderTop: "1px solid var(--rule)", paddingTop: 14, marginTop: 16, color: "var(--ink)" }}>
            Con base en lo anterior, declaro haber recibido información suficiente sobre el
            contenido del estudio y haber sido resueltas todas mis dudas.
          </p>
          <p style={{ fontSize: 12, color: "var(--ink-3)" }}>
            <strong>Institución:</strong> Universidad Internacional de La Rioja (UNIR) ·{" "}
            <strong>DPD:</strong> ppd@unir.net
          </p>
        </div>
        {!hasScrolled && (
          <div className="scroll-fade">↓ Desplace para leer todo</div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <label
          className={`check-row${ageOk ? " is-checked" : ""}`}
          onClick={() => setAgeOk(!ageOk)}
        >
          <span className="check-box" />
          <span className="check-text">
            Confirmo que tengo <strong>18 años o más</strong>.
          </span>
        </label>
        <label
          className={`check-row${!hasScrolled ? " is-disabled" : ""}${dataOk ? " is-checked" : ""}`}
          onClick={() => hasScrolled && setDataOk(!dataOk)}
        >
          <span className="check-box" />
          <span className="check-text">
            He leído la información del estudio y consiento el tratamiento de mis datos con fines
            de investigación académica.
            {!hasScrolled && (
              <small>Lea el documento completo para activar esta opción.</small>
            )}
          </span>
        </label>
      </div>

      <div style={{ marginTop: 24 }}>
        <label className="field-label">
          ¿Está recibiendo actualmente tratamiento psicológico o psiquiátrico?
          <span className="required">*</span>
        </label>
        <div className="row" style={{ gap: 10 }}>
          {["No", "Sí"].map((opt) => (
            <button
              key={opt}
              type="button"
              className={`radio-option flex-1${treatment === opt ? " is-selected" : ""}`}
              style={{ justifyContent: "center" }}
              onClick={() => setTreatment(opt)}
            >
              <span className="radio-dot" />
              <span>{opt}</span>
            </button>
          ))}
        </div>
        {treatment === "Sí" && (
          <div className="sub-field">
            <label className="field-label" style={{ fontSize: 12 }}>
              ¿Qué tipo de tratamiento?{" "}
              <span className="optional">(opcional)</span>
            </label>
            <textarea
              rows={2}
              value={treatmentDescription}
              onChange={(e) => setTreatmentDescription(e.target.value)}
              placeholder="Describa brevemente el tratamiento…"
            />
          </div>
        )}
      </div>

      <div className="btn-row" style={{ marginTop: 32 }}>
        <button
          type="button"
          className="btn btn-accent flex-1"
          disabled={!canProceed}
          onClick={() => onNext({ treatment, treatmentDescription })}
        >
          Comenzar encuesta →
        </button>
      </div>
    </main>
  );
}
