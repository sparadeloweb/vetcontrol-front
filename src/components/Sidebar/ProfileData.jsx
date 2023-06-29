/* 

Este componente muestra data básica del usuario en el Sidebar, podria ampliarse para que 
la foto de perfil también sea dinámica.

*/
export default function ProfileData ({userData}) {

    return (
        <div className="profile__options">
            <div className="profile__info">
                <hr/>
                <img
                    alt="Foto de perfil"
                    src="/images/profile-pic.jpg"
                />
                <span>{userData.name} {userData.lastname}</span>
            </div>
        </div>
    )
}