/*
  Function to calculate the experience based on the size of the encounter.
  It takes in the number of monsters and the total experience and gives an adjusted value that is used to calculate the difficulty of the encounter
*/
function adjustedExperience(encounterSize, totalXp) {
    const numberOfMonsters = encounterSize;
    const totalExperience = totalXp;

    if (numberOfMonsters === 1) {
        return totalExperience;
    } else if (numberOfMonsters === 2) {
        return totalExperience * 1.5;
    } else if (numberOfMonsters >= 3 && numberOfMonsters <= 6) {
        return totalExperience * 2;
    } else if (numberOfMonsters >= 7 && numberOfMonsters <= 10) {
        return totalExperience * 2.5
    } else if (numberOfMonsters >= 11 && numberOfMonsters <= 14) {
        return totalExperience * 3;
    } else {
        return totalExperience * 4;
    }
};

export default adjustedExperience
