import { useEffect, useRef, useState } from "react";
import "./Timer.css";

const deadline = new Date("2026-11-01T00:00:00-03:00").getTime();

const totalTickets = 60;
const remainingTickets = 38;

const soldPercentage = Math.round(
  ((totalTickets - remainingTickets) / totalTickets) * 100
);

function getRemainingTime() {
  const difference = Math.max(0, deadline - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    expired: difference === 0,
  };
}

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
}

function Countdown({ days, hours, minutes }: CountdownProps) {
  const units = [
    { label: "DÍAS", value: days },
    { label: "HORAS", value: hours },
    { label: "MIN", value: minutes },
  ];

  return (
    <div
      className="timer-countdown"
      role="timer"
      aria-label={`${days} días, ${hours} horas y ${minutes} minutos restantes`}
    >
      {units.map((unit) => (
        <div className="timer-unit" key={unit.label} aria-hidden="true">
          <span className="timer-unit__value">
            {String(unit.value).padStart(2, "0")}
          </span>

          <span className="timer-unit__label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

function Timer() {
  const sectionRef = useRef<HTMLElement>(null);

  const [timeLeft, setTimeLeft] = useState(getRemainingTime);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se activa solamente cuando el bloque quedó arriba de la pantalla.
        setIsFloating(
          !entry.isIntersecting && entry.boundingClientRect.bottom <= 0
        );
      },
      { threshold: 0 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="timer"
        aria-labelledby="timer-title"
      >
        <div className="timer-panel">
          <div className="timer-info">
            <p className="timer-eyebrow">EARLY BIRD</p>

            <h2 id="timer-title" className="timer-title">
              {timeLeft.expired
                ? "Terminó el precio especial"
                : "El precio especial termina el 31/10"}
            </h2>

            <p className="timer-description">
              {timeLeft.expired
                ? "Consultá las entradas disponibles."
                : "Después la entrada pasa de $25.000 a $35.000."}
            </p>
          </div>

          <Countdown {...timeLeft} />

          <div className="timer-availability">
            <div className="timer-availability__header">
              <p>Quedan {remainingTickets} de {totalTickets} Early Bird</p>

              <span>{soldPercentage}% vendidas</span>
            </div>

            <div
              className="timer-progress"
              role="progressbar"
              aria-label="Entradas Early Bird vendidas"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={soldPercentage}
            >
              <div
                className="timer-progress__fill"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {isFloating && !timeLeft.expired && (
        <aside
          className="timer-floating"
          aria-label="Tiempo restante del precio Early Bird"
        >
          <Countdown {...timeLeft} />
        </aside>
      )}
    </>
  );
}

export default Timer;