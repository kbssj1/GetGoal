import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// https://github.com/trendmicro-frontend/react-sidenav
// sidebar
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import TimeLine from "./timeLine";
import About from "./about";
import UserSetting from "./userSetting";
import Login from "./login";
import Task from "./task";

export default class Main extends Component {
    state = {
        expanded: false
    };

    activeSideNav = value => {
        if (value === true) {
            document.getElementsByClassName("sideNavigation")[0].style.display = "block";
        } else {
            document.getElementsByClassName("sideNavigation")[0].style.display = "none";
        }
    };

    render() {
        let selected = sessionStorage.getItem("selected");
        if (!selected) {
            selected = "timeLine";
        }
        return (
            <BrowserRouter>
                <Route
                    render={({ location, history }) => (
                        <React.Fragment>
                            <SideNav
                                className="sideNavigation"
                                style={{
                                    background: "#0099ff",
                                    display: "none"
                                }}
                                onSelect={selected => {
                                    sessionStorage.setItem("selected", selected);
                                    const to = "/" + selected;
                                    if (location.pathname !== to) {
                                        history.push(to);
                                    }
                                }}
                                onToggle={expanded => {
                                    this.setState({ expanded: expanded });
                                }}
                            >
                                <SideNav.Toggle />
                                <SideNav.Nav defaultSelected={selected}>
                                    <NavItem eventKey="timeLine">
                                        <NavIcon>
                                            <i className="fa fa-clock-o" style={{ fontSize: "1.75em" }} />
                                        </NavIcon>
                                        <NavText>TimeLine</NavText>
                                    </NavItem>
                                    <NavItem eventKey="task">
                                        <NavIcon>
                                            <i className="fa fa-tasks" style={{ fontSize: "1.75em" }} />
                                        </NavIcon>
                                        <NavText>Task</NavText>
                                    </NavItem>
                                    {/* <NavItem eventKey="communication">
                                        <NavIcon>
                                            <i class="fa fa-users" style={{ fontSize: "1.75em" }} />
                                        </NavIcon>
                                        <NavText>communication</NavText>
                                    </NavItem> */}
                                    <NavItem eventKey="setting">
                                        <NavIcon>
                                            <i className="fa fa-cog fa-fw" style={{ fontSize: "1.75em" }} />
                                        </NavIcon>
                                        <NavText>Setting</NavText>
                                        {/* <NavItem eventKey="charts/linechart">
                                <NavText>Line Chart</NavText>
                            </NavItem>
                            <NavItem eventKey="charts/barchart">
                                <NavText>Bar Chart</NavText>
                            </NavItem> */}
                                    </NavItem>
                                    <NavItem eventKey="about">
                                        <NavIcon>
                                            <i className="fa fa-book fa-fw" style={{ fontSize: "1.75em" }} />
                                        </NavIcon>
                                        <NavText>About</NavText>
                                    </NavItem>
                                </SideNav.Nav>
                            </SideNav>
                            <Switch>
                                <Route
                                    path="/login"
                                    component={props => (
                                        <Login
                                            expanded={this.state.expanded}
                                            activeSideNav={this.activeSideNav}
                                            history={history}
                                        />
                                    )}
                                />
                                <Route
                                    path="/timeLine"
                                    component={props => (
                                        <TimeLine
                                            expanded={this.state.expanded}
                                            activeSideNav={this.activeSideNav}
                                            history={history}
                                        />
                                    )}
                                />
                                <Route
                                    path="/task"
                                    component={props => (
                                        <Task
                                            expanded={this.state.expanded}
                                            activeSideNav={this.activeSideNav}
                                            history={history}
                                        />
                                    )}
                                />
                                <Route
                                    path="/setting"
                                    component={props => (
                                        <UserSetting
                                            expanded={this.state.expanded}
                                            activeSideNav={this.activeSideNav}
                                            history={history}
                                        />
                                    )}
                                />
                                <Route
                                    path="/about"
                                    component={props => (
                                        <About
                                            expanded={this.state.expanded}
                                            activeSideNav={this.activeSideNav}
                                            history={history}
                                        />
                                    )}
                                />
                            </Switch>
                        </React.Fragment>
                    )}
                />
            </BrowserRouter>
        );
    }
}
