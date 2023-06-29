// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

// Tabla principal
import EditAppointment from "../../components/Appointments/EditAppointment";

// Componente para manejar la vuelta a la pagina previa (React Router DOM)
import { Link } from "react-router-dom";

// Icono back
import { FaChevronLeft } from "react-icons/fa";

// Pagina dedicada a editar mascota
export default function PetsEdit () {
    return (
        <>
            <Helmet>
                <title>Editar Turno - VetControl</title>
                <meta name="title" content="Editar Turno | VetControl" />
            </Helmet>
            <div className="page__content">
                <h1>
                    <Link to="/turnos">
                        <FaChevronLeft /> Turnos
                    </Link> / Editar
                </h1>
                <EditAppointment />
            </div>
        </>
    )
}