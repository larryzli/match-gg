// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// MATERIAL UI
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./Dashboard.css";
// IMPORT REDUX FUNCTIONS
import { retrieveUserBrackets } from "../../ducks/bracketReducer";
import { retrieveUserMatches } from "../../ducks/matchReducer";

// COMPONENT
class Dashboard extends Component {
    handleRowClick = bracketID => {
        this.props.history.push(`/discover/view/${bracketID}`);
    };
    handleMatchClick = (matchID, bracketID) => {
        this.props.history.push(`/discover/view/${bracketID}/${matchID}`);
    };
    componentDidMount() {
        this.props.retrieveUserBrackets();
        this.props.retrieveUserMatches();
    }
    render() {
        console.log(this.props);
        const breadcrumbs = [{ name: "Dashboard", link: "/dashboard" }];
        let myBrackets = <div className="bracket-list-empty">No Brackets</div>;
        let myMatches = <div className="bracket-list-empty">No Brackets</div>;
        if (this.props.brackets.bracketList) {
            myBrackets = (
                <Table height="100%" fixedHeader={true}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        selectable={false}
                    >
                        <TableRow
                            style={{
                                backgroundColor: "#222222"
                            }}
                        >
                            <TableHeaderColumn
                                colSpan="6"
                                tooltip="Bracket Name"
                            >
                                NAME
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="4"
                                tooltip="Bracket Subject"
                            >
                                SUBJECT
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="2"
                                tooltip="Start Date"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                DATE
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="2"
                                tooltip="Start Time"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                TIME
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="2"
                                tooltip="Bracket Status"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                STATUS
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.brackets.bracketList.map(
                            (bracket, index) => (
                                <TableRow
                                    key={index}
                                    selectable={false}
                                    style={{
                                        backgroundColor: "#3a3a3a"
                                    }}
                                    onClick={e =>
                                        this.handleRowClick(bracket.bracket_id)
                                    }
                                >
                                    <TableRowColumn colSpan="6">
                                        {bracket.bracket_name}
                                    </TableRowColumn>
                                    <TableRowColumn colSpan="4">
                                        {bracket.subject}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        colSpan="2"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        {moment(bracket.start_date).format(
                                            "MM/DD/YY"
                                        )}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        colSpan="2"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        {moment(bracket.start_time).format(
                                            "hh:mmA"
                                        )}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        colSpan="2"
                                        style={{
                                            textAlign: "center",
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {bracket.status}
                                    </TableRowColumn>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            );
        }
        if (this.props.matches.matchList) {
            myMatches = (
                <Table height="100%" fixedHeader={true}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        selectable={false}
                    >
                        <TableRow
                            style={{
                                backgroundColor: "#222222"
                            }}
                        >
                            <TableHeaderColumn
                                colSpan="6"
                                tooltip="Bracket Name"
                            >
                                BRACKET NAME
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="3"
                                tooltip="Bracket Subject"
                            >
                                SUBJECT
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="2"
                                tooltip="Match Opponent"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                OPPONENT
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="3"
                                tooltip="Bracket Round"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                ROUND
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                colSpan="2"
                                tooltip="Match Status"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                STATUS
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.matches.matchList.map((match, index) => (
                            <TableRow
                                key={index}
                                selectable={false}
                                style={{
                                    backgroundColor: "#3a3a3a"
                                }}
                                onClick={e =>
                                    this.handleMatchClick(
                                        match.match_id,
                                        match.bracket_id
                                    )
                                }
                            >
                                <TableRowColumn colSpan="6">
                                    {match.bracket_name}
                                </TableRowColumn>
                                <TableRowColumn colSpan="3">
                                    {match.subject}
                                </TableRowColumn>
                                <TableRowColumn
                                    colSpan="2"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    {(this.props.users.user.user_id ===
                                    match.team1_id
                                        ? match.team2_name
                                        : match.team1_name) || "TBD"}
                                </TableRowColumn>
                                <TableRowColumn
                                    colSpan="3"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    {match.round_number}
                                </TableRowColumn>
                                <TableRowColumn
                                    colSpan="2"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    {match.completed ? "Done" : "Pending"}
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="dashboard-container">
                            <div className="ui-title-header">
                                <h2 className="ui-form-title">My Brackets</h2>
                                <div className="ui-header-controls">
                                    <button className="ui-button-header button-main button-short">
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="ui-button-icon"
                                        />
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="dashboard-bracket-list">
                                {myBrackets}
                            </div>
                            <div
                                className="ui-title-header"
                                style={{ marginTop: "30px" }}
                            >
                                <h2 className="ui-form-title">My Matches</h2>
                                <div className="ui-header-controls">
                                    <button className="ui-button-header button-main button-short">
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="ui-button-icon"
                                        />
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="dashboard-bracket-list">
                                {myMatches}
                            </div>
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
export default connect(mapStateToProps, {
    retrieveUserBrackets,
    retrieveUserMatches
})(Dashboard);
