import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { ICONS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import { pixelSizeVertical, widthPixel } from "../../styles/Responsive";
import { MyContext } from "../../context/MyContext";

const Filterx = ({ text, txtClr, shareBtn, filterBtn, fn }) => {
  const {
    onOpen,
    updateConfirmModalConfig,
    setModalSheetContent,
    refRBSheet,
    refShareSheet,
  } = useContext(MyContext);

  const ExportDetails = () => {
    setModalSheetContent("Export");
    updateConfirmModalConfig({
      btny: "Cancel",
      btnx: "Export",
      content: "Please ensure the export file type?",
    });
    onOpen();
  };
  return (
    <View
      style={[GlobalStyle.flexJusSB, { paddingVertical: pixelSizeVertical(8) }]}
    >
      <Text style={[GlobalStyle.overAllHeadLine, { color: txtClr }]}>
        {text}
      </Text>
      <View style={{ flexDirection: "row", gap: widthPixel(22) }}>
        {shareBtn ? (
          // <Pressable onPress={ExportDetails}>
          <Pressable onPress={() => refShareSheet.current.open()}>
            <ICONS.ShareAndExport />
          </Pressable>
        ) : null}
        {filterBtn ? null : (
          <Pressable onPress={() => refRBSheet.current.open()}>
            <ICONS.Filter />
          </Pressable>
        )}
      </View>
    </View>
  );
};

// const Filterx = () => {
//   return (
//     <Pressable>
//       <ICONS.Filter />
//     </Pressable>
//   );
// };

export default Filterx;

const styles = StyleSheet.create({});
