import Link from "next/link";

export default function GraciasPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="text-5xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        ¡Muchas gracias por su participación!
      </h1>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        Sus respuestas han sido registradas de forma anónima y segura. Su contribución es muy
        valiosa para el avance de la investigación sobre bienestar emocional en la población adulta
        española.
      </p>
      <div className="card text-left text-sm text-text-secondary mb-8">
        <ul className="space-y-2">
          <li>✔ Sus respuestas han sido guardadas correctamente.</li>
          <li>✔ No se han recogido datos identificativos.</li>
          <li>✔ Los datos se utilizarán exclusivamente para investigación académica (UNIR).</li>
        </ul>
      </div>
      <p className="text-xs text-text-muted mb-8">
        Si tiene alguna pregunta sobre el estudio, puede contactar al Delegado de Protección de
        Datos de UNIR:{" "}
        <a href="mailto:ppd@unir.net" className="text-primary underline">
          ppd@unir.net
        </a>
      </p>
      <Link href="/" className="btn-outline">
        ← Volver al inicio
      </Link>
    </main>
  );
}
