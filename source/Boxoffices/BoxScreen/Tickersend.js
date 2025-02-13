import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ARbutton,
  ARcontainer,
  ARheader,
  ARimage,
  ARlineargradient,
  ARtext,
} from "../../common";
import {
  Colors,
  FontFamily,
  FontSize,
  hei,
  height,
  isIos,
  normalize,
  wid,
} from "../../theme";
import { useNavigation } from "@react-navigation/native";
import Images from "../../Image/Images";
import { Inputdata, Ticketquantitiy } from "../../Commoncompoenent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import {
  SEL_EventDate,
  SEL_TicketBook,
  SEL_TicketType,
  SEL_UpComingEvents,
} from "../../api/Api";
import { useSelector } from "react-redux";

const Ticketsend = () => {
  const navigation = useNavigation();
  const { AsyncValue } = useSelector((state) => state.Auth);
  const [event, setEvent] = useState([]);
  const [date, setDate] = useState([]);
  const [isDisable, setDisable] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [Tickets, setTickets] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [input, setInput] = useState({
    name: "",
    mobileNo: "",
    confirmMobileNo: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [QTYdata, SetQTYdata] = useState([]);
  const [TotalQty, SetToatalQty] = useState({
    TQTY: 0,
    TPRICE: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SEL_UpComingEvents(AsyncValue.SellerLoginId);
        console.log("response event", response);
        if (!response?.length) setDisable(true);
        setEvent(
          response.map(({ EventName, EventMasterid }) => ({
            label: EventName,
            value: EventMasterid,
          })) || []
        );
      } catch (error) {}
    };
    fetchData();
  }, []);

  const fetchEventDate = useCallback(async () => {
    if (!selectedValue) return;
    try {
      const dateResponse = await SEL_EventDate(selectedValue.value);
      setDate(
        dateResponse.map(({ EVENTDATE, DISPLAYDATE }) => ({
          label: DISPLAYDATE,
          value: EVENTDATE,
        }))
      );
      const TicketType = await SEL_TicketType(
        selectedValue.value,
        AsyncValue.SellerLoginId
      );
      setTickets(TicketType);
    } catch (error) {}
  }, [selectedValue]);

  useEffect(() => {
    fetchEventDate();
  }, [fetchEventDate]);

  useEffect(() => {
    let totalprice = 0;
    let totqty = 0;
    for (let i = 0; i < QTYdata.length; i++) {
      totalprice += QTYdata[i].QTY * QTYdata[i].Price;
      totqty += QTYdata[i].QTY;
    }
    SetToatalQty({
      TQTY: totqty,
      TPRICE: totalprice,
    });
  }, [QTYdata]);

  const increaseQTY = (v) => {
    if (QTYdata.length === 0) {
      SetQTYdata([v]);
    } else {
      let newdata = {};
      for (let i = 0; i < QTYdata.length; i++) {
        if (QTYdata[i].TicketType === v.TicketType) {
          SetQTYdata((prev) =>
            prev.map((item) =>
              item.TicketType == QTYdata[i].TicketType
                ? { ...QTYdata[i], QTY: v.QTY }
                : item
            )
          );
          return;
        } else {
          newdata = v;
        }
      }
      SetQTYdata((prev) => [...prev, newdata]);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!input.name.trim()) {
      errors.name = "Please enter your name.";
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!input.mobileNo) {
      errors.mobileNo = "Please enter your mobile number.";
    } else if (!mobileRegex.test(input.mobileNo)) {
      errors.mobileNo = "Please enter a valid 10-digit mobile number.";
    }
    if (!input.confirmMobileNo) {
      errors.confirmMobileNo = "Please confirm your mobile number.";
    } else if (input.mobileNo !== input.confirmMobileNo) {
      errors.confirmMobileNo =
        "Mobile number and confirm mobile number do not match.";
    }
    if (!input.remark.trim()) {
      errors.remark = "Please enter your remark.";
    } else if (input.remark && input.remark.length > 200) {
      errors.remark = "Remark is too long. Please limit it to 200 characters.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTicketBook = async () => {
    if (!validateForm()) return;
    const ticketTypes = QTYdata.map((item) => ({
      SelllerMasterDetailsid: item.SelllerMasterDetailsid,
      SelllerLoginid: AsyncValue.SellerLoginId,
      Eventmasterid: selectedValue.value,
      Eventdate: value,
      Bookingticketqty: item.QTY,
      Bookingamount: item.QTY * item.Price,
      Eventmaster_tickettypeid: item.EventMaster_TicketTypeid,
      Tickettype: item.TicketType,
    }));
    try {
      const response = await SEL_TicketBook(
        AsyncValue.SellerLoginId,
        input.mobileNo,
        TotalQty.TQTY,
        TotalQty.TPRICE,
        selectedValue.value,
        input.name,
        input.remark,
        input.confirmMobileNo,
        value,
        ticketTypes
      );
      if (response) {
        setInput({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <View>
        <ARlineargradient>
          <ARheader
            texts={"ERP system"}
            size={FontSize.font17}
            textcolor={Colors.White}
            textfontfamily={FontFamily.SemiBold}
          />
        </ARlineargradient>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: hei(10) }}
        enableAutomaticScroll={isIos ? true : false} // Prevent automatic scroll behavior
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0} // Prevent extra space from being added when the keyboard opens
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust for platform-specific behavior
      >
        <View style={styles.heightview}>
          <View style={styles.shadowview}>
            <View style={styles.secview}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={[
                  styles.textStyle,
                  { color: isDisable ? Colors.inactive : Colors.Black },
                ]}
                selectedTextStyle={styles.textStyle}
                iconStyle={[
                  styles.iconStyle,
                  { tintColor: isDisable ? Colors.inactive : Colors.Black },
                ]}
                showsVerticalScrollIndicator={false}
                containerStyle={styles.ContainerStyle}
                data={event}
                disable={isDisable}
                maxHeight={230}
                labelField="label"
                valueField="value"
                placeholder="Event"
                onChange={(item) => {
                  setSelectedValue(item);
                  const eventLocation = item.label.split(" - ");
                  if (eventLocation.length > 1) {
                    setSelectedLocation(eventLocation[1]);
                  } else {
                    setSelectedLocation("");
                  }
                }}
                renderLeftIcon={() => (
                  <ARimage
                    source={Images.event}
                    style={styles.eventimage}
                    tintColor={isDisable ? Colors.inactive : Colors.Black}
                  />
                )}
              />
            </View>
            <View style={styles.container}>
              <View style={styles.dashview}>
                <View>
                  <ARtext
                    size={FontSize.font16}
                    fontFamily={FontFamily.Bold}
                    children={"Dashboard"}
                    align={""}
                  />
                  <ARtext
                    size={FontSize.font14}
                    children={"Seller Interface"}
                    align={""}
                    color={Colors.Text}
                  />
                </View>
                {/* <View style={styles.profileimageview}>
                  <ARimage
                    source={Images.exa}
                    style={styles.profileimage}
                    resizemode={"stretch"}
                  />
                </View> */}
              </View>
              {/* <View style={styles.location}>
                <ARtext
                  children={"Location"}
                  align={""}
                  size={FontSize.font12}
                  color={Colors.Text}
                />
              </View> */}
              <View style={styles.eventndetailview}>
                <ARtext size={FontSize.font13}>
                  Event ID: {""}
                  <ARtext
                    children={selectedValue?.value || ""}
                    size={FontSize.font14}
                    fontFamily={FontFamily.SemiBold}
                    align={""}
                  />
                </ARtext>
                {/* <ARtext
                  children={"Surat"}
                  size={FontSize.font14}
                  color={Colors.Placeholder}
                  align={""}
                /> */}
              </View>
              <View style={styles.eventname}>
                <ARtext size={FontSize.font13} align={""}>
                  Event Name: {""}
                  <ARtext
                    children={selectedValue?.label || ""}
                    size={FontSize.font14}
                    fontFamily={FontFamily.SemiBold}
                    align={""}
                  />
                </ARtext>
              </View>
              {/* <ARbutton Touchstyle={styles.ticketupload}>
                <ARimage
                  source={Images.ticket}
                  style={styles.tiketimage}
                  tintColor={Colors.White}
                />
                <ARtext
                  children={"BULK TICKETS UPLOAD"}
                  size={FontSize.font12}
                  align={""}
                  color={Colors.White}
                  fontFamily={FontFamily.Bold}
                />
              </ARbutton> */}
            </View>
          </View>
        </View>

        <View style={styles.inputcontainerview}>
          <Inputdata
            txtchildren={"Name"}
            placeholder={"Enter Your Name"}
            inputvalue={input.name}
            onchange={(v) => setInput((prev) => ({ ...prev, name: v }))}
            errormessage={errors.name}
            err={errors.name}
          />
          <Inputdata
            txtchildren={"Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={input.mobileNo}
            onchange={(v) => setInput((prev) => ({ ...prev, mobileNo: v }))}
            errormessage={errors.mobileNo}
            err={errors.mobileNo}
          />
          <Inputdata
            txtchildren={"Confirm Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={input.confirmMobileNo}
            onchange={(v) =>
              setInput((prev) => ({ ...prev, confirmMobileNo: v }))
            }
            errormessage={errors.confirmMobileNo}
            err={errors.confirmMobileNo}
          />
          <Inputdata
            txtchildren={"Remark"}
            placeholder={"Enter your remark"}
            inputvalue={input.remark}
            onchange={(v) => setInput((prev) => ({ ...prev, remark: v }))}
            errormessage={errors.remark}
            err={errors.remark}
          />
          <View style={{ gap: hei(0.5), marginVertical: hei(1) }}>
            <ARtext
              children={"Select Date"}
              align={"left"}
              size={FontSize.font14}
            />
            <Dropdown
              style={styles.datePicker}
              placeholderStyle={{
                fontSize: FontSize.font12,
                color: Colors.lable,
              }}
              selectedTextStyle={{
                fontSize: FontSize.font12,
                fontFamily: FontFamily.Regular,
              }}
              iconStyle={[styles.iconStyle, { tintColor: Colors.Black }]}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.ContainerStyle}
              data={date}
              maxHeight={230}
              labelField="label"
              valueField="value"
              placeholder="Enter date"
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          {/* <Inputdata
            txtchildren={"Select Date"}
            placeholder={"Enter Date"}
            inputvalue={""}
            onchange={(v) => console.log(v)}
          /> */}
        </View>

        <View style={styles.ticketdetail}>
          <ARtext
            children={"Loream Pique"}
            align={""}
            size={FontSize.font14}
            fontFamily={FontFamily.Bold}
          />
          {Tickets.map((item, index) => (
            <Ticketquantitiy
              key={index}
              item={item}
              onincrese={(v) => increaseQTY(v)}
              ondecrese={(v) => increaseQTY(v)}
            />
          ))}
        </View>

        <View style={styles.gridview}>
          {QTYdata.length >= 1 ? (
            <View style={styles.maingrid}>
              <View style={styles.gridlist}>
                {QTYdata.map((item, index) =>
                  item.QTY !== 0 ? (
                    <View key={index} style={styles.datalist}>
                      <ARtext
                        children={item.TicketType}
                        align={""}
                        size={FontSize.font15}
                        fontFamily={FontFamily.SemiBold}
                      />
                      <View style={{ marginTop: hei(0.6) }}>
                        <ARtext
                          children={`Qty: ${item.QTY}`}
                          size={FontSize.font14}
                          align={""}
                        />
                        <ARtext
                          children={`Price: ${item.Price}`}
                          size={FontSize.font14}
                          align={""}
                        />
                      </View>
                    </View>
                  ) : null
                )}
              </View>

              <View style={styles.btnview}>
                <View style={{ rowGap: hei(0.4) }}>
                  <ARtext
                    children={`Qty: ${TotalQty.TQTY}`}
                    size={FontSize.font14}
                    fontFamily={FontFamily.SemiBold}
                    align={""}
                    color={Colors.Placeholder}
                  />
                  <ARtext
                    children={`${TotalQty.TPRICE}`}
                    size={FontSize.font17}
                    fontFamily={FontFamily.Bold}
                    align={""}
                  />
                </View>
                <View>
                  <ARbutton
                    onpress={handleTicketBook}
                    Touchstyle={{
                      backgroundColor: Colors.btncolor,
                      height: hei(5.6),
                      width: wid(60),
                      borderRadius: normalize(7),
                    }}
                  >
                    <ARtext
                      children={"Send Now"}
                      color={Colors.White}
                      size={FontSize.font14}
                      fontFamily={FontFamily.SemiBold}
                    />
                  </ARbutton>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </ARcontainer>
  );
};

export default Ticketsend;

const styles = StyleSheet.create({
  secview: {
    paddingHorizontal: wid(4),
    position: "absolute",
    zIndex: 1,
    top: hei(2),
    width: wid(100),
  },
  tochstyle: {
    marginTop: hei(2),
    height: hei(5),
    width: wid(94),
    borderRadius: 20,
    backgroundColor: "",
    borderWidth: normalize(1.5),
    borderColor: Colors.line,
    justifyContent: "",
    alignItems: "",
    paddingHorizontal: wid(4),
  },
  buttonview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tetview: {
    flex: 1,
    marginLeft: wid(3),
    marginTop: hei(0),
  },
  eventimage: {
    height: hei(2.3),
    width: hei(2.3),
    marginRight: wid(3),
  },
  downarrpeimg: {
    height: hei(1.5),
    width: hei(1.5),
  },
  container: {
    position: "absolute",
    zIndex: 1,
    top: hei(9),
    backgroundColor: Colors.White,
    marginHorizontal: wid(3),
    paddingVertical: hei(2),
    paddingHorizontal: wid(4),
    borderRadius: normalize(12),
    borderWidth: normalize(2),
    width: wid(94),
    borderColor: Colors.bordercolor,
  },
  dashview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileimageview: {
    backgroundColor: Colors.lable,
    height: hei(5),
    width: hei(5),
    borderRadius: normalize(50),
  },
  profileimage: {
    height: hei(5),
    width: hei(5),
  },
  location: {
    alignItems: "flex-end",
    marginVertical: hei(0.6),
  },
  eventndetailview: {
    marginTop: hei(1.5),
    justifyContent: "space-between",
    flexDirection: "row",
    // alignItems: 'center',
    // backgroundColor:'red'
  },
  eventname: {
    marginTop: hei(0.7),
  },
  tiketimage: {
    height: hei(2.2),
    width: hei(2.2),
  },
  ticketupload: {
    height: hei(4),
    backgroundColor: Colors.btncolor,
    borderRadius: normalize(5),
    marginTop: hei(1.8),
    marginBottom: hei(0.5),
    flexDirection: "row",
    justifyContent: "space-evenly",
    // paddingVertical:hei(1),
    // paddingHorizontal:wid(1),
    alignItems: "center",
    width: wid(isIos ? 50 : 52),
  },
  inputcontainerview: {
    // marginTop: hei(3),
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
    marginHorizontal: wid(4),
  },
  heightview: {
    height: hei(isIos ? 28 : 31),
    backgroundColor: "",
  },
  shadowview: {
    height: hei(16.5),
    backgroundColor: Colors.White,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowColor: Colors.Black,
    elevation: 5,
  },
  ticketdetail: {
    marginHorizontal: wid(4),
    rowGap: hei(1.5),
    marginVertical: hei(3),
  },
  ticketzone: {
    rowGap: hei(1.5),
    // backgroundColor:'red'
  },
  zoneview: {},
  gridview: {
    marginHorizontal: wid(4),
    paddingVertical: hei(1),
    // backgroundColor:"pink",
    rowGap: hei(3),
  },
  gridbtn: {
    // backgroundColor:'red',
    justifyContent: "center",
    alignItems: "flex-end",
  },
  maingrid: {
    borderWidth: normalize(1.5),
    borderRadius: normalize(7),
    borderColor: Colors.bordercolor,
    rowGap: hei(0.4),
    backgroundColor: Colors.bordercolor,
  },
  gridlist: {
    paddingHorizontal: wid(3),
    paddingVertical: hei(2),
    rowGap: hei(1.5),
    backgroundColor: Colors.White,
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },
  datalist: {
    paddingHorizontal: wid(3),
    paddingVertical: hei(2),
    borderRadius: normalize(7),
    backgroundColor: Colors.lightgrey,
    borderColor: Colors.purple,
    borderLeftWidth: wid(1),
  },
  btnview: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: wid(3),
    backgroundColor: Colors.White,
    paddingBottom: hei(2),
    alignItems: "center",
    paddingVertical: hei(2),
    borderBottomLeftRadius: normalize(10),
    borderBottomRightRadius: normalize(10),
  },
  ContainerStyle: {
    // backgroundColor:"red",
    borderRadius: normalize(9),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.41,
    elevation: 2,
  },
  dropdown: {
    paddingHorizontal: wid(4),
    height: hei(5),
    borderColor: Colors.bordercolor,
    borderWidth: normalize(1.5),
    borderRadius: normalize(20),
  },
  datePicker: {
    paddingHorizontal: wid(4),
    paddingVertical: hei(0.9),
    borderColor: Colors.bordercolor,
    borderWidth: 1,
    borderRadius: normalize(6),
    backgroundColor: Colors.backgroundcolor,
  },
  textStyle: {
    fontSize: FontSize.font14,
    fontFamily: FontFamily.Medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: Colors.Black,
  },
});
