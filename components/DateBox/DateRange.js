import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { COLORS, ICONS } from "../../Constants";
import { MyContext } from "../../context/MyContext";

const DateRange = () => {
  const { refDateSheet } = useContext(MyContext);
  return (
    <View>
      <Text
        style={[
          GlobalStyle.cancelBtn,
          { paddingVertical: pixelSizeVertical(25) },
        ]}
      >
        Date Range
      </Text>
      <View style={styles.DateHead}>
        <Pressable
          style={GlobalStyle.DateInputHead}
          onPress={() => refDateSheet.current.open()}
        >
          <Text style={GlobalStyle.placeHolderText}>From Date</Text>
          <ICONS.CalendarView />
        </Pressable>
        <Pressable style={GlobalStyle.DateInputHead}>
          <Text style={GlobalStyle.placeHolderText}>To Date</Text>
          <ICONS.CalendarView />
        </Pressable>
      </View>
    </View>
  );
};

export default DateRange;

const styles = StyleSheet.create({
  DateHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
