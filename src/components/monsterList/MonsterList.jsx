import {useEffect, useState} from "react";
import axios from "axios";
import dndUri from "../../constants/dndbackend.jsx";
import MonsterListItem from "../monsterListItem/MonsterListItem.jsx";

function MonsterList() {
    const [monsters, setMonsters] = useState([]);
    const [uri, setUri] = useState(dndUri + "v1/monsters/")
    const [monsterCount, setMonsterCount] = useState(null)
    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState('');
    //const [monstersPerPage, setMonstersPerPage] = useState(25)
    //const [currentPage, setCurrentPage] = useState();

    //Function to retrieve a list of monsters from the api when the component gets mounted.
    useEffect(() => {
        async function fetchMonsterList() {
            try {
                const result = await axios.get(uri);
                console.log(result.data);
                return result.data;
            } catch (error) {
                console.error("Error fetching Monster List:", error);
            }
        }

        async function getMonsterList() {
            const monsterData = await fetchMonsterList();
            if (monsterData && monsterData.results) {
                setMonsters(monsterData.results);
                setMonsterCount(monsterData.count);
                setPreviousPage(monsterData.previous);
                setNextPage(monsterData.next);
            }
        }

        getMonsterList();
    }, []);

    //Function to handle changing pages
    const handlePageChange = async (newPage) => {
        try {
            const result = await axios.get(newPage);
            if (result.data && result.data.results) {
                setMonsters(result.data.results);
                setMonsterCount(result.data.count);
                setPreviousPage(result.data.previous);
                setNextPage(result.data.next);
            }
        } catch (error) {
            console.error("Error fetching Monster List:", error);
        }
    }

    return (
        <>
            <h3>{monsterCount} results!</h3>
            <ul>
                {monsters.map((monster) => (
                    <MonsterListItem
                        key={monster.slug}
                        monster={monster}
                    />
                ))}
            </ul>
            <button disabled={previousPage === null} onClick={() => handlePageChange(previousPage)}>Previous</button>
            <button disabled={nextPage === null} onClick={() => handlePageChange(nextPage)}>Next</button>
        </>
    );
}

export default MonsterList