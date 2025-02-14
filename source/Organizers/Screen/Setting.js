import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ARcontainer } from "../../common";
import { hei, wid, normalize } from "../../theme";
import { Colors } from "../../theme";
import { FontFamily, FontSize } from "../../theme";
import Images from "../../Image/Images";
import { ARheader } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { ARimage } from "../../common";
import { ARbutton } from "../../common";
import { ARtext } from "../../common";
import { useSelector } from "react-redux";

const Setting = ({ oneditpress }) => {
  const navigation = useNavigation();

  return (
    <ARcontainer>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Settings"}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{ height: hei(2.5), width: hei(2.5) }}
        Leftpress={() => navigation.goBack()}
      />
      <View style={style.container}>
        <ARbutton Touchstyle={style.uploadview}>
          <View style={style.imageview}>
            <ARimage source={Images.man} style={style.image} />
          </View>

          <View style={style.uploadtext}>
            <ARtext
              children={"Jay Mavani"}
              align={""}
              fontFamily={FontFamily.Bold}
              size={FontSize.font14}
            />
            <ARtext
              children={"+91 1234567890"}
              align={""}
              size={FontSize.font14}
              color={Colors.Placeholder}
            />
          </View>

          <View
            style={{
              height: hei(2),
              width: hei(2),
              position: "absolute",
              top: hei(3),
              right: hei(1),
            }}
            backgroundColor={""}
            onpress={oneditpress}
          >
            <ARtext children={">"} size={FontSize.font15} />
          </View>
        </ARbutton>
        <View style={style.list}>
          <ARbutton Touchstyle={style.tch}>
            <ARimage source={Images.refer} style={style.smallimage} />
            <ARtext children={"Refer & Earn"} size={FontSize.font15} />
          </ARbutton>
          <ARbutton Touchstyle={style.tch}>
            <ARimage source={Images.terms} style={style.smallimage} />
            <ARtext children={"Terms & Condition"} size={FontSize.font15} />
          </ARbutton>
          <ARbutton Touchstyle={style.tch}>
            <ARimage source={Images.help} style={style.smallimage} />
            <ARtext children={"Help & FAQs"} size={FontSize.font15} />
          </ARbutton>
        </View>
      </View>
    </ARcontainer>
  );
};

export default Setting;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: wid(4),
  },
  uploadview: {
    backgroundColor: "",
    flexDirection: "row",
    height: hei(8),
    borderRadius: 0,
    justifyContent: "",
    alignItems: "center",
  },
  imageview: {
    backgroundColor: Colors.lightgrey,
    justifyContent: "center",
    alignItems: "center",
    height: hei(8),
    width: wid(17),
    borderRadius: normalize(50),
  },
  image: {
    height: wid(10),
    width: wid(10),
  },
  uploadtext: {
    // backgroundColor:Colors.purple,
    width: wid(67),
    marginHorizontal: wid(4),
    rowGap: hei(0.2),
    // justifyContent: 'center',
  },
  list: {
    paddingVertical: hei(2),
    rowGap: hei(2),
    // backgroundColor:'red',
    marginTop: hei(3),
  },
  tch: {
    backgroundColor: Colors.progressbackground,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(6),
    flexDirection: "row",
    justifyContent: "",
    columnGap: wid(3),
    height: hei(7),
    paddingLeft: wid(3),
  },
  smallimage: {
    height: hei(3.5),
    width: hei(3.5),
    // backgroundColor:"red"
  },
});
