import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import {
  Colors,
  FontFamily,
  FontSize,
  hei,
  height,
  normalize,
  wid,
} from "../theme";
import ARimage from "../common/ARimage";
import Images from "../Image/Images";
import ARtext from "../common/ARtext";
import ARbutton from "../common/ARbutton";
import Scbutton from "./Scbutton";

const Responsemodal = ({
  visible,
  onrequestclose,
  onpress,
  Images,
  message,
  button,
  Oncancle,
  Onok
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onrequestclose={onrequestclose}
    >
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <ARimage source={Images} style={{ height: hei(8), width: hei(8) }} />
          <ARtext
            children={message}
            size={FontSize.font14}
            fontFamily={FontFamily.SemiBold}
          />
          {button ? (
          <View style={{
            flexDirection:"row",
            justifyContent:"space-evenly",
            // backgroundColor:"red",
            width:wid(78)
            }}>
            <ARbutton
              Touchstyle={{
                backgroundColor: Colors.btncolor,
                height: hei(5),
                width: wid(30),
                borderRadius: normalize(6),
              }}
              onpress={Oncancle}
            >
              <ARtext children={"Cancle"} />
            </ARbutton>
            <ARbutton
              Touchstyle={{
                backgroundColor: 'red',
                height: hei(5),
                width: wid(30),
                borderRadius: normalize(6),
              }}
              onpress={Onok}
            >
              <ARtext children={"OK"} />
            </ARbutton>
          </View>
          ) : (
            <ARbutton
              Touchstyle={{
                backgroundColor: Colors.btncolor,
                height: hei(5),
                width: wid(73),
                borderRadius: normalize(6),
              }}
              onpress={onpress}
            >
              <ARtext children={"OK"} />
            </ARbutton>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Responsemodal;

const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: wid(6),
  },
  modalContent: {
    backgroundColor: Colors.White,
    paddingHorizontal: wid(5),
    borderRadius: normalize(8),
    paddingVertical: hei(2),
    alignItems: "center",
    rowGap: hei(2),
  },
});
