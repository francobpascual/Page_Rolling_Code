import { createElement } from "react";
import { Button, Container, FormLabel, Nav, Navbar, NavbarCollapse} from "react-bootstrap";
import "../navbar/navbar.css";

interface MenuLink{
  label: string;
  href: string;
}

const menuLinks: MenuLink[]=[
  {label:"speakers", href:"#speakers"},
  {label:"agenda", href:"#schedule"},
  {label: "como llegar", href: "#location"}
];

const drakTheme= {"data-bs-theme": "dark"};

function NavBar(){
  const links= menuLinks.map ((link) =>
    createElement(Nav.Link, {key: link.href, href: link.href}, link.label)
  );

  const ticketsButton= createElement(
    Button,
    {variant:"", href: "#tickets", className:"rc-btn rc-btn--menu"},
    "Comprar entrada"
  );
  const brand = createElement(
    Navbar.Brand,
    {href: "#home", className: "rc-navbar__brand m-0 p-0"},
    "Rolling Code School "
  );
  const toggle = createElement(Navbar.Toggle,{
    "aria-controls": "main-menu",
    "aria-label": "Abrir menu",
  });
  const menu = createElement(
   NavbarCollapse,
   {id: "main-menu"},
   createElement(
    Nav,

    {className: "ms-auto align-items-leg-center gap-lg-4"},
    ...links,
    ticketsButton
   ) 
  );
  return createElement(
    Navbar,
    {expand: "lg", className: "rc-navbar", ...drakTheme},
    createElement(Container,{fluid: true, className: "rc.container"},brand,toggle,menu)
  );
}
export default NavBar;
