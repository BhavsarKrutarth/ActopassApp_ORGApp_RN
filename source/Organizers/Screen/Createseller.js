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
import { ARcontainer, ARheader, ARLoader } from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import { Profilemodal } from "../../Commoncompoenent";
import { Validation } from "../../utils";
import { useSelector } from "react-redux";
import { Addnewseller } from "../../api/Api";

const Createseller = () => {
  const navigation = useNavigation();
  const { AsyncValue } = useSelector((state) => state.Auth);
  const [Fieldvalidation, setfieldvalidation] = useState(false);
  const [Loading, setlodading] = useState(false);
  const [Input, setInput] = useState({
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

  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Emailvalidation = Fieldvalidation && Validation.isEmailValid(Input.Email);
  const Mobilevalidation =  Fieldvalidation && Validation.isMobileNumberValid(Input.Number);
  const Passwordvalidation = Fieldvalidation && Validation.issellerpassword(Input.password);
  const Photo = Fieldvalidation && Input.selectedImage.imageUri == "";

  const validate =
    !Validation.isEmailValid(Input.Email) &&
    !Validation.isMobileNumberValid(Input.Number) &&
    !Validation.issellerpassword(Input.password) &&
    !Input.selectedImage.imageUri == "" &&
    !Validation.isName(Input.Name);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: hei(8),
      height: hei(8),
      cropping: true,
      includeBase64: true,
    })
      .then((response) => {
        // console.log(response);
        setInput((pre) => ({ ...pre, setmodel: false }));
        setInput((pre) => ({
          ...pre,
          selectedImage: {
            base64: response.data,
            imageUri: response.path,
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
        setInput((pre) => ({ ...pre, setmodel: false }));
        setInput((pre) => ({
          ...pre,
          selectedImage: {
            base64: response.data,
            imageUri: response.path,
          },
        }));
      })
      .catch((err) => console.log(err));
  };

  const Addseller = async (
    OrganizerLoginId,
    Password,
    Name,
    Number,
    Email,
    Photos
  ) => {
    setfieldvalidation(true);

    if (validate) {
      setlodading(true)
      const response = await Addnewseller(
        OrganizerLoginId,
        Password,
        Name,
        Number,
        Email,
        Photos
      );
      console.log(response);
      if(response){
        setlodading(false);
        setfieldvalidation(false)
        setInput({
          Name: "",
          password: "",
          Email: "",
          Number: "",
          selectedImage: {
            base64: "",
            imageUri: "",
          },
          setmodel: false,
        })
      }
    } else {
      console.log("Please fill all the blank");
    }
  };

  if (Loading) return <ARLoader visible={Loading} />;

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
            onpress={() => setInput((pre) => ({ ...pre, setmodel: true }))}
            Imagedata={Input.selectedImage.imageUri}
            validate={Photo}
          />
          <View style={style.inputcontainerview}>
            <Inputdata
              txtchildren={"Name"}
              placeholder={"Enter Your Name"}
              inputvalue={Input.Name}
              onchange={(v) => setInput((pre) => ({ ...pre, Name: v }))}
              errormessage={Namevalidation}
              err={"Please enter your name"}
            />

            <Inputdata
              txtchildren={"Password"}
              placeholder={"Enter Your Password"}
              inputvalue={Input.password}
              onchange={(v) => setInput((pre) => ({ ...pre, password: v }))}
              errormessage={Passwordvalidation}
              err={"Password must be between 4 to 8 characters."}
            />

            <Inputdata
              txtchildren={"Email ID"}
              placeholder={"Enter Your Email Id"}
              inputvalue={Input.Email}
              onchange={(v) => setInput((pre) => ({ ...pre, Email: v }))}
              errormessage={Emailvalidation}
              err={"Please enter valid email address"}
            />

            <Inputdata
              txtchildren={"Mobile No"}
              placeholder={"Enter Your Mobile Number"}
              inputvalue={Input.Number}
              onchange={(v) => setInput((pre) => ({ ...pre, Number: v }))}
              keyboardType={"numeric"}
              errormessage={Mobilevalidation}
              err={"Please enter mobile number must be 10 digit"}
              maxLength={10}
            />
          </View>
          <Scbutton
            onsavepress={() =>
              Addseller(
                AsyncValue.OrganizerLoginId,
                Input.password,
                Input.Name,
                Input.Number,
                Input.Email,
                Input.selectedImage.base64
              )
            }
            oncanclepress={() => {
              setfieldvalidation(false)
                  setInput({
                    Name: "",
                    password: "",
                    Email: "",
                    Number: "",
                    selectedImage: {
                      base64: "",
                      imageUri: "",
                    },
                    setmodel: false,
                  })
            }}
          />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
      <Profilemodal
        visible={Input.setmodel}
        close={() => setInput((pre) => ({ ...pre, setmodel: false }))}
        onRequestClose={() => setInput((pre) => ({ ...pre, setmodel: false }))}
        touchableWithoutFeedback={() =>
          setInput((pre) => ({ ...pre, setmodel: false }))
        }
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
