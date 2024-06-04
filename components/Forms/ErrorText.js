import { Text } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";

const ErrorText = ({ txt }) => {
  return (
    <Text style={[GlobalStyle.ErrorText, { position: "absolute", bottom: -2 }]}>
      {txt}
    </Text>
  );
};

export default ErrorText;
