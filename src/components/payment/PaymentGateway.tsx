import { useEffect, useRef, useState } from "react";
import "./PaymentGateway.css";

const ticketOptions = [
  {
    id: "early",
    name: "Early Bird",
    description: "Presencial · hasta el 31/10",
    price: 25000,
  },
  {
    id: "general",
    name: "General",
    description: "Presencial · desde el 1/11",
    price: 35000,
  },
  {
    id: "virtual",
    name: "Virtual",
    description: "Transmisión en vivo y grabación",
    price: 15000,
  },
];

const steps = ["Entrada", "Datos", "Pago", "Listo"];

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

interface PaymentGatewayProps {
  remainingEarlyTickets: number;
  onPurchase: (ticketId: string, quantity: number) => boolean;
  onOpenChat?: () => void;
}

function PaymentGateway({
  remainingEarlyTickets,
  onPurchase,
  onOpenChat,
}: PaymentGatewayProps) {
  const [selectedId, setSelectedId] = useState("early");
  const [quantity, setQuantity] = useState(0);
  const [step, setStep] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [showHelp, setShowHelp] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");

  const helpDialogRef = useRef<HTMLDialogElement>(null);
  const purchaseCompletedRef = useRef(false);

  const purchased = step === 3;
  const hasTickets = quantity > 0;
  const isEarlyBird = selectedId === "early";

  const currentTicket =
    ticketOptions.find((ticket) => ticket.id === selectedId) ??
    ticketOptions[0];

  const hasEnoughStock =
    !isEarlyBird || quantity <= remainingEarlyTickets;

  const canContinue = hasTickets && hasEnoughStock;

  const canIncreaseQuantity =
    !isEarlyBird || quantity < remainingEarlyTickets;

  const subtotal = currentTicket.price * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  useEffect(() => {
    if (!hasTickets || purchased) return;

    const timeoutId = window.setTimeout(() => {
      setShowHelp(true);
    }, 20_000);

    return () => window.clearTimeout(timeoutId);
  }, [selectedId, hasTickets, purchased]);

  useEffect(() => {
    if (!showHelp || purchased) return;

    const dialog = helpDialogRef.current;

    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [showHelp, purchased]);

  function selectTicket(id: string) {
    if (id === "early" && remainingEarlyTickets === 0) return;
    if (id === selectedId) return;

    setShowHelp(false);
    setPurchaseError("");
    setSelectedId(id);

    if (id === "early") {
      setQuantity((value) => Math.min(value, remainingEarlyTickets));
    }
  }

  function increaseQuantity() {
    setPurchaseError("");

    setQuantity((value) => {
      if (isEarlyBird) {
        return Math.min(value + 1, remainingEarlyTickets);
      }

      return value + 1;
    });
  }

  function decreaseQuantity() {
    setPurchaseError("");
    setQuantity((value) => Math.max(0, value - 1));

    if (quantity <= 1) {
      setShowHelp(false);
    }
  }

  function goToStep(nextStep: number) {
    if (nextStep > 0 && !canContinue) return;

    setPurchaseError("");
    setStep(nextStep);
  }

  function completePurchase() {
    if (purchaseCompletedRef.current) return;

    if (!hasTickets) {
      setPurchaseError("Seleccioná al menos una entrada.");
      return;
    }

    if (!hasEnoughStock) {
      setPurchaseError(
        `Quedan ${remainingEarlyTickets} entradas Early Bird. Volvé a las entradas para ajustar la cantidad.`
      );
      return;
    }

    purchaseCompletedRef.current = true;

    const purchaseAccepted = onPurchase(selectedId, quantity);

    if (!purchaseAccepted) {
      purchaseCompletedRef.current = false;

      setPurchaseError(
        "No se pudo completar la compra. Revisá la cantidad de entradas disponibles."
      );

      return;
    }

    setPurchaseError("");
    setShowHelp(false);
    setStep(3);
  }

  function startNewPurchase() {
    purchaseCompletedRef.current = false;

    setSelectedId(remainingEarlyTickets > 0 ? "early" : "general");
    setQuantity(0);
    setCustomerName("");
    setCustomerEmail("");
    setPurchaseError("");
    setShowHelp(false);
    setStep(0);
  }

  function closeHelp() {
    setShowHelp(false);
  }

  function openChat() {
    helpDialogRef.current?.close();
    setShowHelp(false);
    onOpenChat?.();
  }

  return (
    <section
      id="payment"
      className="payment"
      aria-labelledby="payment-title"
    >
      <div className="payment-panel">
        <header className="payment-header">
          <div>
            <p className="payment-eyebrow">COMPRA SEGURA</p>

            <h2 id="payment-title" className="payment-title">
              Finalizá tu compra
            </h2>
          </div>

          <ol className="payment-steps" aria-label="Pasos de compra">
            {steps.map((label, index) => (
              <li
                key={label}
                className={`payment-step${
                  step === index ? " payment-step--active" : ""
                }`}
                aria-current={step === index ? "step" : undefined}
              >
                {index + 1} {label}
              </li>
            ))}
          </ol>
        </header>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-7">
            <div className="payment-card">
              {step === 0 && (
                <>
                  <fieldset className="payment-options">
                    <legend className="payment-card-title">
                      Elegí tu entrada
                    </legend>

                    {ticketOptions.map((ticket) => {
                      const isSoldOut =
                        ticket.id === "early" &&
                        remainingEarlyTickets === 0;

                      return (
                        <label
                          key={ticket.id}
                          className={`payment-option${
                            selectedId === ticket.id
                              ? " payment-option--active"
                              : ""
                          }`}
                        >
                          <input
                            className="payment-option-input"
                            type="radio"
                            name="ticket"
                            value={ticket.id}
                            checked={selectedId === ticket.id}
                            disabled={isSoldOut}
                            onChange={() => selectTicket(ticket.id)}
                          />

                          <span className="payment-option-content">
                            <span className="payment-option-name">
                              {ticket.name}
                            </span>

                            <span className="payment-option-description">
                              {isSoldOut
                                ? "Entradas agotadas"
                                : ticket.description}
                            </span>
                          </span>

                          <span className="payment-option-price">
                            {currency.format(ticket.price)}
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>

                  {isEarlyBird && (
                    <p className="payment-summary-note" aria-live="polite">
                      {remainingEarlyTickets > 0
                        ? `Quedan ${remainingEarlyTickets} entradas Early Bird disponibles.`
                        : "Las entradas Early Bird están agotadas. Elegí otra opción."}
                    </p>
                  )}

                  <div className="payment-quantity">
                    <span id="payment-quantity-label">Cantidad</span>

                    <div
                      className="payment-quantity-controls"
                      role="group"
                      aria-labelledby="payment-quantity-label"
                    >
                      <button
                        type="button"
                        className="payment-quantity-button"
                        aria-label="Restar una entrada"
                        disabled={!hasTickets}
                        onClick={decreaseQuantity}
                      >
                        −
                      </button>

                      <output
                        className="payment-quantity-value"
                        aria-live="polite"
                        aria-label="Cantidad de entradas"
                      >
                        {quantity}
                      </output>

                      <button
                        type="button"
                        className="payment-quantity-button"
                        aria-label="Sumar una entrada"
                        disabled={!canIncreaseQuantity}
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="payment-button"
                    disabled={!canContinue}
                    onClick={() => goToStep(1)}
                  >
                    Continuar
                  </button>
                </>
              )}

              {step === 1 && (
                <form
                  className="payment-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    goToStep(2);
                  }}
                >
                  <h3 className="payment-card-title">Tus datos</h3>

                  <label className="payment-field">
                    Nombre y apellido
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={3}
                      pattern={".*\\S.*"}
                      title="Ingresá tu nombre y apellido."
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(event.target.value)
                      }
                    />
                  </label>

                  <label className="payment-field">
                    Email
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={customerEmail}
                      onChange={(event) =>
                        setCustomerEmail(event.target.value)
                      }
                    />
                  </label>

                  <button
                    type="submit"
                    className="payment-button"
                    disabled={!canContinue}
                  >
                    Continuar
                  </button>

                  <button
                    type="button"
                    className="payment-back"
                    onClick={() => goToStep(0)}
                  >
                    Volver a las entradas
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="payment-confirmation">
                  <h3 className="payment-card-title">
                    Confirmá tu compra
                  </h3>

                  <p>
                    <strong>{customerName}</strong>
                    <br />
                    {customerEmail}
                  </p>

                  <p>
                    Vas a simular la compra de {quantity}{" "}
                    {quantity === 1 ? "entrada" : "entradas"}{" "}
                    {currentTicket.name}.
                  </p>

                  <button
                    type="button"
                    className="payment-button"
                    onClick={completePurchase}
                  >
                    Comprar · {currency.format(total)}
                  </button>

                  <button
                    type="button"
                    className="payment-back"
                    onClick={() => goToStep(1)}
                  >
                    Volver a mis datos
                  </button>

                  <button
                    type="button"
                    className="payment-back"
                    onClick={() => goToStep(0)}
                  >
                    Cambiar entradas
                  </button>
                </div>
              )}

              {purchaseError && (
                <p className="payment-summary-note" role="alert">
                  {purchaseError}
                </p>
              )}

              {step === 3 && (
                <div className="payment-confirmation">
                  <div role="status">
                    <h3 className="payment-card-title">
                      ¡Simulación completada!
                    </h3>

                    <p>
                      Gracias, {customerName}. No se realizó ningún cobro
                      ni se enviaron entradas.
                    </p>

                    {isEarlyBird && (
                      <p>
                        Descontamos {quantity}{" "}
                        {quantity === 1 ? "entrada" : "entradas"} Early Bird
                        del contador de demostración. Quedan{" "}
                        {remainingEarlyTickets} disponibles.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="payment-button"
                    onClick={startNewPurchase}
                  >
                    Comprar más entradas
                  </button>
                </div>
              )}

              <p className="payment-disclaimer">
                Pasarela de ejemplo: no se procesan pagos ni se guardan
                datos de forma permanente.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <aside className="payment-summary" aria-label="Tu pedido">
              <p className="payment-summary-eyebrow">TU PEDIDO</p>

              <h3 className="payment-summary-title">
                Workshop Rolling Code School
              </h3>

              <p className="payment-summary-detail">
                Jueves 19/11 · 18.00 hs · Gral. Paz 576
              </p>

              <div className="payment-summary-lines">
                <div className="payment-summary-line">
                  <span>
                    {quantity} {quantity === 1 ? "entrada" : "entradas"}{" "}
                    {currentTicket.name}
                  </span>

                  <span>{currency.format(subtotal)}</span>
                </div>

                <div className="payment-summary-line payment-summary-line--muted">
                  <span>Cargo por servicio (5%)</span>
                  <span>{currency.format(serviceFee)}</span>
                </div>
              </div>

              <div className="payment-total">
                <span>Total</span>
                <strong>{currency.format(total)}</strong>
              </div>

              <p className="payment-summary-note">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="11"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                Compra de demostración. No se realizan cobros.
              </p>
            </aside>
          </div>
        </div>

        {showHelp && !purchased && (
          <dialog
            ref={helpDialogRef}
            className="payment-help-modal"
            aria-labelledby="payment-help-title"
            aria-describedby="payment-help-description"
            onCancel={(event) => {
              event.preventDefault();
              closeHelp();
            }}
          >
            <button
              type="button"
              className="payment-help-modal__close"
              aria-label="Cerrar mensaje de ayuda"
              onClick={closeHelp}
            >
              ×
            </button>

            <p className="payment-help-modal__eyebrow">
              ESTAMOS PARA AYUDARTE
            </p>

            <h3
              id="payment-help-title"
              className="payment-help-modal__title"
            >
              ¿Tenés dudas sobre tu entrada?
            </h3>

            <p
              id="payment-help-description"
              className="payment-help-modal__description"
            >
              Podés consultar al chatbot para resolver tus dudas antes
              de comprar.
            </p>

            <div className="payment-help-modal__actions">
              {onOpenChat && (
                <button
                  type="button"
                  className="payment-help-modal__button payment-help-modal__button--primary"
                  onClick={openChat}
                >
                  Consultar al chatbot
                </button>
              )}

              <button
                type="button"
                className="payment-help-modal__button payment-help-modal__button--secondary"
                onClick={closeHelp}
              >
                Seguir comprando
              </button>
            </div>
          </dialog>
        )}
      </div>
    </section>
  );
}

export default PaymentGateway;