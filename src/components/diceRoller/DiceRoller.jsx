import { useDice } from "../../context/DiceContext.jsx";
import "./DiceRoller.css";

function DiceRoller() {
    const { diceResult, rollDice } = useDice();

    return (
        <div className="dice-container">
            <div className="dice-main">{diceResult}</div>
            <div className="dice-buttons">
                <button onClick={() => rollDice("1d4")}>d4</button>
                <button onClick={() => rollDice("1d6")}>d6</button>
                <button onClick={() => rollDice("1d8")}>d8</button>
                <button onClick={() => rollDice("1d10")}>d10</button>
                <button onClick={() => rollDice("1d12")}>d12</button>
                <button onClick={() => rollDice("1d20")}>d20</button>
                <button onClick={() => rollDice("1d100")}>d100</button>
            </div>
        </div>
    );
}

export default DiceRoller;
