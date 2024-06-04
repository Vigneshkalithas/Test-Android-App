import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import GlobalStyle from "../../styles/GlobalStyle";
import { heightPixel, pixelSizeVertical } from "../../styles/Responsive";
import { COLORS, UNIQUEWIDTH } from "../../Constants";
import ErrorText from "../Forms/ErrorText";

const Uploader = ({ txt, fn, optn, Error, ErrorTxt }) => {
  return (
    <View style={{ paddingVertical: pixelSizeVertical(15) }}>
      <Text style={GlobalStyle.Label}>
        {txt} ({optn})
      </Text>
      <Pressable style={styles.uploadFileContainer} onPress={fn}>
        <Feather name="upload" size={20} color={COLORS.SecondaryText} />
        <Text style={GlobalStyle.idText}>Upload File</Text>
      </Pressable>
      {Error && <ErrorText txt={ErrorTxt} />}
    </View>
  );
};

export default Uploader;

const styles = StyleSheet.create({
  uploadFileContainer: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(48),
    borderColor: COLORS.BorderColor,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "dashed",
    marginVertical: pixelSizeVertical(10),
    backgroundColor: "#FCFDFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
