// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { Link } from "react-router-dom";
// IMPORT STYLES
import "./About.css";

// COMPONENT
class About extends Component {
    render() {
        return (
            <div className="about-container">
                INTRO AND INFO GOES HERE
                <Link to="/">
                    <button className="ui-button">GET STARTED</button>
                </Link>
            </div>
        );
    }
}

export default About;
