import { Text, View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ICONS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { pixelSizeVertical } from "../../styles/Responsive";

const ActivityCard = ({ data }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("PricingScreen", { data })}
      style={[
        GlobalStyle.cardContainer,
        { marginVertical: pixelSizeVertical(0) },
      ]}
    >
      <View style={[GlobalStyle.cardRow, GlobalStyle.ContainerTop]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <ICONS.UserIcon />
          <Text style={GlobalStyle.cardBtnText}>{data.name}</Text>
        </View>

        <Text style={GlobalStyle.cardDateText}>{data.date}</Text>
      </View>
      <View style={GlobalStyle.ContainerBottom}>
        <View style={[GlobalStyle.cardRow]}>
          <Text style={GlobalStyle.cardHeadlineText}>{data.productName}</Text>
          <Text style={GlobalStyle.cardHeadlineText}>{data.quality}</Text>
        </View>
        <View style={GlobalStyle.cardRow}>
          <Text style={GlobalStyle.cardTexts}>{data.totalQuantity} Kgs</Text>
          <Text style={GlobalStyle.cardDot}></Text>
          <Text style={GlobalStyle.cardTexts}>{data.totalLots} Lots</Text>
          <Text style={GlobalStyle.cardDot}></Text>
          <Text style={GlobalStyle.cardTexts}>{data.district}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({});
