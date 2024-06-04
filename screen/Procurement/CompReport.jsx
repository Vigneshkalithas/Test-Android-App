import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext , useState, useEffect} from 'react'
import { pixelSizeVertical, pixelSizeHorizontal } from '../../styles/Responsive'
import { Filterx } from '../../components'
import { MyContext } from '../../context/MyContext'
import { useNavigation } from '@react-navigation/native'
import GlobalStyle from '../../styles/GlobalStyle'
import { ICONS, SIZES, COLORS } from '../../Constants'
import { GetCompetitorsDistrict } from "../../apiHelper"
import { ActivityIndicator } from 'react-native-paper'

const CompReport = () => {
const {ownData,filteredOthersData} = useContext(MyContext)
const [openData,setOpenData] = useState(false)
const navigation = useNavigation() 
const [apiDatas, setApiDatas] = useState(null)
useEffect(() => {
 GetCompetitorsDistricts()
 }, [])

 const GetCompetitorsDistricts=async(id)=>{
  const Datas = await GetCompetitorsDistrict()
  if(Datas==null){
   setApiDatas([])
 }else{
   setApiDatas(Datas)
 }
 }

const onOpen = (id) => {
     setOpenData(openData === id ? null : id)
  }

  if (!apiDatas) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:COLORS.white}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }
  return (
    <View style={{paddingVertical:pixelSizeVertical(20)}}>
    <Filterx text={"Competitors"} txtClr={COLORS.primary} shareBtn={true}/>

    {Object.keys(apiDatas[0]).length==0 ? 
           <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
           <Text style={GlobalStyle.cardHeadlineText}>There are no Competitors.</Text>
           </View> 
           : 
           <>
     {Object.keys(apiDatas[0]).map((firstLetter,index)=>{
     return(
      <View key={index} style={{marginVertical:pixelSizeVertical(10)}}>
          <Text style={GlobalStyle.filteredHeadTxt}>{firstLetter}</Text>
          {Object.keys(apiDatas[0][firstLetter]).map((city,subIndex)=>{
          return(
          <View style={[GlobalStyle.districtTxt]} key={subIndex}>
    <Pressable style={GlobalStyle.flexJusSB} onPress={()=>navigation.navigate("AllCompetitors",{data:apiDatas[0][firstLetter][city]})}>
    <Text style={[GlobalStyle.cardHeadlineText,{fontSize:SIZES.medium}]}>{city}</Text> 
    <View style={{paddingRight:pixelSizeHorizontal(10)}}>
     <ICONS.cardOpenIcon/> 
    </View>
    </Pressable>
    </View>
          )
          })}
      </View>
     )
     })}
     </>
}
    </View> 
  )
}

export default CompReport

const styles = StyleSheet.create({})