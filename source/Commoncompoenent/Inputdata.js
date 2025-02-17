import React from "react";
import { StyleSheet, View } from "react-native";
import { ARtext } from "../common";
import { ARtextinput } from "../common";
import { hei, normalize } from "../theme";
import { FontFamily, FontSize } from "../theme";
import { Colors } from "../theme";

const Inputdata = React.forwardRef((props,ref) => {  
  const{
    txtchildren,
    inputvalue,
    onchange,
    placeholder,
    keyboardType,
    editable,
    errormessage,
    err,
    maxLength,
    color,
    
  }=props
  return (
    <View style={style.textinputview}>
      <ARtext children={txtchildren} align={""} size={FontSize.font14} />
      <ARtextinput
        Containerstyle={{
          borderWidth: 1,
          borderRadius: normalize(6),
          backgroundColor: Colors.backgroundcolor,
        }}
        keyboardType={keyboardType}
        Tipadding={7}
        Tifontsize={FontSize.font12}
        Tiheight={hei(4)}
        Tiplaceholder={placeholder}
        Tiplacrholdertextcolor={Colors.lable}
        value={inputvalue}
        onchangetext={onchange}
        Tiflex={1}
        editable={editable}
        maxLength={maxLength}
        color={color}
        ref={ref}
      />
      {errormessage && (
        <View>
          <ARtext children={err} align={""} color={"red"} />
        </View>
      )}
    </View>
  );
})

export default Inputdata;

const style = StyleSheet.create({
  textinputview: {
    // backgroundColor:"green",
    rowGap: hei(0.6),
    marginVertical: hei(1),
    // paddingVertical:hei(1)
  },
});
