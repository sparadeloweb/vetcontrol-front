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

// Función para obtener todas las mascotas
export async function getAllPets() {
    try {
        const response = await axios.get('/pets');
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para obtener una sola mascota
export async function getSinglePet(id) {
    try {
        const response = await axios.get(`/pets/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Funcion para actualizar una mascota
export async function updatePet(id, petData) {
    try {
        const response = await axios.put(`/pets/${id}`, petData);
        return response;
    } catch (e) {
        console.log(e)
    }
}  

// Función para crear una nueva mascota
export async function createPet(petData) {
    try {
        const response = await axios.post('/pets', petData);
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para eliminar una mascota
export async function deletePet(id) {
    try {
        const response = await axios.delete(`/pets/${id}`);
        return response;
    } catch (e) {
        console.error(e);
    }
}

// Función para obtener todas las citas
export async function getAllAppointments() {
    try {
        const response = await axios.get('/appointments');
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para obtener una sola cita
export async function getSingleAppointment(id) {
    try {
        const response = await axios.get(`/appointments/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para crear una nueva cita
export async function createAppointment(appointmentData) {
    try {
        const response = await axios.post('/appointments', appointmentData);
        return response;
    } catch (e) {
        console.log(e);
    }
}

// Función para actualizar una cita
export async function updateAppointment(id, appointmentData) {
    try {
        const response = await axios.put(`/appointments/${id}`, appointmentData);
        return response;
    } catch (e) {
        console.log(e);
    }
}  

// Función para eliminar una cita
export async function deleteAppointment(id) {
    try {
        const response = await axios.delete(`/appointments/${id}`);
        return response;
    } catch (e) {
        console.error(e);
    }
}
