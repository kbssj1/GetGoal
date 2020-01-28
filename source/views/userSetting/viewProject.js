import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { makeStyles } from "@material-ui/core/styles";

//
import FirebaseManager from "../../firebaseManager";

export default class viewProject extends Component {
    classes = makeStyles(theme => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                width: 200
            }
        }
    }));

    render() {
        return (
            <Dialog
                open={this.props.openingProjectViewer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.projectData.projectName}</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeProjectViewer} variant="contained" color="primary" autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
