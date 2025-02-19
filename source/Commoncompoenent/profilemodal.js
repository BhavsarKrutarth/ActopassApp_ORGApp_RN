import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Colors, FontFamily, FontSize, hei, wid } from "../theme";
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Images from "../Image/Images";
import ARimage from "../common/ARimage";
import ARtext from "../common/ARtext";
import ARcontainer from "../common/ARcontainer";

const Profilemodal = ({ visible, onRequestClose, close, oncamerapress, ongallerypress,touchableWithoutFeedback }) => {
  return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onRequestClose}
      >

        <TouchableWithoutFeedback onPress={touchableWithoutFeedback}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ gap: wid(5) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={close} hitSlop={20}>
                    <ARimage
                      style={{ width: wid(4), height: wid(4) }}
                      source={Images.close}
                    />
                  </TouchableOpacity>
                  <ARtext style={styles.title}>Profile Photo</ARtext>
                  <View></View>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: Colors.Grey }} />
              </View>
              <View style={{ 
                // backgroundColor: "red",
                justifyContent:"space-evenly",
                flexDirection:"row",
                marginTop:hei(1)
                 }}>
                <TouchableOpacity
                  style={{gap: 5,alignItems:"center"}}
                  onPress={oncamerapress}
                >
                  <ARimage
                    style={{ width: wid(10), height: wid(10) }}
                    source={Images.camera}
                  />
                  <ARtext
                    align={''}
                    style={[
                      styles.inputText,
                      {
                        fontSize: FontSize.font13,
                        fontFamily: FontFamily.Regular,
                      },
                    ]}
                  >
                    Camera
                  </ARtext>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{gap: 5,alignItems:"center"}}
                  onPress={ongallerypress}
                >
                  <ARimage
                    style={{ width: wid(10), height: wid(10) }}
                    source={Images.gallary}
                  />
                  <ARtext
                    style={[
                      styles.inputText,
                      {
                        fontSize: FontSize.font13,
                        fontFamily: FontFamily.Regular,
                      },
                    ]}
                  >
                    Gallery
                  </ARtext>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

  );
};

export default Profilemodal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.White,
    paddingBottom:hei(7),
    paddingVertical: hei(3),
    paddingHorizontal:wid(5),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: wid(100),
    gap: wid(4),
  },
  title: {
    fontSize: FontSize.font18,
    fontFamily: FontFamily.SemiBold,
  },
  inputText: {
    fontSize: FontSize.font12,
    fontFamily: FontFamily.Medium,
  },
});
