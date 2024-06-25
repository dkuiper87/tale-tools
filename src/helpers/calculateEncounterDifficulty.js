import partyExperienceThreshold from "./partyExperienceThreshold.js";

function calculateEncounterDifficulty(party, adjustedExperience) {
    const easy = partyExperienceThreshold(party, 'Easy');
    const medium = partyExperienceThreshold(party, 'Medium');
    const hard = partyExperienceThreshold(party, 'Hard');
    const deadly = partyExperienceThreshold(party, 'Deadly');

    if (adjustedExperience === 0) {
        return "None"
    } else if (adjustedExperience >= deadly) {
        return "Deadly";
    } else if (adjustedExperience >= hard) {
        return "Hard";
    } else if (adjustedExperience >= medium) {
        return "Medium";
    } else if (adjustedExperience >= easy) {
        return "Easy";
    } else if (adjustedExperience < easy) {
        return "Trivial";
    } else {
        return "None";
    }
};

export default calculateEncounterDifficulty