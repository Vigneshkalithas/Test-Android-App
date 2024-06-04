import { StyleSheet, View, Image, Pressable, TextInput } from "react-native";
import React from "react";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from "../../Constants";
import CustomAnimatedInput from "./CustomAnimatedInput";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import GlobalStyle from "../../styles/GlobalStyle";
import { Drawer } from "react-native-paper";

const SearchBarWithout = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.head}>
      <Pressable onPress={() => navigation.goBack()}>
        <ICONS.GoBack />
      </Pressable>

      <View style={styles.container}>
        <ICONS.SearchIcon />
        <TextInput
          style={styles.input}
          placeholder={"Search Topic"}
          editable={false}
          placeholderTextColor={COLORS.PlaceHolderText}
        />
      </View>
    </View>
  );
};

export default SearchBarWithout;

const styles = StyleSheet.create({
  head: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(53),
    backgroundColor: COLORS.Secondary,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  input: {
    height: heightPixel(53),
    width: ASPECTRADIO.width * 0.5,
    paddingHorizontal: pixelSizeHorizontal(7),
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
