// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

// Tabla principal
import AddPet from "../../components/Pets/AddPet";

// Componente para manejar la vuelta a la pagina previa (React Router DOM)
import { Link } from "react-router-dom";

// Icono back
import { FaChevronLeft } from "react-icons/fa";

// Pagina dedicada a añadir mascota
export default function PetsAdd () {
    return (
        <>
            <Helmet>
                <title>Añadir Mascota - VetControl</title>
                <meta name="title" content="Añadir Mascota | VetControl" />
            </Helmet>
            <div className="page__content">
                <h1>
                    <Link to="/mascotas">
                        <FaChevronLeft /> Mascotas
                    </Link> / Añadir
                </h1>
                <AddPet />
            </div>
        </>
    )
}