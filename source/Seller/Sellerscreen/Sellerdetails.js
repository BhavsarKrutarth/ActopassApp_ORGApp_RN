import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ARcontainer, ARheader } from "../../common";
import { useNavigation } from "@react-navigation/native";
import {
  Colors,
  FontFamily,
  FontSize,
  hei,
  isIos,
  normalize,
  wid,
} from "../../theme";
import Images from "../../Image/Images";
import {
  Inputdata,
  Profilemodal,
  Scbutton,
  Uploadphoto,
} from "../../Commoncompoenent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { Validation } from "../../utils";

const Sellerpersonaldetails = () => {
  // const {AsyncValue} = useSelector((state) => state.Auth)
  const [Fieldvalidation, setfieldvalidation] = useState(false);
  const navigation = useNavigation();
  const [Input, SetInput] = useState({
    Name: "",
    EmailId: "",
    Password: "",
    MobileNo: "",
    selectedImage: {
      base64: "",
      imageUri: "",
      filename: "",
    },
    setmodal: false,
  });
  const [Inputdisable, SetInputdisable] = useState(false);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: hei(8),
      height: hei(8),
      cropping: true,
      includeBase64: true,
    })
      .then((response) => {
        // console.log(response);
        SetInput((pre) => ({ ...pre, setmodal: false }));
        SetInput((pre) => ({
          ...pre,
          selectedImage: {
            base64: response.data,
            imageUri: response.path,
            filename: response.filename,
          },
        }));
      })
      .catch((err) => console.log(err));
  };

  const opengallary = () => {
    ImagePicker.openPicker({
      width: hei(8),
      height: hei(8),
      cropping: true,
      includeBase64: true,
    })
      .then((response) => {
        // console.log(response);
        SetInput((pre) => ({ ...pre, setmodal: false }));
        SetInput((pre) => ({
          ...pre,
          selectedImage: {
            base64: response.data,
            imageUri: response.path,
            filename: response.filename,
          },
        }));
      })
      .catch((err) => console.log(err));
  };

  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Emailvalidation =
    Fieldvalidation && Validation.isEmailValid(Input.EmailId);
  const Mobilevalidation =
    Fieldvalidation && Validation.isMobileNumberValid(Input.MobileNo);
  const Passwordvalidation =
    Fieldvalidation && Validation.issellerpassword(Input.Password);
  // const Photo = Fieldvalidation && Input.selectedImage.imageUri == "";

  const validate =
    !Validation.isEmailValid(Input.EmailId) &&
    !Validation.isMobileNumberValid(Input.MobileNo) &&
    !Validation.issellerpassword(Input.Password) &&
    // !Input.selectedImage.imageUri == "" &&
    !Validation.isName(Input.Name);

  const editdata = () => {
    setfieldvalidation(true);
    if (validate) {
      console.log("Validation false");
    } else {
      console.log("please fill the blank");
    }
  };

  const cancle = () => {
    setfieldvalidation(false);
    SetInput({
      Name: "",
      EmailId: "",
      Password: "",
      MobileNo: "",
      selectedImage: {
        base64: "",
        imageUri: "",
        filename: "",
      },
      setmodal: false,
    });
  };

  return (
    <ARcontainer>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Account Details"}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{ height: hei(2.5), width: hei(2.5) }}
        Leftpress={() => navigation.goBack()}
      />
      {/* <KeyboardAvoidingView
              behavior={isIos ? 'padding' : 'height'}
              keyboardVerticalOffset={ isIos ? 64 : hei(0)}
              style={{flex: 1}}> */}

      <KeyboardAwareScrollView
        extraScrollHeight={isIos ? hei(1) : hei(0.9)}
        keyboardShouldPersistTaps="handled" // Dismiss keyboard on outside tap
        enableOnAndroid={true}
        contentContainerStyle={{
          // flexGrow: 1,
          paddingHorizontal: wid(4),
          // backgroundColor:"red",
          paddingBottom: hei(8),
        }}
        enableAutomaticScroll={isIos ? true : false}
      >
        {/* <ScrollView
           contentContainerStyle={style.scrollstyle}
           keyboardShouldPersistTaps="handled"
           keyboardDismissMode={isIos ? 'on-drag' : 'interactive'}> */}

        <View style={style.containerview}>
          <Uploadphoto
            oneditpress={() => {
              SetInputdisable(!Inputdisable);
              if (Inputdisable) {
                setfieldvalidation(false);
                SetInput({
                  Name: "",
                  EmailId: "",
                  Password: "",
                  MobileNo: "",
                  selectedImage: {
                    base64: "",
                    imageUri: "",
                    filename: "",
                  },
                  setmodal: false,
                });
              }
            }}
            editicontrue={true}
            Imagedata={Input.selectedImage.imageUri}
            Addphotoicon={Inputdisable}
            onpress={() => SetInput((pre) => ({ ...pre, setmodal: true }))}
            // maintext={Code}
            subtext={Input.selectedImage.filename}
          />
          <View style={style.inputcontainerview}>
            <Inputdata
              txtchildren={"Code"}
              placeholder={"012345678"}
              inputvalue={""}
              // onchange={v => SetInput((pre) => ({...pre,Code:v}))}
              editable={false}
            />

            <Inputdata
              txtchildren={"Name"}
              placeholder={"Enter Your Name"}
              inputvalue={Input.Name}
              onchange={(v) => SetInput((pre) => ({ ...pre, Name: v }))}
              editable={Inputdisable}
              color={Inputdisable ? Colors.Black : Colors.Placeholder}
              errormessage={Namevalidation}
              err={"Please enter your name must be 3 characters."}
            />

            <Inputdata
              txtchildren={"Email ID"}
              placeholder={"Acto123@.com"}
              inputvalue={Input.EmailId}
              onchange={(v) => SetInput((pre) => ({ ...pre, EmailId: v }))}
              editable={Inputdisable}
              color={Inputdisable ? Colors.Black : Colors.Placeholder}
              errormessage={Emailvalidation}
              err={"Please enter valid email."}
            />

            <Inputdata
              txtchildren={"Password"}
              placeholder={"1234"}
              inputvalue={Input.Password}
              onchange={(v) => SetInput((pre) => ({ ...pre, Password: v }))}
              editable={Inputdisable}
              color={Inputdisable ? Colors.Black : Colors.Placeholder}
              errormessage={Passwordvalidation}
              err={"Please enter your name must be 4 characters."}
            />

            <Inputdata
              txtchildren={"Mobile No"}
              placeholder={"012345678"}
              inputvalue={Input.MobileNo}
              onchange={(v) => SetInput((pre) => ({ ...pre, MobileNo: v }))}
              editable={Inputdisable}
              color={Inputdisable ? Colors.Black : Colors.Placeholder}
              errormessage={Mobilevalidation}
              err={"Please enter your name must be 10 digit."}
              keyboardType={"numeric"}
            />
          </View>
          <Scbutton
            onsavepress={() => editdata()}
            oncanclepress={() => cancle()}
            disabled={!Inputdisable}
            canceldisabled={!Inputdisable}
          />
          <Profilemodal
            visible={Input.setmodal}
            close={() => SetInput((pre) => ({ ...pre, setmodal: false }))}
            onRequestClose={() =>
              SetInput((pre) => ({ ...pre, setmodal: false }))
            }
            touchableWithoutFeedback={() =>
              SetInput((pre) => ({ ...pre, setmodal: false }))
            }
            ongallerypress={opengallary}
            oncamerapress={openCamera}
          />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </ARcontainer>
  );
};

export default Sellerpersonaldetails;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor: Colors.Placeholder,
    paddingHorizontal: wid(4),
  },
  containerview: {
    // paddingBottom:hei(1),
    // backgroundColor:"red"
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
