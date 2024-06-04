import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../styles/Responsive";
import {
  ASPECTRADIO,
  CENTERSCREEN,
  COLORS,
  FONT,
  ICONS,
  SIZES,
  UNIQUEWIDTH,
} from "../Constants";
import { Feather } from "@expo/vector-icons";

const DownloadCard = ({ item, child }) => {
  return (
    <View style={[styles.uploadCardContainer, { height: heightPixel(62) }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: widthPixel(337),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <View
            style={{
              width: widthPixel(46),
              height: heightPixel(46),
              backgroundColor: "#E8EFFF",
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </View>

          <View style={{ flexDirection: "column", gap: 5 }}>
            <Text style={GlobalStyle.cardHeadlineText}>{item.fileName}</Text>
            {item.fileSize && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  width: "50%",
                }}
              >
                <Text style={GlobalStyle.cardTexts}>{item.fileSize}</Text>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: COLORS.SecondaryText,
                    borderRadius: 4,
                  }}
                ></View>
                <Text style={GlobalStyle.cardTexts}>{item.date}</Text>
              </View>
            )}
          </View>
        </View>
        <View>{child}</View>
      </View>
    </View>
  );
};

export default DownloadCard;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: COLORS.primary,
    width: widthPixel(60),
    height: heightPixel(6),
    marginLeft: widthPixel(65),
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  tabBar: {
    width: UNIQUEWIDTH.wid,
    backgroundColor: COLORS.white,
    // backgroundColor:'red',
    paddingHorizontal: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  label: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.primary,
    textTransform: "capitalize",
  },
  tabStyle: {
    // width: 'auto',
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadCardContainer: {
    width: UNIQUEWIDTH.wid,
    backgroundColor: COLORS.Secondary,
    borderRadius: 6,
    marginVertical: pixelSizeVertical(10),
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 3,
  },
  progressBar: {
    width: widthPixel(337),
    height: heightPixel(5),
    borderRadius: 17,
    backgroundColor: "#D9E2EB",
  },
});
