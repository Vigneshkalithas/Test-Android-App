import { StyleSheet, Text, View, Pressable } from 'react-native'
import React ,{ useState } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { BidsCard, Filterx, SearchBar } from "../../components"
import { COLORS, ICONS, UNIQUEWIDTH , SIZES} from '../../Constants'
import { pixelSizeVertical, pixelSizeHorizontal,  } from '../../styles/Responsive'
import { ScrollView } from 'react-native-gesture-handler'
import { BidsDatas } from '../../DataCenter'
import HistoryCards from '../../components/Procurement/HistoryCards'
import { useNavigation } from '@react-navigation/native'
import { ProcurementsHistory } from '../../atoms/Procurement'
import { constSelector, useRecoilState } from 'recoil'
import { ActivityIndicator } from 'react-native-paper'

const DetailsHistoryMonthly = ( {route }) => {
const { item , month } = route.params;
const [procurementHistory,setProcurementHistory] = useRecoilState(ProcurementsHistory)
const [openData, setOpenData] = useState(false)

  const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }
  const navigation = useNavigation()

  if (!procurementHistory) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:COLORS.white}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }
  
  return (
    <View style={GlobalStyle.globalHead}>
    <SearchBar content={'RecentActivity'}/>
    <ScrollView style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(15)}} showsVerticalScrollIndicator={false}>
    <Filterx text={"Monthly History"} txtClr={COLORS.primary} shareBtn={true}/>


    {Object.keys(item).map((dAy,subIndex)=>{
      return(
<View key={subIndex}>

      {Object.keys(procurementHistory[0][month].data[dAy]).map((item,index)=>{
      console.log(Object.keys(procurementHistory[0][month].data[dAy]))
      return(
       <View style={[GlobalStyle.districtTxt]} key={item} >
                {openData === item ? null :
                  <Pressable style={GlobalStyle.flexJusSB} onPress={() => onOpen(item)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{item}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }
                {openData === item ?
                  <View>
                    <Pressable onPress={onOpen} style={GlobalStyle.flexJusSB}>
                      <Text style={GlobalStyle.cancelBtn}>{item}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    {Object.keys(procurementHistory[0][month].data[dAy][item]).map((firstLtter,subIndex)=>{
                    console.log(firstLtter)
                    return(
                    <View key={subIndex} style={{marginVertical:pixelSizeVertical(7)}}>
                    <Text style={[GlobalStyle.filteredHeadTxt, { color: COLORS.primary }]}>{firstLtter}</Text>
                    {Object.keys(procurementHistory[0][month].data[dAy][item][firstLtter]).map((district,inSubIndex)=>{
                    
                    return(
                    <Pressable key={inSubIndex} style={{marginVertical:pixelSizeVertical(7)}} 
                    onPress={()=>navigation.navigate("ParticularDayHistory",{ data:procurementHistory[0][month].data[dAy][item][firstLtter][district].districtData , exjactDate:item})}
                    >
                         <HistoryCards  barClr={"Done"} h1={district} h2={`${procurementHistory[0][month].data[dAy][item][firstLtter][district]?.averageQualityName} Procurement Quality`} quantity={`${procurementHistory[0][month].data[dAy][item][firstLtter][district]?.totalQuantity} Kgs`} />
                       </Pressable>
                    )
                    })}
                    </View>
                    )
                    })}
                  </View> : null}
              </View>
      
      )
      })}
    
             
              
              </View>
              )

      
      })}  
    </ScrollView>
    </View>
  )
}

export default DetailsHistoryMonthly

const styles = StyleSheet.create({})