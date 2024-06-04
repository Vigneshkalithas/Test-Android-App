import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { heightPixel } from "../../styles/Responsive";
import { COLORS, ICONS } from "../../Constants";

const DropDownCard = ({
  DropDownheight,
  closeDropdown,
  current,
  apiCompReportData,
  content,
}) => {
  return (
    <View
      style={[
        GlobalStyle.DropdownHead,
        {
          height: heightPixel(DropDownheight),
        },
      ]}
    >
      <View style={{ padding: 10 }}>
        {apiCompReportData.map((data, index) => {
          return (
            <Pressable
              key={data.id}
              style={GlobalStyle.listHead}
              onPress={() => closeDropdown(data.name)}
            >
              <Text
                style={
                  current == data.name
                    ? [GlobalStyle.districtText, { color: COLORS.primary }]
                    : [GlobalStyle.districtText]
                }
              >
                {data.name}
              </Text>
              {current == data.name ? <ICONS.smallsuccessIcon /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default DropDownCard;

const styles = StyleSheet.create({});
