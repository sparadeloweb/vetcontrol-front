import { useEffect } from 'react';

// Iconos para inputs
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

// Funcion encargada de inicio de sesión
import { loginHandler } from '../../helpers/apiFunctions';

// Contexto de usuario
import { useUserToggleContext, useUserContext } from '../../contexts/UserProvider';

// Notificaciones
import { successNotification, errorNotification } from '../../helpers/notifications'

// Boton Estilado
import MagicButton from '../Buttons/MagicButton';

// Hook Custom para el manejo de formulario
import useForm from '../../hooks/useForm';

// Manejo de redirecciones de React Router Dom
import { useNavigate } from 'react-router-dom';

export default function LoginForm () {

    const {formData, handleInputChange} = useForm({
        email: "",
        password: ""
    })

    // Llamo del contexto la función encargada de settear los datos del usuario (no la ejecuto)
    const { setUserCredentials } = useUserToggleContext();

    // Utilizo el hook de React Router Dom para redireccionar en caso de que loguee correctamente
    const navigate = useNavigate();

    const user = useUserContext();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Funcion encargada de hacer petición al backend cuando el usuario clickea en "Iniciar sesion" y accionar
    const handleFormSubmit = async () => {
        try {
            const loginResponse = await loginHandler(formData);

            if (loginResponse.data.status === 200) {
                setUserCredentials({
                    token: loginResponse.data.token,
                    user: loginResponse.data.user
                })
                successNotification(loginResponse.data.message); // Muestro notificacion de exito
                navigate('/'); // Redirijo al home
            } else {
                errorNotification(loginResponse.data.message); // Muestro notificacion de fallo
            }
        } catch (e) {
            errorNotification(e); // Si falla algo externo muestro el error en consola
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
                        className={formData.email.length > 0? 'icon-active' : null}
                    />
                    <input 
                        type="email"
                        name="email"
                        autoComplete='email'
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Correo electrónico"
                    />
                </div>
                <div className="login__input">
                    <RiLockPasswordLine 
                        className={formData.password.length > 0 ? 'icon-active' : null}
                    />
                    <input 
                        type="password"
                        name="password"
                        autoComplete='current-password'
                        value={formData.password}
                        onChange={handleInputChange}
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