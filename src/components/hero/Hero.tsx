import "./Hero.css";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-panel">
        <div className="row g-4 align-items-center">
          {/* Presentación del evento */}
          <div className="col-12 col-lg-7">
            <div className="hero-content">
              <p className="hero-eyebrow">
                <span className="hero-workshop">WORKSHOP</span>{" "}
                <strong>ENTRADAS LIMITADAS</strong>
              </p>

              <h1 id="hero-title" className="hero-title">
                ¿POR DÓNDE
                <br />
                EMPIEZO A
                <br />
                <span>PROGRAMAR?</span>
              </h1>

              <p className="hero-description">
                Una tarde con diez speakers de Rolling Code School
                para ordenar tus primeros pasos: qué aprender,
                cómo practicar y cómo mostrar lo que sabés.
              </p>

              <div className="hero-actions">
                <a
                  className="hero-button hero-button--primary"
                  href="#entradas"
                >
                  Comprar entrada
                </a>

                <a
                  className="hero-button hero-button--secondary"
                  href="#agenda"
                >
                  Ver agenda
                </a>
              </div>
            </div>
          </div>

          {/* Datos del evento */}
          <div className="col-12 col-lg-5">
            <div className="hero-event">
              <div className="hero-event-row">
                <svg
                  className="hero-event-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="3" />
                  <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>

                <div>
                  <p className="hero-event-date">JUE 19/11</p>
                  <p className="hero-event-time">18.00 hs</p>
                </div>
              </div>

              <div className="hero-event-row">
                <svg
                  className="hero-event-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>

                <div>
                  <p className="hero-event-heading">
                    Rolling Code School
                  </p>

                  <p className="hero-event-detail">
                    Gral. Paz 576, Entrepiso
                  </p>
                </div>
              </div>

              <div className="hero-event-row hero-event-row--last">
                <svg
                  className="hero-event-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 5h16a1 1 0 0 1 1 1v3a3 3 0 0 0 0 6v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a3 3 0 0 0 0-6V6a1 1 0 0 1 1-1Z" />
                  <path d="M15 5v3m0 3v2m0 3v3" />
                </svg>

                <div>
                  <p className="hero-event-heading">
                    Entradas desde $15.000
                  </p>

                  <p className="hero-event-detail">
                    Early Bird hasta el 31/10
                  </p>
                </div>
              </div>

              <ul className="hero-badges">
                <li className="hero-badge">Presencial</li>
                <li className="hero-badge">Virtual</li>
                <li className="hero-badge hero-badge--highlight">
                  Cupos limitados
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;