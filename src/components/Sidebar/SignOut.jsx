/*

Componente encargado de cerrar sesión

*/

// Funciones de manejo de usuario
import { useUserToggleContext } from '../../contexts/UserProvider';

// Icono de puerta
import { BsDoorOpenFill } from "react-icons/bs";

export default function SignOut () {

    const { signOutUser } = useUserToggleContext();

    return (
        <div className="sign__out">
            <hr />
            <div onClick={signOutUser}>
                <BsDoorOpenFill />
                <span>Cerrar sesión</span>
            </div>
        </div>
    )
}