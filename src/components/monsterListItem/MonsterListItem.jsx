
function MonsterListItem({index, monster}) {
    //Function that makes an API call to retrieve the CR (level) of this monster.



    return (
        <li key={index}>
            <div>
                <span>Name: {monster.name} </span>
                <span>Type: {monster.type} </span>
                <span>CR: {monster.challenge_rating} </span>
                <span>Size: {monster.size} </span>
            </div>
        </li>
    );
}
export default MonsterListItem