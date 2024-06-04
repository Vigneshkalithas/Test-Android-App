// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
//   Keyboard,
// } from "react-native";
// import React, { useState } from "react";
// import { Modalize } from "react-native-modalize";
// import {
//   heightPixel,
//   pixelSizeHorizontal,
//   pixelSizeVertical,
//   widthPixel,
// } from "../../styles/Responsive";
// import { COLORS, ICONS, SIZES, ASPECTRADIO } from "../../Constants";
// import GlobalStyle from "../../styles/GlobalStyle";
// import Buttonx from "../Btn/Buttonx";
// import ButtonUnfill from "../Btn/ButtonUnfill";

// const ConfirmBottmSheet = ({ modalizeRef, closeModal, sendFunc }) => {
//   return (
//     <Modalize
//       ref={modalizeRef}
//       adjustToContentHeight={true}
//       snapPoint={ASPECTRADIO.height * 0.15}
//       withHandle={false}
//       style={{ position: "absolute", bottom: 0 }}
//       HeaderComponent={
//         <View style={{ alignItems: "center", paddingTop: 16 }}>
//           <View
//             style={{
//               width: widthPixel(41),
//               height: heightPixel(4),
//               backgroundColor: COLORS.BorderColor,
//               borderRadius: 4,
//             }}
//           />
//         </View>
//       }
//     >
//       <View
//         style={{
//           height: heightPixel(160),
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 20,
//         }}
//       >
//         <View>
//           <Text style={[GlobalStyle.cancelBtn, { color: COLORS.PrimaryText }]}>
//             Are you sure you want to send for pricing
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-around",
//             gap: 20,
//           }}
//         >
//           <ButtonUnfill txt={"Keep Editing"} fn={closeModal} />
//           <Buttonx
//             txt={"Yes"}
//             style={{
//               height: heightPixel(48),
//               width: widthPixel(171),
//               backgroundColor: COLORS.primary,
//               borderRadius: 6,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             fn={sendFunc}
//           />
//         </View>
//       </View>
//     </Modalize>
//   );
// };

// export default ConfirmBottmSheet;

