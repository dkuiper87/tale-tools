import {useEffect, useState} from "react";
import axios from "axios";
import dndUri from "../../constants/dndbackend.jsx";
import RulesItem from "../../components/rulesItem/RulesItem.jsx";

function Rules() {
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
            <nav>
                <ul>
                    {rulesNav.map((navItem) => (
                        <li key={navItem}>
                            <button
                                onClick={() => setNavSelection(navItem)}
                                className={navSelection === navItem ? 'active' : ''}
                            >
                                {navItem}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <ul>
                {rules.filter(rule => rule.parent === navSelection).map((rule) => (
                    /*<article key={index}>
                        <h2>{rule.name}</h2>
                        {/!*<div>{formatDescription(rule.desc)}</div>*!/}
                    </article>*/
                    <RulesItem
                        key={rule.slug}
                        rule={rule}
                    />
                ))}
            </ul>
        </>
    );
}
/*
Gameplay Mechanics
Combat
Equipment
Characters
Rules
Character Advancement


Legal Information
 */
export default Rules