import {useEffect, useState} from "react";
import axios from "axios";
import dndUri from "../../constants/dndbackend.jsx";
import RulesItem from "../../components/rulesItem/RulesItem.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import './Rules.css'

function Rules() {
    const {user} = useAuth();
    const [rules, setRules] = useState([]);
    const [navSelection, setNavSelection] = useState('');
    const rulesNav =
        [
            "Gameplay Mechanics",
            "Combat",
            "Equipment",
            "Characters",
            "Rules",
            "Character Advancement",
        ];

    useEffect( () => {
            async function fetchRules() {
                try {
                    const result = await axios.get(`${dndUri}v1/sections/`);
                    return result.data;
                } catch (error) {
                    console.error("Error fetching Rules:", error);
                }
            }

            async function getRules() {
                const rulesData = await fetchRules();
                if (rulesData && rulesData.results) {
                    setRules(rulesData.results);
                    console.log(rulesData)
                }
            }

            getRules();
        }, []);

    return (
        <>
            {user ? (
                <>
                    <nav>
                        <ul class='flex-box'>
                            {rulesNav.map((navItem) => (
                                <li key={navItem}>
                                    <button
                                        onClick={() => setNavSelection(navItem)}
                                        className={navSelection === navItem ? 'active rules-menu' : 'rules-menu'}
                                    >
                                        {navItem}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <ul>
                        {rules.filter(rule => rule.parent === navSelection).map((rule) => (
                            <RulesItem
                                key={rule.slug}
                                rule={rule}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <h1>Welcome to our website! Please log in.</h1>
            )}
        </>
    );
}
export default Rules