import { useState, useRef, useEffect } from "react"
import { Die } from "./components/Die"
import Confetti from "react-confetti"

export function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rolls, setRolls] = useState(0)
    const buttonRef = useRef(null)

    //Win condition: dice are held, dice are same
    let gameWon = false;
    if(dice.every(die => die.isHeld) && dice.every(die =>die.value === dice[0].value ? true : false)){
        gameWon = true;
    }

    //Background check to focus on New Game button after winning
    useEffect(() => {
        if(gameWon)
            buttonRef.current.focus()
    }, [gameWon])

    //Reload and return an array of dice
    function generateAllNewDice(){
        const newDice = [];
        for(let i = 0; i < 10; i++){
            const rand = Math.ceil(Math.random() * 6)
            const isHeld = false;
            newDice.push({
                id: i,
                value: rand, 
                isHeld: isHeld})
        }
        console.log("generated")
        return newDice
    }

    //Roll all dice that isnt held
    function rollDice(){
        setDice(prevDice => 
            prevDice.map(die =>
                die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        ))
        setRolls(prevRolls => prevRolls + 1)  
    }

    function reset(){
        gameWon = false;
        setRolls(prevRolls => prevRolls = 0)
        setDice(generateAllNewDice)
    }

    //Setting a new array for state, holding the die passed in
    function hold(id){
        console.log("clicked")
        setDice(prevdDice => prevdDice.map(die => 
            die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
    }

    const diceElements = dice.map(die => 
        <Die hold={hold} id={die.id} key={die.id} value={die.value} isHeld={die.isHeld}></Die>)

    return ( 
        <main>
            {gameWon && <Confetti/>}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>You have won! Press New Game to start again</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-grid">
                {diceElements}
            </div>
            <span>Rolls: {rolls}</span>
            {gameWon && <button ref={buttonRef} onClick={reset}>New Game</button>}
            {!gameWon && <button onClick={rollDice}>Roll</button>}
        </main>
    )
}