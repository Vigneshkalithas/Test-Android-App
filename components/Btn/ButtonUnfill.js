import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS } from "../../Constants";

const ButtonUnfill = ({ txt, fn }) => {
  return (
    <Pressable style={GlobalStyle.btnUnfill} onPress={fn}>
      <Text style={[GlobalStyle.LoginBtnText, { color: COLORS.primary }]}>
        {txt}
      </Text>
    </Pressable>
  );
};

export default ButtonUnfill;

const styles = StyleSheet.create({});
