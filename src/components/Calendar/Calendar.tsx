import "./Calendar.css";
import { EVENT_DATE_ISO, EVENT_DATE_LABEL, talks } from "../../data/eventData";

function Calendar() {
  return (
    <section id="agenda" className="agenda">
      <div className="agenda-container row g-4">
        <div className="col-lg-4">
          <header className="agenda-header">
            <p className="agenda-label">Agenda</p>
            <h2 className="agenda-title">
              <time dateTime={EVENT_DATE_ISO}>{EVENT_DATE_LABEL}</time>
            </h2>
            <p className="agenda-description">
              Diez charlas cortas para salir con un plan claro. Al final queda
              tiempo para preguntas y networking.
            </p>
          </header>
        </div>
        <div className="col-lg-8">
          <ol className="agenda-list">
            {talks.map((t) => (
              <li key={t.time} className="agenda-item">
                <time className="agenda-time" dateTime={t.time}>
                  {t.time}
                </time>
                <div className="agenda-talk">
                  <h3>{t.topic}</h3>
                  {t.speaker && <p>{t.speaker}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
export default Calendar;
