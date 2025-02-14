import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  SectionList,
} from "react-native";
import { ARcontainer } from "../../common";
import { ARlineargradient } from "../../common";
import { Colors, height, isIos } from "../../theme";
import { hei, wid, normalize } from "../../theme";
import { ARimage } from "../../common";
import Images from "../../Image/Images";
import { ARtext } from "../../common";
import { FontFamily, FontSize } from "../../theme";
import { ARbutton } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { ARheader } from "../../common";
import { ARprogressbar } from "../../common";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import Navroute from "../navigation/Navroute";
import { loistofevent, percentagedata } from "../../api/Api";

const Home = () => {
  const { AsyncValue } = useSelector((state) => state.Auth);
  const screenWidth = Dimensions.get("window").width;

  const [currentindex, setcurrentindex] = useState(0);
  const [btn, setbtn] = useState(1);
  const [Eventlist, Seteventlist] = useState([]);
  const [Value, Setvalue] = useState({
    label: "",
    value: "",
  });
  const [Disable, Setdisable] = useState(false);
  const [datas, setdata] = useState({});
  const [Dashdata, Setdashdata] = useState([
    {
      Detail: datas.TotalSale || 0,
      Name: "Total Sale",
      Subdetail: datas.TotalBookTicket || 0,
      Subname: "Total BookTicket",
    },
    {
      Detail: datas.TotalEvent || 0,
      Name: "Total Event",
      Subdetail: datas.TotalUpcomingEvent || 0,
      Subname: "Upcoming Event",
    },
    {
      Detail: datas.TotalFixAmount || 0,
      Name: "Total FixAmount",
      Subdetail: datas.TotalDynamicAmount || 0,
      Subname: "Total DynamicAmount",
    },
  ]);

  const Percentagedata = [
    {
      id: 1,
      info: "Percentage",
    },
    {
      id: 2,
      info: "Amount",
    },
    {
      id: 3,
      info: "Quantity",
    },
  ];

  useEffect(() => {
    if (Object.keys(datas).length > 1) {
      Setdashdata((Previous) =>
        Previous.map((item) =>
          item.Name === "Total Sale"
            ? {
                ...item,
                Detail: datas.TotalSale,
                Subdetail: datas.TotalBookTicket,
              }
            : item.Name === "Total Event"
            ? {
                ...item,
                Detail: datas.TotalEvent,
                Subdetail: datas.TotalUpcomingEvent,
              }
            : {
                ...item,
                Detail: datas.TotalFixAmount,
                Subdetail: datas.TotalDynamicAmount,
              }
        )
      );
    } else {
      getevent();
    }
  }, [datas]);

  const getevent = async () => {
    try {
      const response = await loistofevent(AsyncValue.OrganizerLoginId);
      if (response) {
        // console.log(JSON.stringify(response,null,2));

        Seteventlist(
          response.DIscountDetails.map((item) => ({
            label: item.EventName,
            value: item.EventMasterid,
          }))
        );
      } else {
        Setdisable(true);
      }
    } catch (error) {
      console.log("Dashboard getevent erro", error);
    }
  };

  const getpercentage = async (BoxId, EvntId) => {
    try {
      const respone = await percentagedata(BoxId, EvntId);
      if (respone) {
        setdata(respone);
      }
    } catch (error) {
      console.log("Getpercentagedata error", error);
    }
  };

  const onScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setcurrentindex(index);
  };

  const progressdata = (percenatge, btn) => {
    if (btn === 1) {
      return parseFloat(percenatge) / 100;
    } else if (btn === 2) {
      const count = ((percenatge / 500000) * 100).toFixed(2);
      return parseFloat(count) / 100;
    } else {
      const qty = ((percenatge / 1000) * 100).toFixed(2);
      return parseFloat(qty) / 100;
    }
  };

  const dataset = (item) => {
    setbtn(item.id);
  };

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <View style={{ height: hei(43) }}>
        <ARlineargradient lstyle={{ height: hei(22) }}>
          <ARheader
            texts={"ERP System"}
            // lefttch={{paddingLeft: wid(1)}}
            // Lefticon={Images.drawer}
            headerleftimgstyle={{ height: hei(2.3), width: hei(2.3) }}
            size={FontSize.font17}
            textcolor={Colors.White}
            textfontfamily={FontFamily.SemiBold}
            // Leftpress={() => navigation.openDrawer()}
          />

          <View style={styles.secview}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              selectedTextProps={{
                numberOfLines: 1,
              }}
              iconStyle={styles.iconStyle}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.ContainerStyle}
              disable={Disable}
              data={Eventlist}
              maxHeight={230}
              labelField="label"
              valueField="value"
              placeholder="Select Event"
              onChange={(item) => {
                console.log(item);
                Setvalue(item);
                getpercentage(AsyncValue.OrganizerLoginId, item.value);
              }}
              renderLeftIcon={() => (
                <ARimage
                  source={Images.event}
                  style={styles.eventimage}
                  tintColor={Colors.White}
                />
              )}
            />
          </View>
        </ARlineargradient>

        <View style={styles.container}>
          <FlatList
            horizontal
            pagingEnabled
            onScroll={onScroll}
            showsHorizontalScrollIndicator={false}
            data={Dashdata}
            keyExtractor={(item, index) => index.toString()}
            style={{ width: wid(90) }}
            renderItem={({ item }) => (
              <View style={styles.dashmainview}>
                <View style={styles.dashview}>
                  <View style={styles.contentview}>
                    <View
                      style={
                        {
                          // width: wid(50),
                          //  backgroundColor: 'blue'
                        }
                      }
                    >
                      <ARtext
                        size={FontSize.font14}
                        fontFamily={FontFamily.Bold}
                        children={"Dashboard"}
                        align={""}
                      />
                      <ARtext
                        size={FontSize.font14}
                        children={"Organization Interface"}
                        align={""}
                        color={Colors.line}
                      />
                    </View>
                    <View
                      style={{
                        // width: wid(44),
                        justifyContent: "center",
                        alignItems: "flex-end",
                        // backgroundColor: 'pink',
                      }}
                    >
                      <ARimage source={Images.actopass} style={styles.img} />
                    </View>
                  </View>
                  <View style={styles.salesview}>
                    <View style={styles.salsfontview}>
                      <ARtext
                        size={FontSize.font25}
                        fontFamily={FontFamily.Bold}
                        children={item.Detail}
                        align={""}
                      />
                      <ARtext
                        size={FontSize.font12}
                        children={item.Name}
                        align={""}
                      />
                    </View>
                    <View style={styles.lineview}></View>
                    <View style={styles.salsfontview}>
                      <ARtext
                        size={FontSize.font25}
                        fontFamily={FontFamily.Bold}
                        children={item.Subdetail}
                        align={""}
                      />
                      <ARtext
                        size={FontSize.font12}
                        children={item.Subname}
                        align={""}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {Dashdata.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          {
                            backgroundColor:
                              currentindex === index
                                ? Colors.active
                                : Colors.inactive,
                          },
                        ]}
                      ></View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: wid(3) }}>
        <ARtext
          children={"Sell By Channal"}
          align={""}
          size={FontSize.font16}
          fontFamily={FontFamily.Bold}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: hei(1),
          }}
        >
          {Percentagedata.map((item, index) => (
            <View style={{ width: wid(29) }} key={index}>
              <ARbutton
                onpress={() => dataset(item)}
                backgroundColor={btn === item.id ? Colors.button : Colors.White}
                height={hei(4.5)}
                Touchstyle={{
                  borderRadius: normalize(9),
                  borderWidth: normalize(1.5),
                  borderColor: Colors.bordercolor,
                }}
              >
                <ARtext
                  children={item.info}
                  color={btn === item.id ? Colors.White : Colors.Placeholder}
                  size={FontSize.font14}
                />
              </ARbutton>
            </View>
          ))}
        </View>
        <View style={styles.progresview}>
          <View style={styles.gap}>
            <View style={styles.content}>
              <ARtext size={FontSize.font12} children={"Web"} />
              <ARtext
                size={FontSize.font12}
                children={`${
                  btn === 1
                    ? datas?.TotalWebUser_Percentage || 0
                    : btn === 2
                    ? datas?.TotalWebUser_Income || 0
                    : btn === 3
                    ? datas?.shopifyQty || 0
                    : 0
                }${btn === 1 ? "%" : btn === 2 ? "₹" : ""}`}
              />
            </View>
            <View>
              <ARprogressbar
                progress={progressdata(
                  btn === 1
                    ? datas?.TotalWebUser_Percentage || 0
                    : btn === 2
                    ? datas?.TotalWebUser_Income || 0
                    : btn === 3
                    ? datas?.shopifyQty || 0
                    : 0,
                  btn
                )}
                color={Colors.web}
              />
            </View>
          </View>
          <View style={styles.gap}>
            <View style={styles.content}>
              <ARtext size={FontSize.font12} children={"Mobile"} />
              <ARtext
                size={FontSize.font12}
                children={`${
                  btn === 1
                    ? datas?.MobileApp_Percentage || 0
                    : btn === 2
                    ? datas?.TotalMobileApp_Income || 0
                    : btn === 3
                    ? datas?.MobileQty || 0
                    : 0
                }${btn === 1 ? "%" : btn === 2 ? "₹" : ""}`}
              />
            </View>
            <View>
              <ARprogressbar
                progress={progressdata(
                  btn === 1
                    ? datas?.MobileApp_Percentage || 0
                    : btn === 2
                    ? datas?.TotalMobileApp_Income || 0
                    : btn === 3
                    ? datas?.MobileQty || 0
                    : 0,
                  btn
                )}
                color={Colors.mob}
              />
            </View>
          </View>
          <View style={styles.gap}>
            <View style={styles.content}>
              <ARtext size={FontSize.font12} children={"ERP"} />
              <ARtext
                size={FontSize.font12}
                children={`${
                  btn === 1
                    ? datas?.TotalERPUser_Percentage || 0
                    : btn === 2
                    ? datas?.TotalERPUser_Income || 0
                    : btn === 3
                    ? datas?.ERPQty || 0
                    : 0
                }${btn === 1 ? "%" : btn === 2 ? "₹" : ""}`}
              />
            </View>
            <View>
              <ARprogressbar
                progress={progressdata(
                  btn === 1
                    ? datas?.TotalERPUser_Percentage || 0
                    : btn === 2
                    ? datas?.TotalERPUser_Income || 0
                    : btn === 3
                    ? datas?.ERPQty || 0
                    : 0,
                  btn
                )}
                color={Colors.erp}
              />
            </View>
          </View>
        </View>
      </View>
    </ARcontainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  dot: {
    width: wid(1.5),
    height: wid(1.5),
    borderRadius: normalize(50),
    marginHorizontal: wid(0.5),
  },
  container: {
    position: "absolute",
    zIndex: 1,
    top: hei(15),
    backgroundColor: Colors.White,
    marginHorizontal: wid(3),
    paddingVertical: hei(2),
    paddingHorizontal: wid(2),
    borderRadius: normalize(12),
    borderWidth: normalize(2),
    borderColor: Colors.bordercolor,
  },
  dashmainview: {
    // backgroundColor: 'red',
    width: wid(90),
    alignItems: "center",
  },
  dashview: {
    // backgroundColor: 'green',
    width: wid(88),
    // marginHorizontal:wid(1),
    // borderWidth: 1,
  },
  contentview: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  img: {
    height: hei(4),
    width: hei(4),
  },
  salesview: {
    // backgroundColor: 'pink',
    flexDirection: "row",
    height: hei(15),
    justifyContent: "space-between",
    paddingVertical: hei(2),
  },
  salsfontview: {
    width: wid(40),
    alignItems: "center",
    justifyContent: "center",
  },
  lineview: {
    borderWidth: 1,
    borderColor: Colors.line,
  },
  secview: {
    paddingHorizontal: wid(4),
    position: "absolute",
    zIndex: 1,
    top: hei(7),
    width: wid(100),
    // backgroundColor:'red'
  },
  eventimage: {
    height: hei(2.3),
    width: hei(2.3),
    marginRight: wid(3),
  },
  progresview: {
    backgroundColor: Colors.White,
    marginTop: hei(2),
    borderRadius: normalize(9),
    borderWidth: normalize(1.5),
    borderColor: Colors.bordercolor,
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
    gap: hei(2),
  },
  gap: {
    gap: hei(0.5),
  },
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
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
    borderColor: "white",
    borderWidth: normalize(1.5),
    borderRadius: normalize(9),
  },
  placeholderStyle: {
    fontSize: FontSize.font15,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: FontSize.font16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  addbutton: {
    // backgroundColor: "red",
    height: hei(6.5),
    width: hei(6.5),
    borderRadius: normalize(50),
    position: "absolute",
    bottom: hei(isIos ? 9 : 11),
    right: wid(4),
  },
});
