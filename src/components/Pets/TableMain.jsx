// Hooks necesarios para manejar funciones asociadas a React
import { useState, useEffect, useCallback } from "react";

// Cargo los estilos generales de la página
import './styles.css';

// Funcion para traer a todas las mascotas
import { getAllPets, deletePet } from "../../helpers/apiFunctions";

// Iconos
import { AiOutlineGroup, AiOutlineUngroup} from "react-icons/ai";
import { FaDog, FaCat } from "react-icons/fa";

// Componente para manejar el direccionamiento a paginas relacionadas (React Router DOM)
import { Link } from "react-router-dom";

// Counter Widget
import Counter from "../Counter";

// Tabla de mascotas
import Table from "./Table";

// Tabla encargada de mostrar las mascotas registradas
export default function TableMain () {

    const [pets, setPets] = useState([]); // Estado para cargar el listado de mascotas
    const [selectedType, setSelectedType] = useState('Todas'); // Estado para manejar el filtradro de estas

    // Función para eliminar una mascota pasada a Callback para que mantenga la referencia en el React.memo de la tabla
    const handleDelete = useCallback(async (id) => {
        await deletePet(id);
        const { data } = await getAllPets();
        setPets(data.data);
    }, []);

    // Creo un estado para manejar la busqueda, no es necesario usar el custom hook para forms ya que es un solo campo
    const [searchValue, setSearchValue] = useState("");

    // useEffect encargado de manejar la carga de mascotas a la lista y su filtrado
    useEffect(() => {
        async function fetchPets() {
            const { data } = await getAllPets();
            setPets(data.data);
        }

        fetchPets();
    }, []);

    // Filtro las mascotas en base a la seleccion del user
    let filteredPets;

    if (selectedType === 'Todas') {
        filteredPets = pets;
    } else if (selectedType === 'Otras') {
        filteredPets = pets.filter(pet => pet.type !== 'Perro' && pet.type !== 'Gato');
    } else {
        filteredPets = pets.filter(pet => pet.type === selectedType);
    } // Estará bien incluirlo acá directamente ? O debería pasarse a una función.

    // Acá filtramos basandonos en el valor de búsqueda
    filteredPets = filteredPets.filter(pet =>
        pet.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        pet.type.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="pets__container">
            <div className="cards__sections">
                <Counter
                    title="Mascotas totales"
                    quantity={pets.length}
                    icon={<AiOutlineGroup />}
                />
                <Counter
                    title="Perros"
                    quantity={pets.filter(pet => pet.type === 'Perro').length}
                    icon={<FaDog />}
                />
                <Counter
                    title="Gatos"
                    quantity={pets.filter(pet => pet.type === 'Gato').length}
                    icon={<FaCat />}
                />
                <Counter
                    title="Otras"
                    quantity={pets.filter(pet => (pet.type !== 'Gato' && pet.type !== 'Perro')).length}
                    icon={<AiOutlineUngroup />}
                />
            </div>
            <div className="pets__main__table">
                <Link to="/mascotas/añadir" className="add__button">+ Añadir mascota</Link>
                <input 
                    type="text" 
                    className="search__input" 
                    value={searchValue} 
                    onChange={event => setSearchValue(event.target.value)} 
                    placeholder="Buscar mascota..." 
                />
                {/* Tabla pasada por React Memo para optimización ya que es "el componente más pesado"*/}
                <Table pets={filteredPets} handleDelete={handleDelete} />
            </div>
            <div className="pet__filters">
                <button className={`pet__filter ${selectedType === 'Todas' && 'selected'}`} onClick={() => setSelectedType('Todas')}>
                    <AiOutlineGroup />
                    <span>Todas</span>
                </button>
                <button className={`pet__filter ${selectedType === 'Perro' && 'selected'}`} onClick={() => setSelectedType('Perro')}>
                    <FaDog />
                    <span>Perros</span>
                </button>
                <button className={`pet__filter ${selectedType === 'Gato' && 'selected'}`} onClick={() => setSelectedType('Gato')}>
                    <FaCat />
                    <span>Gatos</span>
                </button>
                <button className={`pet__filter ${selectedType === 'Otras' && 'selected'}`} onClick={() => setSelectedType('Otras')}>
                    <AiOutlineUngroup />
                    <span>Otras</span>
                </button>
            </div>
        </div>
    )
}