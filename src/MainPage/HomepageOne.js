import React from "react";
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer";
import TrafficLight from "react-trafficlight";
import ListGroup from "react-bootstrap/ListGroup";
import { ConnectionState } from "../Constant/AppConstants";
import config from "../Constant/config";

const ENDPOINT = config.BASE_URL;

class HompageOne extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();

    this.socket = null;
    this.state = {
      status: ConnectionState.Disconnected,
      time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      speed: 0,
      logs: [],
    };
  }

  // function Used to get the data from the server
  handleSpeedChange = (data) => {
    const date = new Date(data.ts);
    const formattedLog = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} || ${data.text}`;
    const logs = [formattedLog, ...this.state.logs];

    this.setState({
      status: ConnectionState.Connected,
      logs: logs,
    });
  };

  // An event Handler to activate the Server
  handleConnectClickEvent = () => {
    console.log("Connect#clicked");
    this.socket = socketIOClient(ENDPOINT); 
    this.socket.on("speed_change", this.handleSpeedChange);
    // socket.on("disconnect", handleDisconnectAcknowlegment);
    this.setState({
      status: ConnectionState.Connecting,
    });
  };

  // An Event Handler to Deactivate the Server
  handleDisconnectClickEvent = () => {
    console.log("Disconnect#clicked");
    console.log("Sending disconnect event.");
    this.socket.disconnect();
    this.setState({ status: "Not Connected" });
  };

  render = () => {
    return (
      <div className="container h-100">
        <div className="row my-3">
          <div className="col-lg-8 d-flex flex-column align-items-center">
            <div 
            style={{ height: "300px", width: "400px" }} 
            className="resize">
              {/* React-d3-speedometer package used to display the speeed */}
              <ReactSpeedometer
                className="mt-3"
                maxValue={100}
                value={("Speed", this.state.speed)}
                currentValueText={"Speed : ${value}"}
                segments={10}
                textColor={"#c9c9c9"}
                needleColor={"#c9c9c9"}
                ringWidth={10}
                labelFontSize={"15px"}
                segmentColors={["#1c9bba"]}
                fluidWidth={true}
              />

              <div className="row justify-content-around">
                {this.state.status === ConnectionState.Connected ? (
                  <button
                    id="start_button"
                    type="button"
                    name="button"
                    disabled
                    className="btn btn-success col-4"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    id="start_button"
                    type="button"
                    name="button"
                    onClick={this.handleConnectClickEvent}
                    className="btn btn-success col-4"
                  >
                    Start
                  </button>
                )}

                {this.state.status === ConnectionState.Disconnected ? (
                  <button
                    id="stop_button"
                    type="button"
                    name="button"
                    disabled
                    className="btn btn-danger col-4"
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    id="stop_button"
                    type="button"
                    name="button"
                    onClick={this.handleDisconnectClickEvent}
                    className="btn btn-danger col-4 "
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>

            <br />
          </div>
          <div className="col-lg-4 col-10 mx-auto conn_monitor mt-5 mt-lg-0">
            <div className="display-8">Socket monitor</div>
            <hr className="hr_separator" style={{ background: "white" }} />
            <div className="display-12 text-left">
              {" "}
              Status:
              <span>
                <TrafficLight
                  GreenOn={this.state.status.toLowerCase() === "connected"}
                  RedOn={this.state.status.toLowerCase() === "not connected"}
                  YellowOn={this.state.status.toLowerCase() === "connecting"}
                  Horizontal
                />
              </span>
            </div>
            <div className=" display-12 text-left">
              <p className="text-left mb-2">Streaming Server Logs:</p>
              <ListGroup
                className="display-12"
                style={{ height: "210px", overflow: "auto" }}
              >
                {this.state.logs.map((log, index, _) => {
                  const isDisabled = index === 0 ? true : false;
                  return (
                    <ListGroup.Item
                      disabled={isDisabled}
                      bsPrefix={"list-group-item-customize"}
                    >
                      <code> {log} </code>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default HompageOne;
