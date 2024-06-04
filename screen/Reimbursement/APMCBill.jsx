import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, UNIQUEWIDTH } from '../../Constants'
import GlobalStyle from '../../styles/GlobalStyle'
import { AntDesign } from '@expo/vector-icons'

const APMCBill = () => {
  return (
    <View style={{flex: 1, borderTopColor:COLORS.BorderColor, borderTopWidth:1, alignItems:'center'}}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <View style={{width:UNIQUEWIDTH.wid}}>
  <DetailsCard/>
  <View style={{marginTop:heightPixel(10)}}>
  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
  <Text style={GlobalStyle.inputText}>Price Details</Text>
  <Pressable>
  <AntDesign name="exclamationcircleo" size={20} color={COLORS.primary}/>
  </Pressable>
  </View>
  <DottedBorder/>
  {PriceDetailsData.map((data,index)=>{
  return(
  <View key={index}>
  <PriceDeatail data={data}/>
  </View>
  )
  })}
  <DottedBorder/>
  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-start"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>Total ({PriceDetailsData.length})</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"center"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>49,885 Kg</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-end"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>₹32986.65</Text>
</View>
  </View>
  <DottedBorder/>
  </View>
   {data=="Creating" ? 
    <Uploader txt={"Attachment"} optn={"Optional"} />
  :
  <View>
   <Text style={GlobalStyle.Label}>Attachment</Text>
   <View style={{flexDirection:'row', gap:15}}>
   <View style={{marginVertical:pixelSizeVertical(10), flexDirection:'row', alignItems:'center', gap:5, justifyContent:'center', width:widthPixel(110), height:heightPixel(40) ,backgroundColor:COLORS.primary, borderRadius:6}}>
    <AntDesign name="pdffile1" size={15} color={COLORS.white} />
    <Text style={[GlobalStyle.idText,{color:COLORS.white}]}>Invoice</Text>
   </View>
   <View style={{marginVertical:pixelSizeVertical(10), flexDirection:'row', alignItems:'center', gap:5, justifyContent:'center', width:widthPixel(70), height:heightPixel(40) ,backgroundColor:COLORS.Secondary, borderRadius:6}}>
    <Text style={GlobalStyle.txtLot}>+20</Text>
    <Entypo name="attachment" size={16} color={COLORS.primary} />
   </View>
   </View>
  </View>
  }
  </View>
<View>
</View>
   </ScrollView>

   
   
  </View>
  )
}

export default APMCBill

const styles = StyleSheet.create({})

