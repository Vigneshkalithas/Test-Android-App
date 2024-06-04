import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ASPECTRADIO, COLORS } from "../../Constants";
import { heightPixel } from "../../styles/Responsive";

const Divider = () => {
  return (
    <View
      style={{
        width: ASPECTRADIO.width,
        backgroundColor: COLORS.BorderColor,
        height: heightPixel(1),
      }}
    ></View>
  );
};

export default Divider;

const styles = StyleSheet.create({});
