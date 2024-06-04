import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../Constants";

const InputComponent = ({
  inputRef,
  oNChange,
  oNBlur,
  vAlue,
  rtrnKey,
  oNSubmit,
  plceHolder,
  keyBoardType,
  StyleSHeet,
}) => {
  return (
    <TextInput
      ref={inputRef}
      keyboardType={keyBoardType}
      onChangeText={oNChange}
      onBlur={oNBlur}
      value={vAlue}
      returnKeyType={rtrnKey}
      onSubmitEditing={oNSubmit}
      style={StyleSHeet}
      placeholder={plceHolder}
      placeholderTextColor={COLORS.SecondaryText}
    ></TextInput>
  );
};

export default InputComponent;
