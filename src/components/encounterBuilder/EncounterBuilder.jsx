import React from "react";
import monsterXpByCr from "../../constants/dndconstants.jsx";
import adjustedExperience from "../../helpers/adjustedExperience.js";

function EncounterBuilder({ encounter }) {
    const totalExperience = encounter.reduce((total, monster) => total + monsterXpByCr[monster.challenge_rating], 0);

    return (
        <>
            <h2>Current Encounter</h2>
            <ul>
                {encounter.map((monster, index) => (
                    <li key={index}>
                        {monster.name} (CR {monster.challenge_rating}) ({monsterXpByCr[monster.challenge_rating].toLocaleString()} XP)
                    </li>
                ))}
            </ul>
            <p>Total Experience: {totalExperience.toLocaleString()}</p>
            <p>Total Experience adjusted for encounter size: {adjustedExperience(encounter.length, totalExperience).toLocaleString()}</p>
            <p>Total number of monsters: {encounter.length}</p>
        </>
    );
}

export default EncounterBuilder;