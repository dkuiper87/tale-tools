import { useState } from "react";
import monsterXpByCr from "../../constants/dndconstants.jsx";

function MonsterListItem({ index, monster, addMonsterToEncounter }) {
    const [expandedInfo, setExpandedInfo] = useState(false);

    // Function to format ability scores with their modifiers
    const formatAbilityScore = (score) => {
        const modifier = Math.floor((score - 10) / 2);
        return `${score} (${modifier >= 0 ? '+' : ''}${modifier})`;
    };

    return (
        <li key={index} onClick={() => setExpandedInfo(!expandedInfo)}>
            <article>
                {/* Monster's basic information */}
                <header>
                    <h2>{monster.name} (CR {monster.cr}) ({monsterXpByCr[monster.challenge_rating].toLocaleString()} XP)</h2>
                    <p>{monster.size} {monster.type}, {monster.alignment} {monster.document__slug.toUpperCase()}</p>
                </header>
                <button onClick={(e) => {
                    e.stopPropagation();
                    addMonsterToEncounter(monster);
                }}>Add
                </button>
                {/* Detailed information when expanded */}
                {expandedInfo && (
                    <section>
                        <p><strong>Armor Class:</strong> {monster.armor_class} ({monster.armor_desc})</p>
                        <p><strong>Hit Points:</strong> {monster.hit_points} ({monster.hit_dice})</p>
                        <p>
                            <strong>Speed:</strong>
                            Walk {monster.speed.walk} ft.,
                            Swim {monster.speed.swim} ft.,
                            Burrow {monster.speed.burrow} ft.
                        </p>
                        <p>
                            <strong>STR:</strong> {formatAbilityScore(monster.strength)}
                            <strong> DEX:</strong> {formatAbilityScore(monster.dexterity)}
                            <strong> CON:</strong> {formatAbilityScore(monster.constitution)}
                            <strong> INT:</strong> {formatAbilityScore(monster.intelligence)}
                            <strong> WIS:</strong> {formatAbilityScore(monster.wisdom)}
                            <strong> CHA:</strong> {formatAbilityScore(monster.charisma)}
                        </p>
                        <p>
                            <strong>Saving Throws:</strong>
                            {monster.strength_save && ` Str +${monster.strength_save}`}
                            {monster.dexterity_save && ` Dex +${monster.dexterity_save}`}
                            {monster.constitution_save && ` Con +${monster.constitution_save}`}
                            {monster.intelligence_save && ` Int +${monster.intelligence_save}`}
                            {monster.wisdom_save && ` Wis +${monster.wisdom_save}`}
                            {monster.charisma_save && ` Cha +${monster.charisma_save}`}
                        </p>
                        <p>
                            <strong>Skills:</strong>
                            {Object.entries(monster.skills).map(([skill, value]) => (
                                <span key={skill}>{skill.charAt(0).toUpperCase() + skill.slice(1)} +{value}, </span>
                            ))}
                        </p>
                        <p><strong>Damage Resistances:</strong> {monster.damage_resistances}</p>
                        <p><strong>Damage Immunities:</strong> {monster.damage_immunities}</p>
                        <p><strong>Senses:</strong> {monster.senses}</p>
                        <p><strong>Languages:</strong> {monster.languages}</p>
                        <p><strong>Challenge:</strong> {monster.challenge_rating} ({monsterXpByCr[monster.challenge_rating].toLocaleString()} XP)</p>

                        {/* Special abilities */}
                        {monster.special_abilities.length > 0 && (
                            <section>
                                <h3>Special Abilities</h3>
                                {monster.special_abilities.map((ability) => (
                                    <p key={ability.name}>
                                        <strong>{ability.name}:</strong> {ability.desc}
                                    </p>
                                ))}
                            </section>
                        )}

                        {/* Actions */}
                        {monster.actions.length > 0 && (
                            <section>
                                <h3>Actions</h3>
                                {monster.actions.map((action) => (
                                    <p key={action.name}>
                                        <strong>{action.name}:</strong> {action.desc}
                                    </p>
                                ))}
                            </section>
                        )}
                        {/* Legendary Actions */}
                        {monster.legendary_actions && monster.legendary_actions.length > 0 && (
                            <section>
                                <h3>Legendary Actions</h3>
                                <p>{monster.legendary_desc}</p>
                                {monster.legendary_actions.map((action) => (
                                    <p key={action.name}>
                                        <strong>{action.name}:</strong> {action.desc}
                                    </p>
                                ))}
                            </section>
                        )}
                        {/* Source information */}
                        <footer>
                            <p>Source: <a href={monster.document__url} target="_blank" rel="noopener noreferrer">{monster.document__title}</a></p>
                        </footer>
                    </section>
                )}
            </article>
        </li>
    );
}

export default MonsterListItem;