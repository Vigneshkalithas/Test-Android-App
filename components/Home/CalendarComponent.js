import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyle from "../../styles/GlobalStyle";
import { heightPixel, pixelSizeHorizontal } from "../../styles/Responsive";
import { ICONS, COLORS } from "../../Constants";
import MonthCarousel from "./MonthCarousel";

const CalendarComponent = () => {
  const navigation = useNavigation();
 const [empty,setEmpty] = useState(true)
  return (
    <View style={GlobalStyle.statisticContainer}>
      <View
        style={[
          GlobalStyle.flexJusSB,
          {
            height: heightPixel(50),
            alignItems: "center",
            paddingHorizontal: pixelSizeHorizontal(10),
          },
        ]}
      >
        <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
          October,2023
        </Text>
        {/* <MonthData initialMonth="January" initialData={months["January"]} /> */}
        {/* <MonthCarousel /> */}
        <Pressable onPress={() => navigation.navigate("CalenderView")}>
          <ICONS.FullViewBtn />
        </Pressable>
      </View>
      {empty ?
       <View style={{justifyContent:'center', alignItems:"center", height:heightPixel(230), flexDirection:"column", gap:10}}>
  <ICONS.EmptyStateCalendar/>
  <Text style={GlobalStyle.dateText}>No Data</Text>
      </View> : 
      <View>
        <View></View>
      </View>
      }
    </View>
  );
};

export default CalendarComponent;
