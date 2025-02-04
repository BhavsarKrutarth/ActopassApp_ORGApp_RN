import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import {
  ARbutton,
  ARcontainer,
  ARLoader,
  ARtext,
  ARtextinput,
} from "../../common";
import { ARheader } from "../../common";
import { hei, wid, normalize, height, width, isIos } from "../../theme";
import Images from "../../Image/Images";
import { FontSize, FontFamily } from "../../theme";
import { Colors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import {
  Eventdropdown,
  Inputdata,
  Profilemodal,
  Responsemodal,
  Scbutton,
  Uploadphoto,
} from "../../Commoncompoenent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Validation } from "../../utils";
import ImagePicker from "react-native-image-crop-picker";
import { editboxdata } from "../../api/Api";

const Boxofficedetail = ({ route }) => {
  const navigation = useNavigation();
  const {
    Code,
    EmailId,
    EmpId,
    MobileNo,
    Name,
    OrganizerLoginid,
    PHOTOPATH,
    Password,
    BoxofficeUserId,
  } = route.params.data;

  const [Inputdisable, SetInputdisable] = useState(false);
  const [Fieldvalidation, setfieldvalidation] = useState(false);
  const [Successmodal, Setsuccesmodal] = useState(false)
  const [Loading, SetLoading] = useState(false);
  const [Input, SetInput] = useState({
    Code: Code,
    Name: Name,
    EmailId: EmailId,
    Password: Password,
    MobileNo: MobileNo,
    selectedImage: {
      base64: "",
      imageUri: PHOTOPATH,
      filename: "",
    },
    setmodel: false,
  });

  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);

  const validate =
    !Validation.isName(Input.Name) &&
    !Validation.issellerpassword(Input.Password);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: hei(8),
      height: hei(8),
      cropping: true,
      includeBase64: true,
    })
      .then((response) => {
        // console.log(response);
        SetInput((pre) => ({ ...pre, setmodel: false }));
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
        SetInput((pre) => ({ ...pre, setmodel: false }));
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

  const editseller = async (
    BoxofficeUserId,
    OrganizerLoginid,
    Password,
    Name,
    MobileNo,
    EmailId,
    Image
  ) => {
    setfieldvalidation(true);
    try {
      if (validate) {
        SetLoading(true);
        const response = await editboxdata(
          BoxofficeUserId,
          OrganizerLoginid,
          Password,
          Name,
          MobileNo,
          EmailId,
          Image
        );
        if (response) {
          SetLoading(false);
          setfieldvalidation(false);
          Setsuccesmodal(true)
          console.log("Fetch response", response);
        }
      } else {
        console.log("Please fill the blank");
      }
    } catch (error) {
      SetLoading(false);
      setfieldvalidation(false);
      console.log("Failed to fetch data", error);
    }
  };

  if (Loading) return <ARLoader visible={Loading} />;

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Boxoffice Details"}
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
            oneditpress={() => SetInputdisable(!Inputdisable)}
            editicontrue={true}
            Imagedata={Input.selectedImage.imageUri}
            Addphotoicon={Inputdisable}
            onpress={() => SetInput((pre) => ({ ...pre, setmodel: true }))}
            maintext={Code}
            subtext={Input.selectedImage.filename}
          />
          <View style={style.inputcontainerview}>
            <Inputdata
              txtchildren={"Code"}
              placeholder={"Code"}
              inputvalue={Input.Code}
              // onchange={v => console.log(v)}
              editable={false}
              color={Colors.Placeholder}
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
              placeholder={"acto@gmail.com"}
              inputvalue={Input.EmailId}
              editable={false}
              color={Colors.Placeholder}
              // onchange={(v) => console.log(v)}
            />
            <Inputdata
              txtchildren={"Mobile No"}
              placeholder={"012345678"}
              inputvalue={Input.MobileNo}
              editable={false}
              // onchange={(v) => console.log(v)}
              color={Colors.Placeholder}
            />
          </View>
          <Scbutton
            onsavepress={() =>
              editseller(
                BoxofficeUserId,
                OrganizerLoginid,
                Input.Password,
                Input.Name,
                MobileNo,
                EmailId,
                Input.selectedImage.base64
              )
            }
            oncanclepress={() =>
              SetInput({
                Code: Code,
                Name: Name,
                EmailId: EmailId,
                Password: Password,
                MobileNo: MobileNo,
                selectedImage: {
                  base64: "",
                  imageUri: PHOTOPATH,
                  filename: "",
                },
                setmodel: false,
              })
            }
          />
          <Eventdropdown eventpress={() => console.log("press")} />
          <View style={[style.inputcontainerview, { marginTop: hei(1) }]}>
            <View style={style.eventview}>
              <ARtextinput
                Containerstyle={{
                  borderWidth: 1,
                  //   borderTopLeftRadius: normalize(6),
                  backgroundColor: Colors.backgroundcolor,
                  width: wid(70),
                }}
                Tipadding={7}
                Tifontsize={FontSize.font12}
                Tiheight={hei(4)}
                Tiplaceholder={"Event Name"}
                Tiplacrholdertextcolor={Colors.lable}
                value={""}
                onchangetext={(v) => console.log("s")}
              />
              <ARbutton
                Touchstyle={{
                  height: hei(4.1),
                  backgroundColor: Colors.purple,
                  width: wid(14),
                  borderRadius: 0,
                }}
              >
                <ARtext children={"Reset"} color={Colors.White} />
              </ARbutton>
            </View>
            <Inputdata
              txtchildren={"Name"}
              placeholder={"Actoscript"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />
            <Inputdata
              txtchildren={"To Amount"}
              placeholder={"10"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />
            <Inputdata
              txtchildren={"From Amount"}
              placeholder={"100"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />
            <Inputdata
              txtchildren={"Discount"}
              placeholder={"10"}
              inputvalue={""}
              onchange={(v) => console.log(v)}
            />
          </View>
          <Scbutton
            onsavepress={() => console.log("press")}
            oncanclepress={() => console.log("pressd")}
            styles={{ marginVertical: hei(3) }}
          />
        </View>
      </KeyboardAwareScrollView>
      <Profilemodal
        visible={Input.setmodel}
        close={() => SetInput((pre) => ({ ...pre, setmodel: false }))}
        onRequestClose={() => SetInput((pre) => ({ ...pre, setmodel: false }))}
        touchableWithoutFeedback={() =>
          SetInput((pre) => ({ ...pre, setmodel: false }))
        }
        ongallerypress={opengallary}
        oncamerapress={openCamera}
      />
      <Responsemodal 
        visible={Successmodal} 
        onpress={() => Setsuccesmodal(false)} 
        message={'Data has been edited successfully'} 
        subtext={'!Oh Yeah'}
        Images={Images.editdata}
      />
    </ARcontainer>
  );
};

export default Boxofficedetail;

const style = StyleSheet.create({
  // scrollstyle: {
  //     flexGrow: 1,
  //     paddingHorizontal: wid(4),
  //   },
  containerview: {
    paddingHorizontal: wid(4),
    flex: 1,
    // backgroundColor:"green"
  },
  inputcontainerview: {
    marginTop: hei(3),
    backgroundColor: Colors.progressbackground,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
  },
  eventview: {
    // backgroundColor:'red',
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: normalize(6),
    marginVertical: hei(1),
  },
});
