import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Filterx,  SingleCard ,ChartComponent } from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { COLORS, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { CompetitorsData } from '../../DataCenter'
import { useNavigation } from '@react-navigation/native'
import GlobalStyle from '../../styles/GlobalStyle'
import { useRecoilState } from 'recoil'
import { AnalyticsData } from '../../atoms/Agents'


const Analytics = () => {
 const [analyticsData,setAnalyticsData] = useRecoilState(AnalyticsData)
 console.log(analyticsData.length)

  return (
     <View style={{paddingHorizontal:pixelSizeHorizontal(15), paddingVertical:pixelSizeVertical(15)}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:pixelSizeVertical(25)}}>
      <Filterx text={"Overview"} shareBtn={true} txtClr={COLORS.primary} />
      <ChartComponent/>
      <View style={{paddingVertical:pixelSizeVertical(20)}}>
      <Text style={GlobalStyle.overAllHeadLine}>Statistics</Text>
      </View>
      {analyticsData.length == 0 ? 
      <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
       <Text style={GlobalStyle.cardHeadlineText}>We couldn't find Statistics</Text>
       </View>
       :
      <>
      {analyticsData.map((data,index)=>{
      return(
       <View key={index}>
       <Datas data={data}/>
      </View>
      )
      })}
      </>
}
      </ScrollView>
    </View>
  )
}




const Datas = ({data,keys})=>{
return(
<View style={[GlobalStyle.flexJusSB,{alignItems:'center',  borderBottomWidth: 1,
    borderBottomColor: COLORS.BorderColor,paddingBottom:10, paddingTop:5}]}>
      <View style={{flexDirection:'column', gap:7}}>
      <Text style={GlobalStyle.districtText}>{data.date}</Text>
      <Text style={GlobalStyle.cardDateText}>{data.averageQualityName} - Average Quality</Text>
      </View>
      <View>
      <Text style={GlobalStyle.cancelBtn}>{data.quantity} T</Text>
      </View>
      </View>
)
}
export default Analytics

const styles = StyleSheet.create({
  statisticContainer: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(330),
    backgroundColor: COLORS.Secondary,
    borderRadius: 6,
    marginVertical: pixelSizeVertical(10),
  
  },
})