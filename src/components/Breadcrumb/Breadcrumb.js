import React from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";

import "./Breadcrumb.css";

const Breadcrumb = props => {
    const numCrumbs = props.crumbsArray.length;
    const displayCrumbs = props.crumbsArray.map((crumb, index) => {
        if (index + 1 === numCrumbs) {
            return (
                <div key={index} className="breadcrumb">
                    <div className="breadcrumb-name last-crumb">
                        {crumb.name}
                    </div>
                </div>
            );
        } else {
            return (
                <div key={index} className="breadcrumb">
                    <Link
                        to={crumb.link}
                        className="breadcrumb-name link-crumb"
                    >
                        {crumb.name}
                    </Link>
                    <FontAwesomeIcon
                        className="breadcrumb-icon"
                        icon={faChevronRight}
                    />
                </div>
            );
        }
    });
    return <div className="breadcrumb-container">{displayCrumbs}</div>;
};

export default Breadcrumb;
