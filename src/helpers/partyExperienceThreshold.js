import {xpThresholdsByLevel} from "../constants/dndconstants.jsx";

/*
    Function that takes a party and a difficulty as an input and returns the experience thresholds for different difficulties of encounters.
    Based on the experience threshold (per difficulty) for each character summed.
 */

function partyExperienceThreshold(party, difficulty) {
    return party.reduce((total, character) => {
        const level = character.level;
        const xpForLevel = xpThresholdsByLevel["Character level"][level][difficulty];
        return total + xpForLevel;
    }, 0);
}

export default partyExperienceThreshold;