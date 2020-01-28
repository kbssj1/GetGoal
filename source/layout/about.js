import React, { Component } from "react";
import PropTypes from "prop-types";
import "./about.css";

export default class about extends Component {
    render() {
        return (
            <div
                style={{
                    marginLeft: this.props.expanded ? 240 : 64,
                    padding: "15px 20px 0 20px"
                }}
            >
                <main id="main-doc">
                    <section className="main-section" id="Introduction">
                        <header> GetGoal은 팀이 목표를 이룰 수 있게 도와주는 Tool 입니다. </header>
                        <article>
                            <h3> 기능 </h3>
                            <h5>1. 현재 팀원들이 무엇을 하고 있는지 파악할 수 있습니다. </h5>
                            <h5>2. 현재 프로젝트가 어떤 상황인지 파악할 수 있습니다.</h5>
                            <h5>3. 팀이 어떤 목표가 있으며 얼마만큼 이루었는지 파악 할 수 있습니다.</h5>
                            <h3> 프로토타입 </h3>
                            <p>아직 완성되지 않았으며 지속적으로 개발하고 있습니다.</p>
                        </article>
                    </section>
                </main>
            </div>
        );
    }
}
