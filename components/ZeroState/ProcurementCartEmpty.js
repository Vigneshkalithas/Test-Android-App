import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from "../../Constants";
import TopMenu from "../TopMenu/TopMenu";
import GlobalStyle from "../../styles/GlobalStyle";
import { pixelSizeVertical, widthPixel } from "../../styles/Responsive";

const ProcurementCartEmpty = ({title, helperText}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: UNIQUEWIDTH.wid }}>
        <TopMenu btnAction={"without"} />
      </View>
      <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
        <ICONS.EmptyProcurementCart />
        <Text style={[GlobalStyle.overAllHeadLinePrimary,{paddingTop:pixelSizeVertical(35),paddingBottom:pixelSizeVertical(20)}]}>{title}</Text>
        <Text style={[{textAlign:"center", fontSize:SIZES.size14, width:widthPixel(350)},[GlobalStyle.onBoaringText]]}>{helperText}</Text>
      </View>
    </View>
  );
};

export default ProcurementCartEmpty;

const styles = StyleSheet.create({});
