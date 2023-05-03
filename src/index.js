import React from 'react';
import ReactDOM from 'react-dom/client';

// Páginas
import Login from './pages/Login';
import Home from './pages/Home';

// Modificaciones de cabeceras / meta datos (React Helmet)
import { HelmetProvider } from "react-helmet-async";

// Container de notificaciones
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Estilos propios
import './main.css'

// Estilos de React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Contexto de usuario
import { UserProvider } from './contexts/UserProvider';

import SessionChecker from './components/SessionChecker';

// React Router DOM (Manejo de rutas)
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"; // Traigo funcion y componente necesario para el manejo de rutas

// Defino las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: ( // Le paso la verificación de sesión de usuario 
      // SessionChecker es el componente encargado de verificar si el usuario esta loggeado
      <SessionChecker>
        <Outlet />
      </SessionChecker>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/ingresar",
        element: <Login />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <HelmetProvider>
          <RouterProvider router={router} />
          <ToastContainer />
      </HelmetProvider>
    </UserProvider>
  </React.StrictMode>
);

/*
ARBOL DE VETCONTROL
React.StrictMode -> Es una forma de indicarle a React que vamos a trabajar en Modo Escricto.
                    Es una herramienta que activa una serie de comprobaciones en segundo plano cuando ponemos la app en DEV
  UserProvider -> Componente que se encarga de manejar el estado del usuario, lo ponemos encima de todo ya que es algo recurrente
                  en nuestra app para multiples componentes. (Contiene el estado y multiples funciones para manejarlo)
      HelmetProvider -> Es otro componente que ayuda a manejar la cabecera (etiqueta <head></head>) de nuestra aplicación
          RouterProvider -> Es el proveedor de nuestras rutas, lo que pasamos a la variable router es lo que será capaz de renderizar
                            nuestra app
          ToastContainer -> Podemos decir que es nuestro componente encargado de mostrar las notificacioes
*/
