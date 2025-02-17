import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
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
  isIos,
  normalize,
  wid,
} from "../../theme";
import Images from "../../Image/Images";
import {
  Inputdata,
  Responsemodal,
  Ticketquantitiy,
} from "../../Commoncompoenent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import {
  SEL_EventDate,
  SEL_TicketBook,
  SEL_TicketType,
  SEL_UpComingEvents,
} from "../../api/Api";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

const Ticketsend = () => {
  const { AsyncValue } = useSelector((state) => state.Auth);
  const [event, setEvent] = useState([]);
  const [date, setDate] = useState([]);
  const [isDisable, setDisable] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [Tickets, setTickets] = useState([]);
  const [isLoading, SetLoading] = useState(false);
  const [responsemodal, setresponsemodal] = useState(false);
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
  const scrollViewRef = useRef(null);
  const inputRefs = useRef({
    name: React.createRef(),
    mobileNo: React.createRef(),
    confirmMobileNo: React.createRef(),
    remark: React.createRef(),
    date: React.createRef(),
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await SEL_UpComingEvents(AsyncValue.SellerLoginId);
        setEvent(
          response.map(({ EventName, EventMasterid }) => ({
            label: EventName,
            value: EventMasterid,
          })) || []
        );
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!selectedValue) return;
    (async () => {
      try {
        setDate(
          (await SEL_EventDate(selectedValue.value)).map(
            ({ EVENTDATE, DISPLAYDATE }) => ({
              label: DISPLAYDATE,
              value: EVENTDATE,
            })
          )
        );
        setTickets(
          await SEL_TicketType(selectedValue.value, AsyncValue.SellerLoginId)
        );
      } catch (error) {}
    })();
  }, [selectedValue]);

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
    let firstError = null;
    if (!input.name.trim()) {
      errors.name = "Please enter your name.";
      if (!firstError) firstError = "name";
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!input.mobileNo) {
      errors.mobileNo = "Please enter your mobile number.";
      if (!firstError) firstError = "mobileNo";
    } else if (!mobileRegex.test(input.mobileNo)) {
      errors.mobileNo = "Please enter a valid 10-digit mobile number.";
      if (!firstError) firstError = "mobileNo";
    } else if (input.mobileNo !== input.confirmMobileNo) {
      errors.confirmMobileNo =
        "Mobile number and confirm mobile number do not match.";
      if (!firstError) firstError = "confirmMobileNo";
    }
    if (!input.remark.trim()) {
      errors.remark = "Please enter your remark.";
      if (!firstError) firstError = "remark";
    }
    if (!value) {
      errors.date = "Please select a date.";
      if (!firstError) firstError = "date";
    }
    setErrors(errors);
    return firstError;
  };

  const handleTicketBook = async () => {
    const firstError = validateForm();
    if (firstError) {
      scrollViewRef.current.scrollToFocusedInput(
        inputRefs.current[firstError].current
      );
      inputRefs.current[firstError].current.focus();
      return;
    }

    SetLoading(true);
    const ticketTypes = QTYdata.map((item) => ({
      SelllerMasterDetailsid: item.SelllerMasterDetailsid,
      SelllerLoginid: AsyncValue.SellerLoginId,
      Eventmasterid: selectedValue.value,
      Eventdate: value.value,
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
        value.value,
        ticketTypes
      );
      if (response) {
        setInput({});
        SetQTYdata([]);
        setresponsemodal(true);
      }
    } catch (error) {
    } finally {
      SetLoading(false);
    }
  };

  if (isLoading)
    return (
      <ARcontainer style={{ justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={Images.tickets}
          autoPlay
          loop
          style={{ height: hei(18), width: hei(18) }}
        />
      </ARcontainer>
    );
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
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hei(10) }}
        enableAutomaticScroll={isIos ? true : false} // Prevent automatic scroll behavior
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0} // Prevent extra space from being added when the keyboard opens
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust for platform-specific behavior
      >
        <View style={{ height: hei(isIos ? 28 : 31) }}>
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
                selectedTextProps={{ numberOfLines: 1 }}
                showsVerticalScrollIndicator={false}
                containerStyle={styles.ContainerStyle}
                data={event}
                disable={isDisable}
                maxHeight={230}
                labelField="label"
                valueField="value"
                placeholder="Event"
                value={selectedValue}
                onChange={(item) => {
                  SetQTYdata([]);
                  setSelectedValue(item);
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
              </View>
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
              </View>
              <View style={{ marginTop: hei(0.7) }}>
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
            </View>
          </View>
        </View>

        <View style={styles.inputcontainerview}>
          <Inputdata
            ref={inputRefs.current.name}
            txtchildren={"Name"}
            placeholder={"Enter Your Name"}
            inputvalue={input.name}
            onchange={(v) => setInput((prev) => ({ ...prev, name: v }))}
            errormessage={errors.name}
            err={errors.name}
          />
          <Inputdata
            ref={inputRefs.current.mobileNo}
            txtchildren={"Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={input.mobileNo}
            onchange={(v) => setInput((prev) => ({ ...prev, mobileNo: v }))}
            errormessage={errors.mobileNo}
            err={errors.mobileNo}
          />
          <Inputdata
            ref={inputRefs.current.confirmMobileNo}
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
            ref={inputRefs.current.remark}
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
              ref={inputRefs.current.date}
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
              value={value}
              placeholder="Enter date"
              onChange={(item) => {
                setValue(item);
              }}
            />
            {errors.date && (
              <ARtext color={Colors.Red} align={"left"}>
                {errors.date}
              </ARtext>
            )}
          </View>
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
        <Responsemodal
          visible={responsemodal}
          onrequestclose={() => setresponsemodal(false)}
          onpress={() => setresponsemodal(false)}
          Images={Images.success}
          subtext={"!Oh Yeah"}
          message={"Tickets book successfully."}
        />
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
  eventimage: {
    height: hei(2.3),
    width: hei(2.3),
    marginRight: wid(3),
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
  eventndetailview: {
    marginTop: hei(1.5),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputcontainerview: {
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
    marginHorizontal: wid(4),
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
  gridview: {
    marginHorizontal: wid(4),
    paddingVertical: hei(1),
    rowGap: hei(3),
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