// const styles = StyleSheet.create({
//   btnHead: {
//     width: widthPixel(171),
//     backgroundColor: COLORS.white,
//     borderRadius: 6,
//     height: heightPixel(48),
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Modalize } from "react-native-modalize";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { COLORS, FONT, SIZES, UNIQUEWIDTH, ICONS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import Buttonx from "../Btn/Buttonx";
import ButtonUnfill from "../Btn/ButtonUnfill";
import { MyContext } from "../../context/MyContext";
import { SendForPricing } from "../../apiHelper/Procurement";
import { useNavigation } from "@react-navigation/native";
import { showToaster } from "../Toast/Toaster";
import { selectedDistrictAtom } from "../../atoms/selectedDistrict";
import { useRecoilState } from "recoil";
import { DeleterValueFromAsyncStorage } from "../../storage/AsyncStorage";
import { disableDistrictAtom } from "../../atoms/lotsCount";

const ConfirmBottmSheet = () => {
  const {
    modalizeRef,
    closeModal,
    setOpenSuccessModal,
    confirmModalConfig,
    modalSheetContent,
    userInfo,
  } = useContext(MyContext);
  const [selectedDistrict, setSelectedDistrict] =
    useRecoilState(selectedDistrictAtom);
  const [disableDistrict, setDisableDistrict] =
    useRecoilState(disableDistrictAtom);
  const navigation = useNavigation();
  const sendFunc = async () => {
    closeModal();
    setOpenSuccessModal(true);
  };

  const SendPricing = async () => {
    const Response = await SendForPricing(userInfo.id, selectedDistrict);
    if (Response == "Procurements moved to pricing") {
      closeModal();
      setOpenSuccessModal(true);
      navigation.navigate("Home");
      await DeleterValueFromAsyncStorage("district");
      setSelectedDistrict(null);
      // setDisableDistrict(false);
      await DeleterValueFromAsyncStorage("disableDistrict");
    } else {
      showToaster("Try Again");
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      snapPoint={200}
      withHandle={false}
      style={{ position: "absolute", bottom: 0 }}
      HeaderComponent={
        <View style={{ alignItems: "center", paddingTop: 16 }}>
          <View
            style={{
              width: widthPixel(41),
              height: heightPixel(4),
              backgroundColor: COLORS.BorderColor,
              borderRadius: 4,
            }}
          />
        </View>
      }
    >
      <View
        style={
          modalSheetContent == "Confirm"
            ? [
                {
                  flexDirection: "column",
                  alignItems: "center",
                  gap: heightPixel(30),
                  justifyContent: "center",
                  height: heightPixel(160),
                },
              ]
            : [
                {
                  flexDirection: "column",
                  alignItems: "center",
                  gap: heightPixel(15),
                  justifyContent: "center",
                  height: heightPixel(350),
                },
              ]
        }
      >
        {/* {modalSheetContent == "Export" ? (
          <ExportSheet
            confirmModalConfig={confirmModalConfig}
            closeModal={closeModal}
            sendFunc={sendFunc}
          />
        ) : ( */}
        <ConfirmButton confirmModalConfig={confirmModalConfig} />
        {/* )} */}
        {confirmModalConfig.content ==
        "Are you sure want to send for pricing" ? (
          <BottomSwitches
            confirmModalConfig={confirmModalConfig}
            closeModal={closeModal}
            sendFunc={SendPricing}
          />
        ) : confirmModalConfig.content ==
          "Are you sure want to enter this price?" ? (
          <BottomSwitches
            confirmModalConfig={confirmModalConfig}
            closeModal={closeModal}
            sendFunc={sendFunc}
          />
        ) : (
          <BottomSwitches
            confirmModalConfig={confirmModalConfig}
            closeModal={closeModal}
            sendFunc={sendFunc}
          />
        )}
      </View>
    </Modalize>
  );
};

const ConfirmButton = ({ confirmModalConfig }) => {
  return (
    <View>
      <View>
        <Text style={[GlobalStyle.cancelBtn, { color: COLORS.PrimaryText }]}>
          {confirmModalConfig.content}
        </Text>
      </View>
    </View>
  );
};

const ExportSheet = ({ confirmModalConfig, closeModal, sendFunc }) => {
  const [btnActive, setBtnActive] = useState("Excel");

  return (
    <>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={[GlobalStyle.cancelBtn, { color: COLORS.PrimaryText }]}>
          {confirmModalConfig.content}
        </Text>
      </View>
      <View style={styles.exportBtnHead}>
        <Pressable
          onPress={() => setBtnActive("Excel")}
          style={
            btnActive == "Excel"
              ? [
                  styles.exportBtn,
                  { backgroundColor: COLORS.primary, borderRadius: 6 },
                ]
              : [styles.exportBtn]
          }
        >
          <ICONS.ExcelLogo />
          <Text
            style={
              btnActive == "Excel"
                ? [styles.Btnfonts, { color: COLORS.white }]
                : [styles.Btnfonts]
            }
          >
            Excel
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setBtnActive("Pdf")}
          style={
            btnActive == "Pdf"
              ? [
                  styles.exportBtn,
                  { backgroundColor: COLORS.primary, borderRadius: 6 },
                ]
              : [styles.exportBtn]
          }
        >
          <ICONS.PdfLogo />
          <Text
            style={
              btnActive == "Pdf"
                ? [styles.Btnfonts, { color: COLORS.white }]
                : [styles.Btnfonts]
            }
          >
            PDF
          </Text>
        </Pressable>
      </View>
      <ContentRadiBtn btnActive={btnActive} />
    </>
  );
};

const ContentRadiBtn = ({ btnActive }) => {
  return (
    <View style={{ paddingVertical: pixelSizeVertical(5) }}>
      <View style={styles.content}>
        <Text
          style={
            btnActive == "Excel"
              ? [GlobalStyle.districtText, { color: COLORS.BorderColor }]
              : [GlobalStyle.districtText]
          }
        >
          Graph
        </Text>
        {btnActive == "Excel" ? (
          <ICONS.progreesInActiveExport />
        ) : (
          <ICONS.progreesActive />
        )}
      </View>
      <View style={styles.content}>
        <Text style={GlobalStyle.districtText}>Report</Text>
        <ICONS.progreesActive />
      </View>
    </View>
  );
};

const BottomSwitches = ({ confirmModalConfig, closeModal, sendFunc }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 20,
      }}
    >
      <ButtonUnfill txt={confirmModalConfig.btny} fn={closeModal} />
      <Buttonx
        txt={confirmModalConfig.btnx}
        style={{
          height: heightPixel(48),
          width: widthPixel(171),
          backgroundColor: COLORS.primary,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
        fn={sendFunc}
      />
    </View>
  );
};

export default ConfirmBottmSheet;

const styles = StyleSheet.create({
  btnHead: {
    width: widthPixel(171),
    backgroundColor: COLORS.white,
    borderRadius: 6,
    height: heightPixel(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  exportBtnHead: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(50),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  exportBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    backgroundColor: COLORS.white,
    height: heightPixel(48),
    gap: 8,
  },
  Btnfonts: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
  content: {
    width: UNIQUEWIDTH.wid,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: pixelSizeVertical(10),
  },
});
