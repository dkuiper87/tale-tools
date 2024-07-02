import {useDice} from "../../context/DiceContext.jsx";


function DiceRoller() {
    const { diceResult, rollDice } = useDice();

    return (
        <>
            <h2>Roll dice here</h2>
            <button
                onClick={
                    () => {
                        rollDice('1d4')
                    }}
            >
                d4
            </button>
            <button
                onClick={
                () => {
                    rollDice('1d6')
                }}
            >
                d6
            </button>
            <button
                onClick={
                    () => {
                        rollDice('1d8')
                    }}
            >
                d8
            </button>
            <button
                onClick={
                    () => {
                        rollDice('1d10')
                    }}
            >
                d10
            </button>
            <button
                onClick={
                    () => {
                        rollDice('1d12')
                    }}
            >
                d12
            </button>
            <button
                onClick={
                    () => {
                        rollDice('1d20')
                    }}
            >
                d20
            </button>
            <button
                onClick={
                    () => {
                        rollDice('1d100')
                    }}
            >
                d100
            </button>
            <p>Result: {diceResult}</p>
        </>
    )
}

export default DiceRoller