import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardActions, Divider, TextField } from "@material-ui/core";

//
import FirebaseManager from "../../firebaseManager";

export default class InviteProject extends Component {
    classes = makeStyles(theme => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                width: 200
            }
        }
    }));

    state = {
        existID: false
    };

    //call back
    receiveUserExistData = data => {
        this.setState({
            existID: data
        });
    };

    checkID = () => {
        const id = document.getElementById("inviteProject_input_id").value;
        if (id) FirebaseManager.isUserExist(id, this.receiveUserExistData);
    };

    onExit = () => {
        this.setState({
            existID: false
        });
    };

    invite = () => {
        if (this.state.existID === false) {
            alert("일단 아이디 확인을 해주십시오.");
        } else {
            const receiveid = document.getElementById("inviteProject_input_id").value;
            const senderid = sessionStorage.getItem("id");
            FirebaseManager.pushMessage(
                receiveid,
                this.props.projectData + " 프로젝트에 초대되셨습니다.",
                senderid,
                "프로젝트에 초대되셨습니다.",
                "invite"
            );
        }
    };

    render() {
        let handle;
        if (this.state.existID === false) {
            handle = (
                <Button color="primary" variant="outlined" onClick={this.checkID}>
                    아이디 확인
                </Button>
            );
        } else {
            handle = "확인";
        }
        return (
            <Dialog
                open={this.props.opening}
                onExit={this.onExit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"프로젝트 초대"}</DialogTitle>
                <Divider />
                <DialogContent>
                    <CardContent>
                        <TextField
                            id="inviteProject_input_id"
                            className={this.classes.textField}
                            label="초대 ID"
                            margin="normal"
                        />
                    </CardContent>
                    <CardActions>{handle}</CardActions>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={this.props.close} variant="contained" color="primary" autoFocus>
                        close
                    </Button>
                    <Button onClick={this.invite} variant="contained" color="primary" autoFocus>
                        초대하기
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
