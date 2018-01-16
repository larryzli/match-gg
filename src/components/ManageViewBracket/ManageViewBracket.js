// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

class ManageViewBracket extends Component {
    render() {
        let bracketInfo = { bracket_name: "Bracket Does Not Exist" };
        console.log(this.props.match);
        if (this.props.brackets.bracketList.length > 0) {
            bracketInfo = this.props.brackets.bracketList.filter(bracket => {
                console.log(bracket.bracket_id);
                return "" + bracket.bracket_id === this.props.match.params.id;
            })[0];
        }
        console.log("bracketInfo: ", bracketInfo);
        const breadcrumbs = [
            {
                name: "Manage",
                link: "/manage"
            },
            {
                name: bracketInfo.bracket_name,
                link: "/manage/create/bracket"
            }
        ];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="manage-view-bracket-container" />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(ManageViewBracket);
