import { Pressable, StyleSheet, Text, View, Linking } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS, ICONS } from "../../Constants";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "../../styles/Responsive";

const ContactCard = ({ agentModal, setAgentModal, current }) => {
  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={styles.ContactCardContainer}>
      <View style={styles.innerContainerRight}>
        <Text style={GlobalStyle.cardDateText}>{current.district}</Text>
        <Pressable
          onPress={() => setAgentModal(!agentModal)}
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <Text style={GlobalStyle.cardHeadlineText}>{current.fullName}</Text>
          <ICONS.DownArrow />
        </Pressable>
      </View>
      <View style={styles.innerContainerLeft}>
        <ICONS.MsgText />
        <Pressable onPress={() => makeCall(current.mobileNo)}>
          <ICONS.Call />
        </Pressable>
        <ICONS.Exclamatry />
      </View>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  ContactCardContainer: {
    flexDirection: "row",
    width: "100%",
    height: heightPixel(74),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    borderRadius: 6,
    marginVertical: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  innerContainerRight: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    gap: 5,
  },
  innerContainerLeft: {
    width: "40%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
