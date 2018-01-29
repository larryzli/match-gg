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
import { Tabs, Tab } from "material-ui/Tabs";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Card, CardHeader, CardText } from "material-ui/Card";
// IMPORT ICONS
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./Dashboard.css";
// IMPORT REDUX FUNCTIONS
import { retrieveUserBrackets } from "../../ducks/bracketReducer";
import { retrieveUserMatches } from "../../ducks/matchReducer";

// COMPONENT
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchNameInput: "",
            searchSubjectInput: "",
            searchStatusInput: null,

            searchMatchNameInput: "",
            searchMatchSubjectInput: "",
            searchMatchStatusInput: false
        };
    }
    searchMatchNameChange = event => {
        this.setState({
            searchMatchNameInput: event.target.value
        });
    };
    searchMatchSubjectChange = event => {
        this.setState({
            searchMatchSubjectInput: event.target.value
        });
    };
    searchMatchStatusChange = (event, index, value) =>
        this.setState({ searchMatchStatusInput: value });
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
        // console.log(this.props);
        const breadcrumbs = [{ name: "Dashboard", link: "/dashboard" }];
        let myBrackets = (
            <div className="bracket-list-empty">No Brackets Found</div>
        );
        let myMatches = (
            <div className="bracket-list-empty">No Matches Found</div>
        );
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
                        {this.props.matches.matchList.map(
                            (match, index) =>
                                match.bracket_name
                                    .toLowerCase()
                                    .includes(
                                        this.state.searchMatchNameInput.toLowerCase()
                                    ) &&
                                match.subject
                                    .toLowerCase()
                                    .includes(
                                        this.state.searchMatchSubjectInput.toLowerCase()
                                    ) &&
                                match.completed ===
                                    this.state.searchMatchStatusInput ? (
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
                                            {match.completed
                                                ? "Done"
                                                : "Pending"}
                                        </TableRowColumn>
                                    </TableRow>
                                ) : null
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
                            <Tabs style={{ width: "100%" }}>
                                <Tab
                                    label="MY BRACKETS"
                                    style={{
                                        borderBottom: "2px solid #5a5a5a"
                                    }}
                                >
                                    {/* <div
                                        className="ui-title-header"
                                        style={{ marginTop: "30px" }}
                                    >
                                        <h2 className="ui-form-title">
                                            My Brackets
                                        </h2>
                                        <div className="ui-header-controls">
                                            <button className="ui-button-header button-main button-short">
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    className="ui-button-icon"
                                                />
                                                Search
                                            </button>
                                        </div>
                                    </div> */}
                                    <div
                                        className="search-container"
                                        style={{ paddingTop: "15px" }}
                                    >
                                        <Card
                                            style={{ backgroundColor: "#222" }}
                                        >
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
                                                                this
                                                                    .searchNameChange
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
                                                                this
                                                                    .searchSubjectChange
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
                                                    value={
                                                        this.state
                                                            .searchStatusInput
                                                    }
                                                    onChange={
                                                        this.searchStatusChange
                                                    }
                                                    style={{
                                                        textAlign: "left"
                                                    }}
                                                    fullWidth={true}
                                                >
                                                    <MenuItem
                                                        value={null}
                                                        primaryText=""
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
                                        {myBrackets}
                                    </div>
                                </Tab>

                                <Tab
                                    label="MY MATCHES"
                                    style={{
                                        borderBottom: "2px solid #5a5a5a"
                                    }}
                                >
                                    {/* <div
                                        className="ui-title-header"
                                        style={{ marginTop: "30px" }}
                                    >
                                        <h2 className="ui-form-title">
                                            My Matches
                                        </h2>
                                        <div className="ui-header-controls">
                                            <button className="ui-button-header button-main button-short">
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    className="ui-button-icon"
                                                />
                                                Search
                                            </button>
                                        </div>
                                    </div> */}
                                    <div
                                        className="search-container"
                                        style={{ paddingTop: "15px" }}
                                    >
                                        <Card
                                            style={{ backgroundColor: "#222" }}
                                        >
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
                                                                    .searchMatchNameInput
                                                            }
                                                            onChange={
                                                                this
                                                                    .searchMatchNameChange
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
                                                                    .searchMatchSubjectInput
                                                            }
                                                            onChange={
                                                                this
                                                                    .searchMatchSubjectChange
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
                                                    value={
                                                        this.state
                                                            .searchMatchStatusInput
                                                    }
                                                    onChange={
                                                        this
                                                            .searchMatchStatusChange
                                                    }
                                                    style={{
                                                        textAlign: "left"
                                                    }}
                                                    fullWidth={true}
                                                >
                                                    <MenuItem
                                                        value={false}
                                                        primaryText="Pending"
                                                    />
                                                    <MenuItem
                                                        value={true}
                                                        primaryText="Done"
                                                    />
                                                </SelectField>
                                            </CardText>
                                        </Card>
                                    </div>
                                    <div className="manage-brackets-list">
                                        {myMatches}
                                    </div>
                                </Tab>
                            </Tabs>
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
