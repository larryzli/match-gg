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
// IMPORT REDUX FUNCTIONS
import {
    handleTextChange,
    handleDateChange,
    handleTimeChange,
    handleFormatChange,
    handleBestOfChange,
    handleInviteOnlyChange,
    handleHasPasswordChange,
    handleParticipantTypeChange,
    createBracket,
    resetInitial
} from "../../ducks/bracketReducer";

// COMPONENT
class ManageCreateBracket extends Component {
    componentDidMount() {
        this.props.resetInitial();
    }
    render() {
        console.log(this.props);
        const breadcrumbs = [
            {
                name: "Manage",
                link: "/manage"
            },
            {
                name: "Create Bracket",
                link: "/manage/create"
            }
        ];
        return (
            <div className="portal-container">
                <Sidebar />
                <div className="content-container">
                    <Breadcrumb crumbsArray={breadcrumbs} />
                    <div className="manage-create-bracket-container">
                        <h3 className="ui-form-title">Bracket Details</h3>
                        <div className="ui-form-container">
                            <TextField
                                autoFocus={true}
                                fullWidth={true}
                                floatingLabelText="Name *"
                                value={this.props.brackets.bracketName}
                                onChange={e =>
                                    this.props.handleTextChange(
                                        "bracketName",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="ui-form-container">
                            <div className="ui-form-half-container">
                                <DatePicker
                                    fullWidth={true}
                                    floatingLabelText="Start Date *"
                                    // container="inline"
                                    mode="landscape"
                                    value={this.props.brackets.bracketStartDate}
                                    // onChange={this.dateChange}
                                    onChange={this.props.handleDateChange}
                                />
                            </div>
                            <div className="ui-form-divider" />
                            <div className="ui-form-half-container">
                                <TimePicker
                                    format="ampm"
                                    fullWidth={true}
                                    floatingLabelText="Start Time *"
                                    value={this.props.brackets.bracketStartTime}
                                    onChange={this.props.handleTimeChange}
                                />
                            </div>
                        </div>
                        <div className="ui-form-container">
                            <div className="ui-form-half-container">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Subject *"
                                    hintText="e.g. Ping Pong"
                                    value={this.props.brackets.bracketSubject}
                                    onChange={e =>
                                        this.props.handleTextChange(
                                            "bracketSubject",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="ui-form-divider" />
                            <div className="ui-form-half-container">
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Custom Image URL"
                                    value={this.props.brackets.bracketImageURL}
                                    onChange={e =>
                                        this.props.handleTextChange(
                                            "bracketImageURL",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="ui-form-container">
                            <TextField
                                fullWidth={true}
                                multiLine={true}
                                style={{ textAlign: "left" }}
                                floatingLabelText="Description"
                                value={this.props.brackets.bracketDescription}
                                onChange={e =>
                                    this.props.handleTextChange(
                                        "bracketDescription",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="ui-form-container">
                            <div className="ui-form-half-container">
                                <h4 className="ui-form-label">Format</h4>
                                <RadioButtonGroup
                                    name="format"
                                    defaultSelected={
                                        this.props.brackets.bracketFormat
                                    }
                                    onChange={this.props.handleFormatChange}
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
                                        this.props.brackets.bracketBestOf
                                    }
                                    onChange={this.props.handleBestOfChange}
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
                            <div className="ui-form-half-container">
                                <h4 className="ui-form-label">
                                    Participant Type
                                </h4>
                                <RadioButtonGroup
                                    name="format"
                                    defaultSelected={
                                        this.props.brackets
                                            .bracketParticipantType
                                    }
                                    onChange={
                                        this.props.handleParticipantTypeChange
                                    }
                                >
                                    <RadioButton
                                        style={{ marginBottom: "10px" }}
                                        value="player"
                                        label="Players"
                                    />
                                    <RadioButton
                                        style={{ marginBottom: "10px" }}
                                        disabled
                                        value="team"
                                        label="Teams (Coming Soon)"
                                    />
                                </RadioButtonGroup>
                            </div>
                            <div className="ui-form-divider" />
                            <div className="ui-form-half-container">
                                <h4 className="ui-form-label">Restrictions</h4>
                                <Checkbox
                                    style={{
                                        marginBottom: "10px"
                                    }}
                                    disabled
                                    label="Invite Only (Coming Soon)"
                                    checked={
                                        this.props.brackets.bracketInviteOnly
                                    }
                                    onCheck={this.props.handleInviteOnlyChange}
                                />
                                <Checkbox
                                    style={{
                                        marginBottom: "10px"
                                    }}
                                    disabled
                                    label="Password (Coming Soon)"
                                    checked={
                                        this.props.brackets.bracketHasPassword
                                    }
                                    onCheck={this.props.handleHasPasswordChange}
                                />
                            </div>

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

                        <div className="ui-form-controls">
                            <Link to="/manage" className="ui-link">
                                <button className="ui-button button-secondary button-medium">
                                    Cancel
                                </button>
                            </Link>
                            {/* <Link
                                to={`/manage/${this.props.bracketID}`}
                                className="ui-link"
                            > */}
                            <button
                                className="ui-button button-main button-medium"
                                onClick={e =>
                                    this.props
                                        .createBracket({
                                            bracketName: this.props.brackets
                                                .bracketName,
                                            bracketDescription: this.props
                                                .brackets.bracketDescription,
                                            bracketSubject: this.props.brackets
                                                .bracketSubject,
                                            bracketStartDate: this.props
                                                .brackets.bracketStartDate,
                                            bracketStartTime: this.props
                                                .brackets.bracketStartTime,
                                            bracketImageURL: this.props.brackets
                                                .bracketImageURL,
                                            bracketFormat: this.props.brackets
                                                .bracketFormat,
                                            bracketTeamSizeLimit: this.props
                                                .brackets.bracketTeamSizeLimit,
                                            bracketRandomizeSeeds: this.props
                                                .brackets.bracketRandomizeSeeds,
                                            bracketRandomizeTeams: this.props
                                                .brackets.bracketRandomizeTeams,
                                            bracketInviteOnly: this.props
                                                .brackets.bracketInviteOnly,
                                            bracketBestOf: this.props.brackets
                                                .bracketBestOf,
                                            bracketFinalsBestOf: this.props
                                                .brackets.bracketFinalsBestOf,
                                            bracketHasPassword: this.props
                                                .brackets.bracketHasPassword,
                                            bracketMaxTeams: this.props.brackets
                                                .bracketMaxTeams,
                                            bracketStatus: this.props.brackets
                                                .bracketStatus,
                                            bracketParticipantType: this.props
                                                .brackets.bracketParticipantType
                                        })
                                        .then(() => {
                                            this.props.history.push(
                                                `/manage/${
                                                    this.props.brackets
                                                        .bracketID
                                                }`
                                            );
                                        })
                                }
                            >
                                Create
                            </button>
                            {/* </Link> */}
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
    handleTextChange,
    handleDateChange,
    handleTimeChange,
    handleFormatChange,
    handleBestOfChange,
    handleInviteOnlyChange,
    handleHasPasswordChange,
    handleParticipantTypeChange,
    createBracket,
    resetInitial
})(ManageCreateBracket);
