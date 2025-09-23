import MonsterList from "../../components/monsterList/MonsterList.jsx";
import PlayerParty from "../../components/playerParty/PlayerParty.jsx";
import EncounterBuilder from "../../components/encounterBuilder/EncounterBuilder.jsx";
import { useState, useEffect, useCallback } from "react";
import './Encounters.css';
import {useAuth} from "../../context/AuthContext.jsx";


function Encounters() {
    const [encounter, setEncounter] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");
    const [useEncounterParty, setUseEncounterParty] = useState(false);
    const [party, setParty] = useState([]);
    const {user} = useAuth();

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
                } else {
                    newEncounter.splice(existingMonsterIndex, 1);
                }
                return newEncounter;
            } else if (count > 0) {
                return [...prevEncounter, { ...monster, count: count }];
            } else {
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
            const parties = JSON.parse(localStorage.getItem('Parties'));
            const selectedPartyData = parties[selectedPartyName];
            if (selectedPartyData) {
                setParty(selectedPartyData.members);
            } else {
                setParty([]);
            }
        } else {
            setParty([]);
        }
    };

    return (
        <>
            {user ? (
                <>
                    <div class={'flex-col'}>
                        <div class={'flex-box'}>
                            <div className='small-margin'>
                                <EncounterBuilder
                                    encounter={encounter}
                                    setEncounter={setEncounter}
                                    party={party}
                                    selectedParty={selectedParty}
                                    useEncounterParty={useEncounterParty}
                                    setUseEncounterParty={setUseEncounterParty}
                                    setSelectedParty={setSelectedParty}
                                    handlePartySelection={handlePartySelection}
                                    addMonsterToEncounter={addMonsterToEncounter}
                                    removeMonsterFromEncounter={removeMonsterFromEncounter}
                                    removeOneMonsterFromEncounter={removeOneMonsterFromEncounter}
                                    updateMonsterCount={updateMonsterCount}
                                />
                            </div>
                            <div className='small-margin'>
                                <PlayerParty
                                    party={party}
                                    setParty={setParty}
                                    selectedParty={selectedParty}
                                    handlePartySelection={handlePartySelection}
                                />
                            </div>
                        </div>
                        <div className='small-margin'>
                            <MonsterList
                                addMonsterToEncounter={addMonsterToEncounter}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <h1>Welcome to our website! Please log in.</h1>
            )}
        </>
    )
}

export default Encounters;
