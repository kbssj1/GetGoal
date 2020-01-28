import React, { Component } from "react";
import SelectProject from "../views/appbar/selectProject";

// material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Appbar extends Component {
    state = {
        isSelectFormActive: false
    };

    logOut = () => {
        sessionStorage.removeItem("login");
        this.props.history.push("/login");
        document.getElementsByClassName("sideNavigation")[0].style.display = "none";
    };

    setSelectProjectPanel = active => {
        this.setState({
            isSelectFormActive: active
        });
    };

    render() {
        return (
            <div>
                <AppBar
                    style={{
                        background: "#0099ff",
                        position: "static"
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6">{sessionStorage.getItem("project")}</Typography>
                        <div
                            style={{
                                position: "absolute",
                                right: 20
                            }}
                        >
                            <Button onClick={this.logOut} color="inherit">
                                Logout
                            </Button>
                            <Button onClick={() => this.setSelectProjectPanel(true)} color="inherit">
                                Change Project
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <SelectProject
                    isSelectFormActive={this.state.isSelectFormActive}
                    closeSelectProject={() => this.setSelectProjectPanel(false)}
                />
            </div>
        );
    }
}

export default Appbar;
