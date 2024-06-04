import React from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Button,
  StatusBar,
} from "react-native";

export const showToaster = (text) => {
  ToastAndroid.show(`${text}`, ToastAndroid.SHORT);
};
