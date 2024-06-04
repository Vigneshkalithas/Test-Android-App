import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { pixelSizeVertical } from "../../styles/Responsive";
import InputLabel from "./InputLabel";
import InputComponent from "./InputComponent";
import ErrorText from "./ErrorText";

const InputGroup = ({
  lable,
  inputRef,
  oNChange,
  oNBlur,
  vAlue,
  rtrnKey,
  oNSubmit,
  plceHolder,
  keyBoardType,
  StyleSHeet,
  Error,
  ErrorTxt,
}) => {
  return (
    <View style={{ gap: 10, paddingVertical: pixelSizeVertical(5) }}>
      {lable == "Nil" ? null : <InputLabel lable={lable} />}
      <InputComponent
        inputRef={inputRef}
        oNChange={oNChange}
        oNBlur={oNBlur}
        oNSubmit={oNSubmit}
        vAlue={vAlue}
        rtrnKey={rtrnKey}
        plceHolder={plceHolder}
        keyBoardType={keyBoardType}
        StyleSHeet={StyleSHeet}
      />
      {Error ? (
        <ErrorText txt={ErrorTxt} />
      ) : (
        <Text style={{ position: "absolute" }}></Text>
      )}
    </View>
  );
};

export default InputGroup;

const styles = StyleSheet.create({});
