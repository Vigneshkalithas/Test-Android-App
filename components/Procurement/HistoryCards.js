import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES, ICONS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "../../styles/Responsive";
const HistoryCards = ({ barClr, h1, h2, quantity }) => {
  return (
    <View style={styles.calendarCardConatiner}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View
          style={[
            styles.bar,
            {
              backgroundColor:
                barClr == "Pending"
                  ? COLORS.primary
                  : barClr.status == "Done"
                  ? COLORS.DoneGreen
                  : COLORS.DeclineRed,
            },
          ]}
        ></View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text style={styles.kgText}>{h1}</Text>
          <Text style={[GlobalStyle.cardTexts, { fontSize: SIZES.size13 }]}>
            {h2}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {quantity ? <Text style={styles.kgText}>{quantity}</Text> : null}
        <ICONS.cardOpenIcon />
      </View>
    </View>
  );
};

export default HistoryCards;

const styles = StyleSheet.create({
  calendarCardConatiner: {
    width: "100%",
    height: heightPixel(75),
    backgroundColor: COLORS.Secondary,
    borderRadius: 8,
    marginVertical: pixelSizeVertical(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: pixelSizeHorizontal(10),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
  },
  bar: {
    width: 4,
    height: heightPixel(44),
    // backgroundColor:COLORS.primary,
  },
  kgText: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.medium,
  },
});
