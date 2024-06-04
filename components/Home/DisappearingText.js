// import React, { useState, useEffect } from "react";
// import { View, Text, Animated } from "react-native";

// const DisappearingText = ({ strings, styleSheet }) => {
//   const [index, setIndex] = useState(0);
//   const fadeAnim = new Animated.Value(1);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 1000, // Dissolve animation duration
//         useNativeDriver: true,
//       }).start(() => {
//         setIndex((prevIndex) => (prevIndex + 1) % strings.length);
//         fadeAnim.setValue(1);
//       });
//     }, 5000); // Switch text every 5 seconds

//     return () => clearInterval(timer);
//   }, [strings.length]);

//   return (
//     // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <Animated.View
//       style={{
//         opacity: fadeAnim,
//         transform: [
//           {
//             scale: fadeAnim.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0.8, 1],
//             }),
//           },
//         ],
//       }}
//     >
//       <Text style={styleSheet}>{strings[index]}</Text>
//     </Animated.View>
//     // </View>
//   );
// };

// export default DisappearingText;

// import React, { useState, useEffect } from "react";
// import { View, Text } from "react-native";
// import { MotiView } from "moti";

// const DisappearingText = ({ strings, styleSheet }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % strings.length);
//     }, 5000); // Switch text every 20 seconds

//     return () => clearInterval(timer);
//   }, [strings.length]);

//   useEffect(() => {
//     const appearanceTimer = setTimeout(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % strings.length);
//     }, 10000); // Start appearing text after 200 milliseconds of dissolving

//     return () => clearTimeout(appearanceTimer);
//   }, [index]);

//   return (
//     // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <MotiView
//       from={{ opacity: 1 }}
//       animate={{ opacity: 0 }}
//       transition={{ type: "timing", duration: 300 }} // Dissolve animation duration
//       key={index} // Key to trigger animation when index changes
//     >
//       <Text style={styleSheet}>{strings[index]}</Text>
//     </MotiView>
//     // </View>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { View, Text } from "react-native";
// import { MotiView } from "moti";

// const DisappearingText = ({ strings, styleSheet }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % strings.length);
//     }, 5000); // Switch text every 5 seconds

//     return () => clearInterval(timer);
//   }, [strings.length]);

//   return (
//     // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <MotiView
//       from={{ opacity: 1 }}
//       animate={{ opacity: 0 }}
//       transition={{ type: "timing", duration: 500 }} // Adjust transition duration to 500 milliseconds
//       key={index} // Key to trigger animation when index changes
//     >
//       <Text style={styleSheet}>{strings[index]}</Text>
//     </MotiView>
//     // {/* </View> */}
//   );
// };

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";

const DisappearingText = ({ strings, styleSheet }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % strings.length);
    }, 5000); // Switch text every 5 seconds

    return () => clearInterval(timer);
  }, [strings.length]);

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <MotiView
      from={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ type: "timing", duration: 1000 }}
      key={index} // Key to trigger animation when index changes
    >
      <Text style={styleSheet}>{strings[index]}</Text>
    </MotiView>
    // </View>
  );
};

export default DisappearingText;
