import React from "react";
import TrafficLight from "react-trafficlight";
import ListGroup from "react-bootstrap/ListGroup";

class NavSocketMonitor extends React.Component {
    render = () => {
        return (
            <div className="col-lg-4 col-10 mx-auto conn_monitor mt-5 mt-lg-0">
                <div className="display-8">Socket monitor</div>
                <hr className="hr_separator" style={{ background: "white" }} />
                <div className="display-12 text-left">
                {" "}
                Status:
                <span>
                    <TrafficLight
                        GreenOn={this.props.status === "connected"}
                        RedOn={this.props.status === "not connected"}
                        YellowOn={this.props.status === "connecting"}
                        Horizontal/>
                </span>
                </div>
                <div className=" display-12 text-left">
                    <p className="text-left mb-2">Streaming Server Logs:</p>
                    <ListGroup
                        className="display-12"
                        style={{ height: "210px", overflow: "auto" }}>
                        {this.props.logs.map((log, index, _) => {
                        const isFirstLog = index === 0 ? true : false;
                        return (
                            <ListGroup.Item
                                disabled={isFirstLog}
                                bsPrefix={"list-group-item-customize"}>
                                <code class={isFirstLog? '': 'text-muted'}> {log} </code>
                            </ListGroup.Item>
                        );
                        })}
                    </ListGroup>
                </div>
            </div>
        );
    };
}

export default NavSocketMonitor;
