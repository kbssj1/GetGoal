//
import CreateProject from "../views/userSetting/createProject";
import Message from "../views/userSetting/message";
import ProjectViewer from "../views/userSetting/viewProject";
import InviteProjectViewer from "../views/userSetting/inviteProjectViewer";

//
import React, { Component } from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MessageIcon from "@material-ui/icons/Email";
import ProjectIcon from "@material-ui/icons/Web";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import InviteIcon from "@material-ui/icons/EmojiPeople";
import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardContent, CardActions, Divider } from "@material-ui/core";

//
import FirebaseManager from "../firebaseManager";
import Security from "../security";

export default class userSetting extends Component {
    state = {
        openingCreateform: false,
        openingMessage: false,
        openingProjectViewer: false,
        openinginviteProjectViewer: false,
        projects: [],
        messages: [],
        message: {
            title: "null",
            content: "null",
            sender: "null",
            type: "null",
            invitedproject: "null"
        },
        projectData: "null"
    };

    classes = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(12),
            textAlign: "center",
            color: theme.palette.text.secondary
        }
    }));

    setNewProjectPanel = active => {
        this.setState({
            openingCreateform: active
        });
    };

    openMessageForm = m => {
        this.setState({
            openingMessage: true,
            message: {
                content: m.content,
                title: m.title,
                type: m.type,
                invitedproject: m.invitedproject
            }
        });
    };

    closeMessageForm = () => {
        this.setState({
            openingMessage: false
        });
    };

    openProjectViewer = projectName => {
        FirebaseManager.getProjectData(projectName, this.updateProjectData);
    };

    closeProjectViewer = () => {
        this.setState({
            openingProjectViewer: false
        });
    };

    openInviteProjectViewer = data => {
        this.setState({
            openinginviteProjectViewer: true,
            projectData: data
        });
    };

    closeInviteProjectViewer = () => {
        this.setState({
            openinginviteProjectViewer: false
        });
    };

    deleteMessage = message => {
        let id = sessionStorage.getItem("id");
        FirebaseManager.deleteMessage(id, message.id);
        FirebaseManager.getMessages(sessionStorage.getItem("id"), this.updateMessages);
    };

    // callback
    updateProjectData = data => {
        this.setState({
            openingProjectViewer: true,
            projectData: data
        });
    };

    // call back
    updateProjects = firebaseData => {
        this.setState({ projects: firebaseData });
    };

    // call back
    updateMessages = firebaseData => {
        this.setState({ messages: firebaseData });
    };

    pushProject = data => {
        let arr = this.state.projects;
        arr.push(data);
        this.setState({ projects: arr });
    };

    componentDidMount() {
        document.getElementsByClassName("sideNavigation")[0].style.display = "block";
        if (!Security.isLoginSuccessful()) {
            this.props.history.push("/login");
            document.getElementsByClassName("sideNavigation")[0].style.display = "none";
        } else {
            FirebaseManager.getProjectList(sessionStorage.getItem("id"), this.updateProjects);
            FirebaseManager.getMessages(sessionStorage.getItem("id"), this.updateMessages);
        }
    }

    render() {
        return (
            <div
                style={{
                    marginLeft: this.props.expanded ? 240 : 64,
                    padding: "15px 20px 0 20px"
                }}
            >
                <div className={this.classes.root}>
                    <CreateProject
                        openingCreateform={this.state.openingCreateform}
                        closeNewProjectUI={() => this.setNewProjectPanel(false)}
                        pushProject={this.pushProject}
                    />
                    <Message
                        openingMessage={this.state.openingMessage}
                        closeMessageForm={this.closeMessageForm}
                        message={this.state.message}
                    />
                    <ProjectViewer
                        openingProjectViewer={this.state.openingProjectViewer}
                        closeProjectViewer={this.closeProjectViewer}
                        projectData={this.state.projectData}
                    />
                    <InviteProjectViewer
                        opening={this.state.openinginviteProjectViewer}
                        close={this.closeInviteProjectViewer}
                        projectData={this.state.projectData}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Card bgcolor="primary.main">
                                <CardHeader title="User Info" />
                                <Divider />
                                <CardContent>
                                    <Typography className={this.classes.paper}>
                                        ID : {sessionStorage.getItem("id")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                <CardHeader title="Message" />
                                <Divider />
                                <CardContent>
                                    <List dense={true}>
                                        {this.state.messages.map((m, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <MessageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={m.title} secondary={"메세지가 도착 했습니다."} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" onClick={() => this.openMessageForm(m)}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" onClick={() => this.deleteMessage(m)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                <CardHeader title="Project" />
                                <Divider />
                                <CardContent>
                                    <List dense={true}>
                                        {this.state.projects.map((project, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ProjectIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={project} secondary={index} />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => this.openProjectViewer(project)}
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => this.openInviteProjectViewer(project)}
                                                    >
                                                        <InviteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.setNewProjectPanel(true)}
                                    >
                                        Create Project
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <div> </div>
            </div>
        );
    }
}
