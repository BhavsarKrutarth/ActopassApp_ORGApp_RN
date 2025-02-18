import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ARbutton, ARcontainer, ARimage, ARtext } from "../../common";
import { ARheader } from "../../common";
import { hei, wid, normalize, isAndroid } from "../../theme";
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
  const [hasMore, setHasMore] = useState({});
  const { AsyncValue } = useSelector((state) => state.Auth);
  const pageCount = 6;
  const organizerLoginId = AsyncValue.OrganizerLoginId;

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await Details(pageIndex, pageCount, organizerLoginId);
      if (response) {
        setHasMore(response)
        setData((prevData) => [...prevData, ...response.DIscountDetails]);
        setPageIndex((pre) => pre + 1);
        setIsLoading(false)
      } 
    } 
    catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading(false);
    } 
  };
  
//  console.log('hashdata',hasMore.TotalRecords);
//  console.log(data.length);
//  console.log(data.EventMasterid);
 
 
  
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
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ARbutton
              Touchstyle={style.eventview}
              onpress={() => navigation.navigate(Navroute.Eventdetail,{Id:item.EventMasterid})}
            >
                <ARimage source={{uri : item.EventMainImage}} resizemode={'stretch'} style={style.image}/>
                <ARtext
                  children={item.EventName}
                  numline={1}
                  align={''}
                  size={FontSize.font13}
                  fontFamily={FontFamily.Bold}
                  color={Colors.Black}
                  style={{marginTop:hei(1),marginHorizontal:wid(2)}}
                />
                <ARtext
                  children={item.CityName}
                  align={''}
                  size={FontSize.font11}
                  fontFamily={FontFamily.Regular}
                  color={Colors.Placeholder}
                  style={{marginTop:hei(0.3),marginHorizontal:wid(2)}}
                />
            </ARbutton>
          )}
          onEndReached={() => {hasMore.TotalRecords != data.length ? fetchData()
           : null}}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            (isLoading ? <ActivityIndicator size={'large'} color={Colors.Placeholder} /> : null)
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
    paddingBottom:wid(20)
  },
  eventview: {
    marginVertical: hei(2),
    backgroundColor: Colors.lightgrey,
    borderRadius: normalize(14),
    width: '45%',
    marginHorizontal: wid(2),
    overflow: "hidden",
    height:'auto',
    paddingBottom:wid(3),
    justifyContent:"",
    alignItems:""
  },
  image: {
    height: 'auto',
    width: '100%',
    borderTopLeftRadius: normalize(14),
    borderTopRightRadius: normalize(14),
    aspectRatio: 1 / 1.3
  },
});
