import "./Entradas.css";

const entradas = [
  {
    id: "early",
    nombre: "Early Bird",
    etiqueta: "Quedan 38",
    precio: "$25.000",
    precioAnterior: "$35.000",
    descripcion: "Presencial · precio especial hasta el 31/10",
    beneficios: [
      "Acceso a las 10 charlas",
      "Kit de stickers Rolling Code",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "general",
    nombre: "General",
    etiqueta: "Desde el 1/11",
    precio: "$35.000",
    descripcion: "Presencial · precio regular",
    beneficios: [
      "Acceso a las 10 charlas",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "virtual",
    nombre: "Virtual",
    etiqueta: "Desde donde estés",
    precio: "$15.000",
    descripcion: "Transmisión en vivo",
    beneficios: [
      "Transmisión en vivo de las 10 charlas",
      "Chat para hacer preguntas a los speakers",
      "Certificado de asistencia",
      "Grabación disponible por 30 días",
    ],
  },
];

 function Entradas() {
  return (
    <section className="entradas" >  
      <header className="entradas-encabezado">
        <p>ENTRADAS</p>
        <h2 id="titulo-entradas">
          Asegurá tu lugar antes de que suba el precio
        </h2>
      </header>    

      <div className="entradas-grilla">
        {entradas.map((entrada) => (
          <article
            key={entrada.id}
            className={`entrada-card entrada-card--${entrada.id}`}
          >
            <header className="entrada-card-encabezado">
              <h3>{entrada.nombre}</h3>
              <span className="entrada-etiqueta">
                {entrada.etiqueta}
              </span>
            </header>

            <div className="entrada-precios">
              <strong>{entrada.precio}</strong>

              {entrada.precioAnterior && (
                <del>{entrada.precioAnterior}</del>
              )}
            </div>

            <p>{entrada.descripcion}</p>

            <ul className="entrada-beneficios">
              {entrada.beneficios.map((beneficio) => (
                <li key={beneficio}>
                  <span aria-hidden="true">✓</span>
                  {beneficio}
                </li>
              ))}
            </ul>
            <button type="button" className="entrada-boton">
              Comprar entrada
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Entradas ;
