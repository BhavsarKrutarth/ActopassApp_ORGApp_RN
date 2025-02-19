import React from "react";
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
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
  Onok,
  subtext,
  subcolor,
  subfamily,
  subsize
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
          <View style={{
            backgroundColor:'',
            alignItems:"center",
            rowGap:hei(2.5),
            }}>
            <ARimage source={Images} style={{ height: hei(12), width: hei(12) }} />
          </View>
          <View style={{marginTop:hei(3.5)}}>
            <ARtext
              children={subtext}
              color={subcolor ?? Colors.btncolor}
              size={subsize ?? FontSize.font26}
              fontFamily={subfamily ?? FontFamily.SemiBold}
              />
          </View>
          <View style={{
            marginTop:hei(2),
            paddingBottom:hei(4),
            backgroundColor:'',
            paddingHorizontal:wid(6),
            borderBottomWidth:normalize(1.5),
            borderBottomColor:Colors.inactive
            }}>
            <ARtext
              children={message}
              size={FontSize.font14}
              fontFamily={FontFamily.SemiBold}
              color={Colors.Text}
              align={'center'}
            />
          </View>
          {button ? (
          <View style={{
            flexDirection:"row",
            justifyContent:"space-evenly",
            // width:wid(78),
            paddingVertical:hei(2)
            }}>
            <ARbutton
              Touchstyle={{
                backgroundColor: '#c1c1c1',
                height: hei(5),
                width: wid(30),
                borderRadius: normalize(6),
              }}
              onpress={Oncancle}
            >
              <ARtext 
              children={"Cancle"} 
              color={Colors.White}
              fontFamily={FontFamily.SemiBold}
              />
            </ARbutton>
            <ARbutton
              Touchstyle={{
                backgroundColor: Colors.delete,
                height: hei(5),
                width: wid(30),
                borderRadius: normalize(6),
              }}
              onpress={Onok}
            >
              <ARtext 
              children={"OK"} 
              color={Colors.White}
              fontFamily={FontFamily.SemiBold}
              />
            </ARbutton>
          </View>
          ) : (
            <ARbutton
              Touchstyle={{
                backgroundColor:'',
                height: hei(7),
                borderRadius: normalize(6),
                borderTopwidth:normalize(1)
              }}
              onpress={onpress}
            >
              <ARtext 
              children={"OK"} 
              color={Colors.Placeholder}
              size={FontSize.font14}
              />
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
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.White,
    borderRadius: normalize(15),
    paddingTop: hei(6),
    width:wid(72),
  },
});
