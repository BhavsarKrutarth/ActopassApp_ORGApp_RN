import React from "react";
import { StyleSheet, View } from "react-native";
import { hei, wid, normalize } from "../theme";
import { ARtext } from "../common";
import { ARbutton } from "../common";
import { Colors } from "../theme";
import { FontFamily, FontSize } from "../theme";

const Scbutton = ({
  onsavepress,
  oncanclepress,
  styles,
  backgroundColor,
  children,
  textStyle,
}) => {
  return (
    <View style={[style.buttonview, styles]}>
      <View style={[style.btn, { alignItems: "flex-end" }]}>
        <ARbutton
          borderRadius={normalize(12)}
          height={hei(5)}
          width={wid(30)}
          backgroundColor={Colors.btncolor}
          onpress={onsavepress}
        >
          <ARtext
            children={"Save"}
            align={""}
            color={Colors.White}
            fontFamily={FontFamily.Bold}
          />
        </ARbutton>
      </View>
      <View style={[style.btn]}>
        <ARbutton
          borderRadius={normalize(12)}
          height={hei(5)}
          width={wid(30)}
          onpress={oncanclepress}
          backgroundColor={backgroundColor || Colors.Black}
        >
          <ARtext
            children={children || "Cancel"}
            color={Colors.White}
            align={""}
            fontFamily={FontFamily.Bold}
            style={textStyle}
          />
        </ARbutton>
      </View>
    </View>
  );
};

export default Scbutton;

const style = StyleSheet.create({
  buttonview: {
    // backgroundColor: 'green',
    marginVertical: hei(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: wid(44),
    // backgroundColor:"yellow"
  },
});
