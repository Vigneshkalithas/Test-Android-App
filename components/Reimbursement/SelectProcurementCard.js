import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../styles/Responsive";
import { COLORS, UNIQUEWIDTH } from "../../Constants";

const SelectProcurementCard = ({ item, actionFn , activeDate }) => {
  return (
    <Pressable
      style={activeDate?.uniqueID ? activeDate.uniqueID == item.id ? [styles.cardActive] : [styles.Card] : [styles.Card]}
      onPress={() => actionFn(item)}
    >
      <Text
        style={
          activeDate?.uniqueID ? activeDate.uniqueID == item.id
            ? [GlobalStyle.districtText, styles.textWhite]
            : [GlobalStyle.districtText] : [GlobalStyle.districtText]
        }
      >
        {item.productName}
      </Text>
      <Text
        style={
          activeDate?.uniqueID ? activeDate.uniqueID == item.id
            ? [GlobalStyle.inputText, styles.textWhite]
            : [GlobalStyle.inputText] : [GlobalStyle.inputText]
        }
      >
        ({item.quantity} Kg)
      </Text>
    </Pressable>
  );
};

export default SelectProcurementCard;

const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.Secondary,
    width: UNIQUEWIDTH.wid,
    height: heightPixel(48),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: pixelSizeHorizontal(15),
    marginVertical: pixelSizeVertical(5),
  },
  cardActive: {
    backgroundColor: COLORS.primary,
    width: UNIQUEWIDTH.wid,
    height: heightPixel(48),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: pixelSizeHorizontal(15),
    marginVertical: pixelSizeVertical(5),
  },
  textWhite: {
    color: COLORS.white,
  },
});
