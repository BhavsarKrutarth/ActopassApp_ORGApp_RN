import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {ARcontainer, ARLoader} from '../../common';
import {Colors, isIos} from '../../theme';
import {hei, wid, normalize} from '../../theme';
import {FontSize, FontFamily} from '../../theme';
import Images from '../../Image/Images';
import {ARheader} from '../../common';
import {useNavigation} from '@react-navigation/native';
import {Inputdata, Profilemodal, Responsemodal, Scbutton, Uploadphoto} from '../../Commoncompoenent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Validation } from '../../utils';
import ImagePicker from 'react-native-image-crop-picker';
import { editscnnerdata } from '../../api/Api';

const Scannerdetail = ({ route }) => {
  // console.log(route.params.data);
  
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
    ScannerLoginId,
  } = route.params.data;
  const [Inputdisable, SetInputdisable] = useState(false);
  const [Fieldvalidation, setfieldvalidation] = useState(false);
  const [Successmodal, Setsuccesmodal] = useState(false);
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
  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Passwordvalidation =
    Fieldvalidation && Validation.issellerpassword(Input.Password);

  const validate =
    !Validation.isName(Input.Name) &&
    !Validation.issellerpassword(Input.Password);
    
    const editscanner = async (
        ScannerLoginId,
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
            const response = await editscnnerdata(
              ScannerLoginId,
              OrganizerLoginid,
              Password,
              Name,
              MobileNo,
              EmailId,
              Image
            );
            if (response.ResponseCode === "0") {
              SetLoading(false);
              setfieldvalidation(false);
              Setsuccesmodal(true);
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
        lefttch={{paddingLeft: wid(1)}}
        texts={'Scanner Details'}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{height: hei(2.5), width: hei(2.5)}}
        Leftpress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          // backgroundColor: "pink",
        }}
        enableAutomaticScroll={isIos ? true : false}  // Prevent automatic scroll behavior
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0} // Prevent extra space from being added when the keyboard opens
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust for platform-specific behavior
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
                      {/* <Inputdata
                        txtchildren={"Code"}
                        placeholder={"Code"}
                        inputvalue={Input.Code}
                        // onchange={v => console.log(v)}
                        editable={false}
                        color={Colors.Placeholder}
                      /> */}
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
                        txtchildren={"Password"}
                        placeholder={"125896325"}
                        inputvalue={Input.Password}
                        onchange={(v) => SetInput((pre) => ({ ...pre, Password: v }))}
                        editable={Inputdisable}
                        color={Inputdisable ? Colors.Black : Colors.Placeholder}
                        errormessage={Passwordvalidation}
                        err={"Password must be between 4 to 8 characters."}
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
                        editscanner(
                          ScannerLoginId,
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
        message={"Data has been edited successfully"}
        subtext={"!Oh Yeah"}
        Images={Images.editdata}
      />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </ARcontainer>
  );
};

export default Scannerdetail;

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
      flex:1,
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
