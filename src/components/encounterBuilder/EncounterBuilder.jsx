import { useState, useEffect } from "react";
import monsterXpByCr from "../../constants/dndconstants.jsx";
import adjustedExperience from "../../helpers/adjustedExperience.js";
import calculateEncounterDifficulty from "../../helpers/calculateEncounterDifficulty.js";

function EncounterBuilder({ encounter, setEncounter, party, selectedParty, addMonsterToEncounter, removeMonsterFromEncounter, removeOneMonsterFromEncounter, updateMonsterCount, handlePartySelection, useEncounterParty, setUseEncounterParty }) {
    const [difficulty, setDifficulty] = useState("None");
    const [encounterName, setEncounterName] = useState("");
    const [selectEncounterOptions, setSelectEncounterOptions] = useState([]);
    const [selectedEncounter, setSelectedEncounter] = useState("");
    const totalExperience = encounter.reduce((total, monster) => total + (monsterXpByCr[monster.challenge_rating] * monster.count), 0);

    useEffect(() => {
        const adjustedXp = adjustedExperience(encounter.length, totalExperience);
        const newDifficulty = calculateEncounterDifficulty(party, adjustedXp);
        setDifficulty(newDifficulty);
    }, [encounter, party, totalExperience]);

    //useEffect function to load saved encounters from local storage.
    useEffect(() => {
        // Load saved encounters from localStorage on component mount
        const savedEncounters = JSON.parse(localStorage.getItem('Encounters')) || {};
        const encounterNames = Object.keys(savedEncounters);
        console.log("Loaded encounters from localStorage:", savedEncounters);
        setSelectEncounterOptions(encounterNames.map(name => ({ name })));
    }, []);

    //Function to handle naming and saving an encounter to local storage
    const saveEncounterToLocalStorage = () => {
        if (encounterName !== "") {
            const savedEncounters = JSON.parse(localStorage.getItem('Encounters')) || {};
            const encounterData = { name: encounterName, encounter: encounter, madeForParty: party.name || selectedParty };
            savedEncounters[encounterName] = encounterData;
            localStorage.setItem('Encounters', JSON.stringify(savedEncounters));
            alert("Encounter saved!");
            // Update the dropdown options
            setSelectEncounterOptions(Object.keys(savedEncounters).map(name => ({ name })));
            setSelectedEncounter(encounterName);
        }
    };


    //Function to handle deleting a saved encounter from local storage.
    const deleteEncounter = (encounterNameToDelete) => {
        if (window.confirm("Are you sure you want to delete this encounter?")) {
            const savedEncounters = JSON.parse(localStorage.getItem('Encounters')) || {};
            delete savedEncounters[encounterNameToDelete];
            localStorage.setItem('Encounters', JSON.stringify(savedEncounters));
            setSelectEncounterOptions(Object.keys(savedEncounters).map(name => ({ name })));
            if (selectedEncounter === encounterNameToDelete) {
                setSelectedEncounter("");
                setEncounter([]);
            }
        }
    };

    const handleEncounterSelection = (e) => {
        const selectedEncounterName = e.target.value;
        setSelectedEncounter(selectedEncounterName);
        if (selectedEncounterName) {
            const savedEncounters = JSON.parse(localStorage.getItem('Encounters')) || {};
            const selectedEncounterData = savedEncounters[selectedEncounterName];
            setEncounter(selectedEncounterData ? selectedEncounterData.encounter : []);
            setEncounterName(selectedEncounterData ? selectedEncounterData.name : "");
            if (useEncounterParty && selectedEncounterData.madeForParty) {
                handlePartySelection(selectedEncounterData.madeForParty);
            }
        } else {
            setEncounter([]);
        }
    };

    const handleAddNewEncounter = () => {
        setEncounterName("");
        setEncounter([]);
        setSelectedEncounter("");
    };


    return (
        <>
            <h2>Current Encounter</h2>
            <div className={'flex-box'}>
                <div className={'flex-col'}>
                    <p>
                        Choose Enounter:
                        <select onChange={handleEncounterSelection} value={selectedEncounter}>
                            <option value="">Select an encounter</option>
                            {selectEncounterOptions.map((encounter) => (
                                <option key={encounter.name} value={encounter.name}>
                                    {encounter.name}
                                </option>
                            ))}
                        </select>
                    </p>
                    <label>
                        <input
                            type="checkbox"
                            checked={useEncounterParty}
                            onChange={(e) => setUseEncounterParty(e.target.checked)}
                        />
                        Also select the party that the encounter was made for.
                    </label>
                    <label>
                        Name encounter:
                        <input
                            type="text"
                            value={encounterName}
                            onChange={(e) => setEncounterName(e.target.value)}
                        />
                    </label>
                    <div className='flex-col align-center'>
                        <button onClick={() => deleteEncounter(selectedEncounter)}>Delete Encounter</button>
                        <button onClick={handleAddNewEncounter}>Add New Encounter</button>
                        <button onClick={saveEncounterToLocalStorage}>Save Encounter</button>
                    </div>
                </div>
                <div className={'flex-col'}>
                    <ul>
                        {encounter.map((monster, index) => (
                            <li key={index} className='flex-box'>
                                {monster.name}
                                (CR {monster.challenge_rating})
                                ({monsterXpByCr[monster.challenge_rating].toLocaleString()} XP)
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
                                <div className='justify-end align-end'>
                                    <button onClick={() => removeOneMonsterFromEncounter(monster)} className={'add-remove'}>-</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className='center-text'>Total Experience: {adjustedExperience(encounter.length, totalExperience).toLocaleString()}</p>
                    <h2>Difficulty: {difficulty}</h2>
                </div>
            </div>
        </>
    );
}

export default EncounterBuilder;