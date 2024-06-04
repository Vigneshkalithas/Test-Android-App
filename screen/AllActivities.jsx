import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import {  SearchBar, ActivityCard } from "../components";
import { ICONS } from "../Constants";
import { pixelSizeVertical } from "../styles/Responsive";
import { ScrollView } from "react-native-gesture-handler";


const AllActivities = () => {

const AllDatas = [
{
id:1,
agentName:"Agent Name",
date:"10-10-2023",
product:"Black sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Ariyalur",
quality:"Q-A1"
},
{
id:2,
agentName:"Agent Name",
date:"10-10-2023",
product:"Red sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Ariyalur",
quality:"Q-A1"
},
{
id:3,
agentName:"Agent Name",
date:"10-10-2023",
product:"Black sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Ariyalur",
quality:"Q-A1"
},
{
id:4,
agentName:"Agent Name",
date:"10-10-2023",
product:"Red sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Ariyalur",
quality:"Q-A1"
},
{
id:5,
agentName:"Agent Name",
date:"10-10-2023",
product:"Black sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Chengalpattu",
quality:"Q-A1"
},
{
id:6,
agentName:"Agent Name",
date:"10-10-2023",
product:"Black sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Chengapattu",
quality:"Q-A1"
},
{
id:7,
agentName:"Agent Name",
date:"10-10-2023",
product:"Red sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Cuddalore",
quality:"Q-A1"
},
{
id:8,
agentName:"Agent Name",
date:"10-10-2023",
product:"Red sesame",
quantity:"12,789Kg",
lots:"12 Lots",
district:"Cuddalore",
quality:"Q-A1"
},
]

  return(
    <View style={GlobalStyle.globalHead}>
      <SearchBar content={"RecentActivity"}/>
    
      <ScrollView contentContainerStyle={{flexDirection:'column',gap:10 , marginVertical: pixelSizeVertical(15) }} showsVerticalScrollIndicator={false}>
       <View style={[GlobalStyle.spaceBetweenContainer,]}>
        <Text style={GlobalStyle.overAllHeadLine}>Your Activities</Text>
        <ICONS.Filter />
      </View>
      {AllDatas.map((x)=>{
      return(
      <View key={x.id}>
      <ActivityCard data={x}/>
      </View>
      )
      })}
      </ScrollView>
      <View>
      </View>
    </View>
  );
};

export default AllActivities;

const styles = StyleSheet.create({});
