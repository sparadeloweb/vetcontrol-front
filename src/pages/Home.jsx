// Modificaciones de cabeceras / meta datos (React Helmet)
import { Helmet } from "react-helmet-async";

import HomeMain from "../components/Home/Main";

export default function Home () {
    return (
        <>
            <Helmet>
                <title>Inicio - VetControl</title>
                <meta name="title" content="Inicio | VetControl" />
            </Helmet>
            <div className="page__content">
                <HomeMain />
            </div>
        </>
    )
}