// Hooks necesarios para manejar funciones asociadas a React
import { useState, useEffect, useCallback } from "react";

// Cargo los estilos generales de la página
import './styles.css';

// Funciones para manejar turnos
import { getAllAppointments, deleteAppointment } from "../../helpers/apiFunctions";

// Componente para manejar el direccionamiento a paginas relacionadas (React Router DOM)
import { Link } from "react-router-dom";

// Iconos
import { AiOutlineGroup, AiOutlineUngroup} from "react-icons/ai";
import { FaDog, FaCat } from "react-icons/fa";

// Counter Widget
import Counter from "../Counter";

// Tabla de turnos
import AppointmentTable from "./AppointmentTable";

// Tabla encargada de mostrar las turnos
export default function AppointmentMain () {

    const [appointments, setAppointments] = useState([]); // Estado para cargar el listado de turnos

    // Función para eliminar una cita, pasada a useCallback para que mantenga la referencia en el React.memo de la tabla
    const handleDelete = useCallback(async (id) => {
        await deleteAppointment(id);
        const { data } = await getAllAppointments();
        setAppointments(data.appointments);
    }, []);

    // Creo un estado para manejar la busqueda, no es necesario usar el custom hook para forms ya que es un solo campo
    const [searchValue, setSearchValue] = useState("");

    // useEffect encargado de manejar la carga de turnos a la lista
    useEffect(() => {
        async function fetchAppointments() {
            const { data } = await getAllAppointments();
            setAppointments(data.appointments);
        }
        fetchAppointments();
    }, []);

    // Filtro las turnos basándonos en el valor de búsqueda
    let filteredAppointments = appointments.filter(appointment =>
        appointment.pet?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        appointment.notes.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="turnos__container ">
            <div className="cards__sections">
                <Counter
                    title="Turnos totales"
                    quantity={appointments.length}
                    icon={<AiOutlineGroup />}
                />
                <Counter
                    title="Turnos con perros"
                    quantity={appointments.filter(appointment => appointment.pet?.type === 'Perro').length}
                    icon={<FaDog />}
                />
                <Counter
                    title="Turnos con gatos"
                    quantity={appointments.filter(appointment => appointment.pet?.type === 'Gato').length}
                    icon={<FaCat />}
                />
                <Counter
                    title="Otros turnos"
                    quantity={appointments.filter(appointment => (appointment.pet?.type !== 'Gato' && appointment.pet?.type !== 'Perro')).length}
                    icon={<AiOutlineUngroup />}
                />
            </div>
            <div className="turnos__main__table ">
                <Link to="/turnos/cargar" className="add__button">+ Cargar turno</Link>
                <input 
                    type="text" 
                    className="search__input" 
                    value={searchValue} 
                    onChange={event => setSearchValue(event.target.value)} 
                    placeholder="Buscar turno..." 
                />
                {/* Tabla pasada por React Memo para optimización ya que es "el componente más pesado"*/}
                <AppointmentTable appointments={filteredAppointments} handleDelete={handleDelete} />
            </div>
        </div>
    )
}
