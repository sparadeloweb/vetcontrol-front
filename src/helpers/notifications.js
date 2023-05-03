import { toast } from 'react-toastify';

/* 
Funciones encargadas de mostrar notificaciones, se creo este archivo para evitar
funciones largas en componentes.
*/

// Respuesta TODO BIEN 👍
export function successNotification (message) {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

// Respuesta SALIO TODO MAL 💀
export function errorNotification (message) {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}