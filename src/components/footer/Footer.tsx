import "./Footer.css";
import logo from "../../assets/logo/logo-rolling-blanco.png";

// iconos que pongo en src assets icons (preguntar a tomas si está bien o a franco)

import instagramIcon from "../../assets/icons/instagram.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import xIcon from "../../assets/icons/x.svg";
import githubIcon from "../../assets/icons/github.svg";

const socialLinks = [
  { id: "instagram", name: "Instagram", icon: instagramIcon },
  { id: "facebook", name: "Facebook", icon: facebookIcon },
  { id: "linkedin", name: "LinkedIn", icon: linkedinIcon },
  { id: "youtube", name: "YouTube", icon: youtubeIcon },
  { id: "x", name: "X", icon: xIcon },
  { id: "github", name: "GitHub", icon: githubIcon },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a
          className="footer__brand"
          href="/"
          aria-label="Ir al inicio"
        >
          <img
            className="footer__logo"
            src={logo}
            alt="Rolling Code School"
          />
        </a>

        <nav className="footer__social" aria-label="Redes sociales">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              className="footer__social-link"
              href={`#${social.id}`}
              aria-label={social.name}
            >
              <img
                src={social.icon}
                alt=""
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
export default Footer;