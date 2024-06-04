import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";

const Buttonx = ({ txt, style, fn, disabled }) => {
  return (
    <Pressable
      style={disabled ? [style, { opacity: 0.7 }] : [style]}
      onPress={fn}
      disabled={disabled}
    >
      <Text style={GlobalStyle.LoginBtnText}>{txt}</Text>
    </Pressable>
  );
};

export default Buttonx;

const styles = StyleSheet.create({});
