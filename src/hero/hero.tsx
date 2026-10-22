import {Button, Col, Row} from 'react-bootstrap';
import './Hero.css';

function CalendarIcon(){
  return(
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <path d="M7 3v4M17 3v4M3 10h18"/>
  </svg>
);
}

function PinIcon(){
  return(
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
);
}

function TicketIcon(){
  return(
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 7a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4v-2a2 2 0 0 0 0-4Z" />
    <path d="M14 7v2m0 3v2m0 3v1"/>
  </svg>
);
}

export function Hero(){
  return(
  <section id="inicio" className="rc-section--hero">
    <div className="rc-container">
    <div className="rc-block hero-block">
        <Row className="align-items-center g-4 g-xl-5"><Col lg={7}>
        <p className="hero-eyebrow">
        <span>WORKSHOP</span> ENTRADAS LIMITADAS
        </p>
        <h1 className="hero-title">
        ¿POR DÓNDE
        <br className="desktop-break"/>EMPIEZO A<br className="desktop-break" />{' '}
        <span>PROGRAMAR?</span>
        </h1>
        <p className="rc-lead hero-description">
            Una tarde con diez speakers de Rolling Code School para
            ordenar tus primeros pasos: qué aprender, cómo practicar
        y cómo mostrar lo que sabés.</p>
        <div className="hero-actions">
        <Button href="#checkout"className="rc-btn btn-rc-dark">Comprar entrada</Button>
        <Button href="#agenda"variant="outline-light"className="rc-btn rc-btn--outline">Ver agenda</Button>
        </div>
        </Col>
        <Col lg={5}>
        <aside className="event-card"aria-label="Información del evento">
        <div className="event-detail">
        <CalendarIcon />
        <div>
            <strong>JUE 19/11</strong>
            <span className="event-time">18.00 hs</span>
        </div>
        </div>
        <div className="event-detail">
            <PinIcon />
            <div>
                <strong>Rolling Code School</strong>
                <span>Gral. Paz 576, Entrepiso</span>
            </div>
         </div>
        <div className="event-detail event-detail--last">
            <TicketIcon />
            <div>
                <strong>Entradas desde $15.000</strong>
                <span>Early Bird hasta el 31/10</span>
            </div>
        </div>
        <div className="event-chips">
            <span className="rc-chip">Presencial</span>
            <span className="rc-chip">Virtual</span>
            <span className="rc-chip rc-chip--red">Cupos limitados</span>
        </div>
        </aside>
        </Col>
        </Row>
    </div>
    </div>
    </section>
);
}