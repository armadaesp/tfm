import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page animate-in">
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="smallcaps">Estudio · UNIR · 2026</span>
        </div>
        <h1 className="display">
          Estrés percibido<br />y bienestar <em>emocional</em><br />en población adulta española.
        </h1>
        <p className="lede" style={{ marginTop: 24, maxWidth: 540 }}>
          Una investigación sobre la relación entre el estrés percibido y la sintomatología
          emocional —depresión, ansiedad y estrés— en población adulta no clínica.
        </p>
        <div className="hero-meta">
          <div className="hero-meta-cell">
            <div className="hero-meta-label">Duración</div>
            <div className="hero-meta-value">5–7 minutos</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">Anonimato</div>
            <div className="hero-meta-value">Total</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">Requisito</div>
            <div className="hero-meta-value">≥ 18 años</div>
          </div>
        </div>
      </section>

      <div className="h-rule">
        <span className="h-rule-num">i.</span>
        <h2 className="section-title">¿En qué consiste?</h2>
        <span className="h-rule-line" />
      </div>

      <p className="body" style={{ marginTop: 12 }}>
        Responderá un breve cuestionario sociodemográfico y dos escalas validadas en español:
        la <em>Escala de Estrés Percibido</em> (PSS-14) y la{" "}
        <em>Escala de Depresión, Ansiedad y Estrés</em> (DASS-21).
        Sus respuestas son completamente <strong>anónimas</strong>: no se recogen nombre, correo
        ni dirección IP.
      </p>

      <div className="h-rule">
        <span className="h-rule-num">ii.</span>
        <h2 className="section-title">¿Por qué participar?</h2>
        <span className="h-rule-line" />
      </div>

      <p className="body" style={{ marginTop: 12 }}>
        El estrés es uno de los principales problemas de salud mental contemporáneos. Su
        contribución ayuda a comprender cómo afecta a la población general, considerando factores
        sociodemográficos y laborales que rara vez se estudian de forma integrada. Los datos se
        utilizarán <strong>exclusivamente</strong> para investigación académica de la UNIR.{" "}
        <Link href="/privacidad" className="inline-link">
          Política de privacidad
        </Link>
        .
      </p>

      <div style={{ marginTop: 48 }}>
        <Link
          href="/encuesta"
          className="btn btn-accent btn-block"
          style={{ padding: "16px 24px", fontSize: 15 }}
        >
          Comenzar el estudio →
        </Link>
        <p className="body-sm muted text-center" style={{ marginTop: 12 }}>
          Al participar acepta el uso de sus datos para fines de investigación académica.
        </p>
      </div>
    </main>
  );
}
