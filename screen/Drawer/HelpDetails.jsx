import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from '../../Constants'
import { SearchBarWithout } from '../../components'
import { pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import GlobalStyle from '../../styles/GlobalStyle'
import { Divider } from 'react-native-paper';

const HelpDetails = ( { route , navigation} ) => {
 const { data } = route.params
  return (
    <View style={{flex:1, backgroundColor:COLORS.white,alignItems:'center'}}>
     <View style={{paddingVertical:pixelSizeVertical(30),}}>
     <SearchBarWithout/>
     </View>
     <View style={{width:UNIQUEWIDTH.wid,}}>
     <Text style={GlobalStyle.overAllHeadLinePrimary}>{data.name}</Text>
     </View>
     <View style={{paddingVertical:pixelSizeVertical(10)}}>
     {data.details.map((item,index)=>{
     return(
     <Pressable key={index} style={{paddingVertical:pixelSizeVertical(5),alignItems:"center"}} onPress={()=>navigation.navigate("HepDetailsInfo",{item})}>
     <View  style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',  width:UNIQUEWIDTH.wid}}>
     <Text style={[GlobalStyle.districtText,{width:widthPixel(310)}]}>{item.Ques}</Text>
     <ICONS.arrowSmall/>
     </View>
     <View style={{width:ASPECTRADIO.width}}>
     <Divider style={{backgroundColor:COLORS.BorderColor, height:1, marginVertical:pixelSizeVertical(20)}}/>
     </View>
     </Pressable>
     )
     })}
     </View>
    </View>
  )
}

export default HelpDetails

const styles = StyleSheet.create({})