// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";

// const TextAnimation = ({ textArray }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const fadeAnim = new Animated.Value(0); // Initial opacity is set to 0

//   useEffect(() => {
//     // Fade in animation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 4000, // Adjust duration for slower dissolve
//       useNativeDriver: true, // Use native driver for performance
//     }).start(() => {
//       // Animation completed, now fade out
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 2000, // Adjust duration for slower dissolve
//         useNativeDriver: true,
//       }).start(() => {
//         // Move to the next text
//         if (currentIndex < textArray.length - 1) {
//           setCurrentIndex(currentIndex + 1);
//         } else {
//           // Reset to the first string when all strings have been shown
//           setCurrentIndex(0);
//         }
//       });
//     });

//     // Clear the animation when component unmounts
//     return () => fadeAnim.setValue(0);
//   }, [currentIndex, textArray, fadeAnim]);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ opacity: fadeAnim }}>
//         <Text>{textArray[currentIndex]}</Text>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default TextAnimation;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";

// const TextAnimation = ({ textArray, styless }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const fadeAnim = new Animated.Value(0); // Initial opacity is set to 0

//   useEffect(() => {
//     // Fade in animation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 4000, // Adjust duration for slower dissolve
//       useNativeDriver: true, // Use native driver for performance
//     }).start(() => {
//       // Animation completed, now fade out after a delay
//       setTimeout(() => {
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 2000, // Adjust duration for slower dissolve
//           useNativeDriver: true,
//         }).start(() => {
//           // Move to the next text
//           if (currentIndex < textArray.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//           } else {
//             // Reset to the first string when all strings have been shown
//             setCurrentIndex(0);
//           }
//         });
//       }, 1000); // Delay before starting the fade-out animation
//     });

//     // Clear the animation when component unmounts
//     return () => fadeAnim.setValue(0);
//   }, [currentIndex, textArray, fadeAnim]);

//   return (
//     <Animated.View style={{ opacity: fadeAnim }}>
//       <Text style={styless}>{textArray[currentIndex]}</Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default TextAnimation;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";

// const TextAnimation = ({ textArray, styless }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const fadeAnim = new Animated.Value(0); // Initial opacity is set to 0

//   useEffect(() => {
//     const fadeIn = () => {
//       // Fade in animation
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 5000, // Adjust duration for slower dissolve
//         useNativeDriver: true, // Use native driver for performance
//       }).start(fadeOut); // Start fade-out animation after fade-in animation completes
//     };

//     const fadeOut = () => {
//       // Fade out animation
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 7000, // Adjust duration for slower dissolve
//         useNativeDriver: true,
//       }).start(onFadeOutComplete); // Callback for fade-out completion
//     };

//     const onFadeOutComplete = () => {
//       // Move to the next text
//       if (currentIndex < textArray.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         // Reset to the first string when all strings have been shown
//         setCurrentIndex(0);
//       }
//       fadeIn(); // Start the cycle again with fade-in animation
//     };

//     // Start the animation cycle
//     fadeIn();

//     // Clear the animation when component unmounts
//     return () => fadeAnim.setValue(0);
//   }, [currentIndex, textArray, fadeAnim]);

//   return (
//     <Animated.View style={{ opacity: fadeAnim }}>
//       <Text style={styless}>{textArray[currentIndex]}</Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default TextAnimation;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const TextAnimation = ({ textArray, styless }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(0); // Initial opacity is set to 0

  useEffect(() => {
    const animate = () => {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000, // Increase duration for slower fade-in
        useNativeDriver: true,
      }).start(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000, // Increase duration for slower fade-out
          useNativeDriver: true,
          delay: 1000, // Delay before starting fade-out
        }).start(onFadeOutComplete);
      });
    };

    const onFadeOutComplete = () => {
      // Move to the next text
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      // Restart the animation
      animate();
    };

    // Start the animation cycle
    animate();

    // Clear the animation when component unmounts
    return () => fadeAnim.setValue(0);
  }, [currentIndex, textArray, fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styless}>{textArray[currentIndex]}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TextAnimation;
