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
  TextInput,
  Alert,
  ActivityIndicator,
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
import {
  AddDiscount_Box,
  DeleteDiscount_Box,
  editboxdata,
  GetDiscount_Box,
  UpdateDiscount_Box,
} from "../../api/Api";
import LottieView from "lottie-react-native";

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
  const [isLoading, SetIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState({
    Code,
    Name,
    EmailId,
    Password,
    MobileNo,
    selectedImage: {
      base64: "",
      imageUri: PHOTOPATH,
      filename: "",
    },
    setmodel: false,
  });
  const [Input, SetInput] = useState({ ...originalData });
  const [data, setData] = useState([]);
  const [isError, setError] = useState("");
  const [emptyView, setEmptyView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    eventName: "",
    eventId: "",
  });
  
  const [modalInput, setModalInput] = useState({
    ToAmount: "",
    FromAmount: "",
    DiscountAmount: "",
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
        console.log(response);
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
        if (response.ResponseCode === "0") {
          SetLoading(false);
          setfieldvalidation(false);
          Setsuccesmodal(true);
          setOriginalData({
            Code: response.Code,
            Name: response.Name,
            EmailId: response.EmailId,
            Password: response.Password,
            MobileNo: response.MobileNo,
            selectedImage: {
              base64: "",
              imageUri: response.PHOTOPATH,
              filename: "",
            },
            setmodel: false,
          });
          SetInput({
            Code: response.Code,
            Name: response.Name,
            EmailId: response.EmailId,
            Password: response.Password,
            MobileNo: response.MobileNo,
            selectedImage: {
              base64: "",
              imageUri: response.PHOTOPATH,
              filename: "",
            },
            setmodel: false,
          });
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
    SetIsLoading(true);
    try {
      const response = await GetDiscount_Box(
        BoxofficeUserId,
        selectedEvent.eventId
      );
      setData(response);
    } catch (error) {
    } finally {
      SetIsLoading(false);
    }
  };

  const addDiscount_Box = async () => {
    try {
      const response = await AddDiscount_Box(
        modalInput,
        BoxofficeUserId,
        selectedEvent.eventId
      );
      if (response.ResponseCode == 0) {
        setData((prevData) => [...prevData, response]);
        setError([]);
        Alert.alert("Discount data has been successfully added");
        setEmptyView(false);
      } else if (response.ResponseCode == -1) {
        setError(
          "Invalid range: The specified 'From Amount' and 'To Amount' overlap with an existing entry. Please adjust the values to avoid conflicts."
        );
      }
    } catch (error) {}
  };

  const updateDiscount_Box = async (index, setOriginalData) => {
    try {
      const response = await UpdateDiscount_Box(
        data[index],
        selectedEvent.eventId
      );
      if (response.ResponseCode == 0) {
        setError([]);
        setOriginalData((prev) => ({
          ...prev,
          [index]: { ...data[index] },
        }));
        Setsuccesmodal(true);
      } else {
        const updatedErrors = [...isError];
        updatedErrors[index] =
          "Invalid range: The specified 'From Amount' and 'To Amount' overlap with an existing entry. Please adjust the values to avoid conflicts.";
        setError(updatedErrors);
      }
    } catch (error) {}
  };

  const deleteDiscount_Box = async (index) => {
    try {
      const response = await DeleteDiscount_Box(
        data[index].BoxOfficeDiscountid
      );
      if (response)
        setData((prevData) => prevData.filter((_, idx) => idx !== index));
    } catch (error) {}
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
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={false} 
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={Platform.OS === "ios" ? 0 : 0} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} 
        enableResetScrollToCoords={false}
      >
        <View style={style.containerview}>
          <Uploadphoto
            oneditpress={() => {
              SetInputdisable(!Inputdisable);
              SetInput({ ...originalData });
              if (Inputdisable) {
                setfieldvalidation(false);
              }
            }}
            editicontrue={true}
            // Imagedata={Input.selectedImage.imageUri}
            // Addphotoicon={Inputdisable}
            onpress={() => SetInput((pre) => ({ ...pre, setmodel: true }))}
            maintext={Code}
            subtext={'Manage boxoffice credentials and assigned tickets.'}
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
            onsavepress={() => {
              editseller(
                BoxofficeUserId,
                OrganizerLoginid,
                Input.Password,
                Input.Name,
                MobileNo,
                EmailId,
                Input.selectedImage.base64
              );
            }}
            disabled={!Inputdisable}
            canceldisabled={!Inputdisable}
            oncanclepress={() => SetInput({ ...originalData })}
          />
          <Eventdropdown
            eventDataLength={data.length}
            eventpress={() => console.log("Event Pressed")}
            onSelectEvent={(eventName, eventId) =>
              setSelectedEvent({ eventName, eventId })
            }
            onPressAdd={() => {
              setEmptyView(true);
              setError("");
            }}
            allTicketTypesExist={selectedEvent.eventId != "" && true}
          />
          {data?.map((item, index) => (
            <DiscountInputView
              isError={isError}
              key={item.BoxOfficeDiscountid}
              data={data}
              setData={setData}
              addDiscount_Box={addDiscount_Box}
              updateDiscount_Box={updateDiscount_Box}
              deleteDiscount_Box={deleteDiscount_Box}
              emptyView={emptyView}
              eventName={selectedEvent.eventName}
              index={index}
            />
          ))}
          {isLoading && (
            <LottieView
              source={Images.loader}
              autoPlay
              loop
              style={{ height: hei(5), width: hei(5), alignSelf: "center" }}
            />
          )}
          {!isLoading && selectedEvent.eventId && data == "" && (
            <ARtext
              size={FontSize.font14}
              fontFamily={FontFamily.SemiBold}
              children={"No data found."}
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
      <Modal
        visible={emptyView}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setEmptyView(false);
        }}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setError([]);
                setEmptyView(false);
                getDiscount_Box();
              }}
            >
              <ARimage source={Images.backarrow} style={style.icon} />
            </TouchableOpacity>
            <DiscountInputView
              isError={isError}
              data={Array.isArray(modalInput) ? modalInput : []}
              setData={setModalInput}
              addDiscount_Box={addDiscount_Box}
              updateDiscount_Box={updateDiscount_Box}
              deleteDiscount_Box={deleteDiscount_Box}
              emptyView={emptyView}
              eventName={selectedEvent.eventName}
              index={""}
              setEmptyView={setEmptyView}
            />
          </View>
        </View>
      </Modal>

      <Responsemodal
        visible={Successmodal}
        onpress={() => Setsuccesmodal(false)}
        message={"Data has been edited successfully"}
        subtext={"!Oh Yeah"}
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
    paddingBottom:hei(1),
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
  icon: {
    width: wid(6),
    height: wid(6),
    marginBottom: hei(4),
  },
});

