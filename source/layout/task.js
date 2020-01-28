import React, { Component } from "react";
import Board from "react-trello";
import FirebaseManager from "../firebaseManager";
import Security from "../security";
import Appbar from "./appbar";
import AddTaskPanel from "../views/task/addTask";
import AssigningTask from "../views/task/assigningTask";

// meterial UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardContent, CardActions, Divider } from "@material-ui/core";

let eventBus = undefined;
const setEventBus = handle => {
    eventBus = handle;
};

let data = {
    lanes: [
        {
            id: "PlannedTasksLane",
            title: "Planned Tasks",
            cards: []
        },
        {
            id: "InProgressLane",
            title: "In Progress",
            cards: []
        },
        {
            id: "CompletedLane",
            title: "Completed",
            cards: []
        }
    ]
};

// https://github.com/rcdexta/react-trello
export default class task extends Component {
    state = {
        isOpenAddTaskPanel: false,
        isOpenAssigningTaskPanel: false,
        cardIdTobeSelected: "null"
    };

    updateTasks = () => {
        const projectName = sessionStorage.getItem("project");
        FirebaseManager.getTasks("4things", projectName, tasks => {
            tasks.forEach(m => {
                let card = {
                    id: m.id,
                    title: m.title,
                    description: m.content,
                    label: m.assigned
                };
                eventBus.publish({
                    type: "ADD_CARD",
                    laneId: m.type,
                    card: card
                });
            });
            this.setState({});
        });
    };

    onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
        if (toLaneId === "InProgressLane") {
            this.setState({ isOpenAssigningTaskPanel: true, cardIdTobeSelected: cardId });
        }
    };

    //
    setAddTaskPanel = actvie => {
        this.setState({ isOpenAddTaskPanel: actvie });
    };

    //
    setAssigningTaskPane = active => {
        this.setState({ isOpenAssigningTaskPanel: active });
    };

    componentDidMount() {
        document.getElementsByClassName("sideNavigation")[0].style.display = "block";
        if (!Security.isLoginSuccessful()) {
            this.props.history.push("/login");
            document.getElementsByClassName("sideNavigation")[0].style.display = "none";
        } else {
            this.updateTasks();
        }
    }

    render() {
        return (
            <div
                style={{
                    marginLeft: this.props.expanded ? 240 : 64
                }}
            >
                <Appbar />
                <div style={{ padding: 20 }}>
                    <Card>
                        <CardHeader title="Task" />
                        <Divider />
                        <CardContent>
                            <Board
                                style={{ backgroundColor: "white", height: "500px" }}
                                data={data}
                                onCardMoveAcrossLanes={this.onCardMoveAcrossLanes}
                                eventBusHandle={setEventBus}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions disableSpacing>
                            <Button onClick={() => this.setAddTaskPanel(true)} variant="contained" color="primary">
                                {"Add Task"}
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                <AddTaskPanel opening={this.state.isOpenAddTaskPanel} close={() => this.setAddTaskPanel(false)} />
                <AssigningTask
                    isOpen={this.state.isOpenAssigningTaskPanel}
                    cardId={this.state.cardIdTobeSelected}
                    close={() => this.setAssigningTaskPane(false)}
                    updateTasks={this.updateTasks}
                />
            </div>
        );
    }
}
