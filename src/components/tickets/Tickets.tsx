import "./Tickets.css";
import { tickets } from "../../data/eventData";

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


