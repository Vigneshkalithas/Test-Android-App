import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing, Image } from "react-native";
// import { Svg, Path, Circle } from "react-native-svg";
import { ICONS } from "../../Constants";
import {
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";

// const ProgressTracker = ({ stages }) => {
//   const len = stages.length - 1;
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingVertical: pixelSizeVertical(30),
//       }}
//     >
//       {stages.map((data, index) => {
//         return (
//           <View
//             style={
//               index == 0
//                 ? [
//                     {
//                       flexDirection: "column",
//                       gap: 20,
//                       width: widthPixel(data.txtWidht),
//                     },
//                   ]
//                 : index == len
//                 ? [
//                     {
//                       flexDirection: "column",
//                       gap: 20,
//                       width: widthPixel(data.txtWidht),
//                       alignItems: "flex-end",
//                     },
//                   ]
//                 : [
//                     {
//                       flexDirection: "column",
//                       gap: 20,
//                       width: widthPixel(data.txtWidht),
//                       alignItems: "center",
//                     },
//                   ]
//             }
//           >
//             <View>
//               <ICONS.progressInActive />
//               {len == index ? null : (
//                 <View
//                   style={{
//                     position: "absolute",
//                     left: widthPixel(45),
//                     top: heightPixel(15),
//                   }}
//                 >
//                   <ICONS.progressArrowGrey />
//                 </View>
//               )}
//             </View>
//             <Text
//               style={
//                 len == index
//                   ? [GlobalStyle.cardDateText, { textAlign: "right" }]
//                   : [GlobalStyle.cardDateText]
//               }
//             >
//               {data.label}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

const ProgressTracker = ({ status }) => {
  return (
    <View
      style={{ alignItems: "center", paddingVertical: pixelSizeVertical(30) }}
    >
      {status == "post-bid" ? (
        <Image source={ICONS.ProgressStage1} alt="stepIndicatorstage1" />
      ) : (
        <Image source={ICONS.stepIndicatorNotActive} alt="stepIndicator" />
      )}
    </View>
  );
};

export default ProgressTracker;
