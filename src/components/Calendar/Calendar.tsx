import "./Calendar.css";
import {
  EVENT_DATE_ISO,
  EVENT_DATE_LABEL,
  talks,
} from "../../data/eventData";

function Calendar() {
  return (
    <section
      id="agenda"
      className="agenda"
      aria-labelledby="agenda-title"
    >
      <div className="agenda-container">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <header className="agenda-header">
              <p className="agenda-label">AGENDA</p>

              <h2 id="agenda-title" className="agenda-title">
                <time dateTime={EVENT_DATE_ISO}>
                  {EVENT_DATE_LABEL}
                </time>
              </h2>

              <p className="agenda-description">
                Diez charlas cortas para salir con un plan claro.
                Al final queda tiempo para preguntas y networking.
              </p>
            </header>
          </div>

          <div className="col-12 col-lg-8">
            <ol className="agenda-list">
              {talks.map((talk) => (
                <li key={talk.time} className="agenda-item">
                  <time
                    className="agenda-time"
                    dateTime={talk.time}
                  >
                    {talk.time}
                  </time>

                  <div className="agenda-talk">
                    <h3>{talk.topic}</h3>

                    {talk.speaker && <p>{talk.speaker}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;