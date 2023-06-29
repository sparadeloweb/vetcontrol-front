import { useState } from "react";

// Hook custom para simplificar el uso de formularios
export default function useForm (initData) {
    const [formData, setFormData] = useState(initData); // Inicializo el form

    const handleInputChange = ( { target } ) => { // Obtengo el target que contiene el nombre del input, el tipo y en base a eso el valor actual
        const { name, type } = target;
        const value = type === 'checkbox' ? target.checked : target.value; // Si el tipo es de checkbox obtendrá el valor marcado, si no el valor del input en si

        setFormData({ // Actualizo los valores del form
            ...formData,
            [ name ]: value // Se ponen entre corchetes para indicar que es variable y no una llave 'name'
        });
    }
    
    return { // Devuelvo ambas cosas para poder usarlo
        formData,
        handleInputChange,
        setFormData
    }
}