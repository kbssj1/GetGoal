import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

//
import FirebaseManager from "../../firebaseManager";

export default class CreateProject extends Component {
    classes = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    }));

    state = {
        alarm: false,
        overlapping: false,
        anchorEl: null,
        messageContent: "null"
    };

    handleClose = () => {
        this.setState({ alarm: false, anchorEl: null });
    };

    // callback
    setOverLabValue = overlapping => {
        let content;
        if (overlapping === true) {
            content = "이미 프로젝트 이름이 존재합니다.";
        } else {
            content = "가능한 이름입니다.";
        }
        this.setState({
            overlapping: overlapping,
            alarm: true,
            messageContent: content
        });
    };

    checkProjectNameOverLap = event => {
        const projectName = document.getElementById("createProject_input_projectName").value;
        if (projectName.length > 0) {
            FirebaseManager.checkProjectNameOverLap(projectName, this.setOverLabValue);
            this.setState({ anchorEl: event.currentTarget });
        }
    };

    createProject = event => {
        if (this.state.overlapping === false) {
            const projectName = document.getElementById("createProject_input_projectName").value;
            FirebaseManager.pushNewProject(projectName, sessionStorage.getItem("id"));
            this.props.pushProject(projectName);
            this.handleClose();
            this.props.closeNewProjectUI();
        } else {
            this.setState({
                alarm: true,
                anchorEl: event.currentTarget,
                messageContent: "프로젝트 중복확인을 해주세요."
            });
        }
    };

    render() {
        return (
            <Dialog
                open={this.props.openingCreateform}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"프로젝트 생성"}</DialogTitle>
                <DialogContent>
                    <Grid container justify="center" spacing={1}>
                        <TextField
                            id="createProject_input_projectName"
                            className={this.classes.textField}
                            label="프로젝트 이름"
                            margin="normal"
                        />
                        <Button onClick={this.checkProjectNameOverLap} variant="contained" color="primary">
                            중복 확인
                        </Button>
                        <Popover
                            id="createProject_Popover"
                            open={this.state.alarm}
                            onClose={this.handleClose}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                        >
                            <Typography>{this.state.messageContent}</Typography>
                        </Popover>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeNewProjectUI} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.createProject} color="primary" autoFocus>
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
