import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";

interface MenuLink {
  label: string;
  href: string;
}

const menuLinks: MenuLink[] = [
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#schedule" },
  { label: "Cómo llegar", href: "#location" },
];

function NavBar() {
  return (
    <Navbar expand="lg" className="rc-navbar" data-bs-theme="dark">
      <Container fluid className="rc-container">
        <Navbar.Brand href="#home" className="rc-navbar__brand m-0 p-0">
          Rolling Code School
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-menu" aria-label="Abrir menú" />

        <Navbar.Collapse id="main-menu">
          <Nav className="ms-auto align-items-lg-center">
            {menuLinks.map((link) => (
              <Nav.Link key={link.href} href={link.href}>
                {link.label}
              </Nav.Link>
            ))}
            <Button variant="" href="#tickets" className="rc-btn rc-btn--menu">
              Comprar entrada
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;