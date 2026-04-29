import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/" className="text-sm text-primary hover:underline mb-6 inline-block">
        ← Volver al inicio
      </Link>

      <h1 className="text-2xl font-bold text-text-primary mb-2">Política de Privacidad y Consentimiento Informado</h1>
      <p className="text-sm text-text-muted mb-8">
        Estudio de investigación · Universidad Internacional de La Rioja (UNIR) · 2026
      </p>

      <div className="space-y-8 text-sm text-text-secondary">

        {/* Formulario de consentimiento */}
        <section>
          <h2 className="section-label mb-3">
            Formulario para prestar consentimiento al tratamiento de datos para la realización y
            desarrollo del estudio de investigación en su condición de participante
          </h2>

          <div className="card mb-4">
            <h3 className="font-semibold text-text-primary mb-3">Datos identificativos del participante</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-text-primary">Nombre</p>
                <div className="border-b border-surface-border mt-1 h-6" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Apellidos</p>
                <div className="border-b border-surface-border mt-1 h-6" />
              </div>
              <div className="sm:col-span-2">
                <p className="font-medium text-text-primary">Correo electrónico</p>
                <div className="border-b border-surface-border mt-1 h-6" />
              </div>
            </div>
            <p className="text-xs text-text-muted mt-3">
              <em>Nota: Esta encuesta online es completamente anónima. La sección anterior corresponde
              al formulario oficial de UNIR para participantes que opten por identificarse en versión
              impresa.</em>
            </p>
          </div>
        </section>

        {/* Información sobre el estudio */}
        <section>
          <h2 className="font-bold text-text-primary text-base mb-4">Información sobre el estudio</h2>
          <div className="space-y-4">
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
              <p className="mb-3">
                UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A., tratará sus datos de carácter personal con
                la finalidad de llevar a cabo un estudio de investigación, así como publicación de sus
                datos en programas de difusión o artículos de interés.
              </p>
              <p className="mb-3">Para el desarrollo de la finalidad sujeta a la formalización del estudio de investigación, es necesario que usted consienta:</p>
              <ul className="list-none space-y-2 pl-2">
                <li>☐ Consiento que mis datos sean tratados para formar parte del estudio de investigación.</li>
                <li>☐ Que mis datos sean publicados en artículos de interés y publicaciones que pueda llevar a cabo el autor del estudio de investigación/tesis doctoral.</li>
              </ul>
              <p className="mt-3">
                En el caso de que no consienta que sus datos sean utilizados para la publicación de
                artículos o actividades semejantes, se informa que dichas publicaciones se podrán
                realizar, de manera anonimizada, sin mencionar sus datos de carácter personal.
              </p>
              <p className="mt-3">
                Si usted lo desea, puede retirar el consentimiento previamente dado o, en su caso,
                ejercitar los derechos reconocidos en los artículos 15 a 22 del Reglamento (UE)
                2016/679, mediante solicitud dirigida a{" "}
                <a href="mailto:ppd@unir.net" className="text-primary underline">ppd@unir.net</a>,
                donde también podrá solicitar información adicional sobre el tratamiento de sus datos
                y/o ponerse en contacto con el delegado de protección de datos.
              </p>
            </div>
          </div>
        </section>

        {/* Declaración */}
        <section className="card border-primary/20">
          <p className="text-text-primary">
            Con base en lo anterior, declaro haber recibido información suficiente sobre el contenido
            del estudio de investigación y haber sido resueltas todas mis dudas y contestadas mis
            preguntas al respecto.
          </p>
          <p className="mt-4">
            En __________, a ___ de _________ de 2026
          </p>
        </section>

        {/* Contacto */}
        <section className="card">
          <h2 className="font-semibold text-text-primary mb-3">Contacto</h2>
          <div className="space-y-1">
            <p><strong>Institución:</strong> Universidad Internacional de La Rioja (UNIR)</p>
            <p>
              <strong>Delegado de Protección de Datos (UNIR):</strong>{" "}
              <a href="mailto:ppd@unir.net" className="text-primary underline">ppd@unir.net</a>
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link href="/encuesta" className="btn-primary">
          Participar en el estudio →
        </Link>
      </div>
    </main>
  );
}
