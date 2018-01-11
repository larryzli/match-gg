import React from "react";
import { Link } from "react-router-dom";
import ChevronRight from "material-ui-icons/ChevronRight";

import "./Breadcrumb.css";

const Breadcrumb = props => {
    const numCrumbs = props.crumbsArray.length;
    const displayCrumbs = props.crumbsArray.map((crumb, index) => {
        if (index + 1 === numCrumbs) {
            return (
                <div className="breadcrumb">
                    <div className="breadcrumb-name last-crumb">
                        {crumb.name}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="breadcrumb">
                    <Link to={crumb.link} className="breadcrumb-name">
                        {crumb.name}
                    </Link>
                    <ChevronRight className="breadcrumb-icon" />
                </div>
            );
        }
    });
    return <div className="breadcrumb-container">{displayCrumbs}</div>;
};

export default Breadcrumb;
