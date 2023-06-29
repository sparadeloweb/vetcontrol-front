import { useEffect, useState } from 'react';

// Funciones de ayuda para interactuar con la API
import { updateAppointment, getSingleAppointment, getAllPets } from '../../helpers/apiFunctions';

// Custom Hook para el manejo de Forms
import useForm from '../../hooks/useForm';

// Funcion encargada de redireccionar al terminar de editar
import { useNavigate } from 'react-router-dom';

// Funcion para manejar parametros del URL
import { useParams } from 'react-router-dom';

// Notificaciones
import { successNotification, errorNotification } from '../../helpers/notifications';

export default function EditAppointment () {
    const { id } = useParams(); // Obtengo el ID en base de datos del turno desde el URL
    
    // Funcion para navegar directamente con React Router Dom
    const navigate = useNavigate();

    // Declaro los inputs a utilizar en mi form
    const {formData, handleInputChange, setFormData} = useForm({
        petId: "",
        appointmentDate: "",
        notes: "",
        cost: ""
    });

    const [pets, setPets] = useState([]); // Estado para cargar el listado de mascotas

    // useEffect encargado de traer los datos necesarios al cargar la pagina
    useEffect(() => {
        const fetchAppointmentAndPets = async () => { // Traigo el listado de mascotas y los datos del turno
            const { data: appointmentData } = await getSingleAppointment(id);
            const { data: petsData } = await getAllPets();

            if (appointmentData.status === 200 && petsData.status === 200) {
                let { pet, appointmentDate, notes, cost } = appointmentData.appointment; // Extraigo los valores de la respuesta de la API

                // Convierto la fecha a un objeto Date y luego a string en formato YYYY-MM-DDTHH:mm para poder meterla en el input de fecha
                appointmentDate = new Date(appointmentDate).toISOString().split('.')[0];
                
                setFormData({petId: pet, appointmentDate, notes, cost}) // Setteo los valores de los inputs
                
                setPets(petsData.data); // Y setteo el listado de mascotas
            } else {
                errorNotification(appointmentData.message);
            }
        }

        fetchAppointmentAndPets();
    }, [id, setFormData]);

    // Funcion encargada de manejar el envio de formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Intento enviar la solicitud al backend
        try {
            const { data } = await updateAppointment(id, formData);
            if (data.status === 200) {
                console.log(data)
                successNotification(`Turno para ${data.appointment.pet?.name} actualizado con éxito !`);
                navigate("/turnos");
            } else {
                errorNotification(data.message);
            }
        } catch (error) {
            errorNotification(error);
        }
    };

    return (
        <div className={`turnos__main__table add__edit`}>
            <form onSubmit={handleSubmit}>
                <label>
                    Mascota:
                    <select name="petId" value={formData.petId} onChange={handleInputChange}>
                        <option value="" disabled>Selecciona una mascota</option>
                        {pets.map(pet => 
                            <option key={pet._id} value={pet._id} selected={formData.petId === pet._id ? true : false}>{pet.name}</option>
                        )}
                    </select>
                </label>
                <label>
                    Fecha y hora del turno:
                    <input type="datetime-local" value={formData.appointmentDate} name="appointmentDate" onChange={handleInputChange} />
                </label>
                <label>
                    Costo de la visita:
                    <input type="number" value={formData.cost} name="cost" onChange={handleInputChange} min="0" step="0.01" />
                </label>
                <label>
                    Notas del turno:
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} />
                </label>
                <hr />
                <button type="submit">Actualizar turno</button>
            </form>
        </div>
    )
}
