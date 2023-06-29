// Componente que muestra contador de un dato particular otorgado en forma de tarjeta con un icono
export default function Counter ({ quantity, title, icon }) {
 return (
    <div className="counter__card">
        <div className="title__quantity">
            <span className="title">{title}</span>
            <span className="total"><span>Total:</span> {quantity}</span>
        </div>
        <div className="quantity__icon">
            <span>Cantidad:</span> {quantity}
            <div className="icon__container">{icon}</div>
        </div>
    </div>
 )
}