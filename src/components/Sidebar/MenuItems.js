
// Para agregar un conjunto de submenús a un menú exportar el array con ellos desde aquí y luego pasarlo como argumento a MenuItem (componente)
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";

// Los iconos los paso como una funcion anonima ya que no estoy en un componente y no los puedo llamar directamente

export const petsItems = [
    {
        title: "Ver todas",
        icon: () => <AiOutlineEye />,
        href:  "/mascotas"
    },
    {
        title: "Añadir nueva",
        icon: () => <AiOutlinePlus />,
        href:  "/mascotas/añadir"
    }
]

export const attendanceItems = [
    {
        title: "Ver todos",
        icon: () => <AiOutlineEye />,
        href:  "/turnos"
    },
    {
        title: "Cargar nuevo",
        icon: () => <AiOutlinePlus />,
        href:  "/turnos/cargar"
    }
]