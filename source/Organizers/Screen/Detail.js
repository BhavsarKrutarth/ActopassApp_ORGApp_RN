import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ARbutton, ARcontainer, ARimage, ARtext } from "../../common";
import { ARheader } from "../../common";
import { hei, wid, normalize } from "../../theme";
import { Colors } from "../../theme";
import Images from "../../Image/Images";
import { FontFamily, FontSize } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import Navroute from "../navigation/Navroute";
import { Details } from "../../api/Api";
import { useSelector } from "react-redux";

const Detail = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { AsyncValue } = useSelector((state) => state.Auth);
  const pageCount = 10;
  const organizerLoginId = AsyncValue.OrganizerLoginId;

  const events = [
    {
      Id: "1",
      Name: "Bar Crawl,Gurgaon",
      city: "Grizly X Times Prime",
      image: Images.comady,
    },
    {
      Id: "2",
      Name: "Bar Crawl,Gurgaon",
      city: "Grizly X Times Prime",
      image: Images.comady,
    },
  ];

  const fetchData = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await Details(pageIndex, pageCount, organizerLoginId);
      if (response && response.length > 0) {
        setData((prevData) => [...prevData, ...response]);
        setPageIndex((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ARcontainer>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Event Details"}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{ height: hei(2.5), width: hei(2.5) }}
        Leftpress={() => navigation.goBack()}
      />

      <View style={style.container}>
        <FlatList
          data={events}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ARbutton
              Touchstyle={style.eventview}
              onpress={() => navigation.navigate(Navroute.Eventdetail)}
            >
              <View style={style.imageview}>
                <ARimage source={item.image} resizemode={"stretch"} />
              </View>
              <View style={style.texts}>
                <ARtext
                  children={item.Name}
                  align={""}
                  size={FontSize.font13}
                  fontFamily={FontFamily.Bold}
                  color={Colors.Black}
                />
                <ARtext
                  children={item.city}
                  align={""}
                  size={FontSize.font11}
                  fontFamily={FontFamily.Regular}
                  color={Colors.Placeholder}
                />
              </View>
            </ARbutton>
          )}
          // onEndReached={fetchData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? <ARtext children="Loading..." /> : null
          }
        />
      </View>
    </ARcontainer>
  );
};

export default Detail;

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:Colors.Placeholder,
    alignItems: "center",
  },
  eventview: {
    height: hei(25),
    marginVertical: hei(2),
    backgroundColor: Colors.lightgrey,
    borderRadius: normalize(14),
    padding: 0,
    width: wid(42),
    marginHorizontal: wid(2),
    justifyContent: "",
    alignItems: "",
    overflow: "hidden",
  },
  imageview: {
    height: hei(18),
    width: wid(42),
    // backgroundColor:'red',
    borderTopLeftRadius: normalize(14),
    borderTopRightRadius: normalize(14),
  },
  image: {
    borderTopLeftRadius: normalize(14),
    borderTopRightRadius: normalize(14),
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  city: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  texts: {
    // backgroundColor:'green',
    paddingHorizontal: wid(2),
    justifyContent: "center",
    height: hei(6),
    rowGap: hei(0.5),
  },
});
