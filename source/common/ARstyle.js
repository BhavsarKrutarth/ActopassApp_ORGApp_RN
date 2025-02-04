import { StyleSheet } from "react-native";
import { hei, wid } from "../theme/Responsive";
import Colors from "../theme/Color";

const ARstyle = StyleSheet.create({
  flexrowbetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  end: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image100: {
    width: "100%",
    height: "100%",
    // backgroundColor:'green'
  },
});

export default ARstyle;
