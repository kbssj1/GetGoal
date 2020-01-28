import React, { Component } from "react";
import firebase from "../../firebaseManager";

// material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// https://github.com/Hacker0x01/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class addTask extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date()
    };

    addTask = () => {
        const title = document.getElementById("Task_title").value;
        const content = document.getElementById("Task_content").value;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const projectName = sessionStorage.getItem("project");
        firebase.addTask("4things", projectName, title, content, startDate, endDate);
        this.props.close();
    };

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    };

    render() {
        return (
            <Dialog open={this.props.opening}>
                <DialogTitle>{"Task"}</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <DialogContentText id="alert-dialog-slide-description">
                            프로젝트 수행시에 필요한 Task를 입력해주세요.
                        </DialogContentText>
                        <TextField
                            id="Task_title"
                            label="title"
                            type="datetime-local"
                            defaultValue={"title"}
                        ></TextField>
                        <TextField
                            id="Task_content"
                            multiline
                            label="content"
                            type="datetime-local"
                            defaultValue={"content"}
                        ></TextField>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    StartTime
                                </Typography>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    withPortal
                                />
                            </CardContent>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    endTime
                                </Typography>
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    withPortal
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.addTask} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