const DiscountInputView = ({
  isError,
  data,
  setData,
  addDiscount_Box,
  updateDiscount_Box,
  deleteDiscount_Box,
  emptyView,
  eventName,
  index,
  setEmptyView,
}) => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [originalData, setOriginalData] = useState({});

  if (!data) {
    return <Text>No data available</Text>;
  }

  const handleInputChange = useCallback(
    (field, value) => {
      setData((prevData) =>
        Array.isArray(prevData)
          ? prevData.map((item, idx) =>
              idx === index ? { ...item, [field]: value } : item
            )
          : { ...prevData, [field]: value }
      );
    },
    [index, setData]
  );

  const inputFields = [
    { label: "To Amount", field: "ToAmount", placeholder: "10" },
    { label: "From Amount", field: "FromAmount", placeholder: "100" },
    { label: "Discount", field: "DiscountAmount", placeholder: "10" },
  ];

  return (
    <>
      <View style={[style.inputcontainerview, { marginTop: hei(1) }]}>
        {!emptyView && (
          <ARbutton
            Touchstyle={{
              height: hei(1.5),
              width: hei(1.5),
              position: "absolute",
              top: hei(1.5),
              right: hei(1.5),
            }}
            backgroundColor={""}
            onpress={() => {
              if (editableIndex !== index) {
                setOriginalData((prev) => ({
                  ...prev,
                  [index]: { ...data[index] },
                }));
              } else {
                setData((prevData) =>
                  prevData.map((item, idx) =>
                    idx === index ? originalData[index] || item : item
                  )
                );
              }
              setEditableIndex(editableIndex === index ? null : index);
            }}
          >
            <ARimage
              source={Images.edit}
              style={{ height: hei(2), width: hei(2) }}
            />
          </ARbutton>
        )}
        <Inputdata
          txtchildren={"Name"}
          placeholder={"Actoscript"}
          inputvalue={emptyView ? eventName : data[index]?.EventName || ""}
          editable={false}
          color={Colors.Placeholder}
        />
        {inputFields.map(({ label, field, placeholder }) => (
          <Inputdata
            key={field}
            txtchildren={label}
            placeholder={placeholder}
            inputvalue={
              emptyView ? data[field] : data[index]?.[field]?.toString() || ""
            }
            onchange={(text) => handleInputChange(field, text)}
            editable={emptyView ? true : editableIndex === index}
            color={
              !emptyView
                ? editableIndex === index
                  ? Colors.Black
                  : Colors.Placeholder
                : Colors.Black
            }
          />
        ))}
      </View>
      {emptyView ? (
        isError ? (
          <ARtext
            style={{ paddingVertical: hei(1), paddingHorizontal: wid(3) }}
            color={Colors.Red}
            size={FontSize.font11}
            fontFamily={FontFamily.Light}
          >
            {isError}
          </ARtext>
        ) : null
      ) : (
        isError[index] && (
          <ARtext
            style={{ paddingVertical: hei(1), paddingHorizontal: wid(3) }}
            color={Colors.Red}
            size={FontSize.font11}
            fontFamily={FontFamily.Light}
          >
            {isError[index]}
          </ARtext>
        )
      )}
      <Scbutton
        onsavepress={() => {
          emptyView
            ? addDiscount_Box(index)
            : updateDiscount_Box(index, setOriginalData);
        }}
        oncanclepress={() =>
          emptyView ? setEmptyView(false) : deleteDiscount_Box(index)
        }
        styles={{ marginVertical: hei(3), gap: wid(1) }}
        backgroundColor={emptyView ? Colors.Black : Colors.Red}
        disabled={!emptyView ? (editableIndex === index ? false : true) : false}
      >
        {emptyView ? "Cancel" : "Delete"}
      </Scbutton>
    </>
  );
};
