import React from "react";
import {} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../theme/Color";
import { wid } from "../theme/Responsive";


const ARprogressbar = ({width,backgroundColor,borderWidth,color,progress,borderRadius}) => {
    return(
        <ProgressBar
                width={width ?? wid(85)}
                backgroundColor={backgroundColor ?? Colors.progressbackground}
                borderWidth={borderWidth ?? 0}
                color={color ?? Colors.Black}
                progress={progress}
                borderRadius={borderRadius ?? 5}
              />
    )
};


export default ARprogressbar;