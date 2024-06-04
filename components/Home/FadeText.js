import React, { useState, useEffect } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import { ICONS, COLORS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";

const FadeText = ({ names }) => {
  // const names = ["Vignesh", "Kalithas", "Ramasamy"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Change name every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % names.length);

      // Reset opacity for the next animation
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 5000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Animated.Text style={[{ opacity: fadeAnim }]}>
        {names[currentIndex]}
      </Animated.Text>
    </View>
  );
};

export default FadeText;
