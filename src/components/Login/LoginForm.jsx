// Manejo de estado
import { useState } from 'react';

// Iconos para inputs
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

// Funcion encargada de inicio de sesión
import { loginHandler } from '../../helpers/apiFunctions';

// Contexto de usuario
import { useUserToggleContext } from '../../contexts/UserProvider';

// Notificaciones
import { successNotification, errorNotification } from '../../helpers/notifications'

// Boton Estilado
import MagicButton from '../Buttons/MagicButton';

export default function LoginForm () {

    // Estados para manejar los valores de los inputs
    const [inputFields, setInputFields] = useState({
        email: "",
        password: ""
    });

    // Funcion encargada de manejar los valores de los inputs
    const handleInputsChange = (event) => {
        const {name, value} = event.target;
        setInputFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Llamo del contexto la función encargada de settear los datos del usuario (no la ejecuto)
    const setUserCredentials = useUserToggleContext();

    // Funcion encargada de hacer petición al backend cuando el usuario clickea en "Iniciar sesion" y accionar
    const handleFormSubmit = async () => {
        try {
            const loginResponse = await loginHandler(inputFields);

            if (loginResponse.data.status === 200) {
                setUserCredentials({
                    token: loginResponse.data.token,
                    user: loginResponse.data.user
                })
                successNotification(loginResponse.data.message); // Muestro notificacion de exito
            } else {
                errorNotification(loginResponse.data.message); // Muestro notificacion de fallo
            }
        } catch (e) {
            console.log(e); // Si falla algo externo muestro el error en consola
        }
    }

    return (
        <div className="login__container_form">
            <h1>
                Bienvenido a
                <span className='magic-text'> VetControl</span>
            </h1>
            <form>
                <div className="login__input mt-0">
                    <MdOutlineAlternateEmail 
                        className={inputFields.email.length > 0? 'icon-active' : null}
                    />
                    <input 
                        type="email"
                        name="email"
                        autoComplete='email'
                        value={inputFields.email}
                        onChange={(e) => handleInputsChange(e)}
                        placeholder="Correo electrónico"
                    />
                </div>
                <div className="login__input">
                    <RiLockPasswordLine 
                        className={inputFields.password.length > 0 ? 'icon-active' : null}
                    />
                    <input 
                        type="password"
                        name="password"
                        autoComplete='current-password'
                        value={inputFields.password}
                        onChange={(e) => handleInputsChange(e)}
                        placeholder="Contraseña"
                    />
                </div>
                <MagicButton
                    text="Ingresar"
                    onClickFunction={handleFormSubmit}
                />
            </form>
            <p className='login__copyright'>
                © Creador por Santiago Paradelo, Pablo Álvarez, Elias Gonzales y Valentino Gambino
            </p>
        </div>
    )
}