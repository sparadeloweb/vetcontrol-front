import { useState } from "react";

// Iconos para el menú
import { FaHome, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { MdPets } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai"

// Componente para renderizar items del Menú
import MenuItem from "./MenuItem";

// Componente con opciones de usuario
import ProfileData from './ProfileData';

// Componente para realizar Sign Out
import SignOut from './SignOut';

// Estilos del componente
import './styles.css';

// Items para los submenús
import { petsItems, attendanceItems } from './MenuItems';

// Datos del usuario
import { useUserContext } from '../../contexts/UserProvider';

export default function SidebarMain () {

    const [isExpanded, setIsExpanded] = useState(true); // Estado para controlar si el menú está expandido

    const user = useUserContext();

    if (!user) {
        return null; // Si el usuario no esta loggeado no se muestra el menú, esto es para el login
        // Si la aplicación fuera más grande no se haría un segundo chequeo acá pero dado el tamaño no hay drama de verificar una vez más
    }

    return ( // Tengo dudas sobre si nav sería la etiqueta que estaría bien semanticamente, quizá aside o un simple div? 
        <nav className={isExpanded ? '' : 'collapsed'}>

            <button onClick={() => setIsExpanded(!isExpanded)} className="expand__collapse__button">
                {isExpanded ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

            <h2 className="main__title">VetControl</h2>
            <h2 className="sec__title">V</h2>

            <span className="menu__desc">Sistema de gestión para veterinarias.</span>

            <ul className="menu__items">
                <MenuItem 
                    icon={ <FaHome/> }
                    title="Inicio"
                />
                <MenuItem 
                    icon={ <MdPets/> }
                    title="Mascotas"
                    isSubMenu
                    subMenuItems={petsItems}
                    href="/mascotas"
                />
                <MenuItem 
                    icon={ <AiFillSchedule/> }
                    title="Turnos"
                    isSubMenu
                    subMenuItems={attendanceItems}
                    href="/turnos"
                />
            </ul>

            <ProfileData 
                userData={user.user}
            />

            <SignOut />
        </nav>
    )
}