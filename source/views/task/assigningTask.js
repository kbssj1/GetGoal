import React, { Component } from "react";

// MaterialUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContent from "@material-ui/core/DialogContent";

//
import firebase from "../../firebaseManager";

export default class assigningTask extends Component {
    state = {
        user: "",
        users: []
    };

    handleOpen = () => {
        const projectName = sessionStorage.getItem("project");
        let users = [];
        firebase.getProjectData(projectName, data => {
            data.members.forEach(member => {
                users.push(member);
            });
            this.setState({ users: users });
        });
    };

    handleMenuItem = event => {
        const v = event.target.value;
        this.setState({ user: v });
    };

    assign = () => {
        const projectName = sessionStorage.getItem("project");
        firebase.assignTasks("4things", projectName, this.props.cardId, this.state.user, data => {});
        this.props.updateTasks();
        this.props.close();
    };

    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{"Assign Task"}</DialogTitle>
                <DialogContent
                    style={{
                        margin: "dense",
                        textAlign: "center"
                    }}
                >
                    <Select id="select" onOpen={this.handleOpen} value={this.state.user} onChange={this.handleMenuItem}>
                        {this.state.users.map((user, index) => (
                            <MenuItem key={index} value={user}>
                                {user}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.assign} color="primary" autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
