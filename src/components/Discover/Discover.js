// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import { faEye, faSearch } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./Discover.css";
// IMPORT REDUX FUNCTIONS
import { retrievePublicBrackets } from "../../ducks/bracketReducer";

// COMPONENT
class Discover extends Component {
    componentDidMount() {
        this.props.retrievePublicBrackets();
    }
    render() {
        let publicBrackets = (
            <div className="manage-bracket-list-empty">No Brackets</div>
        );
        if (this.props.brackets.bracketList) {
            publicBrackets = (
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
                                colSpan="1"
                                style={{
                                    textAlign: "center"
                                }}
                            />
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
                                >
                                    <TableRowColumn
                                        colSpan="1"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <Link
                                            to={`/manage/${bracket.bracket_id}`}
                                            className="bracket-control-icon"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </Link>
                                        {/* <Link
                                                to="/brackets"
                                                className="bracket-control-icon"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </Link> */}
                                    </TableRowColumn>
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
                                            textAlign: "center"
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
        const breadcrumbs = [{ name: "Discover", link: "/discover" }];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="discover-container">
                            <div className="discover-list-header">
                                <h2 className="ui-form-title">
                                    Public Brackets
                                </h2>
                                <button className="ui-button-header button-main button-short">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="ui-button-icon"
                                    />
                                    Search
                                </button>
                            </div>
                            <div className="manage-brackets-list">
                                {publicBrackets}
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
export default connect(mapStateToProps, { retrievePublicBrackets })(Discover);
