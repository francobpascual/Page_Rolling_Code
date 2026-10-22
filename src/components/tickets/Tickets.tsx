import "./Tickets.css";

const tickets = [
  {
    id: "early",
    name: "Early Bird",
    badge: "Quedan 38",
    price: "$25,000",
    previousPrice: "$35,000",
    description: "Presencial · precio especial hasta el 31/10",
    benefits: [
      "Acceso a las 10 charlas",
      "Kit de stickers Rolling Code",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "general",
    name: "General",
    badge: "Desde 11/1",
    price: "$35,000",
    description: "Presencial · precio regular",
    benefits: [
      "Acceso a las 10 charlas",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "virtual",
    name: "Virtual",
    badge: "Desde donde estés",
    price: "$15,000",
    description: "Transmisión en vivo",
    benefits: [
      "Transmisión en vivo de las 10 charlas",
      "Chat para hacer preguntas a los speakers",
      "Certificado de asistencia",
      "Grabación disponible por 30 días",
    ],
  },
];

function Tickets() {
  return (
    <section
      id="entradas"
      className="tickets"
      aria-labelledby="tickets-title"
    >
      <div className="tickets-container">
        <header className="tickets-header">
          <p className="tickets-eyebrow">ENTRADAS</p>

          <h2 id="tickets-title" className="tickets-title">
            Asegurá tu lugar antes de que suba el precio
          </h2>
        </header>

        <div className="tickets-grid row g-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={
                ticket.id === "virtual"
                  ? "col-12"
                  : "col-12 col-md-6"
              }
            >
              <article
                className={`ticket-card ticket-card--${ticket.id}`}
              >
                <header className="ticket-card-header">
                  <h3 className="ticket-name">{ticket.name}</h3>

                  <span className="ticket-badge">
                    {ticket.badge}
                  </span>
                </header>

                <div className="ticket-prices">
                  <strong className="ticket-price">
                    {ticket.price}
                  </strong>

                  {ticket.previousPrice && (
                    <del className="ticket-previous-price">
                      {ticket.previousPrice}
                    </del>
                  )}
                </div>

                <p className="ticket-description">
                  {ticket.description}
                </p>

                <ul className="ticket-benefits">
                  {ticket.benefits.map((benefit) => (
                    <li key={benefit}>
                      <span className="checkmark" aria-hidden="true">
                        ✓
                      </span>

                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button type="button" className="ticket-button">
                  Comprar entrada
                </button>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tickets;


