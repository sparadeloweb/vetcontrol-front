// Importo React para usar React.memo
import React from "react";

// Iconos para la tabla
import { BsTrash, BsPencilSquare } from "react-icons/bs";

// Componente para manejar el direccionamiento a paginas relacionadas (React Router DOM)
import { Link } from "react-router-dom";

// Parser de tiempo propio
import TimeParser from "../TimeParser";

function Table ({ pets, handleDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha de nacimiento</th>
                    <th>Tipo</th>
                    <th>Dueño</th>
                    <th>Último turno</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <div className="table__body__wrapper">
                <tbody>
                    {
                        pets.map((pet) => (
                            <tr key={pet._id}>
                                <td>{pet.name}</td>
                                <td>
                                    <TimeParser 
                                        date={pet.dateOfBirth}
                                    />
                                </td>
                                <td>{pet.type}</td>
                                <td>{pet.owner}</td>
                                <td>
                                    <TimeParser 
                                        date={pet.lastVisit}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(pet._id)}>
                                        <BsTrash />
                                    </button>
                                    <Link to={`/mascotas/editar/${pet._id}`}>
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
export default React.memo(Table);
