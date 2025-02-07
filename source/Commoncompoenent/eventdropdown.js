import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { hei, wid, normalize } from "../theme";
import { Colors } from "../theme";
import { FontFamily, FontSize } from "../theme";
import { ARimage, ARtext } from "../common";
import { ARbutton } from "../common";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import Images from "../Image/Images";
import { EventList } from "../api/Api";

const Eventdropdown = ({
  eventpress,
  onSelectEvent,
  onPressAdd,
  allTicketTypesExist,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const { AsyncValue } = useSelector((state) => state.Auth);

  const fetchData = async () => {
    try {
      const response = await EventList(AsyncValue.OrganizerLoginId);
      setData(
        response?.map((item) => ({
          label: item.EventName,
          value: item.EventMasterid,
        }))
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

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
          }}
          data={data}
          selectedTextStyle={{
            fontSize: FontSize.font13,
            fontFamily: FontFamily.Medium,
          }}
          dropdownPosition={selectedValue ? "bottom" : "top"}
          selectedTextProps={{ numberOfLines: 1 }}
          labelField="label"
          valueField="value"
          placeholder="Select Event"
          maxHeight={hei(23)}
          value={selectedValue?.value}
          showsVerticalScrollIndicator={false}
          onFocus={() => {
            setIsDropdownOpen(true);
            fetchData();
          }}
          onChange={(item) => {
            setSelectedValue(item);
            setIsDropdownOpen(false);
            eventpress();
            onSelectEvent(item.label, item.value);
          }}
          containerStyle={[style.dropdownContainer]}
        />
        <TouchableOpacity
          onPress={onPressAdd}
          disabled={allTicketTypesExist}
          style={{
            opacity: allTicketTypesExist ? .2 : 1,
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
    // backgroundColor:"yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hei(2),
  },
  txtsubview: {
    // backgroundColor:"red",
    width: wid(45),
    justifyContent: "center",
  },
  dropdown: {
    // zIndex: 9999,
    width: wid(30),
    backgroundColor: Colors.lightgrey,
    padding: wid(2),
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    elevation: 5,
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
  },
  textStyle: {
    fontSize: FontSize.font14,
    fontFamily: FontFamily.Medium,
  },
});
