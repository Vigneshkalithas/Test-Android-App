import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../Constants";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
