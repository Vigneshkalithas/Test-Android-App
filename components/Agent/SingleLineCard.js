import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyle from "../../styles/GlobalStyle";
import { ICONS, SIZES } from "../../Constants";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../styles/Responsive";

const SingleLineCard = ({ item }) => {
  const navigation = useNavigation();
  const NavigationRoute = (item) => {
    navigation.navigate("CompetitorsDetails", {
      item,
    });
  };
  return (
    <View style={[GlobalStyle.districtTxt]} key={item.id}>
      <Pressable
        style={[GlobalStyle.flexJusSB]}
        onPress={() => NavigationRoute(item)}
      >
        <Text
          style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}
        >
          {item.name}
        </Text>
        <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
          <ICONS.cardOpenIcon />
        </View>
      </Pressable>
    </View>
  );
};

export default SingleLineCard;

const styles = StyleSheet.create({});
