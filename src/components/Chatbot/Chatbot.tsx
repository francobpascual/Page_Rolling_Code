import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import "./Chatbot.css";
import { EVENT_DATE_LABEL, talks, tickets } from "../../data/eventData";

type ChatStage =
  | "question"
  | "typing"
  | "feedback"
  | "contact"
  | "finished";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [stage, setStage] = useState<ChatStage>("question");
  const [hasReply, setHasReply] = useState(false);

  const [feedbackAnswer, setFeedbackAnswer] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState("");
  const [finalMessage, setFinalMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const resetChat = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setUserMessage("");
    setSentMessage(null);
    setStage("question");
    setHasReply(false);
    setFeedbackAnswer(null);
    setFeedbackError("");
    setFinalMessage("");
    setFullName("");
    setPhone("");
    setEmail("");
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    resetChat();
    launcherRef.current?.focus();
  }, [resetChat]);

  useEffect(() => {
    if (!isOpen) return;

    if (stage === "question" || stage === "feedback") {
      inputRef.current?.focus();
    }

    if (stage === "contact") {
      fullNameRef.current?.focus();
    }
  }, [isOpen, stage]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeChat]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Cuando aparece la respuesta, muestra su comienzo.
  useEffect(() => {
    if (!hasReply) return;

    const container = messagesRef.current;
    const reply = replyRef.current;

    if (!container || !reply) return;

    const top =
      reply.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;

    container.scrollTo({ top, behavior: "smooth" });
  }, [hasReply]);

  // En los demás pasos, muestra los últimos mensajes.
  useEffect(() => {
    const container = messagesRef.current;

    if (!container || stage === "feedback") return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [stage, sentMessage]);

  function answerFeedback(helpful: boolean) {
    if (stage !== "feedback") return;

    setFeedbackAnswer(helpful ? "Sí" : "No");
    setFeedbackError("");
    setUserMessage("");

    if (helpful) {
      setFinalMessage(
        "¡Genial! Esperamos que puedas concretar la compra de tu entrada para vernos allí!"
      );
      setStage("finished");
      return;
    }

    setStage("contact");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = userMessage.trim();

    if (!text) return;

    if (stage === "feedback") {
      const answer = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.!¡¿?]/g, "")
        .trim();

      if (answer === "si") {
        answerFeedback(true);
      } else if (answer === "no") {
        answerFeedback(false);
      } else {
        setFeedbackError(
          'Respondé "sí" o "no", o elegí uno de los botones.'
        );
      }

      return;
    }

    if (stage !== "question") return;

    setSentMessage(text);
    setUserMessage("");
    setStage("typing");

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      setHasReply(true);
      setStage("feedback");
    }, 700);
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Aquí se conectará el envío a un servicio o backend.
    setFinalMessage(
      `Gracias, ${fullName.trim()}. Finalizamos la demostración. ` +
      "Tus datos no fueron enviados; el contacto con un representante " +
      "estará disponible cuando se conecte el servicio de consultas."
    );

    setFullName("");
    setPhone("");
    setEmail("");
    setStage("finished");
  }

  const canWrite = stage === "question" || stage === "feedback";

  return (
    <div className="chatbot">
      {isOpen && (
        <section
          id="chatbot-panel"
          className="chatbot-panel"
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          <header className="chatbot-header">
            <div>
              <p className="chatbot-eyebrow">Rolling Code</p>
              <h2 id="chatbot-title" className="chatbot-title">
                Asistente virtual
              </h2>
            </div>

            <button
              type="button"
              className="chatbot-close"
              onClick={closeChat}
              aria-label="Cerrar chat"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div
            ref={messagesRef}
            className="chatbot-messages"
            aria-live="polite"
          >
            <div className="chatbot-bubble chatbot-bubble--bot">
              <p>
                ¡Hola! Soy el asistente de Rolling Code. Escribime lo que
                necesites y te muestro los planes disponibles y la agenda
                del evento.
              </p>
            </div>

            {sentMessage && (
              <div className="chatbot-bubble chatbot-bubble--user">
                <p>{sentMessage}</p>
              </div>
            )}

            {stage === "typing" && (
              <div
                className="chatbot-bubble chatbot-bubble--bot chatbot-typing"
                role="status"
                aria-label="Escribiendo respuesta"
              >
                <span />
                <span />
                <span />
              </div>
            )}

            {hasReply && (
              <div
                ref={replyRef}
                className="chatbot-bubble chatbot-bubble--bot chatbot-reply"
              >
                <p className="chatbot-reply-intro">
                  Gracias por tu consulta, a continuación te paso lo
                  esencial que debes saber.
                </p>

                <p className="chatbot-reply-title">Planes</p>

                <ul className="chatbot-plans">
                  {tickets.map((ticket) => (
                    <li key={ticket.id} className="chatbot-plan">
                      <div className="chatbot-plan-head">
                        <span className="chatbot-plan-name">
                          {ticket.name}
                        </span>
                        <span className="chatbot-plan-price">
                          {ticket.price}
                        </span>
                      </div>

                      <p className="chatbot-plan-meta">
                        {ticket.badge} · {ticket.description}
                      </p>

                      <ul className="chatbot-plan-benefits">
                        {ticket.benefits.slice(0, 2).map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>

                <a
                  href="#entradas"
                  className="chatbot-link"
                  onClick={closeChat}
                >
                  Ver entradas
                </a>

                <p className="chatbot-reply-title">
                  Agenda · {EVENT_DATE_LABEL}
                </p>

                <ol className="chatbot-agenda">
                  {talks.map((talk) => (
                    <li key={talk.time}>
                      <span className="chatbot-agenda-time">
                        {talk.time}
                      </span>

                      <span className="chatbot-agenda-topic">
                        {talk.topic}
                        {talk.speaker && <small>{talk.speaker}</small>}
                      </span>
                    </li>
                  ))}
                </ol>

                <a
                  href="#agenda"
                  className="chatbot-link"
                  onClick={closeChat}
                >
                  Ver agenda completa
                </a>
              </div>
            )}

            {hasReply && (
              <div className="chatbot-bubble chatbot-bubble--bot">
                <p>¿Te sirvió la info?</p>

                {stage === "feedback" && (
                  <>
                    <div className="chatbot-feedback">
                      <button
                        type="button"
                        className="chatbot-feedback-button"
                        onClick={() => answerFeedback(true)}
                      >
                        Sí
                      </button>

                      <button
                        type="button"
                        className="chatbot-feedback-button"
                        onClick={() => answerFeedback(false)}
                      >
                        No
                      </button>
                    </div>

                    {feedbackError && (
                      <p className="chatbot-feedback-error" role="alert">
                        {feedbackError}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {feedbackAnswer && (
              <div className="chatbot-bubble chatbot-bubble--user">
                <p>{feedbackAnswer}</p>
              </div>
            )}

            {stage === "contact" && (
              <div className="chatbot-bubble chatbot-bubble--bot">
                <p>
                  Dejanos tu nombre completo, número de teléfono y mail
                  para que un representante pueda ponerse en contacto.
                </p>

                <p className="chatbot-contact-note">
                  Formulario de demostración: los datos no se envían.
                </p>

                <form
                  className="chatbot-contact-form"
                  onSubmit={handleContactSubmit}
                >
                  <label className="chatbot-contact-field">
                    Nombre completo
                    <input
                      ref={fullNameRef}
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      required
                      minLength={3}
                      pattern=".*\S.*"
                      value={fullName}
                      onChange={(event) =>
                        setFullName(event.target.value)
                      }
                    />
                  </label>

                  <label className="chatbot-contact-field">
                    Número de teléfono
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      pattern={"(?=(?:\\D*\\d){7,15}\\D*$)[+0-9 ()\\-]+"}
                      title="Ingresá entre 7 y 15 dígitos. Podés incluir +, espacios, paréntesis y guiones."
                      placeholder="Ej.: +54 381 1234567"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </label>

                  <label className="chatbot-contact-field">
                    Email
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>

                  <button
                    type="submit"
                    className="chatbot-contact-submit"
                  >
                    Finalizar
                  </button>
                </form>
              </div>
            )}

            {stage === "finished" && (
              <div className="chatbot-bubble chatbot-bubble--bot">
                <p>{finalMessage}</p>
              </div>
            )}
          </div>

          {canWrite && (
            <form className="chatbot-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                className="chatbot-input"
                type="text"
                value={userMessage}
                onChange={(event) => setUserMessage(event.target.value)}
                placeholder={
                  stage === "feedback"
                    ? "Respondé sí o no..."
                    : "Escribí tu consulta..."
                }
                aria-label="Mensaje para el asistente"
              />

              <button
                type="submit"
                className="chatbot-send"
                aria-label="Enviar mensaje"
                disabled={!userMessage.trim()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          )}

          {stage === "finished" && (
            <p className="chatbot-note">
              Conversación finalizada. Gracias por consultarnos.
            </p>
          )}
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        className="chatbot-launcher"
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default Chatbot;