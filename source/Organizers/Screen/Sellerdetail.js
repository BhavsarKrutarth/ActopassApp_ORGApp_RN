import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ARcontainer, ARheader, ARimage, ARLoader, ARtext } from "../../common";
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
import { editsellerdata, TicketBalance, TicketType } from "../../api/Api";
import {
  addTicketQty,
  deleteTicketQty,
  fetchTicketDetails,
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
  const [selectedEvent, setSelectedEvent] = useState({
    eventName: "",
    eventId: "",
  });
  const [ticketType, setTicketType] = useState([]);
  const [IsError, setError] = useState("");
  const [emptyView, setEmptyView] = useState(false);
  const [Successmodal, Setsuccesmodal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const scrollViewRef = useRef(null);
  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Passwordvalidation =
    Fieldvalidation && Validation.issellerpassword(Input.Password);
  const validate =
    !Validation.isName(Input.Name) &&
    !Validation.issellerpassword(Input.Password);
  const [allTicketTypesExist, setAllTicketTypesExist] = useState([]);
  console.log(allTicketTypesExist == "" ? false : true);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: hei(8),
      height: hei(8),
      cropping: true,
      includeBase64: true,
    })
      .then((response) => {
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
    SelllerLoginid,
    OrganizerLoginid,
    Password,
    Name,
    MobileNo,
    EmailId,
    Image
  ) => {
    setfieldvalidation(true);
    console.log(Image);
    
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
          console.log(response);
          SetLoading(false);
          setfieldvalidation(false);
        }
      }
    } catch (error) {
      SetLoading(false);
      setfieldvalidation(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedEvent.eventId) {
        await ticketDetails();
        await fetchTicketData();
        if (data) {
          setAllTicketTypesExist([]);
          const unavailableTickets = ticketType.filter(
            (ticket) =>
              Array.isArray(data) &&
              !data.some((item) => item.TicketType === ticket.label)
          );
          setAllTicketTypesExist(unavailableTickets);
        }
      }
    })();
  }, [selectedEvent.eventId, ticketQtyDelete]);

  const ticketDetails = async () => {
    fetchTicketDetails(SelllerLoginid, selectedEvent.eventId, setData);
  };

  const fetchTicketData = async () => {
    try {
      const ticketTypesResponse = await TicketType(selectedEvent.eventId);
      if (!ticketTypesResponse) return;
      const updatedTicketTypes = await Promise.all(
        ticketTypesResponse.map(
          async ({ TicketType, EventMaster_TicketTypeid }) => ({
            label: TicketType,
            value: EventMaster_TicketTypeid,
            Balance:
              (
                await TicketBalance(
                  SelllerLoginid,
                  selectedEvent.eventId,
                  EventMaster_TicketTypeid
                )
              )?.Available_balance || 0,
          })
        )
      );
      setTicketType(updatedTicketTypes);
    } catch (error) {}
  };

  const ticketQtyAdd = async (TicketTypeid, Balance, SellerTicketQty) => {
    await addTicketQty(
      SelllerLoginid,
      selectedEvent.eventId,
      TicketTypeid,
      Balance,
      SellerTicketQty,
      setError,
      setEmptyView
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
        setData,
        setError,
        IsError,
        index
      );
    } catch (error) {}
  };

  if (Loading) return <ARLoader visible={Loading} />;

  return (
    <ARcontainer backgroundColors={Colors.backgroundcolor} color={Colors.backgroundcolor}>
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
            oneditpress={() => {
              SetInputdisable(!Inputdisable);
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
              });
            }}
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
            disabled={!Inputdisable}
            canceldisabled={!Inputdisable}
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
            eventDataLength={data.length}
            onSelectEvent={(eventName, eventId) => {
              setSelectedEvent({ eventName, eventId });
            }}
            eventpress={() => {
              setData([]);
            }}
            onPressAdd={async () => {
              setError("");
              setEmptyView(true);
            }}
            allTicketTypesExist={allTicketTypesExist == "" ? false : true}
          />

          <InputView
            data={data}
            setData={setData}
            IsError={IsError}
            ticketType={ticketType}
            ticketQtyAdd={ticketQtyAdd}
            ticketQtyupdate={ticketQtyupdate}
            ticketQtyDelete={ticketQtyDelete}
            emptyView={emptyView}
            setEmptyView={setEmptyView}
            eventName={selectedEvent.eventName}
            setSelectedTicket={setSelectedTicket}
            selectedTicket={selectedTicket}
          />
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
              }}
            >
              <ARimage source={Images.backarrow} style={style.icon} />
            </TouchableOpacity>
            <InputView
              data={data}
              setData={setData}
              IsError={IsError}
              ticketType={ticketType}
              ticketQtyAdd={ticketQtyAdd}
              ticketQtyupdate={ticketQtyupdate}
              ticketQtyDelete={ticketQtyDelete}
              emptyView={emptyView}
              setEmptyView={setEmptyView}
              eventName={selectedEvent.eventName}
              setSelectedTicket={setSelectedTicket}
              selectedTicket={selectedTicket}
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

