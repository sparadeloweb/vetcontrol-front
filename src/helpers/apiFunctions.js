// Peticiones HTTP
import axios from 'axios';

// Configuración URL base para axios desde archivo .env
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Configuración de envío de contenido en formato JSON para axios
axios.defaults.headers.post["Content-Type"] = "application/json";

// Funcion encargada de hacer la peticion al backend para iniciar sesion
export async function loginHandler ({email, password}) {
    try {
        const data = { // Defino la estructura de datos que le voy a mandar a la solicitud POST
            email: email,
            password: password
        }
        
        const response = await axios.post('/signin', data); // Le pego al backend
    
        return response; // Devuelvo respuesta
    } catch (e) {
        console.log(e)
    }
}