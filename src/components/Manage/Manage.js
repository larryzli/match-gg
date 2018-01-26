// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
// IMPORT MATERIAL UI
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
import { faPlus } from "@fortawesome/fontawesome-free-solid";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./Manage.css";
// IMPORT REDUX FUNCTIONS
import { getCreatorBrackets } from "../../ducks/bracketReducer";

// COMPONENT
class Manage extends Component {
    handleRowClick = bracketID => {
        this.props.history.push(`/manage/${bracketID}`);
    };
    componentDidMount() {
        this.props.getCreatorBrackets();
    }
    render() {
        let userBrackets = (
            <div className="bracket-list-empty">No Brackets</div>
        );
        if (this.props.brackets.bracketList) {
            userBrackets = (
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
        const breadcrumbs = [{ name: "Manage", link: "/manage" }];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="manage-container">
                            <div className="ui-title-header">
                                <h2 className="ui-form-title">
                                    Created Brackets
                                </h2>
                                <Link to="/manage/create" className="ui-link">
                                    <button className="ui-button-header button-main button-short">
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="ui-button-icon"
                                        />
                                        Create
                                    </button>
                                </Link>
                            </div>
                            <div className="manage-brackets-list">
                                {userBrackets}
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
export default connect(mapStateToProps, { getCreatorBrackets })(Manage);