const InputView = ({
  data,
  setData,
  IsError,
  ticketType,
  ticketQtyAdd,
  ticketQtyupdate,
  ticketQtyDelete,
  emptyView,
  setEmptyView,
  eventName,
  setSelectedTicket,
  selectedTicket,
}) => {
  const isSaveDisabled =
    Array.isArray(data) &&
    data.some((ticket) => !ticket?.TicketQty || ticket.TicketQty <= 0);

  const unavailableTickets = ticketType.filter(
    (ticket) =>
      Array.isArray(data) &&
      !data.some((item) => item.TicketType === ticket.label)
  );
  return (
    <>
      {!emptyView ? (
        data?.map(
          (item, index) =>
            item?.isVisible !== false && (
              <View key={index}>
                <View style={[style.inputcontainerview, { marginTop: hei(0) }]}>
                  <Inputdata
                    txtchildren="Name"
                    placeholder="Suvarn Navaratri"
                    inputvalue={item?.EventName || ""}
                    editable={false}
                  />
                  <Inputdata
                    txtchildren="Ticket Type"
                    placeholder="Suvarn Navaratri"
                    inputvalue={item?.TicketType || ""}
                    editable={false}
                  />
                  <Inputdata
                    txtchildren="Available Ticket"
                    placeholder="0"
                    inputvalue={item?.Available_balance?.toString() || "0"}
                    editable={false}
                  />
                  <Inputdata
                    txtchildren="Ticket Qty"
                    placeholder="0"
                    inputvalue={item?.TicketQty}
                    onchange={(v) =>
                      setData((prev) => {
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
                    {IsError[index]}
                  </ARtext>
                )}

                <Scbutton
                  onsavepress={() =>
                    ticketQtyupdate(
                      index,
                      item?.SelllerMasterDetailsid,
                      ticketType[index]?.value,
                      item?.Available_balance,
                      item?.TicketQty
                    )
                  }
                  backgroundColor={Colors.Red}
                  children="Delete"
                  oncanclepress={() =>
                    ticketQtyDelete(item?.SelllerMasterDetailsid, index)
                  }
                  disabled={!item?.TicketQty || item?.TicketQty <= 0}
                />
              </View>
            )
        )
      ) : (
        <View>
          <View style={[style.inputcontainerview, { marginTop: hei(0) }]}>
            <Inputdata
              txtchildren="Name"
              placeholder="Suvarn Navaratri"
              inputvalue={eventName || ""}
              editable={false}
            />
            <View style={{ marginVertical: hei(1) }}>
              <ARtext children={"Ticket Type"} align={"left"} />
              <Dropdown
                style={style.dropdown}
                data={unavailableTickets}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={[
                  style.placeholderStyle,
                  { color: Colors.Black },
                ]}
                labelField="label"
                valueField="value"
                value={selectedTicket?.value}
                onChange={(selectedItem) => {
                  setSelectedTicket(selectedItem);
                }}
              />
            </View>
            <Inputdata
              txtchildren="Available Ticket"
              placeholder="0"
              inputvalue={selectedTicket?.Balance.toString() || "0"}
              editable={false}
            />

            <Inputdata
              txtchildren="Ticket Qty"
              placeholder="0"
              inputvalue={data[0]?.TicketQty?.toString() || ""}
              onchange={(v) =>
                setData((prev) => {
                  const newData = [...prev];
                  newData[0] = { ...(newData[0] || {}), TicketQty: v };
                  return newData;
                })
              }
            />
          </View>
          {IsError.length > 0 && (
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
              ticketQtyAdd(
                selectedTicket?.value,
                selectedTicket?.Balance,
                data[0]?.TicketQty
              )
            }
            children="Cancel"
            oncanclepress={() => {
              setEmptyView(true);
            }}
            disabled={isSaveDisabled}
          />
        </View>
      )}
    </>
  );
};
