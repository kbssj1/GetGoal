import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import firebase from "../../firebaseManager";

export default class ModifyTimeLineItem extends Component {
    modifyTimeLine = () => {
        // console.log("createAccount");
        // console.log(this.props.items);
        // this.props.items[0].title = Math.random();
        // this.props.childrender();
        document.getElementById("ModifyTimeLineform").style.display = "none";
    };

    Closeform = () => {};

    render() {
        return (
            <Dialog open={this.props.openingModifingform}>
                <DialogTitle>{"TimeLine"}</DialogTitle>
                <DialogContent>{this.props.content}</DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModifingTimelineForm} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.addTimeLine} color="primary" autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
