// Importa las dependencias necesarias
import { useState, createContext, useContext } from "react";
import Cookies from "js-cookie"; // Paquete para manejar cookies facilmente

// Define dos contextos, uno para manejar al usuario y otro para la función de seteo de datos
const userContext = createContext();
const userToggleContext = createContext();

// Define Hooks personalizados para el manejo de estado y evitar "useContext"
export function useUserContext() {
    return useContext(userContext);
}

export function useUserToggleContext() {
    return useContext(userToggleContext);
}

// Provider del Contexto
export function UserProvider ({ children }) {

    // Estado del usuario - Recupera los datos de las cookies, si no lo inicia como null
    const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);

    // Función encargada de cargar los datos en las cookies y al estado
    const setUserCredentials = (data) => {
        Cookies.set('user', JSON.stringify(data), {
            expires: 7, // Establece la duración de la cookie (en este caso le puse 7 días)
            secure: true, // Hace que la cookie sea segura (solo se envía a través de HTTPS)
            sameSite: 'strict' // Protege contra ataques CSRF (ataque que hace que un usuario autenticado ejecute acciones que no quiere hacer)
        });
        setUser(data);
    }

    // Función encargada de eliminar los datos de las cookies y del estado
    const signOutUser = () => {
        Cookies.remove('user');
        setUser(null);
    }

    // Devuelve el árbol de componentes y continúa la cadena pasando la prop children
    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={{ setUserCredentials, signOutUser }}>
                {children}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}
