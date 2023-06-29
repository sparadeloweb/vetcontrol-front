// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

// Tabla principal
import AddAppointment from "../../components/Appointments/AddAppointment";

// Componente para manejar la vuelta a la pagina previa (React Router DOM)
import { Link } from "react-router-dom";

// Icono back
import { FaChevronLeft } from "react-icons/fa";

// Pagina dedicada a añadir mascota
export default function AppointmentAdd () {
    return (
        <>
            <Helmet>
                <title>Cargar Turno - VetControl</title>
                <meta name="title" content="Cargar Turno | VetControl" />
            </Helmet>
            <div className="page__content">
                <h1>
                    <Link to="/turnos">
                        <FaChevronLeft /> Turnos
                    </Link> / Cargar
                </h1>
                <AddAppointment />
            </div>
        </>
    )
}