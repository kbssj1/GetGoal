import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

//
import FirebaseManager from "../../firebaseManager";

export default class message extends Component {
    state = {};

    acceptProject = () => {
        // FirebaseManager.pushProjectMember(sessionStorage.getItem("id"), this.props.message)
    };

    render() {
        let button;
        if (this.props.message.type === "invite") {
            button = (
                <Button onClick={this.props.acceptProject} variant="contained" color="primary" autoFocus>
                    Accept
                </Button>
            );
        }
        return (
            <Dialog
                open={this.props.openingMessage}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography>{this.props.message.title}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>{this.props.message.content}</Typography>
                </DialogContent>
                <DialogActions>
                    {button}
                    <Button onClick={this.props.closeMessageForm} variant="contained" color="primary" autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
