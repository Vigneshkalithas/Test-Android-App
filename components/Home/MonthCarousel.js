// // MonthCarousel.js

// import React from "react";
// import { View, Text } from "react-native";
// import Carousel from "react-native-snap-carousel";

// const sliderWidth = 300;
// const itemWidth = 250;
// // const itemHeight = 200;

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const MonthCarousel = () => {
//   const renderItem = ({ item }) => (
//     <View style={{ alignItems: "center" }}>
//       <Text style={{ fontSize: 24 }}>{item}</Text>
//     </View>
//   );

//   return (
//     <Carousel
//       data={months}
//       renderItem={renderItem}
//       sliderWidth={sliderWidth}
//       itemWidth={itemWidth}
//       //   vertical
//       loop
//       inactiveSlideOpacity={0.7}
//       inactiveSlideScale={0.9}
//     />
//   );
// };

// export default MonthCarousel;

// MonthCarousel.js

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS } from "../../Constants";
import { heightPixel, pixelSizeVertical } from "../../styles/Responsive";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthCarousel = () => {
  const renderItem = ({ item }) => (
    <View
      style={{
        position: "absolute",
        top: heightPixel(45),
        // backgroundColor: "red",
      }}
    >
      <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
        {item}
      </Text>
    </View>
  );

  return (
    <Carousel
      loop
      width={80}
      height={heightPixel(22)}
      vertical={true}
      // autoPlay={true}
      data={months}
      scrollAnimationDuration={100}
      //   onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={renderItem}
      inactiveSlideOpacity={0.7}
      inactiveSlideScale={0.9}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
  },
  monthCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  monthText: {
    fontSize: 24,
  },
});

export default MonthCarousel;
