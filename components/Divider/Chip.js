import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "../../Constants";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../styles/Responsive";

const Chip = ({ active, txt }) => {
  return (
    <View>
      <Text
        style={active ? [styles.ChipTextActive] : [styles.ChipTextInActive]}
      >
        {txt}
      </Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  ChipTextActive: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: pixelSizeHorizontal(15),
    paddingVertical: pixelSizeVertical(9),
    borderRadius: 20,
    fontFamily: FONT.EuclidSemiBold,
    fontSize: SIZES.size14,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    // position: "absolute",
  },
  ChipTextInActive: {
    backgroundColor: COLORS.white,
    paddingHorizontal: pixelSizeHorizontal(15),
    paddingVertical: pixelSizeVertical(9),
    color: COLORS.SecondaryText,
    borderRadius: 20,
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    // position: "absolute",
  },
});
