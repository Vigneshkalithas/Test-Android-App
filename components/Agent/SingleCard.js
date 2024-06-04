import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyle from "../../styles/GlobalStyle";
import { ICONS, SIZES } from "../../Constants";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../styles/Responsive";

const SingleCard = ({ district, index, item, openData, onOpen, naviKey }) => {
  const navigation = useNavigation();

  const ViewParticularAgent = (x) => {
    navigation.navigate(naviKey, {
      x,
    });
  };
  return (
    <View style={GlobalStyle.districtTxt}>
      {openData === index ? null : (
        <Pressable
          style={[GlobalStyle.flexJusSB]}
          onPress={() => onOpen(index)}
        >
          <Text
            style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}
          >
            {district}
          </Text>
          <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
            <ICONS.cardOpenIcon />
          </View>
        </Pressable>
      )}
      {openData === index ? (
        <View>
          <Pressable onPress={onOpen} style={GlobalStyle.flexJusSB}>
            <Text style={GlobalStyle.cancelBtn}>{district}</Text>
            <ICONS.UpActiveArrow />
          </Pressable>
          <View style={{ marginVertical: pixelSizeVertical(5) }}>
            {item.map((x, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => ViewParticularAgent(x)}
                  style={[
                    GlobalStyle.flexJusSB,
                    {
                      paddingVertical: pixelSizeVertical(12),
                      paddingHorizontal: pixelSizeHorizontal(5),
                    },
                  ]}
                >
                  <Text style={[GlobalStyle.cardHeadlineText]}>
                    {x.fullName}
                  </Text>
                  <ICONS.cardOpenIcon />
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SingleCard;
