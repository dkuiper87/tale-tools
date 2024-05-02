import { useEffect, useState } from "react";
import axios from "axios";
import dndUri from "../../constants/dndbackend.jsx";
import MonsterListItem from "../monsterListItem/MonsterListItem.jsx";

function MonsterList() {
    const [monsters, setMonsters] = useState([]);
    const [uri, setUri] = useState(dndUri + "v1/monsters/");
    const [monsterCount, setMonsterCount] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState('');
    const [monstersPerPage, setMonstersPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const monstersPerPageOptions = [25, 50, 75, 100];

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
                setTotalPages(Math.ceil(monsterData.count / monstersPerPage));
            }
        }

        getMonsterList();
    }, [uri]);

    const handlePageChange = async (newPage) => {
        try {
            const result = await axios.get(newPage);
            if (result.data && result.data.results) {
                setMonsters(result.data.results);
                setMonsterCount(result.data.count);
                setPreviousPage(result.data.previous);
                setNextPage(result.data.next);
                setCurrentPage(getPageNumberFromUrl(newPage));
            }
        } catch (error) {
            console.error("Error fetching Monster List:", error);
        }
    }

    const handleMonstersPerPage = (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setMonstersPerPage(selectedPerPage);
        setUri(`${dndUri}v1/monsters/?limit=${selectedPerPage}`);
        setCurrentPage(1); // Reset to the first page when changing monsters per page
    }

    // Function to extract the page number from the URL
    const getPageNumberFromUrl = (url) => {
        const params = new URLSearchParams(url);
        return parseInt(params.get('page')) || 1;
    }

    // Function to generate an array of page numbers for pagination
    const generatePageNumbers = () => {
        const maxPageButtons = 10; // Maximum number of page buttons to show
        const pageNumbers = [];

        if (totalPages <= maxPageButtons) {
            // Show all page numbers if total pages are less than or equal to maxPageButtons
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show ellipsis before the last page if current page is far from the last page
            if (currentPage <= 3) {
                for (let i = 1; i <= maxPageButtons - 2; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
            // Show ellipsis after the first page if current page is far from the first page
            else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - (maxPageButtons - 3); i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            }
            // Show page numbers around the current page
            else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    }

    return (
        <>
            <h3>{monsterCount} results!</h3>
            <label htmlFor="monsters-per-page">
                Number of results:
                <select
                    id="monsters-per-page"
                    value={monstersPerPage}
                    onChange={handleMonstersPerPage}
                >
                    {monstersPerPageOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <ul>
                {monsters.map((monster) => (
                    <MonsterListItem
                        key={monster.slug}
                        monster={monster}
                    />
                ))}
            </ul>
            <button
                disabled={!previousPage}
                onClick={() => handlePageChange(previousPage)}
            >
                Previous
            </button>
            {generatePageNumbers().map((pageNumber, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(`${uri}${uri.includes('?') ? '&' : '?'}page=${pageNumber}`)}
                    disabled={pageNumber === '...' || pageNumber === currentPage}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                disabled={!nextPage}
                onClick={() => handlePageChange(nextPage)}
            >
                Next
            </button>
        </>
    );
}

export default MonsterList;