import React from "react";
import socketIOClient from "socket.io-client";
import { ConnectionState } from "../Constant/AppConstants";

const ENDPOINT = "http://localhost:5000/";

class Hompage extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();

    this.socket = null;
    this.state = {
      status: ConnectionState.Disconnected,
      time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      speed: 0,
    };
  }

  // function Used to get the data from the server
  handleSpeedChange = (data) => {
    const date = new Date(data.ts);
    this.setState({
      time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      speed: data.speed,
    });
  };

  // An event Handler to activate the Server
  handleConnectClickEvent = () => {
    console.log("Connect#clicked");
    this.socket = socketIOClient(ENDPOINT); // sending a connect request to the server.
    this.socket.on("speed_change", this.handleSpeedChange);
    this.setState({
      status: ConnectionState.Connected,
    });
  };

  // An Event Handler to Deactivate the Server
  handleDisconnectClickEvent = () => {
    console.log("Disconnect#clicked");
    this.socket.disconnect();
    this.setState({ status: ConnectionState.Disconnected });
  };

  render = () => {
    console.log(this.state.status);
    return (
      <div>
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card bg-warning">
              <h1 className="text-center text-white"> Demo Web Socket </h1>
              <hr />
              <h5 className="text-center text-dark">
                Status: {this.state.status}{" "}
              </h5>
              <h6 className="text-center text-secondary">{this.state.time} </h6>
              <h1 className="display-1 text-center text-secondary">
                {this.state.speed}
              </h1>
              <div className="d-flex flex-row justify-content-around">
                {this.state.status == ConnectionState.Connected ? (
                  <div>
                    <button
                      id="start_button"
                      type="button"
                      name="button"
                      className="btn btn-success "
                      disabled
                    >
                      Connect
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      id="start_button"
                      type="button"
                      name="button"
                      onClick={this.handleConnectClickEvent}
                      className="btn btn-success "
                    >
                      Connect
                    </button>
                  </div>
                )}
                {this.state.status == "Not Connected" ? (
                  <div>
                    <button
                      id="stop_button"
                      type="button"
                      name="button"
                      className="btn btn-danger"
                      disabled
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      id="stop_button"
                      type="button"
                      name="button"
                      onClick={this.handleDisconnectClickEvent}
                      className="btn btn-danger"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>

              <footer className="blockquote-footer text-center">
                by{" "}
                <cite>
                  <small>Impressico Business Solution</small>{" "}
                </cite>{" "}
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Hompage;
