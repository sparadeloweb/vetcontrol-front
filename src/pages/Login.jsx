// Modificaciones de cabeceras / meta datos (React Helmet)
import {Helmet} from "react-helmet-async";

// Componentes
import LoginMain from "../components/Login/LoginMain";

export default function Login () {
    return (
        <>
            <Helmet>
                <title>Iniciar Sesión - VetControl</title>
                <meta name="title" content="Iniciar Sesión | VetControl" />
                <meta name="description" content="Inicio de sesión de aplicacion VetControl." />
            </Helmet>
            <LoginMain />
        </>
    )
}