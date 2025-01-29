import React from "react";
import { Text } from 'react-native';
import Colors from "../theme/Color";
import { FontFamily } from "../theme/Fonts";

const ARtext = ({size,color,children,style,align,weight,mTop,fontFamily,textDecorationLine,onpress,numline}) => {

    const Textstyle= {
        color: color ?? Colors.Black,
        fontSize: size,
        textAlign: align ?? 'center',
        fontWeight: weight,
        marginTop:mTop,
        fontFamily:fontFamily ?? FontFamily.Regular,
        textDecorationLine: textDecorationLine ?? "",
    }

    return(
        <Text style={[Textstyle,style]} onpress={onpress} numberOfLines={numline}>
            {children}
        </Text>
    )
}

export default ARtext;