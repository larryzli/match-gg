// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./ManageViewMatch.css";
// IMPORT REDUX FUNCTIONS
import { retrieveMatchData } from "../../ducks/matchReducer";

// COMPONENT
class ManageViewMatch extends Component {
    componentDidMount() {
        this.props.retrieveMatchData(this.props.match.params.matchid);
    }
    render() {
        console.log(this.props);
        const breadcrumbs = [
            { name: "Manage", link: "/manage" },
            {
                name: this.props.matches.matchBracketName,
                link: `/manage/${this.props.matches.matchBracketID}`
            },
            {
                name: `${this.props.matches.team1Name ||
                    (this.props.matches.matchRoundNumber === 1
                        ? "BYE"
                        : "TBD")} vs ${this.props.matches.team2Name ||
                    (this.props.matches.matchRoundNumber === 1
                        ? "BYE"
                        : "TBD")}`,
                link: `/manage/${this.props.brackets.bracketID}`
            }
        ];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="manage-view-match-container">
                            Manage
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { retrieveMatchData })(ManageViewMatch);
