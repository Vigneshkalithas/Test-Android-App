import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyle from "../../styles/GlobalStyle";
import { heightPixel, pixelSizeHorizontal } from "../../styles/Responsive";
import { COLORS, ICONS } from "../../Constants";
import { ScrollView } from "react-native-gesture-handler";
import ListCard from "../DetaillViews/ListCard";
import { BidsDatas } from "../../DataCenter/BidsData";
import { useRecoilState } from 'recoil';
import { BidsDataList } from '../../atoms/Home';
import { date } from "yup";

const ListComponent = () => {
  const navigation = useNavigation();
  const [bidsList,setBidsList] = useRecoilState(BidsDataList)
  const [empty,setEmpty]= useState(false)
    
  return (
    <View style={GlobalStyle.statisticContainer}>
      <View
        style={[
          GlobalStyle.flexJusSB,
          {
            height: heightPixel(50),
            alignItems: "center",
            paddingHorizontal: pixelSizeHorizontal(10),
          },
        ]}
      >
        <Text style={[GlobalStyle.cardBtnText, { color: COLORS.primary }]}>
          Today
        </Text>
        
        <Pressable onPress={() => navigation.navigate("ListView")}>
          <ICONS.FullViewBtn />
        </Pressable>
      </View>
      {bidsList.length == 0 ?
       <View style={{justifyContent:'center', alignItems:"center", height:heightPixel(230), flexDirection:"column", gap:10}}>
  <ICONS.EmptyStateCalendar/>
  <Text style={GlobalStyle.dateText}>No Data</Text>
      </View> : 
      <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {bidsList[0][Object.keys(bidsList[0])[0]].map((data,subIndex)=>{
              console.log('data',data)
  return(
            <View
              key={subIndex}
              style={{ paddingHorizontal: pixelSizeHorizontal(10) }}>
              <ListCard data={data}/>
            </View>
  )
            })}
            </View>
      </ScrollView>
}
    </View>
  );
};

export default ListComponent;

const styles = StyleSheet.create({});
