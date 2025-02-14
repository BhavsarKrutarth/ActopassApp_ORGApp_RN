import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ARcontainer, ARheader, ARLoader, ARtext } from "../../common";
import {
  Colors,
  FontSize,
  FontFamily,
  hei,
  wid,
  normalize,
  isIos,
} from "../../theme";
import Images from "../../Image/Images";
import {
  Eventdropdown,
  Inputdata,
  Profilemodal,
  Responsemodal,
  Scbutton,
  TicketModal,
  Uploadphoto,
} from "../../Commoncompoenent";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import { Validation } from "../../utils";
import { editsellerdata } from "../../api/Api";
import {
  addTicketQty,
  deleteTicketQty,
  fetchTicketBalance,
  fetchTicketDetails,
  fetchTicketTypes,
  updateTicketQty,
} from "./SellerHelper";
import { Dropdown } from "react-native-element-dropdown";

const Sellerdetail = ({ route }) => {
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
    SelllerLoginid,
  } = route.params.data;

  const [Inputdisable, SetInputdisable] = useState(false);
  const [Fieldvalidation, setfieldvalidation] = useState(false);
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
  const [data, setData] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({
    eventName: "",
    eventId: "",
  });
  const [ticketType, setTicketType] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [IsError, setError] = useState("");
  const [showEmptyView, setShowEmptyView] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [balance, setBalance] = useState({});
  const [ticketTypeID, setTicketTypeID] = useState("");
  const [Successmodal, Setsuccesmodal] = useState(false);
  const scrollViewRef = useRef(null);
  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Passwordvalidation =
    Fieldvalidation && Validation.issellerpassword(Input.Password);
  const validate =
    !Validation.isName(Input.Name) &&
    !Validation.issellerpassword(Input.Password);

  useEffect(() => {
    if (openDropdownIndex !== null && scrollViewRef.current) {
      if (scrollViewRef.current.scrollTo) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }, [openDropdownIndex]);

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
    SelllerLoginid,
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
        const response = await editsellerdata(
          SelllerLoginid,
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

  useEffect(() => {
    if (data.length > 0) {
      setTicketType([
        { TicketType: data[0]?.label, TicketTypeid: data[0]?.value },
      ]);
    }
  }, [data]);

  useEffect(() => {}, [balance]);

  useEffect(() => {
    if (selectedEvent.eventId) {
      ticketDetails();
    }
  }, [selectedEvent.eventId]);

  const ticketDetails = async () => {
    fetchTicketDetails(
      SelllerLoginid,
      selectedEvent.eventId,
      setTicketData,
      setData
    );
  };

  const ticketTypes = async () => {
    fetchTicketTypes(selectedEvent.eventId, setData);
  };

  const ticketBalance = async (TicketTypeid) => {
    fetchTicketBalance(
      SelllerLoginid,
      selectedEvent.eventId,
      TicketTypeid,
      setBalance
    );
  };

  const ticketQtyAdd = async (TicketTypeid, Balance, SellerTicketQty) => {
    await addTicketQty(
      SelllerLoginid,
      selectedEvent.eventId,
      TicketTypeid,
      Balance,
      SellerTicketQty,
      setError,
    );
  };

  const ticketQtyupdate = async (
    index,
    SelllerMasterDetailsid,
    TicketTypeid,
    Balance,
    SellerTicketQty
  ) => {
    updateTicketQty(
      SelllerLoginid,
      index,
      SelllerMasterDetailsid,
      selectedEvent.eventId,
      TicketTypeid,
      Balance,
      SellerTicketQty,
      setError,
      IsError,
      Setsuccesmodal
    );
  };

  const ticketQtyDelete = async (SelllerMasterDetailsid, index) => {
    try {
      await deleteTicketQty(
        SelllerMasterDetailsid,
        setTicketData,
        setError,
        IsError,
        index
      );
    } catch (error) {
      console.log("Error deleting ticket:", error);
    }
  };

  if (Loading) return <ARLoader visible={Loading} />;

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Sellers Details"}
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
            // your existing styles
          }
        }
        ref={scrollViewRef}
        enableAutomaticScroll={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
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
              placeholder={"abc@gmail.com"}
              inputvalue={Input.EmailId}
              // onchange={v => console.log(v)}
              editable={false}
              color={Colors.Placeholder}
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
              placeholder={"012589632584"}
              inputvalue={Input.MobileNo}
              // onchange={v => console.log(v)}
              editable={false}
              color={Colors.Placeholder}
            />
          </View>

          <Scbutton
            onsavepress={() =>
              editseller(
                SelllerLoginid,
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
            onSelectEvent={(eventName, eventId) => {
              setSelectedEvent({ eventName, eventId });
            }}
            eventpress={() => {
              setTicketData([]);
            }}
            onPressAdd={async () => {
              setError("");
              await ticketTypes();
              setShowEmptyView(true);
            }}
          />

          {ticketData?.length > 0 &&
            ticketType?.map(
              (ticket, index) =>
                ticketData[index]?.isVisible !== false && (
                  <View key={index}>
                    <View
                      style={[style.inputcontainerview, { marginTop: hei(0) }]}
                    >
                      <Inputdata
                        txtchildren={"Name"}
                        placeholder={"Suvarn Navaratri"}
                        inputvalue={ticketData[index]?.EventName || ""}
                        onchange={(v) => console.log(v)}
                        editable={false}
                      />
                      <View style={{ marginVertical: hei(1) }}>
                        <ARtext children={"Ticket Type"} align={"left"} />
                        <Dropdown
                          style={style.dropdown}
                          placeholder={ticket.TicketType}
                          data={data}
                          placeholderStyle={style.placeholderStyle}
                          selectedTextStyle={[
                            style.placeholderStyle,
                            { color: Colors.Black },
                          ]}
                          inverted={false}
                          labelField="label"
                          valueField="value"
                          value={ticket.TicketTypeid}
                          isFocus={openDropdownIndex === index}
                          onFocus={() => setOpenDropdownIndex(index)}
                          onBlur={() => setOpenDropdownIndex(null)}
                          onChange={(item) => {
                            if (
                              !ticketType.some(
                                (t) => t.TicketTypeid === item.value
                              )
                            ) {
                              setTicketType((prev) => [
                                ...prev,
                                {
                                  TicketType: item.label,
                                  TicketTypeid: item.value,
                                },
                              ]);
                            }
                            setOpenDropdownIndex(null);
                          }}
                        />
                      </View>
                      <Inputdata
                        txtchildren={"Available Ticket"}
                        placeholder={"0"}
                        inputvalue={
                          ticketData[index]?.Available_balance?.toString() ||
                          "0"
                        }
                        onchange={(v) =>
                          setTicketData((prev) => ({
                            ...prev,
                            Available_balance: v,
                          }))
                        }
                        editable={false}
                      />
                      <Inputdata
                        txtchildren={"Ticket Qty"}
                        placeholder={"0"}
                        inputvalue={ticketData[index]?.TicketQty || 0}
                        onchange={(v) =>
                          setTicketData((prev) => {
                            const newTicketData = [...prev];
                            newTicketData[index] = {
                              ...newTicketData[index],
                              TicketQty: v,
                            };
                            return newTicketData;
                          })
                        }
                      />
                    </View>
                    {IsError[index] && (
                      <ARtext
                        style={{
                          paddingVertical: hei(1),
                          paddingHorizontal: wid(3),
                        }}
                        color={Colors.Red}
                        size={FontSize.font11}
                        fontFamily={FontFamily.Light}
                      >
                        {IsError}
                      </ARtext>
                    )}
                    <Scbutton
                      onsavepress={() =>
                        ticketQtyupdate(
                          index,
                          ticketData[index]?.SelllerMasterDetailsid,
                          ticket.TicketTypeid,
                          ticketData[index]?.Available_balance,
                          ticketData[index]?.TicketQty
                        )
                      }
                      backgroundColor={Colors.Red}
                      children={"Delete"}
                      oncanclepress={() => {
                        ticketQtyDelete(
                          ticketData[index]?.SelllerMasterDetailsid,
                          index
                        );
                      }}
                    />
                  </View>
                )
            )}
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
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
      <TicketModal
        data={data}
        showEmptyView={showEmptyView}
        setShowEmptyView={setShowEmptyView}
        selectedEvent={selectedEvent.eventName}
        ticketData={ticketData}
        setTicketData={setTicketData}
        ticketType={ticketType}
        setTicketType={setTicketType}
        setTicketTypeID={setTicketTypeID}
        ticketBalance={ticketBalance}
        ticketQtyAdd={ticketQtyAdd}
        IsError={IsError}
        setError={setError}
        selectedTicketType={selectedTicketType}
        balance={balance?.Available_balance}
        ticketTypeID={ticketTypeID}
      />
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

export default Sellerdetail;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor:Colors.Placeholder,
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
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor:"red",
    marginBottom: hei(1),
  },
  codeview: {
    width: wid(41),
    justifyContent: "center",
    // backgroundColor:"yellow"
  },
  imageview: {
    flexDirection: "row",
    // backgroundColor:"green",
    width: wid(20.5),
    justifyContent: "flex-end",
    columnGap: wid(3),
  },
  imagestyle: {
    height: hei(2),
    width: hei(2),
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: Colors.backgroundcolor,
    borderWidth: 1,
    borderRadius: normalize(6),
    borderColor: Colors.bordercolor,
    height: hei(4.5),
    paddingHorizontal: wid(3),
  },
  placeholderStyle: {
    fontSize: FontSize.font13,
    fontFamily: FontFamily.Regular,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: wid(100),
    height: hei(100),
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    paddingTop: hei(10),
  },
  closeButton: {
    backgroundColor: Colors.Black,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
