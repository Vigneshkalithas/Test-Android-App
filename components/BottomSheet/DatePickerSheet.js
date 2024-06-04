import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import React, { useContext, useState, useRef } from "react";
import { MyContext } from "../../context/MyContext";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import {
  ASPECTRADIO,
  COLORS,
  FONT,
  ICONS,
  SIZES,
  UNIQUEWIDTH,
} from "../../Constants";
import RBSheet from "react-native-raw-bottom-sheet";
import GlobalStyle from "../../styles/GlobalStyle";
// import DatePicker from "react-native-datepicker";

const DatePickerSheet = () => {
  const { refDateSheet } = useContext(MyContext);
  const [date, setDate] = useState(new Date());
  return (
    <RBSheet
      ref={refDateSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.8}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
      }}
    >
      <View style={{ width: UNIQUEWIDTH.wid }}>
        <View style={[styles.DateHead, { alignItems: "center" }]}>
          <Text
            style={[
              GlobalStyle.cancelBtn,
              { paddingVertical: pixelSizeVertical(15) },
            ]}
          >
            Date Range
          </Text>
          <Pressable onPress={() => refDateSheet.current.close()}>
            <ICONS.CloseIconLogin />
          </Pressable>
        </View>
        <View style={styles.DateHead}>
          <Pressable
            style={styles.DateInputHead1}
            onPress={() => refDateSheet.current.open()}
          >
            <Text style={GlobalStyle.placeHolderText}>From Date</Text>
          </Pressable>
          <Pressable style={styles.DateInputHead1}>
            <Text style={GlobalStyle.placeHolderText}>To Date</Text>
          </Pressable>
        </View>
        {/* <View style={styles.container}>
          <Text style={styles.label}>Select Date:</Text>
          <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            placeholder="Select date"
            format="YYYY-MM-DD"
            minDate="2020-01-01"
            maxDate="2025-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can add more custom styles as needed
            }}
            onDateChange={(selectedDate) => {
              setDate(selectedDate);
            }}
          />
        </View> */}
      </View>
    </RBSheet>
  );
};

export default DatePickerSheet;

const styles = StyleSheet.create({
  DateHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DateInputHead1: {
    width: widthPixel(183),
    height: heightPixel(54),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  datePicker: {
    width: 200,
    ...Platform.select({
      ios: {
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
      },
      android: {
        // Android specific styles if needed
      },
    }),
  },
});
