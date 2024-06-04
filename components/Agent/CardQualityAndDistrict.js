import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS, UNIQUEWIDTH } from "../../Constants";
import { heightPixel, pixelSizeVertical } from "../../styles/Responsive";

const CardQualityAndDistrict = ({ Ltop, Lbottom, RTop, Rbottom }) => {
  return (
    <View style={styles.containerQD}>
      <View>
        <Text
          style={[
            GlobalStyle.cardDateText,
            { paddingVertical: pixelSizeVertical(5) },
          ]}
        >
          {Ltop}
        </Text>
        <Text style={GlobalStyle.districtText}>{Lbottom}</Text>
      </View>
      <View style={styles.HorizontalLine}></View>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Text
          style={[
            GlobalStyle.cardDateText,
            { paddingVertical: pixelSizeVertical(5) },
          ]}
        >
          {RTop}
        </Text>
        <Text style={GlobalStyle.districtText}>{Rbottom}</Text>
      </View>
    </View>
  );
};

export default CardQualityAndDistrict;

const styles = StyleSheet.create({
  containerQD: {
    width: UNIQUEWIDTH.wid,
    flexDirection: "row",
    backgroundColor: COLORS.Secondary,
    justifyContent: "space-between",
    padding: 10,
    height: heightPixel(69),
    alignItems: "center",
    borderRadius: 6,
  },
  HorizontalLine: {
    height: heightPixel(40),
    width: 2,
    backgroundColor: COLORS.BorderColor,
  },
});
