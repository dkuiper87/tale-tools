import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function PlayerParty() {
    const { register, handleSubmit, reset } = useForm();
    const [party, setParty] = useState([]);
    const [partyName, setPartyName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectPartyOptions, setSelectPartyOptions] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");

    useEffect(() => {
        // Load saved parties from localStorage on component mount
        try {
            const savedParties = Object.keys(localStorage).map(key => {
                const item = localStorage.getItem(key);
                return JSON.parse(item);  // May throw error
            });
            console.log("Loaded parties from localStorage:", savedParties);
            setSelectPartyOptions(savedParties);
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
        }
    }, []);

    const addCharacterToParty = (data) => {
        setParty([...party, { name: data.characterName, level: data.characterLevel }]);
        reset();
    };

    const removeCharacterFromParty = (index) => {
        setParty(party.filter((_, i) => i !== index));
    };

    const savePartyToLocalStorage = () => {
        const partyData = { name: partyName, members: party };
        localStorage.setItem(partyData.name, JSON.stringify(partyData));
        setShowForm(false);
        alert("Party saved!");
        // Update the dropdown options
        setSelectPartyOptions([...selectPartyOptions, partyData]);
        setPartyName("");
        setParty([]);
    };

    const handlePartySelection = (e) => {
        const selectedPartyName = e.target.value;
        console.log("Selected party:", selectedPartyName);
        setSelectedParty(selectedPartyName);
        if (selectedPartyName) {
            try {
                const selectedPartyData = JSON.parse(localStorage.getItem(selectedPartyName));
                console.log("Selected party data:", selectedPartyData);
                setParty(selectedPartyData ? selectedPartyData.members : []);
            } catch (error) {
                console.error("Error parsing selected party JSON from localStorage:", error);
            }
        } else {
            setParty([]);
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

    return (
        <>
            <h2>Party</h2>
            <p>
                Choose Party:
                <select onChange={handlePartySelection} value={selectedParty}>
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
            </p>
            {selectedParty && (
                <>
                    <h3>{selectedParty} Members</h3>
                    <ul>
                        {party.map((character, index) => (
                            <li key={index}>
                                {character.name} (Level {character.level})
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {!showForm && (
                <button onClick={() => setShowForm(true)}>Add New Party</button>
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
                                    {...register("characterName", { required: true })}
                                />
                            </label>
                            <label>
                                Character Level:
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    {...register("characterLevel", {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                />
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
