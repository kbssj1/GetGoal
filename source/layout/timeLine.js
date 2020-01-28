import React, { Component } from "react";
import Security from "../security";
import Appbar from "./appbar";
import TeamMateTimeline from "../views/timeline/teamMateTimeLine";
import GanntChart from "../views/timeline/ganntChart";

// meterial UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

export default class TimeLine extends Component {
    classes = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        paper: {
            textAlign: "center",
            color: theme.palette.text.secondary
        }
    }));

    componentDidMount() {
        document.getElementsByClassName("sideNavigation")[0].style.display = "block";
        if (!Security.isLoginSuccessful()) {
            this.props.history.push("/login");
            document.getElementsByClassName("sideNavigation")[0].style.display = "none";
        }
    }

    render() {
        return (
            <div
                className={this.classes.root}
                style={{
                    marginLeft: this.props.expanded ? 240 : 64
                }}
            >
                <Appbar />
                <div style={{ padding: 20 }}>
                    <Grid container spacing={3} direction="column">
                        <Grid item xs>
                            <TeamMateTimeline />
                        </Grid>
                        <Grid item xs>
                            <Paper className={this.classes.paper}>
                                <GanntChart />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
