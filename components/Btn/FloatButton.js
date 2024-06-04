import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES } from "../../Constants";
import { heightPixel, widthPixel } from "../../styles/Responsive";
import { View, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FloatButton = () => {
  const [state, setState] = React.useState({ open: false });
  const navigation = useNavigation();
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  // const isFabVisible =
  //   navigation.isFocused("Home") ||
  //   navigation.isFocused("Agent") ||
  //   navigation.isFocused("Procurement");
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        fabStyle={{
          backgroundColor: open ? "white" : COLORS.primary,
          marginBottom: heightPixel(110),
          // zIndex: 99999999,
          // position: "absolute",
          // top: heightPixel(120),
          // right: widthPixel(5),
        }}
        // style={{ marginBottom: heightPixel(100) }}
        backdropColor="rgba(0, 0, 0, 0.5)"
        color={open ? COLORS.primary : "white"}
        icon={open ? "close" : "plus"}
        actions={[
          // { icon: "plus", onPress: () => console.log("Pressed add") },
          {
            icon: () => <ICONS.OffbeatIcon />,
            label: "Off Beat",
            style: styles.InnerBtns,
            labelTextColor: COLORS.white,
            labelStyle: styles.label,
            onPress: () => console.log("off Beat Pressed"),
          },
          {
            icon: () => <ICONS.AddCompetitors />,
            label: "Add Competitors",
            style: styles.InnerBtns,
            labelTextColor: COLORS.white,
            labelStyle: styles.label,
            onPress: () => navigation.navigate("CreateCompatitors"),
          },
          {
            icon: () => <ICONS.EditFloatbtn />,
            label: "Edit Procurement",
            style: styles.InnerBtns,
            labelTextColor: COLORS.white,
            labelStyle: styles.label,
            onPress: () => navigation.navigate("EditProcurement"),
          },
          {
            icon: () => <ICONS.NewProcurementFloat />,
            label: "New Procurement",
            style: styles.InnerBtns,
            labelTextColor: COLORS.white,
            labelStyle: styles.label,
            onPress: () => navigation.navigate("NewProcurement"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container occupy the whole screen
    // position: "relative", // Allow FAB.Group to position itself within the container
    zIndex: 90,
  },
  label: {
    fontSize: SIZES.size14,
    fontFamily: FONT.EuclidSemiBold,
  },
  InnerBtns: {
    backgroundColor: "white",
    width: widthPixel(40),
    height: heightPixel(40),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: "center",
    // alignSelf: "center",
  },
});
