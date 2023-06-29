import { useEffect, useState } from "react";

// Iconos
import { AiOutlineGroup, AiOutlineUngroup } from "react-icons/ai";
import { FaDog, FaCat } from "react-icons/fa";

// Dependencias necesarias para mostrar gráficos sobre los datos de la API
import { Doughnut } from 'react-chartjs-2'; // Importamos el componente Doughnut para los gráficos
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

// Counter Widget
import Counter from "../Counter"; 

// Estilos 
import './styles.css';

// Funciones necesarias para interactuar con el backend
import { getAllPets, getAllAppointments } from "../../helpers/apiFunctions";

export default function HomeMain () {

    // Defino los estados necesarios
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);

    ChartJS.register(ArcElement, Tooltip);
    
    // Funcion para traer los datos de la API
    useEffect(() => {
        async function fetchData() {
            const petsResponse = await getAllPets();
            setPets(petsResponse.data.data);

            const appointmentsResponse = await getAllAppointments();
            setAppointments(appointmentsResponse.data.appointments);
        }
        fetchData();
    }, []);

    // Acá creamos la variable con los datos necesarios para el gráfico de mascotas
    const petsChartData = {
        labels: ['Perros', 'Gatos', 'Otros'],
        datasets: [{
            data: [
                pets.filter(pet => pet.type === 'Perro').length,
                pets.filter(pet => pet.type === 'Gato').length,
                pets.filter(pet => pet.type !== 'Perro' && pet.type !== 'Gato').length
            ],
            backgroundColor: [
                '#3498DB',
                'RGBA(52,152,219,0.6)',
                'RGBA(52,152,219,0.4)'
            ]
        }]
    };

    // Y acá la variable con los datos necesarios para el gráfico de turnos
    const appointmentsChartData = {
        labels: ['Perros', 'Gatos', 'Otros'],
        datasets: [{
            data: [
                appointments.filter(app => app.pet.type === 'Perro').length,
                appointments.filter(app => app.pet.type === 'Gato').length,
                appointments.filter(app => app.pet.type !== 'Perro' && app.pet.type !== 'Gato').length
            ],
            backgroundColor: [
                'RGBA(52,152,219,1.0)',
                'RGBA(52,152,219,0.8)',
                'RGBA(52,152,219,0.6)'
            ]
        }]
    };

    // Opciones default para los graficos
    const chartOptions = {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        }
    };    

    return (
        <div>
            <h1>Bienvenido a VetControl :)</h1>
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
                    title="Otros"
                    quantity={pets.filter(pet => (pet.type !== 'Gato' && pet.type !== 'Perro')).length}
                    icon={<AiOutlineUngroup />}
                />
                <Counter
                    title="Turnos totales"
                    quantity={appointments.length}
                    icon={<AiOutlineGroup />}
                />
            </div>
            <div className="charts__container">
                <div className="chart__section">
                    <h2>Distribución de mascotas</h2>
                    <div className="chart">
                        <Doughnut data={petsChartData} options={chartOptions} key="petsChart" />
                    </div>
                </div>
                <div className="chart__section">
                    <h2>Distribución de turnos</h2>
                    <div className="chart">
                        <Doughnut data={appointmentsChartData} options={chartOptions} key="appointmentsChart" />
                    </div>
                </div>
            </div>
            <div className="cards__sections appointments">
                <Counter
                    title="Turnos para perros"
                    quantity={appointments.filter(app => app.pet.type === 'Perro').length}
                    icon={<FaDog />}
                />
                <Counter
                    title="Turnos para gatos"
                    quantity={appointments.filter(app => app.pet.type === 'Gato').length}
                    icon={<FaCat />}
                />
                <Counter
                    title="Turnos para otros"
                    quantity={appointments.filter(app => app.pet.type !== 'Perro' && app.pet.type !== 'Gato').length}
                    icon={<AiOutlineUngroup />}
                />
                <Counter
                    title="Turnos totales"
                    quantity={appointments.length}
                    icon={<AiOutlineGroup />}
                />
            </div>
        </div>
    );
}
