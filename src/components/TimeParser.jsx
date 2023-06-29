// Componente encargado de parsear los Timestamps generados por MongoDB
export default function TimeParser ({date, includeHour = false}) {

    const newDate = new Date(date);

    return (
        <>
            {date ? 
                `${newDate.getDate() + 1}/${newDate.getMonth() + 1}/${newDate.getFullYear()}
                ${includeHour ? ` - ${newDate.getHours()}:${newDate.getMinutes()}` : ''}` 
            : "No hay una fecha disponible"}
        </>
    )
}