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

// COMPONENT
class Dashboard extends Component {
    handleRowClick = bracketID => {
        this.props.history.push(`/discover/view/${bracketID}`);
    };
    componentDidMount() {
        this.props.retrieveUserBrackets();
    }
    render() {
        const breadcrumbs = [{ name: "Dashboard", link: "/dashboard" }];
        let myBrackets = <div className="bracket-list-empty">No Brackets</div>;
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
                            <div className="dashboard-bracket-list" />
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
export default connect(mapStateToProps, { retrieveUserBrackets })(Dashboard);
