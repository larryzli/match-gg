// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// MATERIAL UI FORMS
import TextField from "material-ui/TextField";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./ManageCreateBracket.css";
import { styles } from "./styles";

// COMPONENT
class ManageCreateBracket extends Component {
    constructor(props) {
        super(props);

        // GET DATE
        const today = new Date();
        // FORMAT DATE AND TIME
        let month = today.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = today.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        let hours = today.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        const date = `${today.getFullYear()}-${month}-${day}`;
        const time = `${hours}:${minutes}`;

        // SET STATE
        this.state = {
            bracketName: "",
            bracketDescription: "",
            bracketStartDate: date,
            bracketStartTime: time
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };
    render() {
        const breadcrumbs = [
            {
                name: "Manage",
                link: "/manage"
            },
            {
                name: "New Bracket",
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
                                    inputStyle={styles.inputStyle}
                                    underlineStyle={styles.underlineStyle}
                                    underlineFocusStyle={
                                        styles.underlineFocusStyle
                                    }
                                    floatingLabelText="Name"
                                    floatingLabelStyle={
                                        styles.floatingLabelStyle
                                    }
                                    floatingLabelFocusStyle={
                                        styles.floatingLabelFocusStyle
                                    }
                                    value={this.state.bracketName}
                                    onChange={this.handleChange("bracketName")}
                                />
                            </div>
                            <div className="ui-form-container">
                                <div className="ui-form-half-container">
                                    <TextField
                                        fullWidth={true}
                                        inputStyle={styles.inputStyle}
                                        underlineStyle={styles.underlineStyle}
                                        underlineFocusStyle={
                                            styles.underlineFocusStyle
                                        }
                                        floatingLabelText="Start Date"
                                        floatingLabelStyle={
                                            styles.floatingLabelStyle
                                        }
                                        floatingLabelFocusStyle={
                                            styles.floatingLabelFocusStyle
                                        }
                                        floatingLabelFixed={true}
                                        type="date"
                                        value={this.state.bracketStartDate}
                                        onChange={this.handleChange(
                                            "bracketStartDate"
                                        )}
                                    />
                                </div>
                                <div className="ui-form-divider" />
                                <div className="ui-form-half-container">
                                    <TextField
                                        fullWidth={true}
                                        inputStyle={styles.inputStyle}
                                        underlineStyle={styles.underlineStyle}
                                        underlineFocusStyle={
                                            styles.underlineFocusStyle
                                        }
                                        floatingLabelText="Start Time"
                                        floatingLabelStyle={
                                            styles.floatingLabelStyle
                                        }
                                        floatingLabelFocusStyle={
                                            styles.floatingLabelFocusStyle
                                        }
                                        floatingLabelFixed={true}
                                        type="time"
                                        value={this.state.bracketStartTime}
                                        onChange={this.handleChange(
                                            "bracketStartTime"
                                        )}
                                    />
                                </div>
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
