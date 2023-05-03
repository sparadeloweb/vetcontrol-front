// Modificaciones de cabeceras / meta datos (React Helmet)
import {Helmet} from "react-helmet-async";

export default function Home () {
    return (
        <>
            <Helmet>
                <title>Inicio - VetControl</title>
                <meta name="title" content="Inicio | VetControl" />
            </Helmet>
            <h1>Hola</h1>
        </>
    )
}