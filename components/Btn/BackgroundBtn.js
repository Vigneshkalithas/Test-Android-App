import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React, { useContext } from "react";
import { COLORS, FONT, ICONS, SIZES, ASPECTRADIO } from "../../Constants";
import { heightPixel, widthPixel } from "../../styles/Responsive";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";

const BackgroundBtn = () => {
  const { floatButton, setFloatButton, setProcurementStatus } =
    useContext(MyContext);
  const navigation = useNavigation();
  //   const { setProcurementStatus } = useContext(MyContext);
  const PageNavigation = (page) => {
    if (page == "NewProcurement") {
      setProcurementStatus("new");
      setFloatButton(false);
      navigation.navigate(page);
    }
    setFloatButton(false);
    navigation.navigate(page);
  };
  const closeModal = () => {
    setFloatButton(false);
  };
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={floatButton}
      onRequestClose={closeModal}
    >
      <Pressable
        style={styles.modalBackground}
        onPress={() => setFloatButton(false)}
      >
        <View
          style={{
            position: "absolute",
            bottom: heightPixel(110),
            right: 15,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 48,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.floatBtntext}>Off Beat</Text>
            <Text style={styles.floatBtntext}>Add Competitors</Text>
            <Text style={styles.floatBtntext}>Edit Procurement</Text>
            <Text style={styles.floatBtntext}>New Procurement</Text>
            <Text style={styles.floatBtntext}></Text>
          </View>
          <View
            style={{ flexDirection: "column", gap: 20, alignItems: "center" }}
          >
            <Pressable
              style={styles.offBeat}
              onPress={() => navigation.navigate("Sample1")}
            >
              <ICONS.OffbeatIcon />
            </Pressable>
            <Pressable
              style={styles.offBeat}
              onPress={() => PageNavigation("EditProcurement")}
            >
              <ICONS.AddCompetitors />
            </Pressable>
            <Pressable
              style={styles.offBeat}
              onPress={() => PageNavigation("EditProcurement")}
            >
              <ICONS.EditFloatbtn />
            </Pressable>
            <Pressable
              style={styles.NewProcurement}
              onPress={() => PageNavigation("NewProcurement")}
            >
              <ICONS.NewProcurementFloat />
            </Pressable>
            <Pressable
              style={styles.NewProcurement}
              onPress={() => setFloatButton(false)}
            >
              <ICONS.FloatBtnClose />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default BackgroundBtn;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 25,
  },

  offBeat: {
    width: widthPixel(45),
    height: heightPixel(45),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  NewProcurement: {
    width: widthPixel(57),
    height: heightPixel(57),
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  floatBtntext: {
    fontSize: SIZES.size14,
    fontFamily: FONT.EuclidSemiBold,
    color: COLORS.white,
  },
});
