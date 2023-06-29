import { useEffect } from 'react';

// Funcion encargada de mandar petición al backend para actualizar mascota
import { updatePet, getSinglePet } from '../../helpers/apiFunctions';

// Funcion encargada de redireccionar al terminar de editar
import { useNavigate } from 'react-router-dom';

// Funcion para manejar parametros del URL
import { useParams } from 'react-router-dom';

// Custom Hook para el manejo de Forms
import useForm from '../../hooks/useForm';

// Notificaciones
import { successNotification, errorNotification } from '../../helpers/notifications';

export default function EditPet () {
    const { id } = useParams(); // Obtengo el ID en base de datos de la mascota desde el URL
    
    // Funcion para navegar directamente con React Router Dom
    const navigate = useNavigate();

    // Declaro los inputs a utilizar en mi form
    const {formData, handleInputChange, setFormData} = useForm({
        name: "",
        dateOfBirth: "",
        type: "",
        owner: "",
        customType: "",
    });

    // useEffect encargado de traer los datos necesarios al cargar la pagina
    useEffect(() => {
        const fetchPet = async () => { // Declaro funcion para obtener los datos de la mascota
            const { data } = await getSinglePet(id);
            if (data.status === 200) {
                let { name, dateOfBirth, type, owner } = data.data; // Lo extraigo como let y no const para poder modificarlo

                 // Convertir la fecha a un objeto Date y luego a string en formato YYYY-MM-DD
                dateOfBirth = new Date(dateOfBirth);
                dateOfBirth = dateOfBirth.toISOString().split('T')[0];
                setFormData({ name, dateOfBirth, type, owner, customType: "" });
            } else {
                errorNotification(data);
            }
        }

        fetchPet();
    }, [id, setFormData]);

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
            const { data } = await updatePet(id, petData);
            if (data.status === 200) {
                successNotification(`Mascota ${data.data.name} actualizada con éxito !`);
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
                <button type="submit">Actualizar mascota</button>
            </form>
        </div>
    )
}
