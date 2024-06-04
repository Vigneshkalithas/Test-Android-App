import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from "../../Constants";
import { Entypo } from "@expo/vector-icons";
import { pixelSizeVertical } from "../../styles/Responsive";

const Accordion = ({ title, children, length }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const len = length * 120

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: isOpen ? withTiming(120) : withTiming(0),
      opacity: isOpen ? 1 : 0,
      // backgroundColor: "red",
    };
  });
  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: isOpen ? withTiming("180deg") : withTiming("0deg") },
      ],
    };
  });

  const titleStyle = {
    color: isOpen ? COLORS.primary : COLORS.PrimaryText,
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.medium,
  };

  return (
    <View style={{ width: UNIQUEWIDTH.wid }}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: pixelSizeVertical(10),
        }}
      >
        <Text style={titleStyle}>{title}</Text>
        <Animated.View style={chevronAnimatedStyle}>
          <Entypo
            name="chevron-down"
            size={20}
            color={isOpen ? COLORS.primary : COLORS.PrimaryText}
          />
        </Animated.View>
      </Pressable>
      <Animated.View style={[animatedStyle]}>{children}</Animated.View>
    </View>
  );
};

export default Accordion;
