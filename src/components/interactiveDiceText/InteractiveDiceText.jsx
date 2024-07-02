import {useDice} from "../../context/DiceContext.jsx";

const InteractiveDiceText = ({ text }) => {
    const regex = /(\d+)d(\d+)\s*([+-]\s*\d+)?|\+(\d+)\s+to\s+hit/g;
    const { rollDice } = useDice();

    const handleClick = (diceString, isHit = false) => {
        return (e) => {
            e.stopPropagation();
            if (isHit) {
                const match = diceString.match(/\+(\d+)\s+to\s+hit/);
                const modifier = match ? parseInt(match[1], 10) : 0;
                rollDice(`1d20+${modifier}`);
            } else {
                const sanitizedDiceString = diceString.replace(/\s+/g, ''); // Remove spaces for rollDice function
                rollDice(sanitizedDiceString);
            }
        };
    };

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const beforeMatch = text.slice(lastIndex, match.index);
        if (beforeMatch) {
            parts.push(<span key={lastIndex}>{beforeMatch}</span>);
        }

        const diceString = match[0];
        const isHit = /\+(\d+)\s+to\s+hit/.test(diceString);

        parts.push(
            <span
                key={match.index}
                onClick={handleClick(diceString, isHit)}
                style={{ color: 'blue', cursor: 'pointer' }}
            >
        {diceString}
      </span>
        );

        lastIndex = regex.lastIndex;
    }

    const afterLastMatch = text.slice(lastIndex);
    if (afterLastMatch) {
        parts.push(<span key={lastIndex}>{afterLastMatch}</span>);
    }

    return <>{parts}</>;
};

export default InteractiveDiceText;
