import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import { COLORS } from "../Constants";

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.white,
  },
});
