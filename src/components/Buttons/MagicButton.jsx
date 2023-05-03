export default function MagicButton ({text, onClickFunction}) {
    return (
        <button 
        type="button"
        className='login__buton magic-button'
        onClick={() => onClickFunction()}
        >   
            <span className="border-span" />
            <span className="text-span">{text}</span>
        </button>
    )
}