import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ARcontainer, ARimage, ARLoader } from "../../common";
import { ARheader } from "../../common";
import { hei, wid, normalize } from "../../theme";
import Images from "../../Image/Images";
import { FontSize, FontFamily } from "../../theme";
import { Colors } from "../../theme";
import { getActionFromState, useNavigation } from "@react-navigation/native";
import {
  Eventdropdown,
  Inputdata,
  Scbutton,
  Uploadphoto,
} from "../../Commoncompoenent";
import {
  DeleteDiscount_Box,
  GetDiscount_Box,
  UpdateDiscount_Box,
} from "../../api/Api";

const Boxofficedetail = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emptyView, setEmptyView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    eventName: "",
    eventId: "",
  });

  useEffect(() => {
    if (selectedEvent.eventId) {
      getDiscount_Box();
    }
  }, [selectedEvent.eventId]);

  const getDiscount_Box = async () => {
    try {
      setLoading(true);
      const response = await GetDiscount_Box(11, selectedEvent.eventId);
      if (response && response.length > 0) {
        setData(response[0]);
      } else {
        setData({});
      }
    } catch (error) {
      console.error("Error fetching discount box:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDiscount_Box = async () => {
    setLoading(true);
    try {
      const response = await UpdateDiscount_Box(data);
      if (response.ResponseCode === 0) {
        setError("0");
      } else {
        setError(response.ResponseMessage);
      }
    } catch (error) {
      console.error("Error updating discount box:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscount_Box = async () => {
    setLoading(true);
    try {
      const response = await DeleteDiscount_Box(data.BoxOfficeDiscountid);
      if (response) getDiscount_Box();
    } catch (error) {
      console.error("Error deleting discount box:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <ARheader
        lefttch={{ paddingLeft: wid(1) }}
        texts={"Boxoffice Details"}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{ height: hei(2.5), width: hei(2.5) }}
        Leftpress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={50}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={style.containerview}>
            <Uploadphoto oneditpress={() => console.log("")} />
            <View style={style.inputcontainerview}>
              <Inputdata
                txtchildren={"Code"}
                placeholder={"012345678"}
                inputvalue={""}
                onchange={() => {}}
              />
              <Inputdata
                txtchildren={"Name"}
                placeholder={"Enter your name"}
                inputvalue={""}
                onchange={() => {}}
              />
              <Inputdata
                txtchildren={"Email ID"}
                placeholder={"acto@gmail.com"}
                inputvalue={""}
                onchange={() => {}}
              />
              <Inputdata
                txtchildren={"Mobile No"}
                placeholder={"012345678"}
                inputvalue={""}
                onchange={() => {}}
              />
            </View>
            <Eventdropdown
              eventpress={() => console.log("Event Pressed")}
              onSelectEvent={(eventName, eventId) =>
                setSelectedEvent({ eventName, eventId })
              }
              onPressAdd={() => setEmptyView(true)}
            />
            {isLoading ? (
              <ARLoader visible={isLoading} />
            ) : (
              <DiscountInputView
                data={data}
                setData={setData}
                updateDiscount_Box={updateDiscount_Box}
                deleteDiscount_Box={deleteDiscount_Box}
              />
            )}
          </View>
        </ScrollView>
        <Modal
          visible={emptyView}
          transparent
          animationType="slide"
          onDismiss={() => setEmptyView(false)}
        >
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <TouchableOpacity onPress={() => setEmptyView(false)}>
                <ARimage
                  source={Images.backarrow}
                  style={{
                    width: wid(6),
                    height: wid(6),
                    marginBottom: hei(4),
                  }}
                />
              </TouchableOpacity>
              <DiscountInputView
                data={data}
                setData={setData}
                updateDiscount_Box={updateDiscount_Box}
                deleteDiscount_Box={deleteDiscount_Box}
                emptyView={emptyView}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ARcontainer>
  );
};

export default Boxofficedetail;

const style = StyleSheet.create({
  containerview: {
    paddingHorizontal: wid(4),
    flex: 1,
  },
  inputcontainerview: {
    marginTop: hei(3),
    backgroundColor: Colors.progressbackground,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: wid(100),
    height: hei(100),
    backgroundColor: "white",
    paddingVertical: hei(8),
    paddingHorizontal: wid(4),
    borderRadius: 10,
  },
});

const DiscountInputView = ({
  data,
  setData,
  updateDiscount_Box,
  deleteDiscount_Box,
  emptyView,
}) => {
  const handleInputChange = useCallback((field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  return (
    <>
      <View style={[style.inputcontainerview, { marginTop: hei(1) }]}>
        <Inputdata
          txtchildren={"Name"}
          placeholder={"Actoscript"}
          inputvalue={data?.EventName || ""}
          editable={false}
        />
        <Inputdata
          txtchildren={"To Amount"}
          placeholder={"10"}
          inputvalue={data?.ToAmount?.toString() || ""}
          onchange={(v) => handleInputChange("ToAmount", v)}
        />
        <Inputdata
          txtchildren={"From Amount"}
          placeholder={"100"}
          inputvalue={data?.FromAmount?.toString() || ""}
          onchange={(v) => handleInputChange("FromAmount", v)}
        />
        <Inputdata
          txtchildren={"Discount"}
          placeholder={"10"}
          inputvalue={data?.DiscountAmount?.toString() || ""}
          onchange={(v) => handleInputChange("DiscountAmount", v)}
        />
      </View>
      <Scbutton
        onsavepress={emptyView ?  : updateDiscount_Box}
        oncanclepress={emptyView ? "" : deleteDiscount_Box}
        styles={{ marginVertical: hei(3), gap: wid(1) }}
        backgroundColor={emptyView ? Colors.Black : Colors.Red}
        children={emptyView ? "Cancel" : "Delete"}
      />
    </>
  );
};
