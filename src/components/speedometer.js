import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { SpeedSetting } from '../Constant/AppConstants';

class NavSpeedometer extends React.Component {
    render = () => {
        return (
            <ReactSpeedometer
                className="mt-3"
                maxValue={SpeedSetting.SpeedoMeterMaxSpeed}
                value={("Speed", this.props.speed)}
                currentValueText={"Speed : ${value}"}
                segments={10}
                textColor={"#c9c9c9"}
                needleColor={"#c9c9c9"}
                ringWidth={10}
                labelFontSize={"15px"}
                segmentColors={["#1c9bba"]}
                fluidWidth={true}
          />

        );
    };
}

export default NavSpeedometer;
