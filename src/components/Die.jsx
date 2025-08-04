export function Die(props) {
    const dieClass = props.isHeld ? "die held" : "die"

    return(
        <button 
            onClick={() => props.hold(props.id)} 
            className={dieClass} 
            aria-pressed={props.isHeld}
            aria-label={`Die with value of ${props.value}, ${props.isHeld ? "held" : "not held"}`}
            >{props.value}
        </button>
    )
}