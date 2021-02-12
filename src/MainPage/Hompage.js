import axios from "axios";
import React, { useState, useEffect }  from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000/";

// let socket = null

const Hompage = () => {

    const [connected, setConnected] = useState("Not Connected");
    const [responseTime, setResponseTime] = useState('0')


    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() ;

    
   let socket = socketIOClient(ENDPOINT);
   console.log(socket)
    const handleConnect = ()=>{
        socket.on("speed_change", data => {
            console.log(data)
            const response = data.speed;
            setResponseTime(response);
            console.log(socket)
        });
        setConnected("Connected")
            }
            // console.log(socket)

    const handleDisconnect = ()=>{
        //  socket = socketIOClient(ENDPOINT);
        socket.close();
        
        socket = null
        console.log(socket)
        console.log("diconnectd")
        setConnected("Not Connected")
    } 

    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("speed_change", data => {
    //         console.log(data)
    //         const response = data.speed;
    //         setResponseTime(response);
    //     });
    //   }, );

  return (
    <div>
      <div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card bg-warning">
				<h1 className="text-center text-white"> Demo Web Socket </h1>
				<hr/>
				<h5 className="text-center text-dark">Status: {connected} </h5>
				<h6 className="text-center text-secondary" >{time} </h6>
				<h1 className="display-1 text-center text-secondary">
					{responseTime}
				</h1>
				<div className="row">
					<button id="start_button"
							type="button"
							name="button"
                            onClick={handleConnect}
							className="btn btn-success col-sm-4 offset-sm-1">Connect</button>
					<button id="stop_button"
							type="button"
							name="button"
                            onClick={handleDisconnect}
							className="btn btn-danger col-sm-4 offset-sm-1">Disconnect</button>
				</div>

			    <footer className="blockquote-footer text-center">by <cite><small>Impressico Business Solution</small> </cite> </footer>
			</div>
		</div>
	</div>
    </div>
  );
};

export default Hompage;
