import React, { Component } from "react";

// https://github.com/namespace-ee/react-calendar-timeline
// timeline
import TeamMateTimeline from "react-calendar-timeline";
import "./Timeline.scss"; // make sure you include the timeline stylesheet or the timeline will not be styled
import moment from "moment";

//
import AddTimeLineform from "./addTimeLineItem";
import ModifingTimeLineform from "./modifyTimeLineItem";

//
import firebase from "../../firebaseManager";

// meterial-UI
import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";

export default class TeamMateTimeLine extends Component {
    state = {
        items: [],
        groups: [],
        messageContent: "null",
        openingAddingform: false,
        openingModifingform: false
    };

    // call back
    updateGroups = data => {
        let groups = [];
        data.members.forEach(data => {
            let group = {
                id: data,
                title: data
            };

            groups.push(group);
        });
        this.setState({ groups: groups });
        //
        const projectName = sessionStorage.getItem("project");
        firebase.getTimeLine("4things", projectName, this.updateItems);
    };

    // call back
    updateItems = data => {
        let i = 0;
        let timelines = [];
        data.forEach(data => {
            let timeLine = {
                id: i++,
                group: data.id,
                title: data.title,
                content: data.content,
                start_time: data.startTime.toMillis(),
                end_time: data.endTime.toMillis()
            };
            timelines.push(timeLine);
        });
        this.setState({ items: timelines });
    };

    updateTimeLine = () => {
        const projectName = sessionStorage.getItem("project");
        firebase.getProjectData("4things", projectName, this.updateGroups);
    };

    addItems = data => {
        this.setState({ items: data });
    };

    //
    setAddingTimelinePanel = active => {
        this.setState({
            openingAddingform: active
        });
    };

    //
    closeModifingTimelineForm = () => {
        this.setState({
            openingModifingform: false
        });
    };

    // if select Timeline
    onItemSelect = (itemId, e, time) => {
        this.setState({
            openingModifingform: true,
            messageContent: this.state.items[itemId].content
        });
    };

    // react cycle
    componentDidMount() {
        // 외부 라이브러리 연동: D3, masonry, etc
        // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
        // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
        this.updateTimeLine();
    }

    render() {
        return (
            <div id="teamMateTimeLine" className="teamMateTimeLine">
                <Card>
                    <CardHeader title="TeamMate TimeLine" />
                    <CardContent>
                        <TeamMateTimeline
                            groups={this.state.groups}
                            items={this.state.items}
                            stackItems
                            onItemSelect={this.onItemSelect}
                            defaultTimeStart={moment().add(-8, "hour")}
                            defaultTimeEnd={moment().add(8, "hour")}
                        />
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button variant="contained" color="primary" onClick={() => this.setAddingTimelinePanel(true)}>
                            {"Add"}
                        </Button>
                    </CardActions>
                </Card>
                <AddTimeLineform
                    openingAddingform={this.state.openingAddingform}
                    closeAddingTimelineForm={() => this.setAddingTimelinePanel(false)}
                    items={this.state.items}
                    updateTimeLine={this.updateTimeLine}
                    addItems={this.addItems}
                />
                <ModifingTimeLineform
                    openingModifingform={this.state.openingModifingform}
                    closeModifingTimelineForm={this.closeModifingTimelineForm}
                    content={this.state.messageContent}
                />
            </div>
        );
    }
}
