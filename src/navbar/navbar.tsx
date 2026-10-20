export interface NavbarLink{
  text: string;
  href: string;
}
export interface NavbarConfig{
  logoSrc: string;
  logoAlt: string;
  links: NavbarLink[];
  button: NavbarLink;
}
interface ElementOptions{
  classes?: string;
  text?: string;
  attributes?: Record<string, string>;
}
function buildElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions={}
): HTMLElementTagNameMap[K]{
  const element=document.createElement(tag);
  if (options.classes){
    element.className=options.classes;
  }
  if (options.text){
    element.textContent=options.text;
  }
  if (options.attributes){
    for (const[name, value]of Object.entries(options.attributes)){
      element.setAttribute(name, value);
    }
  }
  return element;
}
export function createNavbar(config: NavbarConfig): HTMLElement{
  const menuId = "main-menu";
  const nav = buildElement("nav",{
    classes: "navbar navbar-expand-lg rc-navbar",
    attributes:{
      "data-bs-theme":"dark",
      "aria-label":"Navegación principal",
    },
  });
  const container = buildElement("div",{ classes: "container" });
  const brand = buildElement("a",{
    classes:"navbar-brand m-0 p-0",
    attributes:{href: "#home", "aria-label": "Rolling Code School - Inicio"},
  });
  const logo=buildElement("img",{
    classes:"rc-navbar__logo",
    attributes:{src: config.logoSrc, alt: config.logoAlt},
  });
  brand.appendChild(logo);
  const toggler=buildElement("button",{
    classes:"navbar-toggler",
    attributes:{
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#${menuId}`,
      "aria-controls": menuId,
      "aria-expanded": "false",
      "aria-label": "Abrir menú",
    },
  });
  toggler.appendChild(buildElement("span",{ classes: "navbar-toggler-icon" }));
  const menu = buildElement("div",{
    classes: "collapse navbar-collapse",
    attributes: { id: menuId },
  });
  const list = buildElement("ul",{
    classes: "navbar-nav ms-auto align-items-lg-center gap-lg-4",
  });
  config.links.forEach((link) =>{
    const item = buildElement("li",{classes: "nav-item"});
    const anchor = buildElement("a",{
      classes: "nav-link",
      text: link.text,
      attributes: {href: link.href},
    });
    item.appendChild(anchor);
    list.appendChild(item);
  });
  const buttonItem = buildElement("li", {classes: "nav-item"});
  const button = buildElement("a",{
    classes: "btn-rc btn-rc--menu",
    text: config.button.text,
    attributes: {href: config.button.href},
  });
  buttonItem.appendChild(button);
  list.appendChild(buttonItem);
  menu.appendChild(list);
  container.append(brand, toggler, menu);
  nav.appendChild(container);
  return nav;
}