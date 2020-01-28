import React, { Component } from "react";
import "./login.css";

//
import FirebaseManager from "../firebaseManager";
import Security from "../security";
import firebase from "../firebase";

// meterial UI
import Button from "@material-ui/core/Button";

class Login extends Component {
    state = {
        message: "none"
    };

    style = {
        display: "none"
    };

    Login = () => {
        this.props.history.push("/timeLine");
        sessionStorage.setItem("login", "success");
        sessionStorage.setItem("id", "test");
        sessionStorage.setItem("newUser", "false");
        sessionStorage.setItem("project", "getgoal(SAMPLE)");
    };

    //
    CloseMessageForm = () => {
        document.getElementById("alert").style.display = "none";
    };

    OpenMessageForm = content => {
        this.setState({ message: content });
        document.getElementById("alert").style.display = "block";
    };

    //
    GoogleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                if (result.operationType === "signIn") {
                    sessionStorage.setItem("login", "success");
                    sessionStorage.setItem("id", result.user.email);
                    sessionStorage.setItem("newUser", "false");
                    sessionStorage.setItem("project", "getgoal(SAMPLE)");
                    this.props.history.push("/timeLine");
                }

                if (result.additionalUserInfo.isNewUser) {
                    FirebaseManager.createNewUser(result.user.email);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    componentDidMount() {
        document.getElementsByClassName("sideNavigation")[0].style.display = "none";
        if (Security.isLoginSuccessful()) {
            this.props.history.push("/timeLine");
            document.getElementsByClassName("sideNavigation")[0].style.display = "block";
        }
    }

    //
    render() {
        return (
            <div>
                <div className="login-page">
                    <img id="main_image" src={require("../asset/mainImage.jpg")} />
                    <div id="form" className="form">
                        <div id="login-form" className="login-form">
                            <Button id="login" variant="contained" color="primary" onClick={this.Login}>
                                Test Login
                            </Button>
                        </div>
                        <div id="login-form" className="login-form">
                            <Button id="googleLogin" variant="contained" color="primary" onClick={this.GoogleLogin}>
                                Google Login
                            </Button>
                        </div>
                    </div>
                    <div id="alert" className="alert">
                        <span className="closebtn" onClick={this.CloseMessageForm}>
                            &times;
                        </span>
                        {this.state.message}
                    </div>
                    <div className="header">
                        <h2> GetGoal is powerful Solution</h2>
                    </div>
                    <div className="row">
                        <div className="column">
                            <img id="first_image" src={require("../asset/first.png")} />
                            <h3> GetGoal helps team members communicate</h3>
                        </div>
                        <div className="column">
                            <img id="first_image" src={require("../asset/second.png")} />
                            <h3> GetGoal helps your project succeed</h3>
                        </div>
                        <div className="column">
                            <img id="first_image" src={require("../asset/third.png")} />
                            <h3> GetGoal saves project time</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
