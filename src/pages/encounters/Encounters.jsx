import MonsterList from "../../components/monsterList/MonsterList.jsx";
import PlayerParty from "../../components/playerParty/PlayerParty.jsx";
import EncounterBuilder from "../../components/encounterBuilder/EncounterBuilder.jsx";
import {useState} from "react";
function Encounters() {
    const [encounter, setEncounter] = useState([]);

    const addMonsterToEncounter = (monster) => {
        setEncounter((prevEncounter) => [...prevEncounter, monster]);
    };

    return (
        <>
            <h2>Encounters</h2>
            <PlayerParty/>
            <EncounterBuilder encounter={encounter} />
            <MonsterList addMonsterToEncounter={addMonsterToEncounter} />
        </>
    )
}

export default Encounters