// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Svg, { Circle, Line, Polygon } from "react-native-svg";
// import { LinearGradient } from "expo-linear-gradient";

// const StepIndicator = ({ steps, currentStep }) => {
//   const stepIcons = ["📦", "🚚", "✅"]; // Replace with your custom icons

//   const getLineColor = (stepIndex) =>
//     stepIndex <= currentStep ? "#4CAF50" : "#D3D3D3";

//   return (
//     <View style={styles.container}>
//       <Svg height="50" width="100%">
//         {Array.from({ length: steps - 1 }, (_, i) => (
//           <Line
//             key={i}
//             x1={(i + 1) * (100 / steps) + "%"}
//             y1="25"
//             x2={(i + 2) * (100 / steps) + "%"}
//             y2="25"
//             stroke={getLineColor(i)}
//             strokeWidth="2"
//             strokeDasharray="4 4"
//           />
//         ))}
//         {Array.from({ length: steps }, (_, i) => (
//           <Circle
//             key={i}
//             cx={(i + 1) * (100 / steps) + "%"}
//             cy="25"
//             r="10"
//             fill={i === currentStep ? "#4CAF50" : "#D3D3D3"}
//           />
//         ))}
//         {currentStep < steps - 1 && (
//           <Polygon
//             points={`${(currentStep + 2) * (100 / steps) - 7.5} 15, ${
//               (currentStep + 2) * (100 / steps) + 7.5
//             } 25, ${(currentStep + 2) * (100 / steps) - 7.5} 35`}
//             fill="#4CAF50"
//           />
//         )}
//       </Svg>
//       <View style={styles.iconContainer}>
//         {stepIcons.map((icon, index) => (
//           <Text key={index} style={styles.icon}>
//             {icon}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   iconContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   icon: {
//     fontSize: 20,
//   },
// });

// export default StepIndicator;

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StepIndicator = () => {
  return (
    <View>
      <Text>StepIndicator</Text>
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({});
