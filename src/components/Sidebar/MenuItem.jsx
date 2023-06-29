// Manejo de estado
import { useState } from "react";

// Manejo de redirecciones de React Router DOM
import { Link } from "react-router-dom";

// Iconos para submenu
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function MenuItem ({icon, title, isSubMenu = false, subMenuItems = [], href = "/"}) {

    const [isOpen, setIsOpen] = useState(false); // Estado que me ayudará a saber si el submenú está abierto

    const handleToggle = () => { // Función que manejará el estado del submenú
      setIsOpen(!isOpen);
    };

    /* 
    
    Si es submenú, utilizará el estado y la función encargada de manejarlo, si no lo es mostrará solo el nombre del menú y el icono.
    Al ser submenú mostrará la flechita para abajo o arriba, si no lo es directamente no preguntará si esta abierto o no.
    Si es submenú y está abierto, mapea todo el array de subMenuItems, compuesto de objetos con una estructura tal que: {title: "", icon: <ComponenteDeIcono/>}
    El icono de cada submenú se ejecuta como una función ya que así es como la creo en MenuItems (para una mejor organizacion y manejo de estos)

    */

    return (
        <Link to={!isSubMenu ? href : null}>
            <hr/>
            <li className="menu__item">
                <span className="menu__item__main" onClick={isSubMenu ? handleToggle : null}>
                    {icon} <small>{title}</small>
                    <span className="submenu__triggers">{isSubMenu && (isOpen ? <FaChevronUp /> : <FaChevronDown/>)}</span>
                </span>
                
                {(isOpen && isSubMenu) && (
                    <ul>
                        {subMenuItems.map((item, index) =>
                            <Link to={item.href} key={index}>
                                <li className="submenu__item">
                                    <span className="submenu__item__main">{item.icon()} <small>{item.title}</small></span>
                                </li>
                            </Link>
                        )}
                    </ul>
                )}
            </li>
        </Link>
    )
}