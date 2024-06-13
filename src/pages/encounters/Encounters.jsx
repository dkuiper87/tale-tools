import MonsterList from "../../components/monsterList/MonsterList.jsx";
import PlayerParty from "../../components/playerParty/PlayerParty.jsx";
import EncounterBuilder from "../../components/encounterBuilder/EncounterBuilder.jsx";
import { useState, useEffect, useCallback } from "react";

function Encounters() {
    const [encounter, setEncounter] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");
    const [party, setParty] = useState([]);

    useEffect(() => {
        console.log('Encounter state updated:', encounter);
    }, [encounter]);

    const updateEncounter = useCallback((monster, count) => {
        setEncounter((prevEncounter) => {
            const existingMonsterIndex = prevEncounter.findIndex(m => m.slug === monster.slug);
            if (existingMonsterIndex !== -1) {
                const newEncounter = [...prevEncounter];
                if (count > 0) {
                    newEncounter[existingMonsterIndex] = {
                        ...newEncounter[existingMonsterIndex],
                        count: count,
                    };
                    console.log(`Updated monster: ${monster.slug}, new count: ${count}`);
                } else {
                    console.log(`Removing the last monster: ${monster.slug}`);
                    newEncounter.splice(existingMonsterIndex, 1);
                }
                return newEncounter;
            } else if (count > 0) {
                console.log(`Adding new monster: ${monster.name}`);
                return [...prevEncounter, { ...monster, count: count }];
            } else {
                console.log(`No monster found to remove`);
                return prevEncounter;
            }
        });
    }, []);

    const addMonsterToEncounter = useCallback((monster) => {
        updateEncounter(monster, (encounter.find(m => m.slug === monster.slug)?.count || 0) + 1);
    }, [updateEncounter, encounter]);

    const removeOneMonsterFromEncounter = useCallback((monster) => {
        updateEncounter(monster, (encounter.find(m => m.slug === monster.slug)?.count || 1) - 1);
    }, [updateEncounter, encounter]);

    const removeMonsterFromEncounter = useCallback((index) => {
        setEncounter((prevEncounter) => prevEncounter.filter((_, i) => i !== index));
    }, []);

    const updateMonsterCount = useCallback((monster, count) => {
        const newCount = parseInt(count, 10);
        if (!isNaN(newCount) && newCount > 0) {
            updateEncounter(monster, newCount);
        }
    }, [updateEncounter]);

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
                party={party}
                addMonsterToEncounter={addMonsterToEncounter}
                removeMonsterFromEncounter={removeMonsterFromEncounter}
                removeOneMonsterFromEncounter={removeOneMonsterFromEncounter}
                updateMonsterCount={updateMonsterCount}
            />
            <MonsterList
                addMonsterToEncounter={addMonsterToEncounter}
            />
        </>
    )
}

export default Encounters;
