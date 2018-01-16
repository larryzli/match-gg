// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./Manage.css";
// IMPORT REDUX FUNCTIONS
import { getCreatorBrackets } from "../../ducks/bracketReducer";

// COMPONENT
class Manage extends Component {
    componentDidMount() {
        this.props.getCreatorBrackets();
    }
    render() {
        console.log(this.props);
        let userBrackets = (
            <div className="manage-bracket-list-empty">No Brackets</div>
        );
        if (this.props.brackets.bracketList) {
            userBrackets = this.props.brackets.bracketList.map(
                (bracket, index) => {
                    let bracketDate = moment(bracket.start_date).format(
                        "MM/DD/YY"
                    );
                    let bracketTime = moment(bracket.start_time).format(
                        "hh:mm A"
                    );
                    console.log(bracket);
                    return (
                        <div className="manage-bracket-list-entry" key={index}>
                            <div className="manage-bracket-list-column name-column">
                                {bracket.bracket_name}{" "}
                            </div>
                            <div className="manage-bracket-list-column date-time-column">
                                {bracketDate}{" "}
                            </div>
                            <div className="manage-bracket-list-column date-time-column">
                                {bracketTime}{" "}
                            </div>
                            <div className="manage-bracket-list-column subject-column">
                                {bracket.subject}{" "}
                            </div>
                            <div className="manage-bracket-list-column format-column">
                                {bracket.format}{" "}
                            </div>
                            <div className="manage-bracket-list-column status-column">
                                {bracket.status}{" "}
                            </div>
                        </div>
                    );
                }
            );
        }
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb
                            crumbsArray={[{ name: "Manage", link: "/manage" }]}
                        />
                        <div className="manage-container">
                            <div className="manage-brackets-list">
                                <div className="" />
                                {userBrackets}
                            </div>
                            <Link to="/manage/create/bracket">
                                <button className="ui-button button-main">
                                    Create New Bracket
                                </button>
                            </Link>
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
export default connect(mapStateToProps, { getCreatorBrackets })(Manage);
