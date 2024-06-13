import { useEffect, useState } from "react";
import axios from "axios";
import dndUri from "../../constants/dndbackend.jsx";
import MonsterListItem from "../monsterListItem/MonsterListItem.jsx";

function MonsterList({addMonsterToEncounter }) {
    const [monsters, setMonsters] = useState([]);
    const [uri, setUri] = useState(`${dndUri}v1/monsters/`);
    const [monsterCount, setMonsterCount] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState('');
    const [monstersPerPage, setMonstersPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const monstersPerPageOptions = [25, 50, 75, 100];
    const [sortMonsterList, setSortMonsterList] = useState('name');
    const sortMonsterListOptions = ['name', 'size', 'type', 'cr'];
    const filterMonsterByCrOptions = [0, 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] //Find another way to do this later, that is less bloated and can accommodate new higher cr monsters being added.
    const [crLow, setCrLow] = useState(0);
    const [crHigh, setCrHigh] = useState(30)

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

    const constructUri = (baseUri, options) => {
        let constructedUri = baseUri;

        // Add monsters per page limit
        if (options.limit) {
            constructedUri += `?limit=${options.limit}`;
        }

        // Add sorting option
        if (options.ordering) {
            constructedUri += `${constructedUri.includes('?') ? '&' : '?'}ordering=${options.ordering}`;
        }

        // Add pagination option
        if (options.page) {
            constructedUri += `${constructedUri.includes('?') ? '&' : '?'}page=${options.page}`;
        }

        // Add cr filter
        if (options.cr1 || options.cr2) {
            constructedUri += `${constructedUri.includes('?') ? '&' : '?'}cr__range=${options.cr1}%2C${options.cr2}`;
        }

        return constructedUri;
    };

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

    //Function to handle changing the number of monsters shown per page.
    const handleMonstersPerPage = (event) => {
        const selectedPerPage = parseInt(event.target.value);
        setMonstersPerPage(selectedPerPage);
        setUri(constructUri(dndUri + 'v1/monsters/', { limit: selectedPerPage, ordering: sortMonsterList, cr1: crLow, cr2: crHigh, page: currentPage }));
        setCurrentPage(1); // Reset to the first page when changing monsters per page
    }

    //Function to handle sorting the list of monsters.
    const handleSortMonsterList = (event) => {
        const selectedSorting = event.target.value;
        setSortMonsterList(selectedSorting);
        setUri(constructUri(dndUri + 'v1/monsters/', { limit: monstersPerPage, ordering: selectedSorting, cr1: crLow, cr2: crHigh, page: currentPage }));
        setCurrentPage(1); // Reset to the first page when changing how the list is sorted
    }

    //Function to handle setting the lowest CR value for filtering by CR.
    const handleFilterMonsterByCrOptionsLow = (event) => {
        const selectedLowCr = event.target.value;
        setCrLow(selectedLowCr);
        setUri(constructUri(dndUri + 'v1/monsters/', { limit: monstersPerPage, ordering: sortMonsterList, cr1: selectedLowCr, cr2: crHigh, page: currentPage }));
        setCurrentPage(1); // Reset to the first page when changing the filter
    }

    //Function to handle setting the highest CR value for filtering by CR.
    const handleFilterMonsterByCrOptionsHigh = (event) => {
        const selectedHighCr = event.target.value;
        setCrHigh(selectedHighCr);
        setUri(constructUri(dndUri + 'v1/monsters/', { limit: monstersPerPage, ordering: sortMonsterList, cr1: crLow, cr2: selectedHighCr, page: currentPage }));
        setCurrentPage(1); // Reset to the first page when changing the filter
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
            <label htmlFor="sort-monster-list">
                Sort by:
                <select
                    id="sort-monster-list"
                    value={sortMonsterList}
                    onChange={handleSortMonsterList}
                >
                    {sortMonsterListOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <label htmlFor="filter-cr-low-monster-list">
                From CR:
                <select
                    id="filter-cr-low-monster-list"
                    value={crLow}
                    onChange={handleFilterMonsterByCrOptionsLow}
                >
                    {filterMonsterByCrOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <label htmlFor="filter-cr-low-monster-list">
                To CR:
                <select
                    id="filter-cr-high-monster-list"
                    value={crHigh}
                    onChange={handleFilterMonsterByCrOptionsHigh}
                >
                    {filterMonsterByCrOptions.map((option, index) => (
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
                        addMonsterToEncounter={addMonsterToEncounter}
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

