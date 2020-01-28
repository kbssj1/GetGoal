import React, { Component } from "react";
import Chart from "react-google-charts";

// material-ui
import { Card, CardHeader, CardContent } from "@material-ui/core";

//
import firebase from "../../firebaseManager";

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}
const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" }
];

const rows = [
    ["Research", "Find sources", new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, "Write,Cite"],
    ["Write", "Write paper", new Date(2015, 2, 1), new Date(2015, 4, 9), null, 25, null],
    ["Cite", "Create bibliography", new Date(2015, 3, 1), new Date(2015, 6, 7), null, 20, null],
    ["Complete", "Hand in paper", new Date(2015, 6, 1), new Date(2015, 8, 8), null, 0, null],
    ["Outline", "Outline paper", new Date(2015, 8, 1), new Date(2016, 3, 10), daysToMilliseconds(1), 100, null]
];

// https://github.com/rakannimer/react-google-charts
// https://react-google-charts.com/contributing
export default class ganntChart extends Component {
    state = {
        chartImageURI: "",
        datas: []
    };

    componentDidMount() {
        const projectName = sessionStorage.getItem("project");
        let datas = [];
        firebase.getTasks("4things", projectName, data => {
            data.forEach(element => {
                let t = [];
                t.push(element.id);
                t.push(element.title);
                t.push(new Date(element.start.toMillis()));
                t.push(new Date(element.end.toMillis()));
                t.push(null);
                t.push(element.progress);
                t.push(null);
                datas.push(t);
            });
            this.setState({ datas: datas });
        });
    }

    render() {
        return (
            <Card>
                <CardHeader title="Task Chart" />
                <CardContent>
                    <div className="App">
                        <Chart chartType="Gantt" data={[columns, ...this.state.datas]} width="100%" height="300px" />
                    </div>
                </CardContent>
            </Card>
        );
    }
}
