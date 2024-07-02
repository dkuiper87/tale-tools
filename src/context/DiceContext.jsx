import { createContext, useContext, useState } from "react";

// Create the context
const DiceContext = createContext();

// Create a provider component
export const DiceProvider = ({ children }) => {
    const [diceResult, setDiceResult] = useState(0);

    const rollDice = (diceString) => {
        // Regular expression to parse the dice string
        const regex = /^(\d+)d(\d+)([+-]\d+)?$/;
        const match = diceString.match(regex);

        if (!match) {
            throw new Error('Invalid dice notation');
        }

        // Extract the values from the match groups
        const x = parseInt(match[1], 10); // Number of dice
        const y = parseInt(match[2], 10); // Type of dice
        const z = match[3] ? parseInt(match[3], 10) : 0; // Modifier (optional, defaults to 0)

        // Roll the dice and calculate the total
        let total = 0;
        for (let i = 0; i < x; i++) {
            total += Math.floor(Math.random() * y) + 1;
        }

        // Apply the modifier
        total += z;

        console.log(total);
        setDiceResult(total);
        return total;
    };

    return (
        <DiceContext.Provider value={{ diceResult, rollDice }}>
            {children}
        </DiceContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useDice = () => {
    return useContext(DiceContext);
};
