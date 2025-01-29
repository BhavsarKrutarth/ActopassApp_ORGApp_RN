import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { ARcontainer, ARimage, ARLoader, ARtext } from "../../common";
import { ARheader } from "../../common";
import { hei, wid, normalize } from "../../theme";
import { FontSize, FontFamily } from "../../theme";
import Images from "../../Image/Images";
import { Colors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { EventDetails } from "../../api/Api";
import RenderHtml from "react-native-render-html";

const Eventdetail = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {Id} = route.params;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await EventDetails(Id);
        setData(response[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <ARLoader visible={isLoading} />;

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
      <ScrollView style={style.scrollstyle}>
        <View style={style.imageview}>
          <ARimage
            source={{ uri: data.EventMainImage }}
            resizemode={"stretch"}
          />
        </View>
        <View style={style.contentview}>
          {/* <View style={style.showtexts}>
            <View style={style.showcontent}>
              <ARtext
                children={"COMADY SHOWS"}
                align={""}
                size={FontSize.font13}
                color={Colors.Placeholder}
              />
            </View>
          </View> */}

          <View style={style.eventview}>
            <ARtext
              children={data.EventName}
              align={""}
              size={FontSize.font22}
              fontFamily={FontFamily.Bold}
            />

            <View style={style.dateview}>
              <View style={style.datetime}>
                <ARimage
                  source={Images.menu}
                  style={{ height: hei(2.5), width: hei(2.5) }}
                />
              </View>
              <View style={style.datetext}>
                <ARtext
                  children={data.EventStartDate}
                  color={Colors.Placeholder}
                  size={FontSize.font13}
                  align={""}
                />
                {data.EventDaysType === "multiple" && (
                  <>
                    <ARimage
                      source={Images.swip}
                      style={{ height: hei(2.5), width: hei(2.5) }}
                    />
                    <ARtext
                      children={data.EventEndDate}
                      color={Colors.Placeholder}
                      size={FontSize.font13}
                    />
                  </>
                )}
              </View>
            </View>
            <View style={[style.showtexts, { alignItems: "flex-start" }]}>
              <View
                style={[
                  style.showcontent,
                  {
                    paddingHorizontal: wid(2),
                    flexDirection: "row",
                    alignItems: "center",
                    // width: wid(45),
                    columnGap: wid(2.5),
                  },
                ]}
              >
                <ARimage
                  source={Images.clock}
                  style={{ height: hei(2.5), width: hei(2.5) }}
                />
                <ARtext
                  children={data.Event_Time_Duration}
                  align={""}
                  size={FontSize.font13}
                  color={Colors.Placeholder}
                />
              </View>
            </View>
          </View>

          <View style={style.address}>
            <ARtext
              children={"ADDRESS"}
              align={""}
              size={FontSize.font14}
              fontFamily={FontFamily.Bold}
            />
            <View style={style.locationview}>
              <View style={style.locationtext}>
                <ARimage
                  source={Images.location}
                  style={{ height: hei(2.5), width: hei(2.5) }}
                />
                <ARtext
                  children={data.CityName}
                  size={FontSize.font14}
                  FontFamily={FontFamily.Bold}
                  align={""}
                />
              </View>
              <ARtext
                children={data.EventAddress}
                color={Colors.Placeholder}
                size={FontSize.font12}
                style={{
                  backgroundColor: "",
                  width: wid(80),
                  paddingLeft: wid(6.5),
                }}
                align={""}
              />
            </View>

            {data.MoreVenues != 0 && (
              <ARtext
                onpress={() => console.log("")}
                align={""}
                size={FontSize.font14}
                FontFamily={FontFamily.Bold}
                color={Colors.purple}
                textDecorationLine={"underline"}
              >
                3 More Venues
                <ARtext
                  children={`${""} >`}
                  size={FontSize.font14}
                  FontFamily={FontFamily.Bold}
                  color={Colors.purple}
                />
              </ARtext>
            )}
          </View>

          <View style={style.longcontent}>
            <RenderHtml
              source={{
                html: data.EventDescription ? data.EventDescription : "",
              }}
            />
          </View>

          <View style={style.detail}>
            <ARtext
              children={"MORE INFORMATION"}
              fontFamily={FontFamily.Bold}
              size={FontSize.font15}
              align={""}
            />
            <View style={style.evedataview}>
              {data.MoreInformation &&
                data.MoreInformation.map((info, index) => (
                  <View key={index} style={style.locationtext}>
                    <ARimage
                      source={{ uri: info.IconImagePath }}
                      style={{ height: hei(2.5), width: hei(2.5) }}
                    />
                    <ARtext
                      children={info.DeatilsMoreInfo}
                      color={Colors.Placeholder}
                      size={FontSize.font14}
                      FontFamily={FontFamily.Bold}
                      align={""}
                    />
                  </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ARcontainer>
  );
};

export default Eventdetail;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor: Colors.Placeholder,
  },
  imageview: {
    // backgroundColor:"red",
    height: hei(30),
  },
  contentview: {
    paddingHorizontal: wid(4),
    paddingTop: hei(2),
    // backgroundColor: 'red',
  },
  showtexts: {
    alignItems: "flex-start",
    // backgroundColor: 'green',
  },
  showcontent: {
    backgroundColor: Colors.lightgrey,
    paddingHorizontal: wid(3),
    paddingVertical: hei(0.5),
    borderRadius: normalize(5),
  },
  eventview: {
    paddingVertical: hei(1.5),
    // backgroundColor: 'pink',
    rowGap: hei(1.7),
    paddingBottom: hei(3),
    borderBottomWidth: normalize(1),
    borderColor: Colors.bordercolor,
  },
  longcontent: {
    // backgroundColor:"yellow"
  },
  dateview: {
    justifyContent: "space-between",
    paddingVertical: hei(0.8),
    paddingHorizontal: wid(1),
    backgroundColor: Colors.lightgrey,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: normalize(5),
  },
  datetime: {
    alignItems: "center",
    // backgroundColor:'red',
    width: wid(7),
  },
  datetext: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wid(80),
    alignItems: "center",
  },
  address: {
    // backgroundColor:"yellow",
    paddingVertical: hei(1.5),
    paddingTop: hei(3),
    paddingBottom: hei(2.5),
    borderBottomWidth: normalize(1),
    borderColor: Colors.bordercolor,
    rowGap: hei(1.7),
  },
  locationview: {
    paddingVertical: hei(1.8),
    paddingHorizontal: wid(3),
    backgroundColor: Colors.lightgrey,
    borderRadius: normalize(6),
    rowGap: hei(0.8),
  },
  locationtext: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: wid(1.5),
    // backgroundColor:"red"
  },
  detail: {
    paddingVertical: hei(2.5),
    // backgroundColor:"red",
    rowGap: hei(3),
  },
  evedataview: {
    rowGap: hei(1.5),
  },
});
