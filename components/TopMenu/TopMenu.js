import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { pixelSizeVertical } from "../../styles/Responsive";
import { ICONS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";

const TopMenu = ({ btnAction, lotCount }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: pixelSizeVertical(10),
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <ICONS.GoBack />
      </Pressable>
      {btnAction == "cancel" ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={GlobalStyle.cancelBtn}>Cancel</Text>
        </Pressable>
      ) : btnAction == "done" ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={GlobalStyle.cancelBtn}>Done</Text>
        </Pressable>
      ) : btnAction == "without" ? null : (
        <Pressable onPress={() => navigation.navigate("ProcurementCart")}>
          {lotCount == 1 ? <ICONS.EmptyCart /> : <ICONS.Addtocart />}
        </Pressable>
      )}
    </View>
  );
};

export default TopMenu;

const styles = StyleSheet.create({});
