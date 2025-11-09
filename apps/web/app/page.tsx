import { ButtonLink } from '@mn-formbuilder/ui';

const features = [
  {
    title: 'Constructor visual',
    description:
      'Organiza pasos conversacionales con bloques reutilizables, arrastra y suelta, y ajusta el tono de cada interacción.'
  },
  {
    title: 'Bloque de cálculo',
    description:
      'Configura operaciones como suma, resta, multiplicación y división usando respuestas previas como variables seguras.'
  },
  {
    title: 'Analíticas integradas',
    description:
      'Monitorea conversiones y embudos desde un panel en tiempo real conectado al backend NestJS.'
  }
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="badge">MN FormBuilder</p>
        <h1 className="title">Formularios conversacionales con lógica avanzada</h1>
        <p className="subtitle">
          Diseña experiencias al estilo Typeform con ramificaciones, bloques inteligentes y cálculos automáticos que se
          sincronizan con tus herramientas favoritas.
        </p>
        <div className="actions">
          <ButtonLink href="#editor" variant="primary">
            Explorar el editor
          </ButtonLink>
          <ButtonLink href="#api" variant="secondary">
            Ver API
          </ButtonLink>
        </div>
      </section>

      <section id="editor" className="grid">
        {features.map((feature) => (
          <article key={feature.title} className="card">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <section id="api" className="panel">
        <h2>API modular lista para integraciones</h2>
        <p>
          El backend NestJS organiza los dominios de formularios, bloques y cálculos en módulos independientes. El SDK en los
          paquetes compartidos simplifica la conexión con frontends externos y automatizaciones.
        </p>
        <p>
          Consulta la carpeta <code>apps/api</code> para conocer los endpoints iniciales y pruebas de ejemplo.
        </p>
      </section>
    </main>
  );
}
