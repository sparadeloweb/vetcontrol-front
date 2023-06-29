// Importo React para usar React.memo
import React from "react";

// Iconos para la tabla
import { BsTrash, BsPencilSquare } from "react-icons/bs";

// Componente para manejar el direccionamiento a paginas relacionadas (React Router DOM)
import { Link } from "react-router-dom";

// Parser de tiempo propio
import TimeParser from "../TimeParser";

function AppointmentTable ({ appointments, handleDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre de la mascota</th>
                    <th>Fecha y hora</th>
                    <th>Costo</th>
                    <th>Notas</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <div className="table__body__wrapper">
                <tbody>
                    {
                        appointments.map((appointment) => (
                            <tr key={appointment._id}>
                                <td>{appointment.pet?.name || "Mascota no disponible / eliminada"}</td>
                                <td>
                                    <TimeParser 
                                        date={appointment.appointmentDate}
                                        includeHour
                                    />
                                </td>
                                <td>$ {appointment.cost}</td>
                                <td>{appointment.notes}</td>
                                <td>
                                    <button onClick={() => handleDelete(appointment._id)}>
                                        <BsTrash />
                                    </button>
                                    <Link to={`/turnos/editar/${appointment._id}`}>
                                        <BsPencilSquare />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </div>
        </table>
    );
}

// Lo exporto aparte para pasarlo por React.memo y cachear este componente
export default React.memo(AppointmentTable);
