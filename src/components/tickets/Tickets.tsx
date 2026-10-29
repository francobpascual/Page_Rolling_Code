import "./Tickets.css";
import { tickets } from "../../data/eventData";

interface TicketsProps {
  remainingEarlyTickets: number;
  onSelectTicket: (ticketId: string) => void;
}

function Tickets({
  remainingEarlyTickets,
  onSelectTicket,
}: TicketsProps) {
  return (
    <section
      id="entradas"
      className="tickets"
      aria-labelledby="tickets-title"
    >
      <header className="tickets-header">
        <p>ENTRADAS</p>

        <h2 id="tickets-title">
          Asegurá tu lugar antes de que suba el precio
        </h2>
      </header>

      <div className="tickets-grid">
        {tickets.map((ticket) => {
          const isEarlyBird = ticket.id === "early";
          const isSoldOut = isEarlyBird && remainingEarlyTickets === 0;

          const badge = isEarlyBird
            ? isSoldOut
              ? "Agotadas"
              : `Quedan ${remainingEarlyTickets}`
            : ticket.badge;

          return (
            <article
              key={ticket.id}
              className={`ticket-card ticket-card--${ticket.id}`}
            >
              <header className="ticket-card-header">
                <h3 className="ticket-name">{ticket.name}</h3>

                <span className="ticket-badge">{badge}</span>
              </header>

              <div className="ticket-prices">
                <strong>{ticket.price}</strong>

                {ticket.previousPrice && (
                  <del>{ticket.previousPrice}</del>
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

                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="ticket-button"
                disabled={isSoldOut}
                onClick={() => onSelectTicket(ticket.id)}
              >
                {isSoldOut ? "Entradas agotadas" : "Comprar entrada"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Tickets;