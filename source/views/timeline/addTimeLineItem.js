import React, { Component } from "react";
import firebase from "../../firebaseManager";

// materialUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

// https://github.com/Hacker0x01/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let sliderValue = 0;

export default class addTimeLineItem extends Component {
    state = {
        progress: {},
        tasks: [],
        task: "",
        startDate: new Date(),
        endDate: new Date()
    };

    addTimeLine = () => {
        //
        const title = document.getElementById("TimeLine_Work").value;
        const id = sessionStorage.getItem("id");
        const content = document.getElementById("TimeLine_Content").value;
        const projectName = sessionStorage.getItem("project");
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const progress = sliderValue;
        const taskId = this.state.progress["id" + this.state.task];
        firebase.pushTimeLine(
            "4things",
            projectName,
            id,
            title,
            content,
            startDate,
            endDate,
            taskId,
            progress,
            this.props.updateTimeLine
        );
        this.props.closeAddingTimelineForm();

        // 최적화
        // this.props.closeAddingTimelineForm();
        // let items = this.props.items;
        // items.push({
        //     id: 100,
        //     group: id,
        //     title: title,
        //     start_time: moment(startTime).valueOf(),
        //     end_time: moment(endTime).valueOf()
        // });
        // this.props.addItems(items);
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

    handleOpen = () => {
        const projectName = sessionStorage.getItem("project");
        const id = sessionStorage.getItem("id");
        firebase.getTasks("4things", projectName, data => {
            let mytasks = [];
            let progressdata = {};
            data.forEach(element => {
                if (element.assigned === id) {
                    mytasks.push(element.title);
                    progressdata["progress" + element.title] = element.progress;
                    progressdata["id" + element.title] = element.id;
                }
            });
            this.setState({ tasks: mytasks, progress: progressdata });
        });
    };

    handleMenuItem = event => {
        const v = event.target.value;
        this.setState({ task: v });
    };

    handleSliderChange = event => {
        sliderValue = event.target.ariaValueNow;
    };

    render() {
        let minValue =
            this.state.progress["progress" + this.state.task] === undefined
                ? 0
                : Number(this.state.progress["progress" + this.state.task]);
        return (
            <Dialog open={this.props.openingAddingform}>
                <DialogTitle>{"TimeLine"}</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <TextField
                            id="TimeLine_Work"
                            label="title"
                            type="datetime-local"
                            defaultValue={"title"}
                        ></TextField>
                        <TextField
                            id="TimeLine_Content"
                            multiline
                            label="content"
                            type="datetime-local"
                            defaultValue={"content"}
                        ></TextField>
                        <Select onOpen={this.handleOpen} value={this.state.task} onChange={this.handleMenuItem}>
                            {this.state.tasks.map((task, index) => (
                                <MenuItem key={index} value={task}>
                                    {task}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography id="discrete-slider" gutterBottom>
                            진행도
                        </Typography>
                        <Slider
                            id="TimeLine_Progress"
                            valueLabelDisplay="auto"
                            onChange={this.handleSliderChange}
                            step={1}
                            marks
                            min={minValue}
                            max={100}
                        />
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    StartTime
                                </Typography>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    withPortal
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    EndTime
                                </Typography>
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    withPortal
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeAddingTimelineForm} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.addTimeLine} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
