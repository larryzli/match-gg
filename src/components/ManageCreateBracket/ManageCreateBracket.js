// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// IMPORT MATERIAL UI COMPONENTS
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import Checkbox from "material-ui/Checkbox";
// import SelectField from "material-ui/SelectField";
// import MenuItem from "material-ui/MenuItem";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./ManageCreateBracket.css";

// COMPONENT
class ManageCreateBracket extends Component {
    constructor(props) {
        super(props);

        // GET DATE
        // const today = new Date();
        // // FORMAT DATE AND TIME
        // let month = today.getMonth() + 1;
        // if (month < 10) {
        //     month = "0" + month;
        // }
        // let day = today.getDate();
        // if (day < 10) {
        //     day = "0" + day;
        // }
        // let minutes = today.getMinutes();
        // if (minutes < 10) {
        //     minutes = "0" + minutes;
        // }
        // let hours = today.getHours();
        // if (hours < 10) {
        //     hours = "0" + hours;
        // }
        // const date = `${today.getFullYear()}-${month}-${day}`;
        // const time = `${hours}:${minutes}`;

        // SET STATE
        this.state = {
            bracketName: "",
            bracketDescription: "",
            bracketSubject: "",
            bracketStartDate: {},
            bracketStartTime: {},
            bracketImageURL: "",
            bracketFormat: "single-elimination",
            bracketTeamSizeLimit: 1,
            bracketRandomizeSeeds: false,
            bracketRandomizeTeams: false,
            bracketInviteOnly: false,
            bracketBestOf: 1,
            bracketFinalsBestOf: 1,
            bracketHasPassword: false,
            bracketMaxTeams: null
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };
    dateChange = (event, date) => {
        this.setState({
            bracketStartDate: date
        });
    };
    timeChange = (event, date) => {
        this.setState({ bracketStartTime: date });
    };
    formatChange = (event, value) => {
        this.setState({ bracketFormat: value });
    };
    bestOfChange = (event, value) => {
        this.setState({ bracketBestOf: value });
    };
    inviteOnlyChange() {
        this.setState(oldState => {
            return {
                bracketInviteOnly: !oldState.bracketInviteOnly
            };
        });
    }
    hasPasswordChange() {
        this.setState(oldState => {
            return {
                bracketHasPassword: !oldState.bracketHasPassword
            };
        });
    }
    // maxTeamsChange = (event, index, value) =>
    //     this.setState({
    //         bracketMaxTeams: value
    //     });
    render() {
        const breadcrumbs = [
            {
                name: "Manage",
                link: "/manage"
            },
            {
                name: "Create Bracket",
                link: "/manage/create/bracket"
            }
        ];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="manage-create-bracket-container">
                            <h3 className="ui-form-title">Bracket Details</h3>
                            <div className="ui-form-container">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Name *"
                                    value={this.state.bracketName}
                                    onChange={this.handleChange("bracketName")}
                                />
                            </div>
                            <div className="ui-form-container">
                                <div className="ui-form-half-container">
                                    {/* <TextField
                                        fullWidth={true}
                                        floatingLabelText="Start Date"
                                        floatingLabelFixed={true}
                                        type="date"
                                        value={this.state.bracketStartDate}
                                        onChange={this.handleChange(
                                            "bracketStartDate"
                                        )}
                                    /> */}
                                    <DatePicker
                                        fullWidth={true}
                                        floatingLabelText="Start Date *"
                                        // container="inline"
                                        mode="landscape"
                                        value={this.state.bracketStartDate}
                                        onChange={this.dateChange}
                                    />
                                </div>
                                <div className="ui-form-divider" />
                                <div className="ui-form-half-container">
                                    {/* <TextField
                                        fullWidth={true}
                                        floatingLabelText="Start Time"
                                        floatingLabelFixed={true}
                                        type="time"
                                        value={this.state.bracketStartTime}
                                        onChange={this.handleChange(
                                            "bracketStartTime"
                                        )}
                                    /> */}
                                    <TimePicker
                                        format="ampm"
                                        fullWidth={true}
                                        floatingLabelText="Start Time *"
                                        value={this.state.bracketStartTime}
                                        onChange={this.timeChange}
                                    />
                                </div>
                            </div>
                            <div className="ui-form-container">
                                <div className="ui-form-half-container">
                                    <TextField
                                        fullWidth={true}
                                        floatingLabelText="Subject *"
                                        hintText="e.g. Ping Pong"
                                        value={this.state.bracketSubject}
                                        onChange={this.handleChange(
                                            "bracketSubject"
                                        )}
                                    />
                                </div>
                                <div className="ui-form-divider" />
                                <div className="ui-form-half-container">
                                    <TextField
                                        fullWidth={true}
                                        floatingLabelText="Custom Image URL"
                                        value={this.state.bracketImageURL}
                                        onChange={this.handleChange(
                                            "bracketImageURL"
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="ui-form-container">
                                <TextField
                                    fullWidth={true}
                                    multiLine={true}
                                    style={{ textAlign: "left" }}
                                    floatingLabelText="Description"
                                    value={this.state.bracketDescription}
                                    onChange={this.handleChange(
                                        "bracketDescription"
                                    )}
                                />
                            </div>
                            <div className="ui-form-container">
                                <div className="ui-form-half-container">
                                    <h4 className="ui-form-label">Format</h4>
                                    <RadioButtonGroup
                                        name="format"
                                        defaultSelected={
                                            this.state.bracketFormat
                                        }
                                        onChange={this.formatChange}
                                    >
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            value="single-elimination"
                                            label="Single Elimination"
                                        />
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            disabled
                                            value="double-elimination"
                                            label="Double Elimination (Coming Soon)"
                                        />
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            disabled
                                            value="round-robin"
                                            label="Round Robin (Coming Soon)"
                                        />
                                    </RadioButtonGroup>
                                </div>
                                <div className="ui-form-divider" />
                                <div className="ui-form-half-container">
                                    <h4 className="ui-form-label">Best Of</h4>
                                    <RadioButtonGroup
                                        name="best-of"
                                        defaultSelected={
                                            this.state.bracketBestOf
                                        }
                                        onChange={this.bestOfChange}
                                    >
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            value={1}
                                            label="One"
                                        />
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            disabled
                                            value={3}
                                            label="Three (Coming Soon)"
                                        />
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            disabled
                                            value={5}
                                            label="Five (Coming Soon)"
                                        />
                                    </RadioButtonGroup>
                                </div>
                            </div>
                            <div className="ui-form-container">
                                <div
                                    className="ui-form-half-container"
                                    // style={{ border: "1px solid white" }}
                                >
                                    <h4 className="ui-form-label">
                                        Restrictions
                                    </h4>
                                    <Checkbox
                                        style={{
                                            marginBottom: "10px",
                                            float: "right"
                                            // width: "50%"
                                        }}
                                        disabled
                                        label="Invite Only (Coming Soon)"
                                        checked={this.state.bracketInviteOnly}
                                        onCheck={this.inviteOnlyChange.bind(
                                            this
                                        )}
                                    />
                                    <Checkbox
                                        style={{
                                            marginBottom: "10px",
                                            float: "right"
                                            // width: "50%"
                                        }}
                                        disabled
                                        label="Password (Coming Soon)"
                                        checked={this.state.bracketHasPassword}
                                        onCheck={this.hasPasswordChange.bind(
                                            this
                                        )}
                                    />
                                </div>
                                <div className="ui-form-divider" />
                                {/* <div
                                    className="ui-form-half-container"
                                    // style={{ border: "1px solid white" }}
                                >
                                    <h4 className="ui-form-label">
                                        Maximum Teams
                                    </h4>
                                    <SelectField
                                        fullWidth
                                        value={this.state.bracketMaxTeams}
                                        onChange={this.maxTeamsChange}
                                        floatingLabelText="Maximum Teams"
                                    >
                                        <MenuItem
                                            key={1}
                                            value={1}
                                            primaryText="1"
                                        />
                                    </SelectField>
                                </div> */}
                            </div>
                            <div className="create-bracket-controls">
                                <Link to="/manage">
                                    <button className="ui-button button-secondary button-medium">
                                        Cancel
                                    </button>
                                </Link>
                                <Link to="">
                                    <button className="ui-button button-main button-medium">
                                        Create
                                    </button>
                                </Link>
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
export default connect(mapStateToProps)(ManageCreateBracket);
