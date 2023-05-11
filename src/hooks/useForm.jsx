import { useState } from "react";

// Hook custom para simplificar el uso de formularios
export default function useForm (initData) {
    const [formData, setFormData] = useState(initData); // Inicializo el form

    const handleInputChange = ( { target } ) => { // Obtengo el target que contiene el nombre del input y el valor actual
        const { name, value } = target;

        setFormData({ // Actualizo los valores del form
            ...formData,
            [ name ]: value // Se ponen entre corchetes para indicar que es variable y no una llave 'name'
        });
    }
    return { // Devuelvo ambas cosas para poder usarlo
        formData,
        handleInputChange
    }
}