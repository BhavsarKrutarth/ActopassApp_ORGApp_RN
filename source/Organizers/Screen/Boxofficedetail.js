import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  ARbutton,
  ARcontainer,
  ARimage,
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
  const [data, setData] = useState({});
  const [isError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emptyView, setEmptyView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    eventName: "",
    eventId: "",
  });
  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Passwordvalidation =
    Fieldvalidation && Validation.issellerpassword(Input.Password);

  const validate =
    !Validation.isName(Input.Name) &&
    !Validation.issellerpassword(Input.Password);

  useEffect(() => {
    if (selectedEvent.eventId) {
      getDiscount_Box();
    }
  }, [selectedEvent.eventId]);

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

  const getDiscount_Box = async () => {
    try {
      setLoading(true);
      const response = await GetDiscount_Box(11, selectedEvent.eventId);
      if (response && response.length > 0) {
        setData(response[0]);
      } else {
        setData({});
      }
    } catch (error) {
      console.error("Error fetching discount box:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDiscount_Box = async () => {
    setLoading(true);
    try {
      const response = await AddDiscount_Box(data, selectedEvent.eventId);
      console.log(response);
    } catch (error) {
      console.error("Error adding discount box:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDiscount_Box = async () => {
    setLoading(true);
    try {
      const response = await UpdateDiscount_Box(data);
      if (response.ResponseCode === 0) {
        setError("");
      } else {
        setError(response.ResponseMessage);
      }
    } catch (error) {
      console.error("Error updating discount box:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscount_Box = async () => {
    setLoading(true);
    try {
      const response = await DeleteDiscount_Box(data.BoxOfficeDiscountid);
      if (response) getDiscount_Box();
    } catch (error) {
      console.error("Error deleting discount box:", error);
    } finally {
      setLoading(false);
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
          <Eventdropdown
            eventpress={() => console.log("Event Pressed")}
            onSelectEvent={(eventName, eventId) =>
              setSelectedEvent({ eventName, eventId })
            }
            onPressAdd={() => setEmptyView(true)}
          />
          {isLoading ? (
            <ARLoader visible={isLoading} />
          ) : (
            <DiscountInputView
              data={data}
              setData={setData}
              addDiscount_Box={addDiscount_Box}
              updateDiscount_Box={updateDiscount_Box}
              deleteDiscount_Box={deleteDiscount_Box}
            />
          )}
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
        message={"Data has been edited successfully"}
        subtext={"!Oh Yeah"}
        Images={Images.editdata}
      />
      <Modal
        visible={emptyView}
        transparent
        animationType="slide"
        onDismiss={() => setEmptyView(false)}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity onPress={() => setEmptyView(false)}>
              <ARimage
                source={Images.backarrow}
                style={{
                  width: wid(6),
                  height: wid(6),
                  marginBottom: hei(4),
                }}
              />
            </TouchableOpacity>
            <DiscountInputView
              data={data}
              setData={setData}
              addDiscount_Box={addDiscount_Box}
              updateDiscount_Box={updateDiscount_Box}
              deleteDiscount_Box={deleteDiscount_Box}
              emptyView={emptyView}
              eventName={selectedEvent.eventName}
            />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: wid(100),
    height: hei(100),
    backgroundColor: "white",
    paddingVertical: hei(8),
    paddingHorizontal: wid(4),
    borderRadius: 10,
  },
});

const DiscountInputView = ({
  data,
  setData,
  addDiscount_Box,
  updateDiscount_Box,
  deleteDiscount_Box,
  emptyView,
  eventName,
}) => {
  const handleInputChange = useCallback((field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  return (
    <>
      <View style={[style.inputcontainerview, { marginTop: hei(1) }]}>
        <Inputdata
          txtchildren={"Name"}
          placeholder={"Actoscript"}
          inputvalue={emptyView ? eventName : data?.EventName || ""}
          editable={false}
        />
        <Inputdata
          txtchildren={"To Amount"}
          placeholder={"10"}
          inputvalue={data?.ToAmount?.toString() || ""}
          onchange={(v) => handleInputChange("ToAmount", v)}
        />
        <Inputdata
          txtchildren={"From Amount"}
          placeholder={"100"}
          inputvalue={data?.FromAmount?.toString() || ""}
          onchange={(v) => handleInputChange("FromAmount", v)}
        />
        <Inputdata
          txtchildren={"Discount"}
          placeholder={"10"}
          inputvalue={data?.DiscountAmount?.toString() || ""}
          onchange={(v) => handleInputChange("DiscountAmount", v)}
        />
      </View>
      <Scbutton
        onsavepress={emptyView ? addDiscount_Box : updateDiscount_Box}
        oncanclepress={emptyView ? "" : deleteDiscount_Box}
        styles={{ marginVertical: hei(3), gap: wid(1) }}
        backgroundColor={emptyView ? Colors.Black : Colors.Red}
        children={emptyView ? "Cancel" : "Delete"}
      />
    </>
  );
};
