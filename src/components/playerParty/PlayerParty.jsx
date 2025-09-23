import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import partyExperienceThreshold from "../../helpers/partyExperienceThreshold.js";

function PlayerParty({ party, setParty, selectedParty, handlePartySelection }) {
    const { register, handleSubmit, reset } = useForm();
    const [partyName, setPartyName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectPartyOptions, setSelectPartyOptions] = useState([]);

    useEffect(() => {
        // Load saved parties from localStorage on component mount
        const savedParties = JSON.parse(localStorage.getItem('Parties')) || {};
        const partyNames = Object.keys(savedParties);
        setSelectPartyOptions(partyNames.map(name => ({ name })));
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
        if (partyName !== "") {
            const savedParties = JSON.parse(localStorage.getItem('Parties')) || {};
            const partyData = { name: partyName, members: party };
            savedParties[partyName] = partyData;
            localStorage.setItem('Parties', JSON.stringify(savedParties));
            setShowForm(false);
            alert("Party saved!");
            // Update the dropdown options
            setSelectPartyOptions(Object.keys(savedParties).map(name => ({ name })));
        }
    };

    const deleteParty = (partyNameToDelete) => {
        if (window.confirm("Are you sure you want to delete this party?")) {
            const savedParties = JSON.parse(localStorage.getItem('Parties')) || {};
            delete savedParties[partyNameToDelete];
            localStorage.setItem('Parties', JSON.stringify(savedParties));
            setSelectPartyOptions(Object.keys(savedParties).map(name => ({ name })));
            if (selectedParty === partyNameToDelete) {
                handlePartySelection("");
                setParty([]);
            }
        }
    };

    const handleExpandAddPartyForm = () => {
        setPartyName("");
        setParty([]);
        handlePartySelection("");
        setShowForm(true);
    };

    const handleSelectedPartyChange = (e) => {
        handlePartySelection(e.target.value);
        if (e.target.value !== '') {
            setShowForm(false);
            const savedParties = JSON.parse(localStorage.getItem('Parties')) || {};
            const selectedPartyData = savedParties[e.target.value];
            setParty(selectedPartyData ? selectedPartyData.members : []);
            setPartyName(selectedPartyData ? selectedPartyData.name : "");
        }
    };

    return (
        <>
            <div className={'flex-box'}>
                <div className={'flex-col'}>
                    <h4>Experience Goals</h4>
                    <p>Easy: {partyExperienceThreshold(party, 'Easy')}</p>
                    <p>Medium: {partyExperienceThreshold(party, 'Medium')}</p>
                    <p>Hard: {partyExperienceThreshold(party, 'Hard')}</p>
                    <p>Deadly: {partyExperienceThreshold(party, 'Deadly')}</p>
                </div>
                <div className={'flex-col'}>
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
                            <h3 className='center-text'>{selectedParty} Members</h3>
                            <ul>
                                {party.map((character, index) => (
                                    <li key={index}>
                                        Name:
                                        <input
                                            type="text"
                                            value={character.name}
                                            onChange={(e) => updateCharacterInParty(index, { ...character, name: e.target.value })}
                                        />
                                        Level:
                                        <select
                                            value={character.level}
                                            onChange={(e) => updateCharacterInParty(index, { ...character, level: Number(e.target.value) })}
                                        >
                                            {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                        <button onClick={() => removeCharacterFromParty(index)} className={'add-remove'}>-</button>
                                    </li>
                                ))}
                            </ul>
                            <h4 className='center-text'>Add New Character</h4>
                            <form onSubmit={handleSubmit(addCharacterToParty)}>
                                    <label>
                                        Name:
                                        <input
                                            type="text"
                                            minLength="1"
                                            maxLength="50"
                                            {...register("characterName", { required: true })}
                                        />
                                    </label>
                                    <label>
                                        Level:
                                        <select
                                            defaultValue="1"
                                            {...register("characterLevel", { required: true })}
                                        >
                                            {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <button type="submit" className={'add-remove'}>+</button>
                            </form>
                            <button onClick={savePartyToLocalStorage}>Save Changes</button>
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
                </div>
            </div>
        </>
    );
}

export default PlayerParty;
