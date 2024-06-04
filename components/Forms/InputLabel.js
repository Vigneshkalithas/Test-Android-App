import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";

const InputLabel = ({ lable }) => {
  return <Text style={[GlobalStyle.Label]}>{lable}</Text>;
};

export default InputLabel;
