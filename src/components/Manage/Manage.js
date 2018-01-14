// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
        let userBrackets = <div>No Brackets</div>;
        if (this.props.brackets.bracketList) {
            userBrackets = this.props.brackets.bracketList.map(
                (bracket, index) => {
                    return <div key={index}>{bracket.bracket_name}</div>;
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
