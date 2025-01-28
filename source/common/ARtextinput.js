import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../Image/Images';
import {hei, normalize, wid} from '../theme/Responsive';
import Colors from '../theme/Color';
import {height} from '../../sources/Theme';
import {FontFamily, FontSize} from '../theme/Fonts';
import ARimage from './ARimage';

const ARtextinput = ({
  Lefticon,
  Righticon,
  Containerstyle,
  Tiheight,
  Tiwidth,
  Tipadding,
  Tiflex,
  Tifontsize,
  Tiplaceholder,
  Tiplacrholdertextcolor,
  Tifontfamily,
  Tinewstyle,
  onPress,
  value,
  onchangetext,
  securetextentry,
}) => {
  const Tistyle = {
    height: Tiheight ?? 30,
    padding: Tipadding ?? 10,
    flex: Tiflex ?? 1,
    fontSize: Tifontsize ?? FontSize.font16,
    FontFamily: Tifontfamily ?? FontFamily.Regular,
    width:Tiwidth,
    // backgroundColor:'pink'
  };

  const Tiprops = {
    placeholder: Tiplaceholder ?? '',
    placeholderTextColor: Tiplacrholdertextcolor ?? Colors.Placeholder,
  };

  return (
    <View style={[style.container, Containerstyle]}>
      {Lefticon ? <ARimage source={Lefticon} style={style.imagestyle} /> : null}
      <TextInput
        style={[Tistyle, Tinewstyle]}
        placeholderTextColor={Tiprops.placeholderTextColor}
        placeholder={Tiprops.placeholder}
        value={value}
        onChangeText={onchangetext}
        secureTextEntry={securetextentry}
      />
      {Righticon ? (
        <TouchableOpacity onPress={onPress}>
          <ARimage source={Righticon} style={style.imagestyle} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ARtextinput;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.bordercolor,
    paddingHorizontal: wid(1.7),
    // backgroundColor:'red'
  },
  imagestyle: {
    height: wid(5),
    width: wid(5),
  },
});
