import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import partyExperienceThreshold from "../../helpers/partyExperienceThreshold.js";


function PlayerParty({ party, setParty, selectedParty, setSelectedParty }) {
    const { register, handleSubmit, reset } = useForm();
    const [partyName, setPartyName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectPartyOptions, setSelectPartyOptions] = useState([]);

    useEffect(() => {
        // Load saved parties from localStorage on component mount
        try {
            const savedParties = Object.keys(localStorage)
                .map(key => {
                    try {
                        return JSON.parse(localStorage.getItem(key));
                    } catch (error) {
                        console.error(`Error parsing JSON for key ${key}:`, error);
                        return null;
                    }
                })
                .filter(party => party !== null && typeof party === 'object'); // Filter out non-valid JSON entries
            console.log("Loaded parties from localStorage:", savedParties);
            setSelectPartyOptions(savedParties);
        } catch (error) {
            console.error("Error loading parties from localStorage:", error);
        }
    }, []);

    const addCharacterToParty = (data) => {
        setParty([...party, { name: data.characterName, level: data.characterLevel }]);
        reset();
    };

    const removeCharacterFromParty = (index) => {
        setParty(party.filter((_, i) => i !== index));
    };

    const updateCharacterInParty = (index, updatedCharacter) => {
        const newParty = [...party];
        newParty[index] = updatedCharacter;
        setParty(newParty);
    };

    const savePartyToLocalStorage = () => {
        if (partyName !=="") {
            const partyData = { name: partyName, members: party };
            localStorage.setItem(partyData.name, JSON.stringify(partyData));
            setShowForm(false);
            alert("Party saved!");
            //Update the dropdown options
            setSelectPartyOptions([...selectPartyOptions.filter(p => p.name !== partyData.name), partyData]);
            //setPartyName("");
            //setParty([]);
        }
    };

    const deleteParty = (partyNameToDelete) => {
        if (window.confirm("Are you sure you want to delete this party?")) {
            localStorage.removeItem(partyNameToDelete);
            setSelectPartyOptions(selectPartyOptions.filter(party => party.name !== partyNameToDelete));
            if (selectedParty === partyNameToDelete) {
                setSelectedParty("");
                setParty([]);
            }
        }
    };

    const handleExpandAddPartyForm = () => {
        setPartyName("");
        setParty([]);
        setSelectedParty("");
        setShowForm(true);
    };

    const handleSelectedPartyChange = (e) => {
        setSelectedParty(e.target.value);
        if (e.target.value !== '') {
            setShowForm(false);
            const selectedPartyData = JSON.parse(localStorage.getItem(e.target.value));
            setParty(selectedPartyData ? selectedPartyData.members : []);
            setPartyName(selectedPartyData ? selectedPartyData.name : "");
        }
    };

    return (
        <>
            <h2>Party</h2>
            <p>
                Choose Party:
                <select onChange={handleSelectedPartyChange} value={selectedParty}>
                    <option value="">Select a party</option>
                    {selectPartyOptions.map((party) => (
                        <option key={party.name} value={party.name}>
                            {party.name}
                        </option>
                    ))}
                </select>
                {selectedParty && (
                    <button onClick={() => deleteParty(selectedParty)}>Delete Party</button>
                )}
                {!showForm && (
                    <button onClick={handleExpandAddPartyForm}>Add New Party</button>
                )}
            </p>
            {selectedParty && (
                <>
                    <h3>{selectedParty} Members</h3>
                    <ul>
                        {party.map((character, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={character.name}
                                    onChange={(e) => updateCharacterInParty(index, { ...character, name: e.target.value })}
                                />
                                <select
                                    value={character.level}
                                    onChange={(e) => updateCharacterInParty(index, { ...character, level: Number(e.target.value) })}
                                >
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <button onClick={() => removeCharacterFromParty(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit(addCharacterToParty)}>
                        <p>
                            <label>
                                Character Name:
                                <input
                                    type="text"
                                    minLength="1"
                                    maxLength="50"
                                    {...register("characterName", { required: true })}
                                />
                            </label>
                            <label>
                                Character Level:
                                <select
                                    defaultValue="1"
                                    {...register("characterLevel", { required: true })}
                                >
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Add Character</button>
                        </p>
                    </form>
                    <button onClick={savePartyToLocalStorage}>Save Changes</button>
                    <h4>Encounter Difficulty</h4>
                    <p>Easy: {partyExperienceThreshold(party, 'Easy')}</p>
                    <p>Medium: {partyExperienceThreshold(party, 'Medium')}</p>
                    <p>Hard: {partyExperienceThreshold(party, 'Hard')}</p>
                    <p>Deadly: {partyExperienceThreshold(party, 'Deadly')}</p>
                </>
            )}
            {showForm && (
                <>
                    <label>
                        Party Name:
                        <input
                            type="text"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                        />
                    </label>
                    <form onSubmit={handleSubmit(addCharacterToParty)}>
                        <p>
                            <label>
                                Character Name:
                                <input
                                    type="text"
                                    minLength="1"
                                    maxLength="50"
                                    {...register("characterName", { required: true })}
                                />
                            </label>
                            <label>
                                Character Level:
                                <select
                                    defaultValue="1"
                                    {...register("characterLevel", { required: true })}
                                >
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Add Character</button>
                        </p>
                    </form>
                    <h3>Party Members</h3>
                    <ul>
                        {party.map((character, index) => (
                            <li key={index}>
                                {character.name} (Level {character.level})
                                <button onClick={() => removeCharacterFromParty(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={savePartyToLocalStorage}>Save Party</button>
                </>
            )}
        </>
    );
}

export default PlayerParty;
