import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../theme/Color';
import {height} from '../../sources/Theme';
import {hei, isIos, wid} from '../theme/Responsive';
import ARstyle from './ARstyle';
import ARtext from './ARtext';
import ARimage from './ARimage';

const ARheader = ({
  Lefticon,
  Leftpress,
  Righticon,
  Rightpress,
  containerstyle,
  texts,
  size,
  textfontfamily,
  headerleftimgstyle,
  headerrightimgstyle,
  textcolor,
  tint,
  lefttch,
}) => {
  return (
    <View style={[style.Container, containerstyle]}>
      {Lefticon ? (
        <TouchableOpacity style={[style.Lefttouch,lefttch]} onPress={Leftpress}>
          <ARimage source={Lefticon} style={headerleftimgstyle} tintColor={tint}/>
        </TouchableOpacity>
      ) : (
        <View style={style.Lefttouch}></View>
      )}
      <ARtext children={texts} size={size} fontFamily={textfontfamily} color={textcolor}/>
      {Righticon ? (
        <TouchableOpacity style={[style.Righttouch,righttch]} onPress={Rightpress}>
           <ARimage source={Righticon} style={headerrightimgstyle} tintColor={tint}/>
        </TouchableOpacity>
      ) : (
        <View style={style.Righttouch}></View>
      )}
    </View>
  );
};

export default ARheader;

const style = StyleSheet.create({
  Container: {
    ...ARstyle.flexrowbetween,
    paddingVertical: hei(2),
    paddingHorizontal: wid(2),
    // backgroundColor:"red"
  },
  Lefttouch: {
    ...ARstyle.center,
    height: hei(3),
    width: wid(25),
    // backgroundColor:"green"

  },
  Righttouch: {
    ...ARstyle.end,
    height: hei(3),
    width: wid(25),
    // backgroundColor:"yellow"

  },
});
