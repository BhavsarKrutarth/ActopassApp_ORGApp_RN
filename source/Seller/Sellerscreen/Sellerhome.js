import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
import {
  Inputdata,
  Responsemodal,
  Ticketquantitiy,
} from "../../Commoncompoenent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import {
  applydis,
  bookingtickets,
  geteventdate,
  geteventlist,
  ticketget,
} from "../../api/Api";
import { useSelector } from "react-redux";
import { Validation } from "../../utils";
import LottieView from "lottie-react-native";

const Sellerhome = () => {
  const { AsyncValue } = useSelector((state) => state.Auth);
  // console.log(AsyncValue);

  const payarry = [
    {
      Id: 1,
      PatmentType: "Online Payment",
    },
    {
      Id: 2,
      PatmentType: "Cash Payment",
    },
  ];

  const [Selectedvalue, Setselectedvalue] = useState({
    label: "",
    value: "",
    EventDaysType: "",
  });
  const [Data, SetEventData] = useState([]);
  const [Senddate, Setsenddate] = useState({
    label: "",
    value: "",
  });
  const [Selecteddate, Setselecteddate] = useState([]);
  const [Tickets, SetTickets] = useState([]);
  const [Discount, Setdiscount] = useState(false);
  const [Pmethod, Setpmethod] = useState(0);
  const [QTYdata, SetQTYdata] = useState([]);
  const [Disable, SetDisable] = useState(false);
  const [Discountdetail, SetDiscountdetail] = useState({
    BOXOFFICEDISCOUNTID: 0,
    DISCOUNTPRECENTAGE: 0,
    DISCOUNTAMOUNT: 0,
    TOTALAMOUNT: 0,
  });
  const [Fieldvalidation, setFieldvalidation] = useState(false);

  const nameref = useRef(null)
  const mobileref = useRef(null)
  const conformmobileref = useRef(null)
  const remarks = useRef(null)
  const selectdates = useRef(null)
  const scrollViewRef = useRef(null);

  const [Input, SetInput] = useState({
    Name: "",
    MobileNo: "",
    ConfirmMobileNo: "",
    Remark: "",
    Date: "",
  });
  const [TotalQty, SetToatalQty] = useState({
    TQTY: 0,
    TPRICE: 0,
  });
  const [responsemodal, setresponsemodal] = useState(false);
  const [Loader, Setloader] = useState(false);
  const [Waiting, Setwaiting] = useState(false);
  const [Discountmessage, SetDiscountmessage] = useState(false);



  useEffect(() => {
    const getevent = async (BoxofficeUserId) => {
      const respone = await geteventlist(BoxofficeUserId);
      if (respone.length > 0) {
        SetEventData(
          respone.map((item) => ({
            label: item.EventName,
            value: item.EventMasterid,
            EventDaysType: item.EventDaysType,
          }))
        );
      } else {
        SetDisable(true);
      }
    };
    getevent(AsyncValue.BoxofficeUserId);
  }, []);

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

  useEffect(() => {
    if (TotalQty.TQTY === 0) {
      // console.log('call');
      setFieldvalidation(false);
      Setpmethod(0);
    }
  }, [TotalQty.TQTY]);

  const getdate = async (EventMasterid) => {
    try {
      const responses = await geteventdate(EventMasterid);
      if (responses.length > 0) {
        Setselecteddate(
          responses.map((data) => ({
            label: data.EVENTDATE,
            value: data.DISPLAYDATE,
          }))
        );
      } else {
        console.log("No Event date found");
      }
    } catch (error) {
      console.log("Get Event date error", error);
      // throw error;
    }
  };

  const gettickettype = async (EventMasterid) => {
    try {
      const Ticketresponse = await ticketget(EventMasterid);
      if (Ticketresponse.length > 0) {
        // console.log(JSON.stringify(Ticketresponse,null,2));
        SetTickets(Ticketresponse);
      } else {
        console.log("No TicketType Found");
      }
    } catch (error) {
      // Setloader(false)
      console.log("Get Ticket Type error", error);
    }
  };

  const payment = (item) => {
    Setpmethod(item.Id);
  };

  const increaseQTY = (v, Discount) => {
    // console.log(v);
    if (v.QTY == 0) {
      SetQTYdata((pre) =>
        pre.filter((item) => item.TicketType != v.TicketType)
      );
    }
    if (Discount) {
      SetDiscountdetail({
        BOXOFFICEDISCOUNTID: 0,
        DISCOUNTPRECENTAGE: 0,
        DISCOUNTAMOUNT: 0,
        TOTALAMOUNT: 0,
      });
      Setdiscount(false);
    }
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

  const Applydiscount = (BoxuserId, Amount, EventId) => {
    Setdiscount(!Discount);
    if (!Discount) {
      getdiscount(BoxuserId, Amount, EventId);
    } else {
      SetDiscountdetail({
        BOXOFFICEDISCOUNTID: 0,
        DISCOUNTPRECENTAGE: 0,
        DISCOUNTAMOUNT: 0,
        TOTALAMOUNT: 0,
      });
    }
  };

  const getdiscount = async (BoxuserId, Amount, EventId) => {
    try {
      Setwaiting(true);
      const Disresponse = await applydis(BoxuserId, Amount, EventId);
      if (Disresponse) {
        SetDiscountdetail(Disresponse);
        Setwaiting(false);
        if (Disresponse.DISCOUNTPRECENTAGE < 1) {
          Setdiscount(false);
          SetDiscountmessage(true);
        }
        // console.log('Discount',Disresponse);
      } else {
        Setwaiting(false);
      }
    } catch (error) {
      Setwaiting(false);
      console.log("GetDiscout Error", error);
    }
  };

  const cleandata = (param) => {
    if (!param) Setselecteddate([]);
    if (!param)
      Setsenddate({
        label: "",
        value: "",
      });

    setFieldvalidation(false);
    SetInput({
      Name: "",
      MobileNo: "",
      ConfirmMobileNo: "",
      Remark: "",
      Date: "",
    });
    SetTickets([]);
    SetToatalQty({
      TQTY: 0,
      TPRICE: 0,
    });
    Setdiscount(false);
    SetDiscountdetail({
      BOXOFFICEDISCOUNTID: 0,
      DISCOUNTPRECENTAGE: 0,
      DISCOUNTAMOUNT: 0,
      TOTALAMOUNT: 0,
    });
    Setpmethod(0);
    SetQTYdata([]);
  };

  const Namevalidation = Fieldvalidation && Validation.isName(Input.Name);
  const Mobilevalidation =
    Fieldvalidation && Validation.isMobileNumberValid(Input.MobileNo);
  const ConfirmMobilevalidation =
    Fieldvalidation &&
    Validation.isSameMobileNumber(Input.MobileNo, Input.ConfirmMobileNo);
  const remark = Fieldvalidation && Input.Remark.length < 1;
  const selectdate = Fieldvalidation && Senddate.label == "";
  const Checkpatmenymethod = Fieldvalidation && Pmethod == 0;

  const validate =
    !Validation.isName(Input.Name) &&
    !Validation.isMobileNumberValid(Input.MobileNo) &&
    !Validation.isSameMobileNumber(Input.MobileNo, Input.ConfirmMobileNo) &&
    !Input.Remark.length < 1 &&
    !Senddate.label == "" &&
    !Pmethod == 0

  const sendobject = {
    Boxofficeuserid: AsyncValue.BoxofficeUserId,
    MobileNo: Input.MobileNo,
    BookingTicketQty: TotalQty.TQTY,
    BookingAmount: TotalQty.TPRICE - Discountdetail.DISCOUNTAMOUNT,
    EventMasterid: Selectedvalue.value,
    BookTicket_Name: Selectedvalue.label,
    Remark: Input.Remark,
    Confirm_Moblie_No: Input.ConfirmMobileNo,
    Boxofficediscountid: Discountdetail.BOXOFFICEDISCOUNTID,
    Discountamount: Discountdetail.DISCOUNTAMOUNT,
    Discountpersenttage: Discountdetail.DISCOUNTPRECENTAGE,
    Paymenttype:
      Pmethod === 1 ? "OnlinePayment" : Pmethod === 2 ? "CashPayment" : "",
    EventDate: Senddate.label,
    TicketTypes: [
      ...QTYdata.map((item) => ({
        Boxofficeuserid: AsyncValue.BoxofficeUserId,
        Eventmasterid: Selectedvalue.value,
        Eventdate: Senddate.label,
        Bookingticketqty: item.QTY,
        Bookingamount: item.Price,
        Eventmaster_tickettypeid: item.EventMaster_TicketTypeid,
        Tickettype: item.TicketType,
      })),
    ],
  };

  const booktickets = async (sendobject, id) => {
    setFieldvalidation(true);
    if (Input.Name < 2) {
      nameref.current.focus();
      scrollViewRef.current.scrollToPosition(0,0,true);
      return;
    }
    if (Input.MobileNo < 10) {
      mobileref.current.focus();
      scrollViewRef.current.scrollToPosition(0,0,true);
      return;
    }
    if (Input.MobileNo != Input.ConfirmMobileNo) {
      conformmobileref.current.focus();
      scrollViewRef.current.scrollToPosition(0,0,true);
      return;
    }
    if (Input.Remark < 1) {
      remarks.current.focus();
      scrollViewRef.current.scrollToPosition(0,0,true);
      return;
    }
    // if (Senddate.value == '') {
    //   selectdates.current.focus();
    //   scrollViewRef.current.scrollToPosition(0,0,true);
    //   return;
    // }
    if (validate) {
      console.log('call');
      Setloader(true);
      try {
        const respone = await bookingtickets(sendobject);
        if (respone.responsecode === "0") {
          Setloader(false);
          setresponsemodal(true);
          cleandata(true);
          setTimeout(() => {
            gettickettype(id);
          }, 1000);
        }
      } catch (error) {
        Setloader(false);
        console.log("Ticket booking error", error);
        throw error;
      }
    } else {
      console.log("please fill the ");
    }
  };

  if (Loader)
    return (
      <ARcontainer style={{ justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={Images.tickets}
          autoPlay
          loop
          style={{ height: hei(18), width: hei(18)}}
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
                style={[
                  styles.dropdown,
                  { borderColor: Disable ? Colors.inactive : Colors.line },
                ]}
                itemTextStyle={{ color: Colors.Placeholder }}
                placeholderStyle={[
                  styles.placeholderStyle,
                  { color: Disable ? Colors.inactive : Colors.Placeholder },
                ]}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={[
                  styles.iconStyle,
                  { tintColor: Disable ? Colors.inactive : Colors.Placeholder },
                ]}
                showsVerticalScrollIndicator={false}
                containerStyle={styles.ContainerStyle}
                data={Data}
                disable={Disable}
                maxHeight={hei(27)}
                labelField="label"
                valueField="value"
                placeholder="Select Event"
                onChange={(item) => {
                  cleandata(false);
                  Setselectedvalue(item);
                  getdate(item.value);
                  gettickettype(item.value);
                }}
                renderLeftIcon={() => (
                  <ARimage
                    source={Images.event}
                    style={styles.eventimage}
                    tintColor={Disable ? Colors.inactive : Colors.Placeholder}
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
                    children={"Boxoffice Interface"}
                    align={""}
                    color={Colors.Text}
                  />
                </View>
                {/* <View style={styles.profileimageview}>
                  <ARimage
                    source={Images.exa}
                    style={styles.profileimage}
                    resizemode={'stretch'}
                  />
                </View> */}
              </View>
              {/* <View style={styles.location}>
                <ARtext
                  children={'Location'}
                  align={''}
                  size={FontSize.font12}
                  color={Colors.Text}
                />
              </View> */}
              <View style={styles.eventndetailview}>
                <ARtext size={FontSize.font13}>
                  Event Id: {""}
                  <ARtext
                    children={Selectedvalue.value}
                    size={FontSize.font14}
                    fontFamily={FontFamily.SemiBold}
                    align={""}
                  />
                </ARtext>
                {/* <ARtext
                  children={'Surat'}
                  size={FontSize.font14}
                  color={Colors.Placeholder}
                  align={''}
                /> */}
              </View>
              <View style={styles.eventname}>
                <ARtext size={FontSize.font13} align={""}>
                  Event Name: {""}
                  <ARtext
                    children={Selectedvalue.label}
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
            ref={nameref}
            txtchildren={"Name"}
            placeholder={"Enter Your Name"}
            inputvalue={Input.Name}
            onchange={(v) => SetInput((pre) => ({ ...pre, Name: v }))}
            errormessage={Namevalidation}
            err={"Please enter your name must be 2 characters."}
          />
          <Inputdata
            ref={mobileref}
            txtchildren={"Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={Input.MobileNo}
            onchange={(v) => SetInput((pre) => ({ ...pre, MobileNo: v }))}
            err={"Please enter mobile number must be 10 digit."}
            errormessage={Mobilevalidation}
            keyboardType={"numeric"}
            maxLength={10}
          />
          <Inputdata
            ref={conformmobileref}
            txtchildren={"Confirm Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={Input.ConfirmMobileNo}
            onchange={(v) =>
              SetInput((pre) => ({ ...pre, ConfirmMobileNo: v }))
            }
            errormessage={ConfirmMobilevalidation}
            err={"Mobile No and confirm Mobile No are not match"}
            keyboardType={"numeric"}
            maxLength={10}
          />
          <Inputdata
            ref={remarks}
            txtchildren={"Remark"}
            placeholder={"125896325"}
            inputvalue={Input.Remark}
            err={"Please Enter remark"}
            errormessage={remark}
            onchange={(v) => SetInput((pre) => ({ ...pre, Remark: v }))}
          />
          <View style={{ marginVertical: hei(1), rowGap: hei(0.6) }}>
            <ARtext
              children={"Select Date"}
              align={""}
              fontSize={FontSize.font14}
            />
            <Dropdown
              // ref={selectdates}
              style={[
                styles.dropdown,
                {
                  borderWidth: 1,
                  borderRadius: normalize(6),
                  height: hei(4),
                  backgroundColor: Colors.backgroundcolor,
                  borderColor:
                    Selecteddate.length < 1
                      ? Colors.inactive
                      : Colors.bordercolor,
                },
              ]}
              itemTextStyle={{ color: Colors.Placeholder }}
              placeholderStyle={[
                styles.placeholderStyle,
                {
                  fontSize: FontSize.font12,
                  color: Selecteddate.length < 1 ? Colors.line : Colors.lable,
                },
              ]}
              selectedTextStyle={[
                styles.selectedTextStyle,
                { fontSize: FontSize.font12 },
              ]}
              iconStyle={[
                styles.iconStyle,
                {
                  tintColor:
                    Selecteddate.length < 1 ? Colors.line : Colors.Placeholder,
                },
              ]}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.ContainerStyle}
              data={Selecteddate}
              disable={Selecteddate.length < 1 ?? true}
              maxHeight={hei(20)}
              labelField="label"
              valueField="value"
              placeholder="Select Date"
              onChange={(item) => {
                Setsenddate(item);
                // console.log(item);
              }}
              // renderLeftIcon={() => (
              //   <ARimage
              //     source={Images.event}
              //     style={{
              //       height: hei(1.7),
              //       width: hei(1.7),
              //       marginRight: wid(3),
              //     }}
              //     tintColor={Colors.Placeholder}
              //   />
              // )}
            />
            {selectdate ? (
              <ARtext
                children={"Plesase select date"}
                align={""}
                color={"red"}
              />
            ) : null}
          </View>
          {/* <Inputdata
            txtchildren={'Select Date'}
            placeholder={'Enter Date'}
            inputvalue={''}
            onchange={v => console.log(v)}
          />  */}
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
              onincrese={(v) => increaseQTY(v, Discount)}
              ondecrese={(v) => increaseQTY(v, Discount)}
            />
          ))}
        </View>

        <View style={styles.gridview}>
          {QTYdata.length >= 1 ? (
            <View style={styles.maingrid}>
              <View style={styles.gridlist}>
                {QTYdata.map((item, index) => (
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
                ))}

                  <ARbutton
                    Touchstyle={{
                      height: hei(2.5),
                      backgroundColor:'',
                      flexDirection:"row",
                      columnGap:wid(2),
                      alignItems:"center",
                      justifyContent:"",
                      marginVertical:hei(1)
                    }}
                    onpress={() => {
                      Applydiscount(
                        AsyncValue.BoxofficeUserId,
                        TotalQty.TPRICE,
                        Selectedvalue.value
                      );
                    }}
                  >
                    <View style={{
                       height: hei(2.5),
                       width: hei(2.5),
                       borderRadius: normalize(4),
                       borderWidth: normalize(1),
                       borderColor: Colors.lable,
                       justifyContent:"center"
                    }}>

                    {Discount ? (
                      <ARimage
                      source={Images.disc}
                      style={{ height: hei(2.5), width: hei(2.5) }}
                      />
                    ) : null}
                    </View>
                  {Waiting ? (
                    <ARtext children={"Just a waiting"} align={""} />
                  ) : (
                    <ARtext
                      children={`Apply Discount - ${
                        Discount ? Discountdetail.DISCOUNTPRECENTAGE : 0
                      }%`}
                      align={""}
                    />
                  )}
              </ARbutton>

                <View style={styles.paymentmainview}>
                  {payarry.map((item, index) => (
                    <View key={index} style={styles.paymentdirectionview}>
                      <ARbutton
                        Touchstyle={{
                          height: hei(3),
                          width: hei(18),
                          backgroundColor: "",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection:'row',
                          columnGap:wid(2)
                        }}
                        onpress={() => payment(item)}
                      >
                        <ARimage
                          style={{ height: hei(3), width: hei(3) }}
                          source={
                            Pmethod == item.Id ? Images.payact : Images.paydec
                          }
                        />
                      <ARtext children={item.PatmentType} />
                      </ARbutton>
                    </View>
                  ))}
                </View>
                {Checkpatmenymethod ? (
                  <View style={{ paddingHorizontal: wid(6) }}>
                    <ARtext
                      children={"please select payment method"}
                      color={"red"}
                      align={""}
                    />
                  </View>
                ) : null}
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
                    children={`₹${
                      Discount
                        ? TotalQty.TPRICE - Discountdetail.DISCOUNTAMOUNT
                        : TotalQty.TPRICE
                    }`}
                    size={FontSize.font17}
                    fontFamily={FontFamily.Bold}
                    align={""}
                  />
                </View>
                <View>
                  <ARbutton
                    Touchstyle={{
                      backgroundColor: Colors.btncolor,
                      height: hei(5.6),
                      width: wid(60),
                      borderRadius: normalize(7),
                    }}
                    onpress={() => booktickets(sendobject, Selectedvalue.value)}
                  >
                    <ARtext
                      children={"Book Now"}
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
          visible={Discountmessage}
          onrequestclose={() => SetDiscountmessage(false)}
          onpress={() => SetDiscountmessage(false)}
          Images={Images.sorry}
          subtext={"Sorry"}
          message={"This amount does not qualify for a discount."}
          subcolor={Colors.Red}
        />

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

export default Sellerhome;

const styles = StyleSheet.create({
  secview: {
    paddingHorizontal: wid(4),
    position: "absolute",
    zIndex: 1,
    top: hei(2),
    width: wid(100),
    // backgroundColor:'red'
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
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: hei(1.5),
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
    marginVertical: hei(2),
    // backgroundColor:'red'
  },
  ticketzone: {
    rowGap: hei(1.5),
    // backgroundColor:'red'
  },
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
    rowGap: hei(1),
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
  discountview: {
    flexDirection: "row",
    marginTop: hei(1),
    columnGap: wid(2),
    alignItems: "center",
  },
  paymentmainview: {
    flexDirection: "row",
    // marginVertical: hei(0),
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  paymentdirectionview: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: wid(2),
    alignItems: "center",
  },
  eventimage: {
    height: hei(2.3),
    width: hei(2.3),
    marginRight: wid(3),
  },
  ContainerStyle: {
    // backgroundColor:"red",
    marginTop: hei(0.2),
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
    borderColor: Colors.line,
    borderWidth: normalize(1.5),
    borderRadius: normalize(20),
  },
  placeholderStyle: {
    fontSize: FontSize.font15,
    color: Colors.Placeholder,
  },
  selectedTextStyle: {
    fontSize: FontSize.font16,
    color: Colors.Placeholder,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: Colors.Placeholder,
  },
});
