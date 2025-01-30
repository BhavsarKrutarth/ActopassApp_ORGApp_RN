import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FontFamily,
  Colors,
  FontSize,
  hei,
  isIos,
  normalize,
  wid,
} from "../../theme";
import Images from "../../Image/Images";
import { Inputdata, Scbutton, Uploadphoto } from "../../Commoncompoenent";
import { ARcontainer, ARheader } from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import { Profilemodal } from "../../Commoncompoenent";

const Createseller = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    Name: "",
    password: "",
    Email: "",
    Number: "",
    selectedImage: {
      base64: "",
      imageUri: "",
    },
    setmodel: false,
  });

  
  const openCamera = () => {
    setState((pre) => ({ ...pre, setmodel: false }))
    ImagePicker.openCamera({
      width: hei(8),
      height: hei(8),
      cropping: true,
      includeBase64:true
    }).then((response) => {
      console.log(response);
      setState((pre) => ({...pre, selectedImage:{
        base64:response.data,
        imageUri:response.path
      }}))
    }
    ).catch((err) => console.log(err)
    )
  }


  const opengallary = () => {
    setState((pre) => ({ ...pre, setmodel: false }))
      ImagePicker.openPicker({
        width: hei(8),
        height: hei(8),
        cropping: true,
        includeBase64:true
      }).then((response) => {
        console.log(response);
        setState((pre) => ({...pre, selectedImage:{
          base64:response.data,
          imageUri:response.path
        }}))
      }
      ).catch((err) => console.log(err)
      )
    }



  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Create Seller"}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{ height: hei(2.5), width: hei(2.5) }}
        Leftpress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={
          {
            // backgroundColor: "pink",
          }
        }
        enableAutomaticScroll={isIos ? true : false} // Prevent automatic scroll behavior
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0} // Prevent extra space from being added when the keyboard opens
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust for platform-specific behavior
      >
        <View style={style.containerview}>
          <Uploadphoto
            oneditpress={() => console.log("")}
            onpress={() => setState((pre) => ({ ...pre, setmodel: true }))}
            Imagedata={state.selectedImage.imageUri}
          />
          <View style={style.inputcontainerview}>
            <Inputdata
              txtchildren={"Name"}
              placeholder={"Enter Your Name"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />

            <Inputdata
              txtchildren={"Password"}
              placeholder={"012"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />

            <Inputdata
              txtchildren={"Email ID"}
              placeholder={"Acto123@.com"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />

            <Inputdata
              txtchildren={"Mobile No"}
              placeholder={"012345678"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />
          </View>
          <Scbutton
            onsavepress={() => console.log("press")}
            oncanclepress={() => console.log("pressd")}
          />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
      <Profilemodal
        visible={state.setmodel}
        close={() => setState((pre) => ({ ...pre, setmodel: false }))}
        onRequestClose={() => setState((pre) => ({ ...pre, setmodel: false }))}
        touchableWithoutFeedback={() => setState((pre) => ({ ...pre, setmodel: false }))}
        ongallerypress={opengallary}
        oncamerapress={openCamera}
      />
    </ARcontainer>
  );
};

export default Createseller;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor: Colors.Placeholder,
    paddingHorizontal: wid(4),
  },
  containerview: {
    // paddingBottom:hei(1),
    // backgroundColor:"red"
    paddingHorizontal: wid(4),
    flex: 1,
  },
  inputcontainerview: {
    marginTop: hei(3),
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
  },
});
