import React, { Component } from "react";

// https://github.com/apexcharts/react-apexcharts
// showCharts
import Chart from "react-apexcharts";

// https://veysiyildiz.github.io/vertical-timeline-component-for-react/#/
// project TimeLine
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

// material UI
import Button from "@material-ui/core/Button";

export default class communication extends Component {
    // dummy data
    state = {
        options: {
            chart: {
                id: "apexchart-example"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };

    showWarning() {
        alert("This func is now developing, sorry");
    }

    render() {
        return (
            <div
                style={{
                    marginLeft: this.props.expanded ? 240 : 64,
                    padding: "15px 20px 0 20px"
                }}
            >
                <Appbar />
                <div className="gridLayout">
                    <div
                        className="TimeLineContainer"
                        style={{
                            background: "white",
                            height: "300px",
                            width: "500px",
                            overflow: "scroll",
                            // border: "3px solid lightblue",
                            margin: "20px 0 0 0"
                        }}
                    >
                        <div>
                            <Button onClick={this.showWarning}> Change </Button>
                        </div>
                        <Timeline lineColor={"#ddd"}>
                            <TimelineItem
                                key="001"
                                dateText="7/2019"
                                dateInnerStyle={{ background: "#0099ff", color: "white" }}
                                style={{ color: "#e86971" }}
                                bodyContainerStyle={{
                                    background: "#ddd",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)"
                                }}
                            >
                                <h3>getgoal project 시작</h3>
                                <p>Start Project</p>
                            </TimelineItem>
                            <TimelineItem
                                key="002"
                                dateText="12/2019"
                                dateInnerStyle={{ background: "#0099ff", color: "white" }}
                                bodyContainerStyle={{
                                    background: "#ddd",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)"
                                }}
                            >
                                <h3>1차 프로토타입 완성 </h3>
                                {/* <h4 style={{ color: "#61b8ff" }}>Subtitle</h4> */}
                                <p>mysql 연동을 완성, 기초적인 기능 완성</p>
                            </TimelineItem>
                            <TimelineItem
                                key="003"
                                dateText="03/2020"
                                dateInnerStyle={{ background: "#0099ff", color: "white" }}
                                bodyContainerStyle={{
                                    background: "#ddd",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)"
                                }}
                            >
                                <h3>2차 프르토타입 완성</h3>
                                <p>디자인 보완, 사람들에게 프로젝트 공개, 기능 보완</p>
                            </TimelineItem>
                        </Timeline>
                    </div>

                    <div
                        className="graphContainer"
                        style={{
                            background: "white",
                            height: "300px",
                            width: "500px",
                            // border: "3px solid lightblue",
                            margin: "20px 0 0 0"
                        }}
                    >
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width={450}
                            height={250}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
