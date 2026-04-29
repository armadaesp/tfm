import Link from "next/link";

const SECTIONS = [
  { id: "a", title: "Instrucciones básicas", body: "Antes de dar consentimiento para participar en este estudio, es importante leer y entender la siguiente explicación. Describe el objetivo, procedimientos, beneficios y riesgos del estudio, las alternativas disponibles, y el derecho a retirarse del estudio en cualquier momento." },
  { id: "b", title: "Propósito del estudio", body: "Analizar la relación entre el estrés percibido y la sintomatología emocional de depresión, ansiedad y estrés en población adulta no clínica, examinando el papel modulador de variables sociodemográficas y laborales." },
  { id: "c", title: "Procedimiento y explicación", body: "Solicitamos la colaboración de adultos con edad igual o superior a 18 años pertenecientes a población general no clínica que hayan acudido al cuestionario online autoadministrado. Se realiza una visita en plataforma online (cuestionario web), durante el periodo establecido para la recogida de datos del estudio." },
  { id: "d", title: "Riesgos y beneficios", body: "Los participantes no se beneficiarán directamente de este estudio, salvo la oportunidad de poder contribuir al avance científico que puede beneficiar en el futuro a personas con estos trastornos. No existe riesgo alguno derivado de la participación, salvo la molestia ocasionada por el tiempo de cumplimentación." },
  { id: "e", title: "Coste y compensación", body: "No existe ningún coste por participar en este estudio. Tampoco recibirán compensación económica." },
  { id: "f", title: "Participación voluntaria", body: "Su participación es completamente voluntaria, pudiendo retirarse en cualquier momento." },
  { id: "g", title: "Protección de datos personales", body: "UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A. tratará sus datos de carácter personal con la finalidad de llevar a cabo el estudio de investigación, así como publicación de sus datos en programas de difusión o artículos de interés. Los datos podrán publicarse de manera anonimizada. Puede ejercer los derechos reconocidos en los artículos 15 a 22 del Reglamento (UE) 2016/679 dirigiéndose a ppd@unir.net." },
];

export default function PrivacidadPage() {
  return (
    <main className="page animate-in">
      <Link href="/" className="btn btn-link" style={{ marginLeft: -4 }}>
        ← Volver al inicio
      </Link>

      <div style={{ marginTop: 16 }}>
        <span className="smallcaps smallcaps-muted">Documento legal</span>
        <h1 className="display" style={{ fontSize: 36, marginTop: 8 }}>
          Política de privacidad<br />y consentimiento <em>informado</em>
        </h1>
        <p className="body" style={{ marginTop: 12 }}>
          Estudio de investigación · Universidad Internacional de La Rioja (UNIR) · 2026
        </p>
      </div>

      <div className="card" style={{ marginTop: 32 }}>
        <h3 className="subsection">Datos identificativos del participante</h3>
        <p className="body-sm" style={{ fontStyle: "italic", color: "var(--ink-3)" }}>
          La encuesta online es completamente anónima — no se solicita esta información.
          Esta sección reproduce el formulario oficial UNIR para versión impresa.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div>
            <p className="body-sm">Nombre</p>
            <div style={{ borderBottom: "1px solid var(--rule-strong)", height: 24 }} />
          </div>
          <div>
            <p className="body-sm">Apellidos</p>
            <div style={{ borderBottom: "1px solid var(--rule-strong)", height: 24 }} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="body-sm">Correo electrónico</p>
            <div style={{ borderBottom: "1px solid var(--rule-strong)", height: 24 }} />
          </div>
        </div>
      </div>

      <div className="h-rule">
        <span className="h-rule-num">i.</span>
        <h2 className="section-title">Información sobre el estudio</h2>
        <span className="h-rule-line" />
      </div>

      {SECTIONS.map((s) => (
        <section key={s.id} className="privacy-section">
          <h3>
            <span style={{ fontFamily: "var(--font-source-serif-4), 'Source Serif 4', Georgia, serif", fontStyle: "italic", color: "var(--ink-3)", marginRight: 8 }}>
              {s.id})
            </span>
            {s.title}
          </h3>
          <p>{s.body}</p>
        </section>
      ))}

      <div className="card" style={{ marginTop: 24, borderLeft: "3px solid var(--accent)" }}>
        <p className="body" style={{ color: "var(--ink)" }}>
          Con base en lo anterior, declaro haber recibido información suficiente sobre el contenido
          del estudio de investigación y haber sido resueltas todas mis dudas y contestadas mis
          preguntas al respecto.
        </p>
        <p className="body-sm muted" style={{ marginTop: 12, fontStyle: "italic" }}>
          En __________, a ___ de _________ de 2026
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 className="subsection">Contacto</h3>
        <p className="body-sm">
          <strong>Institución:</strong> Universidad Internacional de La Rioja (UNIR)
        </p>
        <p className="body-sm">
          <strong>Delegado de Protección de Datos:</strong>{" "}
          <a className="inline-link" href="mailto:ppd@unir.net">ppd@unir.net</a>
        </p>
      </div>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <Link href="/encuesta" className="btn btn-accent">
          Participar en el estudio →
        </Link>
      </div>
    </main>
  );
}
