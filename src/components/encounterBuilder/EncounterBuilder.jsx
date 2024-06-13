import { useState, useEffect } from "react";
import monsterXpByCr from "../../constants/dndconstants.jsx";
import adjustedExperience from "../../helpers/adjustedExperience.js";
import calculateEncounterDifficulty from "../../helpers/calculateEncounterDifficulty.js";

function EncounterBuilder({ encounter, party, addMonsterToEncounter, removeMonsterFromEncounter, removeOneMonsterFromEncounter, updateMonsterCount }) {
    const [difficulty, setDifficulty] = useState("None");

    const totalExperience = encounter.reduce((total, monster) => total + (monsterXpByCr[monster.challenge_rating] * monster.count), 0);

    useEffect(() => {
        const adjustedXp = adjustedExperience(encounter.length, totalExperience);
        const newDifficulty = calculateEncounterDifficulty(party, adjustedXp);
        setDifficulty(newDifficulty);
    }, [encounter, party, totalExperience]);

    return (
        <>
            <h2>Current Encounter</h2>
            <ul>
                {encounter.map((monster, index) => (
                    <li key={index}>
                        {monster.name} (CR {monster.challenge_rating}) ({monsterXpByCr[monster.challenge_rating].toLocaleString()} XP)
                        <button onClick={() => removeOneMonsterFromEncounter(monster)}>-</button>
                        x
                        <input
                            type="number"
                            value={monster.count}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value !== "" && parseInt(value, 10) > 0) {
                                    updateMonsterCount(monster, parseInt(value, 10));
                                }
                            }}
                        />
                        <button onClick={() => addMonsterToEncounter(monster)}>+</button>
                        <button onClick={() => removeMonsterFromEncounter(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total Experience: {totalExperience.toLocaleString()}</p>
            <p>Total Experience adjusted for encounter size: {adjustedExperience(encounter.length, totalExperience).toLocaleString()}</p>
            <p>Total number of monsters: {encounter.length}</p>
            <p>Difficulty: {difficulty}</p>
        </>
    );
}


/*
Volgende stappen (TO DO):
Zorgen dat level en naam van characters aangepast kan worden in de geselecteerde party en daar ook een character toegevoegd of verwijderd kan worden.
Encounter calculator component maken.
    Zorgen dat een encounter aangemaakt kan worden en monsters hier aan toegevoegd kunnen worden vanuit de monsterlist.
        -Zorgen dat je het aantal monsters kan aanpassen, en dat als je een monster toevoegt wat er al in zit deze +1 krijgt.
        -Zorgen dat je monsters kan verwijderen.

    Zorgen dat de encounter opgeslagen kan worden met een naam.
    Zorgen dat je een eerder opgeslagen encounter kan openen en aanpassen.
    Calculatie toevoegen die laat zien hoe moeilijk de encounter is voor de huidig geselecteerde party.
            - Zodra party aangemaakt wordt en elke keer dat de party wordt aangepast de party experience thresholds aanpassen en opslaan in de party info
            - party info voor selected party upliften
            - in encounterbuilder de adjusted experience vergelijken met de opgeslagen values voor partyexpthresholds
*/
export default EncounterBuilder;