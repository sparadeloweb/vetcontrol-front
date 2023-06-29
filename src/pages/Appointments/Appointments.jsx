// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

// Tabla principal
import TableMain from "../../components/Appointments/TableMain";

// Pagina dedicada a mostrar el listado de mascotas y datos de utilidad
export default function Appointments () {
    return (
        <>
            <Helmet>
                <title>Turnos - VetControl</title>
                <meta name="title" content="Turnos | VetControl" />
            </Helmet>
            <div className="page__content">
                <h1>Listado de Turnos</h1>
                <TableMain />
            </div>
        </>
    )
}