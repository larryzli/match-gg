// IMPORT DEPENDENCIES
import React from "react";
// IMPORT ICONS
// IMPORT STYLING
import "./Bracket.css";

// COMPONENT
const Bracket = ({ bracketStructure, showControls, matchClick }) => {
    console.log(bracketStructure);
    let bracketView;
    if (bracketStructure.numRounds > 0) {
    } else {
        bracketView = <div>Bracket has not started</div>;
    }

    return <div>{bracketView}</div>;
};

export default Bracket;
