import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../theme/Color';
import {hei, normalize, wid} from '../theme/Responsive';
const ARbutton = ({
  Touchstyle,
  backgroundColor,
  width,
  height,
  onpress,
  children,
  borderRadius,
  justifyContent,
  alignItems,
  disable
}) => {
  const Touchablestyle = {
    backgroundColor: backgroundColor ?? Colors.Black,
    height: height ?? hei(6.5),
    width: width,
    borderRadius: borderRadius ?? 14,
    justifyContent: justifyContent ??'center',
    alignItems: alignItems ??'center',

  };

  return (
    <TouchableOpacity style={[Touchablestyle, Touchstyle]} onPress={onpress} disabled={disable}>
      {children}
    </TouchableOpacity>
  );
};

export default ARbutton;

const styles = StyleSheet.create({
 
});
