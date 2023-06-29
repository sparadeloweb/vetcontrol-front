// Funcion encargada de mandar petición al backend para crear una turno
import { createAppointment, getAllPets } from '../../helpers/apiFunctions';

// Custom Hook para el manejo de Forms
import useForm from '../../hooks/useForm';

// Notificaciones
import { successNotification, errorNotification } from '../../helpers/notifications';

// Funcion navigate para redirigir luego de crear turno
import { useNavigate } from 'react-router-dom';

// React Hooks
import { useState, useEffect } from "react";

// Componente dedicado a añadir una turno al listado
export default function AddAppointment () {

    // Declaro los inputs a utilizar en mi form
    const {formData, handleInputChange} = useForm({
        petId: "",
        appointmentDate: "",
        notes: "",
        cost: "",
    })

    const [pets, setPets] = useState([]); // Estado para cargar el listado de mascotas

    // Funcion para navegar directamente con React Router Dom
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Intento enviar la solicitud al backend
        try {
            const { data } = await createAppointment(formData);
            if (data.status === 200) {
                console.log(data)
                successNotification(`Turno para para ${data.appointment.pet?.name} cargado con éxito !`);
                navigate("/turnos");
            } else {
                errorNotification(data.message);
            }
        } catch (error) {
            errorNotification(error);
        }
    };

    // UseEffect para cargar el listado de mascotas cuando el componente se monta
    useEffect(() => {
        async function fetchPets() {
            const { data } = await getAllPets();
            setPets(data.data);
        }

        fetchPets();
    }, []);

    return (
        <div className={`turnos__main__table add__edit`}>
            <form onSubmit={handleSubmit}>
                <label>
                    Mascota:
                    <select name="petId" value={formData.petId} onChange={handleInputChange}>
                        <option value="" disabled>Selecciona una mascota</option>
                        {pets.map(pet => 
                            <option key={pet._id} value={pet._id}>{pet.name}</option>
                        )}
                    </select>
                </label>
                <label>
                    Fecha y hora de la turno:
                    <input type="datetime-local" value={formData.appointmentDate} name="appointmentDate" onChange={handleInputChange} />
                </label>
                <label>
                    Costo de la visita:
                    <input type="number" value={formData.cost} name="cost" onChange={handleInputChange} min="0" step="0.01" />
                </label>
                <label>
                    Notas de la turno:
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} />
                </label>
                <hr />
                <button type="submit">Añadir turno</button>
            </form>
        </div>
    )
}
