import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="section-label">Trabajo de Fin de Máster · UNIR 2026</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
          Estrés percibido y bienestar emocional<br className="hidden sm:block" /> en población adulta española
        </h1>
        <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
          Estudio sobre la relación entre el estrés percibido y la sintomatología emocional
          (depresión, ansiedad y estrés) en población adulta no clínica.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary mb-1">8–10 min</div>
          <p className="text-xs text-text-muted">Tiempo estimado</p>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary mb-1">Anónimo</div>
          <p className="text-xs text-text-muted">Sin datos identificativos</p>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary mb-1">≥18 años</div>
          <p className="text-xs text-text-muted">Población general no clínica</p>
        </div>
      </div>

      {/* Description */}
      <div className="card mb-8 space-y-4 text-sm text-text-secondary">
        <div>
          <h2 className="font-semibold text-text-primary mb-1">¿Por qué este estudio?</h2>
          <p>
            El estrés es uno de los principales problemas de salud mental en la sociedad actual.
            Este estudio busca analizar cómo afecta a la población española adulta en general,
            teniendo en cuenta factores laborales y sociodemográficos.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-text-primary mb-1">¿En qué consiste?</h2>
          <p>
            Responderá a un breve cuestionario sociodemográfico y a dos escalas validadas: la
            Escala de Estrés Percibido (PSS-14) y la Escala de Depresión, Ansiedad y Estrés
            (DASS-21). No se le mostrarán sus puntuaciones al finalizar.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-text-primary mb-1">Protección de datos</h2>
          <p>
            Sus respuestas son completamente anónimas. No se recogen datos identificativos, correo
            electrónico ni dirección IP. Los datos se usarán exclusivamente para investigación académica
            en el marco del TFM de la{" "}
            <strong>Universidad Internacional de La Rioja (UNIR)</strong>.{" "}
            <Link href="/privacidad" className="text-primary underline">
              Más información
            </Link>
            .
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <Link href="/encuesta" className="btn-primary text-base px-8 py-4 inline-block">
          Participar en el estudio →
        </Link>
        <p className="text-xs text-text-muted">
          Al participar acepta el uso de sus datos para fines de investigación académica.
        </p>
      </div>
    </main>
  );
}
