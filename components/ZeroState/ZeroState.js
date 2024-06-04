import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ASPECTRADIO, SIZES, UNIQUEWIDTH } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";

const ZeroState = ({ data }) => {
  return (
    <View
      style={{ flex: 1, alignItems: "center", marginTop: heightPixel(100) }}
    >
      {data.img}
      <Text
        style={[
          GlobalStyle.overAllHeadLinePrimary,
          {
            paddingTop: pixelSizeVertical(35),
            paddingBottom: pixelSizeVertical(20),
          },
        ]}
      >
        {data.title}
      </Text>
      <Text
        style={[
          {
            textAlign: "center",
            fontSize: SIZES.size14,
            width: widthPixel(350),
          },
          [GlobalStyle.zeroStateHelperTxt],
        ]}
      >
        {data.helperTxt}
      </Text>
    </View>
  );
};

export default ZeroState;

const styles = StyleSheet.create({});
