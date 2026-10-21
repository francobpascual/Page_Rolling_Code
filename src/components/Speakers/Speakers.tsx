import SpeakerCard from "./SpeakersCard";
import "./Speakers.css";


const speakers = [
  {
    id: "tomas-escudero",
    name: "Tomas Escudero",
    image: "/images/speakers/tomas-escudero.jpg",
    talkTitle: "Diseño para developers",
    description:
      "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.",
    
  },
  {
    id: "franco-diaz",
    name: "Franco Diaz",
    image: "/images/speakers/franco-diaz.jpg",
    talkTitle: "De cero a tu primer proyecto",
    description:
      "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.",
  },
  {
    id: "gaston",
    name: "Gaston",
    image: "/images/speakers/gaston.jpg",
    talkTitle: "Armá tu portfolio con IA",
    description:
      "Cómo usar asistentes de IA para construir y publicar un portfolio que muestre lo que sabés hacer.",
  },
  {
    id: "mauro",
    name: "Mauro",
    image: "/images/speakers/mauro.jpg",
    talkTitle: "Git y GitHub sin miedo",
    description:
      "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.",
  },
  {
    id: "jose-diaz",
    name: "Jose Diaz",
    image: "/images/speakers/jose-diaz.jpg",
    talkTitle: "Tu primer backend con Node",
    description:
      "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.",
  },
  {
    id: "tomas-gomez",
    name: "Tomas Gomez",
    image: "/images/speakers/tomas-gomez.jpg",
    talkTitle: "Preparate para tu primera entrevista",
    description:
      "Qué preguntan en una entrevista técnica, cómo practicar y cómo contar tus proyectos con claridad.",
  },
  {
    id: "pablo-basso",
    name: "Pablo Basso",
    image: "/images/speakers/pablo-basso.jpg",
    talkTitle: "Mi primer trabajo en IT",
    description:
      "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.",
  },
  {
    id: "julian-martin",
    name: "Julian Martin",
    image: "/images/speakers/julian-martin.jpg",
    talkTitle: "Testing: cómo no romper todo",
    description:
      "Qué es testear, por qué importa y cómo escribir tus primeras pruebas sin complicarte.",
  },
  {
    id: "daniela-cardozo",
    name: "Daniela Cardozo",
    image: "/images/speakers/daniela-cardozo.jpg",
    talkTitle: "Tu primer día como developer",
    description:
      "Qué esperar de tu primera semana en un equipo, qué herramientas usar y cómo pedir ayuda sin miedo.",
  },
  {
    id: "andres-perlo",
    name: "Andres Perlo",
    image: "/images/speakers/andres-perlo.jpg",
    talkTitle: "Tu primera base de datos",
    description:
      "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.",
  },
];

function Speakers() {
  return (
    <section
      id="speakers"
      className="speakers"
      aria-labelledby="speakers-title"
    >
      <div className="speakers__container">
        <header className="speakers__header">
          <p className="speakers__eyebrow">SPEAKERS</p>

          <h2 id="speakers-title" className="speakers__title">
            Diez charlas, un mismo objetivo
          </h2>
        </header>

        <div className="speakers__grid">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              name={speaker.name}
              image={speaker.image}
              talkTitle={speaker.talkTitle}
              description={speaker.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Speakers;