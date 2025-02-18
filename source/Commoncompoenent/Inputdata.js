import React from "react";
import { StyleSheet, View } from 'react-native';
import { ARtext } from "../common";
import {ARtextinput} from "../common";
import { hei,normalize } from "../theme";
import { FontFamily,FontSize } from "../theme";
import {Colors} from "../theme";

const Inputdata = ({txtchildren,inputvalue,onchange,placeholder}) => {
    return (
        <View style={style.textinputview}>
              <ARtext children={txtchildren} align={''} size={FontSize.font14} />
              <ARtextinput
                Containerstyle={{
                  borderWidth: 1,
                  borderRadius: normalize(6),
                  backgroundColor: Colors.backgroundcolor,
                }}
                Tipadding={7}
                Tifontsize={FontSize.font12}
                Tiheight={hei(4)}
                Tiplaceholder={placeholder}
                Tiplacrholdertextcolor={Colors.lable}
                value={inputvalue}
                onchangetext={onchange}
                Tiflex={1}
              />
            </View>
    )
}

export default Inputdata;

const style = StyleSheet.create({
    textinputview: {
        // backgroundColor:"green",
        rowGap:hei(0.6),
        marginVertical:hei(1),
        // paddingVertical:hei(1)
      },
})