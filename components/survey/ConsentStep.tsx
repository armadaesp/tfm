"use client";

import { useState, useRef } from "react";

interface Props {
  onNext: (data: { treatment: string }) => void;
}

export default function ConsentStep({ onNext }: Props) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [treatment, setTreatment] = useState<string>("");
  const [showExcluded, setShowExcluded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      setHasScrolled(true);
    }
  }

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
      {/* Header */}
      <div>
        <p className="section-label mb-2">Estudio de investigación · UNIR 2026</p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Estrés percibido y bienestar emocional en población adulta española
        </h1>
        <p className="text-text-secondary text-sm">
          Tiempo estimado de cumplimentación: <strong>8–10 minutos</strong>
        </p>
      </div>

      {/* Scrollable consent document */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-72 overflow-y-auto border border-surface-border rounded-xl p-5 text-sm text-text-secondary space-y-5 bg-surface-card"
        >
          <p className="font-semibold text-text-primary text-base">
            Información sobre el estudio y consentimiento informado
          </p>
          <p className="text-xs text-text-muted">
            Trabajo de Fin de Estudios · Universidad Internacional de La Rioja (UNIR) · 2026
          </p>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">a) Instrucciones básicas</h3>
            <p>
              Antes de dar consentimiento para participar en este estudio, es importante leer y
              entender la siguiente explicación. Describe el objetivo, procedimientos, beneficios y
              riesgos del estudio, las alternativas disponibles, y el derecho a retirarse del estudio
              en cualquier momento. Si no se desea participar, esto no afectará a su tratamiento.
              Esta hoja de consentimiento informado puede contener información que usted no comprenda
              en su totalidad, por lo que no dude en solicitar cualquier duda que se le plantee al
              respecto.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">b) Propósito del estudio</h3>
            <p>
              Analizar la relación entre el estrés percibido y la sintomatología emocional de
              depresión, ansiedad y estrés en población adulta no clínica, examinando el papel
              modulador de variables sociodemográficas y laborales.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">c) Procedimiento y explicación del estudio</h3>
            <p>
              Con este objetivo, solicitamos la colaboración de los adultos con edad igual o superior
              a 18 años pertenecientes a población general no clínica que hayan acudido al cuestionario
              online autoadministrado. Se realizarán 2 visitas en plataforma online (cuestionario web),
              durante el periodo establecido para la recogida de datos del estudio, teniendo como
              finalidad evaluar el nivel de estrés percibido y la sintomatología emocional (depresión,
              ansiedad y estrés).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">d) Riesgos y beneficios</h3>
            <p>
              Los participantes no se beneficiarán directamente de este estudio, salvo la oportunidad
              de poder contribuir al avance científico que puede beneficiar en el futuro a personas
              con estos trastornos. No existe riesgo alguno derivado de la participación en este
              estudio, salvo la molestia ocasionada por el tiempo de cumplimentación de los
              cuestionarios autoadministrados.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">e) Coste y/o compensación</h3>
            <p>
              No existe ningún coste por participar en este estudio. Todas las entrevistas y pruebas
              que se realicen no supondrán coste alguno. Tampoco recibirán compensación económica por
              participar en el estudio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">f) Participación voluntaria</h3>
            <p>
              Su participación es completamente voluntaria, pudiendo retirarse en cualquier momento.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">g) Protección de datos personales</h3>
            <p className="mb-2">
              UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A., tratará sus datos de carácter personal con
              la finalidad de llevar a cabo un trabajo de fin de estudios, así como publicación de sus
              datos en programas de difusión o artículos de interés.
            </p>
            <p className="mb-2">
              Para el desarrollo de la finalidad sujeta a la formalización del trabajo de fin de
              estudios, es necesario que usted consienta:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Que mis datos sean tratados para formar parte del trabajo de fin de estudios.</li>
              <li>
                Que mis datos sean publicados en artículos de interés y publicaciones que pueda
                llevar a cabo el autor del trabajo de fin de estudios/tesis doctoral.
              </li>
            </ul>
            <p className="mt-2">
              En el caso de que no consienta que sus datos sean utilizados para la publicación de
              artículos o actividades semejantes, se informa que dichas publicaciones se podrán
              realizar, de manera anonimizada, sin mencionar sus datos de carácter personal.
            </p>
            <p className="mt-2">
              Si usted lo desea, puede retirar el consentimiento previamente dado o, en su caso,
              ejercitar los derechos reconocidos en los artículos 15 a 22 del Reglamento (UE)
              2016/679, mediante solicitud dirigida a{" "}
              <a href="mailto:ppd@unir.net" className="text-primary underline">ppd@unir.net</a>,
              donde también podrá solicitar información adicional sobre el tratamiento de sus datos
              y/o ponerse en contacto con el delegado de protección de datos.
            </p>
          </div>

          <div className="border-t border-surface-border pt-4">
            <p className="text-text-primary">
              Con base en lo anterior, declaro haber recibido información suficiente sobre el
              contenido del trabajo de fin de estudios y haber sido resueltas todas mis dudas y
              contestadas mis preguntas al respecto.
            </p>
          </div>

          <div className="text-xs space-y-1">
            <p><strong>Investigador:</strong> Daniel Lara Becerra · Universidad Internacional de La Rioja (UNIR)</p>
            <p>
              <strong>Contacto:</strong>{" "}
              <a href="mailto:danituring@gmail.com" className="text-primary underline">danituring@gmail.com</a>
              {" · "}
              <strong>DPD UNIR:</strong>{" "}
              <a href="mailto:ppd@unir.net" className="text-primary underline">ppd@unir.net</a>
            </p>
          </div>
        </div>

        {!hasScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface-card to-transparent rounded-b-xl flex items-end justify-center pb-2 pointer-events-none">
            <span className="text-xs text-text-muted">↓ Desplace para leer el documento completo</span>
          </div>
        )}
      </div>

      {/* Consent checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
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
        <label className={`flex items-start gap-3 ${hasScrolled ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}>
          <input
            type="checkbox"
            checked={dataConsent}
            onChange={(e) => hasScrolled && setDataConsent(e.target.checked)}
            disabled={!hasScrolled}
            className="mt-0.5 w-5 h-5 rounded border-surface-border accent-primary shrink-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="text-sm text-text-primary">
            He leído la información del estudio y consiento el tratamiento de mis datos con fines
            de investigación académica.
            {!hasScrolled && (
              <span className="block text-xs text-text-muted mt-0.5">
                (Lea el documento completo para activar esta opción)
              </span>
            )}
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
