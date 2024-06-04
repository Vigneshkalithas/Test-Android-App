import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { ICONS } from "../../Constants";
import { MyContext } from "../../context/MyContext";
import { useNavigation } from "@react-navigation/native";

const FloatBtn = () => {
  const { setFloatButton } = useContext(MyContext);
  const navigation = useNavigation();
  return (
    <Pressable
      style={GlobalStyle.floatBtn}
      onPress={() => setFloatButton(true)}
      //   onPress={() => navigation.navigate("ActionMenu")}
    >
      <ICONS.PlusIcon />
    </Pressable>
  );
};

export default FloatBtn;

const styles = StyleSheet.create({});
