import "./Contact.css";

function Contact() {
  const direccion =
    "Rolling Code School, General Paz 576, San Miguel de Tucumán";

  const enlaceMapa = `https://www.bing.com/maps?q=${encodeURIComponent(
    direccion
  )}`;

  return (
    <section className="contact" aria-labelledby="contact-titulo">
      <div className="contact-contenedor">
        <div className="contact-info">
          <p className="contact-subtitulo">COMO LLEGAR</p>
          <h2 id="contact-titulo" className="contact-titulo">
            Te epesramos en
            <br />
            Rolling Code
            <br />
            School
          </h2>
          <div className="contact-direccion">
            <svg
              className="contact-icono"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            <address>
              <strong>Calle Gral. Paz 576, Entrepiso</strong>
              <span>4000 San Miguel de Tucumán, Tucumán</span>
            </address>
          </div>
          <ul className="contact-detalles">
            <li>Jueves 19/11</li>
            <li>18.00 hs</li>
            <li>Entrepiso</li>
          </ul>
          <div className="contact-acciones">
            <a
              href={enlaceMapa}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-boton contact-boton--mapa"
            >
              Abrir en Bing Maps
            </a>
            <a
              href="#entradas"
              className="contact-boton contact-boton--entrada"
            >
              Comprar entrada
            </a>
          </div>
        </div>
        <a
          href={enlaceMapa}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-mapa"
          aria-label="Ver la ubicación de Rolling Code School en Bing Maps"
        >
          <div className="contact-mapa-dibujo" aria-hidden="true">
            <div className="contact-calle contact-calle--horizontal" />
            <div className="contact-calle contact-calle--vertical" />
            <div className="contact-marcador">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
            </div>
          </div>
          <div className="contact-mapa-tarjeta">
            <div>
              <strong>Rolling Code School</strong>
              <span>Gral. Paz 576 · San Miguel de Tucumánn</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default Contact;