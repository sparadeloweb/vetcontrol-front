// Dependencias de React necesarias
import { useEffect } from 'react'

// Hook para navegar con React Router DOM
import { useNavigate } from 'react-router-dom';

// Contexto del usuario
import { useUserContext } from '../contexts/UserProvider';

export default function SessionChecker ({children}) {

    // LLamamos al Hook de React Rooter DOM para manejar las redirecciones
    const navigate = useNavigate();

    // Llamamos del contexto de usuario su valor
    const user = useUserContext();

    // Nos quedamos atentos a cada vez que haya un cambio en el estado de usuario
    useEffect(() => {
        if (!user) { // Si no hay usuario
            navigate('/ingresar'); // Redirecciona
        }
    }, [user, navigate]) // Vigila el estado del usuario y la navegación

    return (
        <>{children}</>
    )
}