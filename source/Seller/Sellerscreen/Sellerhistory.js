import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import { ARcontainer, ARheader, ARtext } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { Colors, FontFamily, FontSize, hei, isIos, normalize, wid } from "../../theme";
import Images from "../../Image/Images";
import { useSelector } from "react-redux";
import { getboxhistory } from "../../api/Api";
import LottieView from "lottie-react-native";

const Sellerhistory = () => {
  const navigation = useNavigation();

  const { AsyncValue } = useSelector((state) => state.Auth);
  const [History,Sethistory] = useState([])
  const [Refresh, Setrefresh] = useState(false);
  const [PageIndex,SetPageIndex] = useState(1);
  const [Loading,SetLoading] = useState(false)
  const [Hashmore,Sethashmore] = useState(false)
  const PageCount = 3


  useEffect(() => {
    gethistory()
  },[seller]);

  const gethistory = async (value,refresh) => {
    if(refresh){
        SetLoading(false)
    }else{  
        SetLoading(true)
    }
    try {
      const resonse = await getboxhistory(value ? value : PageIndex,PageCount,AsyncValue.BoxofficeUserId)
      if(resonse){
        Sethistory((pre) => ([...pre,...resonse.Details]))
        SetPageIndex((pre) => (value ? value + 1 : pre + 1));
        SetLoading(false)
        Sethashmore(true)
        Setrefresh(false)
      }else{
        SetLoading(false)
        Setrefresh(false)
      }
    } catch (error) {
       SetLoading(false)
       Sethashmore(false)
       Setrefresh(false)
      console.log('Get History error', error);

    }
  }
  console.log(History.length);
  
  const seller = [
    {
      Id: "1",
      EventName: "XYZ",
      EventDta: "30 Jan, 2024",
      MobileNo: "1122334455",
      Qly: "50",
      TicketType: "XYZ",
    },
    {
      Id: "2",
      EventName: "ABC",
      EventDta: "31 Jan, 2025",
      MobileNo: "1122334455",
      Qly: "40",
      TicketType: "ABC",
    },
  ];

  return (
    <ARcontainer>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"History"}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{ height: hei(2.5), width: hei(2.5) }}
        Leftpress={() => navigation.goBack()}
      />
      <FlatList
      contentContainerStyle={style.scrollstyle}
        data={History}
        keyExtractor={(item,index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
        <RefreshControl
            refreshing={Refresh}
            onRefresh={() => {
              Sethistory([]);
              Setrefresh(true);
              gethistory(1, true);
            }}
            tintColor={Colors.purple}
            colors={[Colors.purple]}
        />}
        renderItem={({item,index}) => (
            <View key={index} style={style.mainview}>
            <View style={style.detailview}>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Event Name: {""}
                  <ARtext
                    children={item.EventName}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Event Date: {""}
                  <ARtext
                    children={item.EventDate}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Mobile No: {""}
                  <ARtext
                    children={item.BookTicketid}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Qty: {""}
                  <ARtext
                    children={item.BookingTicketQty}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Ticket Type: {""}
                  <ARtext
                    children={item.TicketType}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
            </View>
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
            Hashmore ? gethistory() : null;
          }}
        ListFooterComponent={() => 
            Loading ? (
                <View style={{ marginTop: 0, alignItems: "center" }}>
                  <LottieView
                    source={Images.loader}
                    autoPlay
                    loop
                    style={{ height: hei(10), width: hei(10) }}
                  />
                </View>
              ) : <View/>
        }
      />
    </ARcontainer>
  );
};

export default Sellerhistory;

const style = StyleSheet.create({
  scrollstyle: {
    marginTop: hei(1.5),
    // backgroundColor:'red',
    // marginHorizontal: wid(3),
    paddingBottom: wid(isIos ? 18 : 25),
  },
  
  mainview: {
    marginTop: hei(1),
  },
  detailview: {
    backgroundColor: Colors.backgroundcolor,
    marginHorizontal: wid(3),
    paddingHorizontal: wid(4),
    paddingVertical: hei(2),
    borderWidth: normalize(1.5),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(9),
    rowGap: hei(1),
  },
  viewmargin: {
    // marginTop: hei(0.8),
    justifyContent: "center",
    // backgroundColor:'red'
  },
});
