import React, { useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Pressable } from "react-native";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS, ICONS } from "../../Constants";

const CardComponent = ({ data }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...GlobalStyle.cardContainer, opacity: fadeAnim }}>
      <View style={[GlobalStyle.cardRow, GlobalStyle.ContainerTop]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <ICONS.RecentActivity />
          <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
            Open Bids
          </Text>
        </View>

        <Pressable onPress={() => navigation.navigate("Agent")}>
          <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
            View all
          </Text>
        </Pressable>
      </View>
      <View style={GlobalStyle.ContainerBottom}>
        <View style={[GlobalStyle.cardRow]}>
          <Text style={[GlobalStyle.cardHeadlineText]}>{data.productName}</Text>
          <Text style={[GlobalStyle.cardHeadlineText]}>{data.quality}</Text>
        </View>
        <View style={GlobalStyle.cardRow}>
          <Text style={GlobalStyle.cardTexts}>{data.quantity}</Text>
          <Text style={GlobalStyle.cardTexts}>{data.lot}</Text>
          <Text style={GlobalStyle.cardTexts}>{data.district}</Text>
        </View>
      </View>
      {/* <Text style={styles.text}>{data.productName}</Text>
      <Text style={styles.text}> {data.district}</Text>
      <Text style={styles.text}>{data.quantity}</Text>
      <Text style={styles.text}>{data.quality}</Text>
      <Text style={styles.text}>{data.lot}</Text> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CardComponent;
