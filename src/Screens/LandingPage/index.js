import React from "react";
import socketIOClient from "socket.io-client";
import { ConnectionState } from "../../Constant/AppConstants";
import config from "../../Constant/config";
import NavSpeedometer from '../../components/speedometer';
import NavSocketMonitor from '../../components/socketMonitor';
import './landingPageStyle.css';

const ENDPOINT = config.BASE_URL;

class LandingPage extends React.Component {
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
      speed: data.speed,
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
            <div className="resize" style={{height: "300px", width: "400px"}}>
                <NavSpeedometer speed={this.state.speed}/>
                <div className="row justify-content-around">
                    <button
                        id="start_button"
                        type="button"
                        name="button"
                        disabled = {this.state.status === ConnectionState.Connected}
                        onClick={this.handleConnectClickEvent}
                        className="btn btn-success col-4">
                        Start
                    </button>
                    <button
                        id="stop_button"
                        type="button"
                        name="button"
                        disabled={this.state.status === ConnectionState.Disconnected}
                        onClick={this.handleDisconnectClickEvent}
                        className="btn btn-danger col-4 ">
                        Stop
                    </button>
                </div>
            </div>
            <br />
          </div>
          <NavSocketMonitor 
            status={this.state.status.toLowerCase()}
            logs = {this.state.logs}
          />
        </div>
      </div>
    );
  };
}

export default LandingPage;
