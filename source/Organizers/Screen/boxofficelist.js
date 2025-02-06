import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ARbutton, ARcontainer, ARimage, ARtext } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { deleteboxoffice, getboxoffice } from "../../api/Api";
import { FontFamily, FontSize, hei, normalize, wid, Colors } from "../../theme";
import Navroute from "../navigation/Navroute";
import { Responsemodal } from "../../Commoncompoenent";
import Images from "../../Image/Images";
import LottieView from "lottie-react-native";

const Boxofficelist = () => {
  const navigation = useNavigation();
  const [Refresh, Setrefresh] = useState(false);
  const [Hasmore, Sethasmore] = useState(false);
  const [Getdata, SetGetdata] = useState([]);
  const { AsyncValue } = useSelector((state) => state.Auth);
  const OrganizerLoginId = AsyncValue.OrganizerLoginId;
  const [Userid, Setuseid] = useState(0);
  const [Deletemodal, Setdeletemodal] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Response, SetResponse] = useState("");
  const [Pageindex, Setpageindex] = useState(1);
  const Pagecount = 4;

  useEffect(() => {
    getseller();
  }, []);

  const typeWiseNavigatios = (item) => {
    navigation.navigate(Navroute.Boxofficedatail, { data: item });
  };

  const getid = (item) => {
    console.log(item);
    Setdeletemodal(true);
    Setuseid(item.BoxofficeUserId);
  };

  const callfunction = () => {
    deletedata(Userid);
  };

  const deletedata = async (id) => {
    Setdeletemodal(false);
    try {
      const response = await deleteboxoffice(id);
      if (response.ResponseCode === "-1") {
        SetResponse(response.ResponseMessage);
        Setdeletemodal(true);
        console.log("Respone", response.ResponseMessage);
      } else {
        SetGetdata([]);
        getseller(1);
      }
    } catch (error) {
      console.log("Fetch data error", error);
    }
  };

  const getseller = async (value, Refresh) => {
    if (Refresh) {
      SetLoading(false);
    } else {
      SetLoading(true);
    }
    try {
      const response = await getboxoffice(
        value || Pageindex,
        Pagecount,
        OrganizerLoginId
      );
      if (response) {
        SetGetdata((prevData) => [...prevData, ...response.DIscountDetails]);
        Setpageindex((pre) => (value ? value + 1 : pre + 1));
        SetLoading(false);
        Sethasmore(true);
      } else {
        SetLoading(false);
      }
    } catch (error) {
      console.log("Fetch data error", error);
      Sethasmore(false);
      SetLoading(false);
    }
  };

  const clearrsponse = () => {
    SetResponse("");
    Setdeletemodal(false);
  };

  // console.log('Conditional',Hasmore.TotalRecords !== Getdata.length);
  // console.log(Hasmore.TotalRecords);
  // console.log(Getdata.length);

  return (
    <ARcontainer>
      <FlatList
        contentContainerStyle={style.scrollstyle}
        data={Getdata}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[style.mainview]} key={index}>
            <RefreshControl
              refreshing={Refresh}
              onRefresh={() => {
                SetGetdata([]);
                Setrefresh(true);
                getseller(1, true);
              }}
              tintColor={Colors.purple}
              colors={[Colors.purple]}
            />
            <View key={index} style={[style.detailview]}>
              <View style={style.content}>
                <View style={style.codeview}>
                  <ARtext align={""} size={FontSize.font14}>
                    Code: {""}
                    <ARtext
                      children={item.Code}
                      color={Colors.active}
                      size={FontSize.font14}
                    />
                  </ARtext>
                </View>
                {/* <Image source={{uri:item.PHOTOPATH}} style={{height:hei(100),width:wid(100)}}/> */}
                <View style={[style.codeview, { alignItems: "flex-end" }]}>
                  <View style={style.imageview}>
                    <ARbutton
                      height={hei(2)}
                      width={hei(2)}
                      borderRadius={0}
                      backgroundColor={""}
                      onpress={() => typeWiseNavigatios(item)}
                    >
                      <ARimage source={Images.edit} style={style.imagestyle} />
                    </ARbutton>
                    <View style={style.line}></View>
                    <ARbutton
                      height={hei(2)}
                      width={hei(2)}
                      borderRadius={0}
                      backgroundColor={""}
                      onpress={() => getid(item)}
                    >
                      <ARimage
                        source={Images.delete}
                        style={style.imagestyle}
                      />
                    </ARbutton>
                  </View>
                </View>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Name: {""}
                  <ARtext
                    children={item.Name}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Mobile: {""}
                  <ARtext
                    children={item.MobileNo}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={""} size={FontSize.font14}>
                  Email: {""}
                  <ARtext
                    children={item.EmailId}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>
            </View>
          </View>
        )}
        onEndReached={() => {
          Hasmore ? getseller() : null;
        }}
        onEndReachedThreshold={0.5}
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
          ) : null
        }
      />
      <Responsemodal
        visible={Deletemodal}
        Images={Response ? Images.sorry : Images.deletedata}
        message={
          Response ? Response : "Are you sure that you want to delete seller ?"
        }
        subtext={Response ? "Sorry!" : "Are You Sure?"}
        subcolor={Colors.Placeholder}
        subfamily={FontFamily.Regular}
        subsize={FontSize.font20}
        onpress={() => clearrsponse()}
        Onok={() => callfunction()}
        Oncancle={() => Setdeletemodal(false)}
        button={Response ? false : true}
      />
    </ARcontainer>
  );
};

export default Boxofficelist;

const style = StyleSheet.create({
  mapview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hei(1),
    marginHorizontal: wid(3),
  },
  btnview: {
    width: wid(30),
  },
  detailview: {
    backgroundColor: Colors.backgroundcolor,
    marginHorizontal: wid(3),
    paddingHorizontal: wid(4),
    paddingVertical: hei(2),
    borderWidth: normalize(1.5),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(9),
  },
  scrollstyle: {
    marginTop: hei(1.5),
    paddingBottom: wid(18),
    // backgroundColor:"red"
  },
  mainview: {
    marginTop: hei(1),
  },
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  codeview: {
    width: wid(42),
    justifyContent: "center",
  },
  imageview: {
    flexDirection: "row",
    gap: wid(2),
  },
  imagestyle: {
    height: hei(2.5),
    width: hei(2.5),
  },
  viewmargin: {
    marginTop: hei(0.8),
    justifyContent: "center",
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.bordercolor,
  },
});
