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
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Card, CardHeader, CardText } from "material-ui/Card";
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
    constructor(props) {
        super(props);

        this.state = {
            searchNameInput: "",
            searchSubjectInput: "",
            searchStatusInput: null
        };
    }
    handleRowClick = bracketID => {
        this.props.history.push(`/manage/${bracketID}`);
    };
    componentDidMount() {
        this.props.getCreatorBrackets();
    }
    searchNameChange = event => {
        this.setState({
            searchNameInput: event.target.value
        });
    };
    searchSubjectChange = event => {
        this.setState({
            searchSubjectInput: event.target.value
        });
    };
    searchStatusChange = (event, index, value) =>
        this.setState({ searchStatusInput: value });
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
                            (bracket, index) =>
                                bracket.bracket_name
                                    .toLowerCase()
                                    .includes(
                                        this.state.searchNameInput.toLowerCase()
                                    ) &&
                                bracket.subject
                                    .toLowerCase()
                                    .includes(
                                        this.state.searchSubjectInput.toLowerCase()
                                    ) &&
                                bracket.status
                                    .toLowerCase()
                                    .includes(
                                        this.state.searchStatusInput || ""
                                    ) ? (
                                    <TableRow
                                        key={index}
                                        selectable={false}
                                        style={{
                                            backgroundColor: "#3a3a3a"
                                        }}
                                        onClick={e =>
                                            this.handleRowClick(
                                                bracket.bracket_id
                                            )
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
                                ) : null
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
                            <div className="search-container">
                                <Card style={{ backgroundColor: "#222" }}>
                                    <CardHeader
                                        title="Search Filters"
                                        // subtitle="Subtitle"
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                        style={{ textAlign: "left" }}
                                    />
                                    <CardText expandable={true}>
                                        <div className="ui-form-container">
                                            <div className="ui-form-half-container">
                                                <TextField
                                                    value={
                                                        this.state
                                                            .searchNameInput
                                                    }
                                                    onChange={
                                                        this.searchNameChange
                                                    }
                                                    hintText="Bracket Name"
                                                    floatingLabelText="Search by Name"
                                                    fullWidth={true}
                                                />
                                            </div>
                                            <div className="ui-form-divider" />
                                            <div className="ui-form-half-container">
                                                <TextField
                                                    value={
                                                        this.state
                                                            .searchSubjectInput
                                                    }
                                                    onChange={
                                                        this.searchSubjectChange
                                                    }
                                                    hintText="Bracket Subject"
                                                    floatingLabelText="Search by Subject"
                                                    fullWidth={true}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <SelectField
                                            floatingLabelText="Filter by Status"
                                            value={this.state.searchStatusInput}
                                            onChange={this.searchStatusChange}
                                            style={{ textAlign: "left" }}
                                            fullWidth={true}
                                        >
                                            <MenuItem
                                                value={null}
                                                primaryText=""
                                            />
                                            <MenuItem
                                                value={"draft"}
                                                primaryText="Draft"
                                            />
                                            <MenuItem
                                                value={"ready"}
                                                primaryText="Ready"
                                            />
                                            <MenuItem
                                                value={"live"}
                                                primaryText="Live"
                                            />
                                            <MenuItem
                                                value={"done"}
                                                primaryText="Done"
                                            />
                                        </SelectField>
                                    </CardText>
                                </Card>
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
