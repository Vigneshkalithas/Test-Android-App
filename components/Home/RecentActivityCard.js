import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ICONS, COLORS } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import DisappearingText from "./DisappearingText";

const RecentActivityCard = ({ product }) => {
  const navigation = useNavigation();
  const [empty, setEmpty] = useState(true)
  // const navigatateToProcurement = () => {
  //   // navigation.navigate("Agent", { screen: "PricingScreen" });
  //   navigation.navigate("PricingScreen");
  // };
  const productName = [
    "Black Sesame Seed",
    "Red Sesame Seed",
    "Yellow Sesame Seed",
  ];
  const quality = ["A1", "A2", "A3"];
  const quantity = ["23,457 Kgs", "14,726 Kgs", "10,254 Kgs"];
  const lots = ["87 Lots", "74 Lots", "32 Lots"];
  const districts = ["Theni", "Madurai", "Coimbatore"];


// if(!data){
//   return(
//     <Pressable
//     style={GlobalStyle.cardContainer}>
//     <View style={{justifyContent:"center",alignItems:'center', height:"100%"}}>
//       <Text style={GlobalStyle.cardTexts}>No Open Bids!</Text>
//     </View> 
//   </Pressable>
//   )
// }
  return (
    <Pressable
      style={GlobalStyle.cardContainer}
      // onPress={navigatateToProcurement}
    >
      {/* { l==0 ? 
      <View style={{justifyContent:"center",alignItems:'center', height:"100%"}}>
        <Text style={GlobalStyle.cardTexts}>No Open Bids!</Text>
      </View> : */}
      <>
      <View style={[GlobalStyle.cardRow, GlobalStyle.ContainerTop]}>
        
      
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <ICONS.RecentActivity />
          <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
            Open Bids
          </Text>
        </View>
        {/* <Pressable onPress={() => navigation.navigate("AllActivities")}> */}
        <Pressable onPress={() => navigation.navigate("Agent")}>
          <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
            View all
          </Text>
        </Pressable>
        
      </View>

      <View style={GlobalStyle.ContainerBottom}>
        <View style={[GlobalStyle.cardRow]}>
          <Text style={GlobalStyle.cardHeadlineText}>{product.productName}</Text>
          {/* <DisappearingText
            strings={productName}
            styleSheet={GlobalStyle.cardHeadlineText}
          /> */}
          <Text style={GlobalStyle.cardHeadlineText}>{product.quality}</Text>
          {/* <DisappearingText
            strings={quality}
            styleSheet={GlobalStyle.cardHeadlineText}
          /> */}
        </View>
        <View style={GlobalStyle.cardRow}>
          <Text style={GlobalStyle.cardTexts}>{product.totalQuantity} Kgs </Text>
          {/* <DisappearingText
            strings={quantity}
            styleSheet={GlobalStyle.cardTexts}
          /> */}
          <Text style={GlobalStyle.cardDot}></Text>
          <Text style={GlobalStyle.cardTexts}>{product.totalLots} Lots</Text>
          {/* <DisappearingText strings={lots} styleSheet={GlobalStyle.cardTexts} /> */}
          <Text style={GlobalStyle.cardDot}></Text>
          <Text style={GlobalStyle.cardTexts}>{product.district}</Text>
          {/* <DisappearingText
            strings={districts}
            styleSheet={GlobalStyle.cardTexts}
          /> */}
        </View>
      </View>
      </>
{/* } */}
    </Pressable>
  );
};



export const EmptyCard = ()=>{

  return(
    <Pressable
        style={GlobalStyle.cardContainer}>
        <View style={{justifyContent:"center",alignItems:'center', height:"100%"}}>
          <Text style={GlobalStyle.cardTexts}>No Open Bids!</Text>
        </View> 
      </Pressable>
  )
}


export default  RecentActivityCard;

export const styles = StyleSheet.create({});
