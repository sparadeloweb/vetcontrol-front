// Funcion encargada de mandar petición al backend para crear mascota
import { createPet } from '../../helpers/apiFunctions';

// Custom Hook para el manejo de Forms
import useForm from '../../hooks/useForm';

// Notificaciones
import { successNotification, errorNotification } from '../../helpers/notifications';

// Funcion navigate para redirigir luego de crear mascota
import { useNavigate } from 'react-router-dom';

// Componente dedicado a añadir una mascota al listado
export default function AddPet () {

    // Declaro los inputs a utilizar en mi form
    const {formData, handleInputChange} = useForm({
        name: "",
        dateOfBirth: "",
        type: "",
        owner: "",
        customType: "",
    })

    // Funcion para navegar directamente con React Router Dom
    const navigate = useNavigate();

    // Funcion encargada de manejar el envio de formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Junto la información de la mascota
        const petData = {
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            type: formData.type !== 'Otro' ? formData.type : formData.customType,
            owner: formData.owner,
        };

        // Intento enviar la solicitud al backend
        try {
            const { data } = await createPet(petData);
            if (data.status === 200) {
                successNotification(`Mascota ${data.data.name} creada con éxito !`);
                navigate("/mascotas");
            } else {
                errorNotification(data.message);
            }
        } catch (error) {
            errorNotification(error);
        }
    };

    return (
        <div className={`pets__main__table add__edit ${formData.type === 'Otro' && 'other__type'}`}>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={formData.name} name="name" onChange={handleInputChange} />
                </label>
                <label>
                    Fecha de nacimiento:
                    <input type="date" value={formData.dateOfBirth} name="dateOfBirth" onChange={handleInputChange} />
                </label>
                <label>
                    Tipo:
                    <select value={formData.type} name="type" onChange={handleInputChange}>
                        <option value="" disabled>Selecciona un tipo</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otro">Otro</option>
                    </select>
                </label>

                {formData.type === 'Otro' && (
                    <label>
                        Tipo personalizado:
                        <input type="text" value={formData.customType} name="customType" onChange={handleInputChange} />
                    </label>
                )}

                <label>
                    Dueño:
                    <input type="text" name="owner" value={formData.owner} onChange={handleInputChange} />
                </label>
                <hr />
                <button type="submit">Añadir mascota</button>
            </form>
        </div>
    )
}