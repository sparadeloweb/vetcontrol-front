// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

// Tabla principal
import EditPet from "../../components/Pets/EditPet";

// Componente para manejar la vuelta a la pagina previa (React Router DOM)
import { Link } from "react-router-dom";

// Icono back
import { FaChevronLeft } from "react-icons/fa";

// Pagina dedicada a editar mascota
export default function PetsEdit () {
    return (
        <>
            <Helmet>
                <title>Editar Mascota - VetControl</title>
                <meta name="title" content="Editar Mascota | VetControl" />
            </Helmet>
            <div className="page__content">
                <h1>
                    <Link to="/mascotas">
                        <FaChevronLeft /> Mascotas
                    </Link> / Editar
                </h1>
                <EditPet />
            </div>
        </>
    )
}