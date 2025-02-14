import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import Scbutton from "./Scbutton";
import ARimage from "../common/ARimage";
import Images from "../Image/Images";
import Inputdata from "./Inputdata";
import { Colors, FontFamily, FontSize, hei, normalize, wid } from "../theme";
import ARtext from "../common/ARtext";
import { Dropdown } from "react-native-element-dropdown";

const TicketModal = ({
  data,
  showEmptyView,
  setShowEmptyView,
  selectedEvent,
  ticketData,
  setTicketData,
  ticketType,
  setTicketType,
  setTicketTypeID,
  ticketBalance,
  ticketQtyAdd,
  IsError,
  setError,
  selectedTicketType,
  balance,
  ticketTypeID,
}) => {
  return (
    <Modal
      visible={showEmptyView}
      transparent
      animationType="slide"
      onDismiss={() => setShowEmptyView(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowEmptyView(false);
                setError("");
              }}
            >
              <ARimage
                source={Images.backarrow}
                style={{
                  width: wid(6),
                  height: wid(6),
                  marginBottom: hei(5),
                }}
              />
            </TouchableOpacity>
            <View style={[styles.inputcontainerview, { marginTop: hei(0) }]}>
              <Inputdata
                txtchildren={"Name"}
                placeholder={"Suvarn Navaratri"}
                inputvalue={selectedEvent || ""}
                onchange={(v) => console.log(v)}
                editable={false}
              />
              <View style={{ marginVertical: hei(1) }}>
                <ARtext children={"Ticket Type"} align={"left"} />
                <Dropdown
                  style={styles.dropdown}
                  placeholder={
                    selectedTicketType
                      ? `Selected: ${selectedTicketType}`
                      : "Event"
                  }
                  data={data}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={[
                    styles.placeholderStyle,
                    { color: Colors.Black },
                  ]}
                  labelField="label"
                  valueField="value"
                  value={selectedTicketType}
                  onChange={(item) => {
                    if (
                      !ticketType.some((t) => t.TicketTypeid === item.value)
                    ) {
                      setTicketType((prev) => [
                        ...prev,
                        {
                          TicketType: item.label,
                          TicketTypeid: item.value,
                        },
                      ]);
                    }
                    setTicketTypeID(item.value);
                    ticketBalance(item.value);
                  }}
                />
              </View>

              <Inputdata
                txtchildren={"Available Ticket"}
                placeholder={"0"}
                inputvalue={balance ? String(balance) : "0"}
                editable={false}
              />
              <Inputdata
                txtchildren="Ticket Qty"
                placeholder="0"
                inputvalue={ticketData.ticketQty}
                onchange={(v) => setTicketData({ ...ticketData, ticketQty: v })}
              />
            </View>

            {IsError && (
              <ARtext
                style={{
                  paddingVertical: hei(1),
                  paddingHorizontal: wid(3),
                }}
                color={Colors.Red}
                size={FontSize.font11}
                fontFamily={FontFamily.Light}
              >
                {IsError}
              </ARtext>
            )}

            <Scbutton
              onsavepress={() => {
                ticketQtyAdd(ticketTypeID, balance, ticketData.ticketQty);
              }}
              children={"Cancel"}
              oncanclepress={() => setTicketData("")}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TicketModal;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 5,
    backgroundColor: Colors.backgroundcolor,
    borderWidth: 1,
    borderRadius: normalize(6),
    borderColor: Colors.bordercolor,
    height: hei(4.5),
    paddingHorizontal: wid(3),
  },
  placeholderStyle: {
    fontSize: FontSize.font13,
    fontFamily: FontFamily.Regular,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: wid(100),
    height: hei(100),
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    paddingTop: hei(10),
  },
  closeButton: {
    backgroundColor: Colors.Black,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
