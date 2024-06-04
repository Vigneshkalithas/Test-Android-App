import { View, Text } from "react-native";
import React from "react";
import { styles } from "../Home/RecentActivityCard";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS } from "../../Constants";
import { heightPixel, widthPixel } from "../../styles/Responsive";

const Label = ({ txt, w, h }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        width: widthPixel(w),
        height: heightPixel(h),
      }}
    >
      <Text style={GlobalStyle.btnFillText}>{txt}</Text>
    </View>
  );
};

export default Label;
