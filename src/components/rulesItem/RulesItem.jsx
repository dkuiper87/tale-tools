import formatDescription from "../../helpers/formatDescription.jsx";
import {useState} from "react";

function RulesItem({index, rule}) {
    const [expandRule, setExpandRule] = useState(false);
    return (
        <article key={index} onClick={() => setExpandRule(!expandRule)}>
            <h2 className='add-pointer'>{rule.name}</h2>
            {expandRule && (
                    <div>{formatDescription(rule.desc)}</div>
                )}
        </article>
    )
}

export default RulesItem