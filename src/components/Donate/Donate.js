// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Checkout from "../Checkout/Checkout";
// MATERIAL UI
import TextField from "material-ui/TextField";
// IMPORT STYLING
import "./Donate.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// COMPONENT
class Donate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: parseFloat(Math.round(10 * 100) / 100).toFixed(2)
        };
    }
    handleChange = event => {
        this.setState({
            value: event.target.value
        });
    };
    render() {
        const breadcrumbs = [{ name: "Donate", link: "/donate" }];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="donate-container">
                            <div className="donate-box">
                                <div className="donate-title">
                                    Help Power Our Toasters
                                </div>

                                <div className="ui-description">
                                    If you're feeling generious and like what
                                    I've done, feel free to donate whatever
                                    amount you'd like to help keep the games
                                    going!
                                </div>
                                <TextField
                                    id="donation-amount"
                                    floatingLabelText="Donation Amount"
                                    type="number"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    style={{ textAlign: "center" }}
                                />
                                <br />
                                <Checkout
                                    name={"MATCH.GG"}
                                    description={"Support the project"}
                                    amount={this.state.value || 5}
                                />
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
export default connect(mapStateToProps)(Donate);
