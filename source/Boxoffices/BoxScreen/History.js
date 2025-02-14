import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { ARcontainer, ARheader, ARtext } from "../../common";
import { useNavigation } from "@react-navigation/native";
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
import { useSelector } from "react-redux";
import { SEL_History } from "../../api/Api";
import LottieView from "lottie-react-native";

const History = () => {
  const navigation = useNavigation();
  const { AsyncValue } = useSelector((state) => state.Auth);
  const [History, Sethistory] = useState([]);
  const [Refresh, Setrefresh] = useState(false);
  const [PageIndex, SetPageIndex] = useState(1);
  const [Loading, SetLoading] = useState(false);
  const [HasMore, SetHasMore] = useState(true);
  const PageCount = 10;

  useEffect(() => {
    if (AsyncValue.SellerLoginId) {
      gethistory(1, true);
    }
  }, []);

  const gethistory = async (value, refresh) => {
    if (Loading && !refresh) return;
    if (refresh) {
      Setrefresh(true);
      SetPageIndex(1);
      SetHasMore(true);
    } else {
      SetLoading(true);
    }
    try {
      const response = await SEL_History(
        value || PageIndex,
        PageCount,
        AsyncValue.SellerLoginId
      );

      if (response && response.length > 0) {
        Sethistory(refresh ? response : [...History, ...response]);
        SetPageIndex(value + 1);
        SetHasMore(response.length === PageCount);
      } else {
        SetHasMore(false);
      }
    } catch (error) {
    } finally {
      SetLoading(false);
      Setrefresh(false);
    }
  };

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
        keyExtractor={(item, index) => item.Id || index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={Refresh}
            onRefresh={() => gethistory(1, true)}
            tintColor={Colors.purple}
            colors={[Colors.purple]}
          />
        }
        renderItem={({ item }) => (
          <View style={style.mainview}>
            <View style={style.detailview}>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Event Name:{" "}
                  <ARtext
                    children={item.EventName}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Event Date:{" "}
                  <ARtext
                    children={item.EventDate}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Mobile No:{" "}
                  <ARtext
                    children={item.MobileNo}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Qty:{" "}
                  <ARtext
                    children={item.BookingTicketQty}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Ticket Type:{" "}
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
        onEndReachedThreshold={0.1}
        onEndReached={() => gethistory(PageIndex, false)}
        ListFooterComponent={() =>
          Loading && (
            <View style={{ marginTop: 0, alignItems: "center" }}>
              <LottieView
                source={Images.loader}
                autoPlay
                loop
                style={{ height: hei(10), width: hei(10) }}
              />
            </View>
          )
        }
      />
    </ARcontainer>
  );
};

export default History;

const style = StyleSheet.create({
  scrollstyle: {
    marginTop: hei(1.5),
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
    justifyContent: "center",
  },
});
