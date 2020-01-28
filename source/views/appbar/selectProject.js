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

export default class selectProject extends Component {
    state = {
        project: "",
        projects: []
    };

    handleOpen = () => {
        let projects = [];

        firebase
            .firestore()
            .collection("projects")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    projects.push(doc.id);
                });
                this.setState({ projects: projects });
            });
    };

    handleMenuItem = event => {
        const v = event.target.value;
        this.setState({ project: v });
    };

    selectProject = () => {
        sessionStorage.setItem("project", this.state.project);
        window.location.reload();
        this.props.closeSelectProject();
    };

    render() {
        return (
            <Dialog
                open={this.props.isSelectFormActive}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Select Project"}</DialogTitle>
                <DialogContent
                    style={{
                        margin: "dense",
                        textAlign: "center"
                    }}
                >
                    <Select onOpen={this.handleOpen} value={this.state.project} onChange={this.handleMenuItem}>
                        {this.state.projects.map((project, index) => (
                            <MenuItem key={index} value={project}>
                                {project}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeSelectProject} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.selectProject} color="primary" autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
