import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Filterx,  SingleCard, SingleLineCard } from '../../components'
import { pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { COLORS, ICONS, SIZES } from '../../Constants'
import { CompetitorsData } from '../../DataCenter/CompetitorsData'
import { useNavigation } from '@react-navigation/native'
import GlobalStyle from '../../styles/GlobalStyle'
import { useRecoilState } from 'recoil'
import { CompReport} from '../../atoms/Agents';

const CompetitorsReport = () => {
 const [apiCompReportData,setApiCompReportData] = useRecoilState(CompReport)
//  console.log(apiCompReportData)
  return (
    <View style={{paddingHorizontal:pixelSizeHorizontal(15), paddingVertical:pixelSizeVertical(15)}}>
      <View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Filterx text={"All Competitors"} shareBtn={true} txtClr={COLORS.primary} />
    
      {apiCompReportData.length == 0 ? 
       <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
       <Text style={GlobalStyle.cardHeadlineText}>We couldn't find Competitors</Text>
       </View>
       : 
      <>
     {apiCompReportData.map((item,index)=>{
     return(
     <View key={index}>
       <SingleLineCard item={item} />
     </View>
     )
     })}
     </>
}
      </ScrollView>
      
      </View>
    </View>
  )
}

// const CompetitorsCard=({ item })=>{
// const navigation = useNavigation()
// const NavigationRoute = (item) => {
//  navigation.navigate('CompetitorsDetails', {
//             item
//           });
//  }
// return(
// <View style={GlobalStyle.districtTxt} key={item.id}>
      
//         <Pressable
//           style={[GlobalStyle.flexJusSB]}
//           onPress={() => NavigationRoute(item)}
//         >
//           <Text
//             style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}
//           >
//             {item.CompetitorsName}
//           </Text>
//           <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
//             <ICONS.cardOpenIcon />
//           </View>
//         </Pressable>
     
//     </View>
// )
// }

export default CompetitorsReport

const styles = StyleSheet.create({})