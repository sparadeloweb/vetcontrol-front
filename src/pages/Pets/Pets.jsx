// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

// Tabla principal
import TableMain from "../../components/Pets/TableMain";

// Pagina dedicada a mostrar el listado de mascotas y datos de utilidad
export default function Pets () {
    return (
        <>
            <Helmet>
                <title>Mascotas - VetControl</title>
                <meta name="title" content="Mascotas | VetControl" />
            </Helmet>
            <div className="page__content">
                <h1>Listado de Mascotas</h1>
                <TableMain />
            </div>
        </>
    )
}