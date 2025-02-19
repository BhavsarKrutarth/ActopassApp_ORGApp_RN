import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { hei, wid, normalize } from "../theme";
import { Colors } from "../theme";
import { FontFamily, FontSize } from "../theme";
import { ARimage, ARtext } from "../common";
import { ARbutton } from "../common";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import Images from "../Image/Images";
import { EventList } from "../api/Api";
import LottieView from "lottie-react-native";

const Eventdropdown = ({
  eventDataLength,
  eventpress,
  onSelectEvent,
  onPressAdd,
  allTicketTypesExist,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const { AsyncValue } = useSelector((state) => state.Auth);
  const [isLoading, SetLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await EventList(AsyncValue.OrganizerLoginId);
        setData(
          response?.map((item) => ({
            label: item.EventName,
            value: item.EventMasterid,
          }))
        );
      } catch (error) {
      } finally {
        SetLoading(false);
      }
    })();
  }, []);

  return (
    <View style={style.textassignview}>
      <View style={style.txtsubview}>
        <ARtext
          children={"Ticket Assign"}
          align={""}
          size={FontSize.font14}
          fontFamily={FontFamily.Bold}
        />
      </View>
      <View
        style={[
          style.txtsubview,
          {
            alignItems: "flex-end",
            flexDirection: "row",
            gap: wid(3),
          },
        ]}
      >
        <Dropdown
          style={style.dropdown}
          itemTextStyle={style.textStyle}
          placeholderStyle={{
            fontSize: FontSize.font13,
            fontFamily: FontFamily.Medium,
            opacity: isLoading ? 0.2 : 1,
          }}
          data={data}
          selectedTextStyle={{
            fontSize: FontSize.font13,
            fontFamily: FontFamily.Medium,
          }}
          disable={isLoading}
          dropdownPosition={eventDataLength === 0 ? "top" : "bottom"}
          selectedTextProps={{ numberOfLines: 1 }}
          labelField="label"
          valueField="value"
          placeholder="Select Event"
          maxHeight={hei(23)}
          value={selectedValue}
          showsVerticalScrollIndicator={false}
          onChange={(item) => {
            setSelectedValue(item);
            eventpress();
            onSelectEvent(item.label, item.value);
          }}
          containerStyle={[style.dropdownContainer]}
        />
        <TouchableOpacity
          onPress={onPressAdd}
          disabled={!allTicketTypesExist}
          style={{
            opacity: !allTicketTypesExist ? 0.2 : 1,
            paddingBottom: hei(0.5),
          }}
        >
          <ARimage
            source={Images.Add}
            style={{ width: wid(8), height: wid(8) }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Eventdropdown;

const style = StyleSheet.create({
  textassignview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hei(2),
  },
  txtsubview: {
    width: wid(45),
    justifyContent: "center",
  },
  dropdown: {
    width: wid(30),
    backgroundColor: Colors.lightgrey,
    padding: wid(2),
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    justifyContent: "center",
  },
  dropdownContainer: {
    left: wid(4.5),
    backgroundColor: Colors.White,
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    width: wid(90),
    padding: normalize(10),
    marginTop: hei(0.5),
    justifyContent: "center",
    elevation: 0,
    shadowOpacity: 0,
    bottom: Platform.OS === "ios" ? hei(0) : hei(5),
  },
  textStyle: {
    fontSize: FontSize.font14,
    fontFamily: FontFamily.Medium,
  },
});
