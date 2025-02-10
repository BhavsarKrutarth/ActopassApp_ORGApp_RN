import React, { useEffect, useState } from "react";
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
import { applydis, geteventdate, geteventlist, ticketget } from "../../api/Api";
import { useSelector } from "react-redux";

const Sellerhome = () => {
  const { AsyncValue } = useSelector((state) => state.Auth);
  // const Tickets = [];
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

  const [Selectedvalue, Setselectedvalue] = useState({});
  const [Data, SetEventData] = useState([]);
  const [Senddate, Setsenddate] = useState({});
  const [Selecteddate, Setselecteddate] = useState([])
  const [Tickets,SetTickets] = useState([])
  const [Discount, Setdiscount] = useState(false);
  const [Pmethod, Setpmethod] = useState(0);
  const [QTYdata, SetQTYdata] = useState([]);
  const [Disable, SetDisable] = useState(false);
  const [AfterDiscount,SetafterDiscount] = useState(0);
  const [Discountdetail, SetDiscountdetail] = useState({})
  const [Input, SttInput] = useState({
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


  const getdate = async (EventMasterid) => {
    try{
      const responses = await geteventdate(EventMasterid)
      if(responses.length > 0){
        Setselecteddate(responses.map((data) => ({
          label:data.EVENTDATE,
          value:data.DISPLAYDATE
        })))
      }else{
        console.log('No Event date found');
      } 
    }catch(error){
      console.log('Get Event date error',error);
      // throw error;
    }
  }

  const gettickettype = async (EventMasterid) => {
    try{
      const Ticketresponse = await ticketget(EventMasterid)
      if(Ticketresponse.length > 0){
        console.log(JSON.stringify(Ticketresponse,null,2));
        SetTickets(Ticketresponse)
      }else{
        console.log('No TicketType Found');
      }
    }catch(error){
      console.log('Get Ticket Type error',error);
    }
  }

  const payment = (item) => {
    Setpmethod(item.Id);
  };

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

  const Applydiscount = (BoxuserId,Amount,EventId) => {    
      Setdiscount(!Discount)
      if(!Discount){
          getdiscount(BoxuserId,Amount,EventId)
      }
      
  }
  const getdiscount = async (BoxuserId,Amount,EventId) => {
    try{
      const Disresponse = await applydis(BoxuserId,Amount,EventId)
      if(Disresponse){
        SetDiscountdetail(Disresponse)
        // console.log(Disresponse);
        
      }else{

      }
    }catch(error){
      console.log('GetDiscout Error',error);
      
    }
  }
  console.log('Discount',Discountdetail);
  
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
                  Setselectedvalue(item);
                  getdate(item.value)
                  gettickettype(item.value)
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
                    children={Selectedvalue?.value}
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
                    children={Selectedvalue?.label}
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
            txtchildren={"Name"}
            placeholder={"Enter Your Name"}
            inputvalue={""}
            onchange={(v) => console.log(v)}
          />
          <Inputdata
            txtchildren={"Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={""}
            onchange={(v) => console.log(v)}
          />
          <Inputdata
            txtchildren={"Confirm Mobile No"}
            placeholder={"Enter Your Number"}
            inputvalue={""}
            onchange={(v) => console.log(v)}
          />
          <Inputdata
            txtchildren={"Remark"}
            placeholder={"125896325"}
            inputvalue={""}
            onchange={(v) => console.log(v)}
          />
          <View style={{ marginVertical: hei(1), rowGap: hei(0.6) }}>
            <ARtext
              children={"Select Date"}
              align={""}
              fontSize={FontSize.font14}
            />
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderWidth: 1,
                  borderRadius: normalize(6),
                  height: hei(4),
                  backgroundColor: Colors.backgroundcolor,
                  borderColor:Colors.bordercolor
                },
              ]}
              itemTextStyle={{ color: Colors.Placeholder }}
              placeholderStyle={[
                styles.placeholderStyle,
                { fontSize: FontSize.font12, color:Colors.lable },
              ]}
              selectedTextStyle={[
                styles.selectedTextStyle,
                { fontSize: FontSize.font12 },
              ]}
              iconStyle={styles.iconStyle}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.ContainerStyle}
              data={Selecteddate}
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
              onincrese={(v) => increaseQTY(v)}
              ondecrese={(v) => increaseQTY(v)}
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
                <View style={styles.discountview}>
                  <ARbutton
                    Touchstyle={{
                      height: hei(2.5),
                      width: hei(2.5),
                      borderRadius: normalize(4),
                      borderWidth: normalize(1),
                      borderColor: Colors.lable,
                      backgroundColor: "",
                    }}
                    onpress={() => {
                      Applydiscount(AsyncValue.BoxofficeUserId,TotalQty.TPRICE,Selectedvalue.value)
                    }}
                 >
                    {Discount ? (
                      <ARimage
                        source={Images.disc}
                        style={{ height: hei(2.5), width: hei(2.5) }}
                      />
                    ) : null}
                  </ARbutton>
                  <ARtext children={`Apply Discount - ${Discount ? Discountdetail?.DISCOUNTPRECENTAGE : 0}%`} align={""} />
                </View>
                <View style={styles.paymentmainview}>
                  {payarry.map((item, index) => (
                    <View key={index} style={styles.paymentdirectionview}>
                      <ARbutton
                        Touchstyle={{
                          height: hei(3),
                          width: hei(3),
                          backgroundColor: "",
                          justifyContent: "",
                          alignItems: "",
                        }}
                        onpress={() => payment(item)}
                      >
                        <ARimage
                          style={{ height: hei(3), width: hei(3) }}
                          source={
                            Pmethod == item.Id ? Images.payact : Images.paydec
                          }
                        />
                      </ARbutton>
                      <ARtext children={item.PatmentType} />
                    </View>
                  ))}
                </View>
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
                    children={`₹${Discount ? TotalQty.TPRICE - Discountdetail.DISCOUNTAMOUNT : TotalQty.TPRICE}`}
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
  discountview: {
    flexDirection: "row",
    marginVertical: hei(1),
    columnGap: wid(2),
    alignItems: "center",
  },
  paymentmainview: {
    flexDirection: "row",
    marginVertical: hei(1),
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  paymentdirectionview: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'pink',
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
