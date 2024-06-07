import MonsterList from "../../components/monsterList/MonsterList.jsx";
import PlayerParty from "../../components/playerParty/PlayerParty.jsx";
import EncounterBuilder from "../../components/encounterBuilder/EncounterBuilder.jsx";
import {useEffect, useState} from "react";
function Encounters() {
    const [encounter, setEncounter] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");
    const [party, setParty] = useState([]);

    /*useEffect(() => {
        // Load saved parties from localStorage on component mount
        try {
            const savedParties = Object.keys(localStorage)
                .filter(key => localStorage.getItem(key))
                .map(key => localStorage.getItem(key));
            console.log("Loaded parties from localStorage:", savedParties);
            setSelectPartyOptions(savedParties);
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
        }
    }, []);*/

    const addMonsterToEncounter = (monster) => {
        setEncounter((prevEncounter) => [...prevEncounter, monster]);
    };

    const handlePartySelection = (selectedPartyName) => {
        setSelectedParty(selectedPartyName);
        if (selectedPartyName) {
            const selectedPartyData = JSON.parse(localStorage.getItem(selectedPartyName));
            setParty(selectedPartyData ? selectedPartyData.members : []);
        } else {
            setParty([]);
        }
    };

    return (
        <>
            <h2>Encounters</h2>
            <PlayerParty
                party={party}
                setParty={setParty}
                selectedParty={selectedParty}
                setSelectedParty={handlePartySelection}
            />
            <EncounterBuilder
                encounter={encounter}
                partyExperienceThreshold={(difficulty) => partyExperienceThreshold(party, difficulty)}
            />
            <MonsterList addMonsterToEncounter={addMonsterToEncounter} />
        </>
    )
}

export default Encounters