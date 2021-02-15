import React, { useState, useEffect }  from "react";
import socketIOClient from "socket.io-client";
import ReactSpeedometer from 'react-d3-speedometer'
import TrafficLight from 'react-trafficlight';
import ListGroup from 'react-bootstrap/ListGroup'
import { ConnectionState } from "../Constant/AppConstants";


const ENDPOINT = "http://localhost:5000/";

class HompageOne extends React.Component {


    constructor(props) {
        super(props);
        const date = new Date();

        this.socket = null;
        this.state = {
            status: ConnectionState.Disconnected,
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
            speed: 0,
            logs: []
        };
    }

    // function Used to get the data from the server
    handleSpeedChange = (data) => {
        const response = data.speed;
        const date = new Date(data.ts);
        const logs = [data.text, ...this.state.logs];
        
        this.setState({
            time: '< ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' >',
            speed: data.speed,
            status: 'Connected',
            logs: logs
        })
    };

    // An event Handler to activate the Server
    handleConnectClickEvent = ()=>{
        console.log('Connect#clicked');
        this.socket = socketIOClient(ENDPOINT);
        this.socket.on("speed_change", this.handleSpeedChange);
        // socket.on("disconnect", handleDisconnectAcknowlegment);
        this.setState({
            status: 'Connecting'
        });
    }

  // An Event Handler to Deactivate the Server
    handleDisconnectClickEvent = ()=>{
        console.log('Disconnect#clicked');
        console.log('Sending disconnect event.');
        this.socket.disconnect();
        this.setState({ status: 'Not Connected' });
    } 

    render = () => {

        return (
            <div className="container h-100">
                <div class="row">
                    <div class="col-md-8">
                    <div style={{height:"300px", width:"500px", marginLeft:"60px"}}>
                    <ReactSpeedometer
                    className="mt-3"
                        maxValue={100}
                        value={"Speed",this.state.speed}
                        currentValueText={"Speed : ${value}"}
                        segments={10}
                        textColor={"#c9c9c9"}
                        needleColor={"#c9c9c9"}
                        ringWidth={10}
                        labelFontSize={"15px"}
                        segmentColors={[
                          "#1c9bba",
                        ]}
                        fluidWidth={true}
                    />
                      </div>

                        <br/>

                        <div className="row">
                            {
                               this.state.status == ConnectionState.Connected
                               ?
                            <button id="start_button"
                                    type="button"
                                    name="button"
                                    // onClick={this.handleConnectClickEvent}
                                    disabled
                                    className="btn btn-success col-sm-4 offset-sm-1">
                                        Start
                             </button>
                             :
                             <button id="start_button"
                                    type="button"
                                    name="button"
                                    onClick={this.handleConnectClickEvent}
                                    className="btn btn-success col-sm-4 offset-sm-1">
                                        Start
                             </button>
                            }

                            {
                                this.state.status == "Not Connected"
                                ?

                                <button id="stop_button"
                                        type="button"
                                        name="button"
                                       disabled
                                        className="btn btn-danger col-sm-4 offset-sm-1">
                                    Stop
                                </button>
                                        :
                                        <button id="stop_button"
                                        type="button"
                                        name="button"
                                        onClick={this.handleDisconnectClickEvent}
                                        className="btn btn-danger col-sm-4 offset-sm-1">
                                    Stop
                                </button>
                                        
                            }
                        </div>

                    </div>
                    <div className="col-md-4 conn_monitor">
                        <div className="display-8">Socket monitor</div>
                        <hr className='hr_separator' style={{"background":"white"}}/>
                        <div className="display-12 text-left"> Status: 
                            <span>
                                <TrafficLight 
                                GreenOn = { this.state.status.toLowerCase()=='connected' }
                                RedOn = { this.state.status.toLowerCase()=='not connected' }
                                YellowOn = { this.state.status.toLowerCase()=='connecting'} 
                                Horizontal/>
                            </span>
                        </div>  
                        <div className="display-12 text-left">
                            Streaming Server Logs:
                            <ListGroup className="display-12" style={{height:"210px",overflow:"auto"}}>
                                {
                                    this.state.logs.map((log, index, _) => {
                                        const isDisabled = index == 0? true: false;
                                        return (
                                            <ListGroup.Item disabled={isDisabled} bsPrefix={"list-group-item-customize"}>
                                                <code> { log } </code>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        );    
    };
};

export default HompageOne;
