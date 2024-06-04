import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS, ICONS } from "../Constants";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../styles/Responsive";
import GlobalStyle from "../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";

const DrawerContent = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const Menus = [
    {
      icon: <ICONS.homeProfile />,
      Name: "Home",
      id: 1,
      // navigationKey: "Home",
      navigationKey: "CreateReimbursement",
    },
    {
      icon: <ICONS.leaderBoardProfile />,
      Name: "Leaderboard",
      id: 2,
      navigationKey: "LeaderBoard",
    },
    {
      icon: <ICONS.reimburseMentProfile />,
      Name: "Reimbursements",
      id: 3,
      navigationKey: "Reimbursement",
    },
    {
      icon: <ICONS.APMCProfile />,
      Name: "APMC Winner",
      id: 4,
      navigationKey: "APMCWinner",
    },
    {
      icon: <ICONS.exportDcoumentProfile />,
      Name: "Export Documents",
      id: 5,
      navigationKey: "ExportDocuments",
    },
    {
      icon: <ICONS.helpAndSupport />,
      Name: "Help & Support",
      id: 6,
      navigationKey: "HelpAndSupport",
    },
    {
      icon: <ICONS.privacyAndPolicy />,
      Name: "Privacy Policy",
      id: 7,
      navigationKey: "PrivacyAndPolicy",
    },
    {
      icon: <ICONS.AboutProfile />,
      Name: "About",
      id: 8,
      navigationKey: "Aboutus",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ marginVertical: pixelSizeVertical(15) }}>
          <ICONS.IdhayamLogo />
        </View>
        <Pressable
          style={styles.cardContainerInProfile}
          onPress={() => navigateToScreen("UserProfile")}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <ICONS.userImageProfile />
            <View
              style={{
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Text style={GlobalStyle.overAllHeadLine}>Vignesh Kalithas</Text>
              <Text style={GlobalStyle.cardDateText}>Manager</Text>
            </View>
          </View>
          <View>
            <ICONS.arrowBig />
          </View>
        </Pressable>
        {Menus.map((data, index) => {
          return (
            <View key={data.id}>
              <MenuLists data={data} />
            </View>
          );
        })}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={GlobalStyle.cardDateText}>Version 1.0</Text>
          <Text style={GlobalStyle.cardDateText}>Powerd by Stacia Corp</Text>
        </View>
      </View>
    </View>
  );
};

const MenuLists = ({ data }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: heightPixel(50),
        width: "95%",
        marginVertical: pixelSizeVertical(10),
      }}
      onPress={() => navigation.navigate(data.navigationKey)}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        {data.icon}
        <Text style={GlobalStyle.districtText}>{data.Name}</Text>
      </View>
      <ICONS.arrowSmall />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    marginVertical: pixelSizeVertical(40),
  },
  cardContainerInProfile: {
    width: "100%",
    height: heightPixel(80),
    backgroundColor: COLORS.Secondary,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: pixelSizeHorizontal(15),
  },
});

export default DrawerContent;
