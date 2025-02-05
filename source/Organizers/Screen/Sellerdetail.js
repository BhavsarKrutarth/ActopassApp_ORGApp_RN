import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ARbutton,
  ARcontainer,
  ARheader,
  ARimage,
  ARLoader,
  ARtext,
  ARtextinput,
} from "../../common";
import {
  Colors,
  FontSize,
  FontFamily,
  hei,
  wid,
  normalize,
  height,
  width,
  isIos,
} from "../../theme";
import Images from "../../Image/Images";
import {
  Eventdropdown,
  Inputdata,
  Profilemodal,
  Scbutton,
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

  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Passwordvalidation =
    Fieldvalidation && Validation.issellerpassword(Input.Password);

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

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  useEffect(() => {
    if (selectedEvent.eventId) {
      ticketDetails();
    }
  }, [selectedEvent.eventId]);

  const ticketDetails = async () => {
    fetchTicketDetails(selectedEvent.eventId, setTicketData, setData);
  };

  const ticketTypes = async () => {
    fetchTicketTypes(selectedEvent.eventId, setData);
  };

  const ticketBalance = async (TicketTypeid) => {
    fetchTicketBalance(selectedEvent.eventId, TicketTypeid, setBalance);
  };

  const ticketQtyAdd = async (TicketTypeid, Balance, SellerTicketQty) => {
    addTicketQty(
      selectedEvent.eventId,
      TicketTypeid,
      Balance,
      SellerTicketQty,
      setTicketData,
      setError,
      setShowEmptyView
    );
  };

  const ticketQtyupdate = async (
    SelllerMasterDetailsid,
    TicketTypeid,
    Balance,
    SellerTicketQty
  ) => {
    updateTicketQty(
      SelllerMasterDetailsid,
      selectedEvent.eventId,
      TicketTypeid,
      Balance,
      SellerTicketQty,
      setError
    );
  };

  const ticketQtyDelete = async (SelllerMasterDetailsid) => {
    deleteTicketQty(SelllerMasterDetailsid);
  };

  const renderEmptyView = () => {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => setShowEmptyView(false)}>
          <ARimage
            source={Images.backarrow}
            style={{ width: wid(6), height: wid(6), marginBottom: hei(5) }}
          />
        </TouchableOpacity>
        <View style={[style.inputcontainerview, { marginTop: hei(0) }]}>
          <Inputdata
            txtchildren={"Name"}
            placeholder={"Suvarn Navaratri"}
            inputvalue={selectedEvent.eventName || ""}
            onchange={(v) => console.log(v)}
            editable={false}
          />

          <View style={{ marginVertical: hei(1) }}>
            <ARtext children={"Ticket Type"} align={"left"} />
            <Dropdown
              style={style.dropdown}
              placeholder={
                selectedTicketType ? `Selected: ${selectedTicketType}` : "Event"
              }
              data={data}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={[
                style.placeholderStyle,
                { color: Colors.Black },
              ]}
              labelField="label"
              valueField="value"
              value={selectedTicketType}
              onChange={(item) => {
                if (!ticketType.some((t) => t.TicketTypeid === item.value)) {
                  setTicketType((prev) => [
                    ...prev,
                    {
                      TicketType: item.label,
                      TicketTypeid: item.value,
                    },
                  ]);
                }
                setTicketTypeID(item.value);
                setOpenDropdownIndex(null);
                ticketBalance(item.value);
              }}
            />
          </View>

          <Inputdata
            txtchildren={"Available Ticket"}
            placeholder={"0"}
            inputvalue={
              balance?.Available_balance
                ? String(balance.Available_balance)
                : "0"
            }
            editable={false}
          />
          <Inputdata
            txtchildren="Ticket Qty"
            placeholder="0"
            inputvalue={ticketData.ticketQty}
            onchange={(v) =>
              setTicketData((prev) => ({ ...prev, ticketQty: v }))
            }
          />
        </View>

        {IsError && (
          <ARtext
            color={Colors.Red}
            size={FontSize.font11}
            style={{ paddingTop: hei(1) }}
          >
            {IsError}
          </ARtext>
        )}

        <Scbutton
          onsavepress={() =>
            ticketQtyAdd(
              ticketTypeID,
              balance.Available_balance,
              ticketData.ticketQty
            )
          }
          children={"Cancel"}
          oncanclepress={() => setTicketData("")}
        />
      </React.Fragment>
    );
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
            // backgroundColor: "pink",
          }
        }
        enableAutomaticScroll={isIos ? true : false}
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
              setData([]);
              setTicketData([]);
            }}
            onPressAdd={async () => {
              setError("");
              await ticketTypes();
              setShowEmptyView(true);
            }}
          />

          {ticketData?.length > 0 &&
            ticketType?.map((ticket, index) => (
              <React.Fragment key={index}>
                <View style={[style.inputcontainerview, { marginTop: hei(0) }]}>
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
                          !ticketType.some((t) => t.TicketTypeid === item.value)
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
                    placeholder={
                      ticketData[index]?.Available_balance?.toString() || "0"
                    }
                    inputvalue={""}
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
                {IsError && (
                  <ARtext
                    color={Colors.Red}
                    size={FontSize.font11}
                    style={{ paddingTop: hei(1) }}
                  >
                    {IsError}
                  </ARtext>
                )}
                <Scbutton
                  onsavepress={() =>
                    ticketQtyupdate(
                      ticketData[index]?.SelllerMasterDetailsid,
                      ticket.TicketTypeid,
                      ticketData[index]?.Available_balance,
                      ticketData[index]?.TicketQty
                    )
                  }
                  backgroundColor={Colors.Red}
                  children={"Delete"}
                  oncanclepress={() =>
                    ticketQtyDelete(ticketData[index]?.SelllerMasterDetailsid)
                  }
                />
              </React.Fragment>
            ))}
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
      <Modal
        visible={showEmptyView}
        transparent
        animationType="slide"
        onDismiss={() => setShowEmptyView(false)}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>{renderEmptyView()}</View>
        </View>
      </Modal>
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
