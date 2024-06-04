import { Pressable, StyleSheet,Text,View} from 'react-native'
import React , { useState, useEffect, } from 'react'
import { pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { ScrollView } from 'react-native-gesture-handler'
import GlobalStyle from '../../styles/GlobalStyle'
import { COLORS, ICONS, SIZES} from '../../Constants'
import { Filterx ,  SingleCard} from '../../components'
import { useNavigation } from '@react-navigation/native'
import { GetAgnetDetails } from '../../apiHelper'
import { ActivityIndicator } from 'react-native-paper'


const AgentsScreen = () => {
const [openData,setOpenData] = useState(false)
const [apiDatas,setApiDatas] = useState(null)
const [openDatao,setOpenDatao] = useState(false) 
const navigation = useNavigation() 
const onOpen = (id) => {
     setOpenData(openData === id ? null : id)
}

const onOpenOther = (id)=>{
 setOpenDatao(openDatao === id ? null : id)
}

  const FetchDetails = async()=>{
  const Response = await GetAgnetDetails()
  setApiDatas(Response) 
  }

  useEffect(() => {
  FetchDetails()
  }, [])
  



 if (!apiDatas) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }

  return (
    <View style={{flex:1}}>
    <ScrollView contentContainerStyle={{paddingVertical:pixelSizeVertical(20)}} showsVerticalScrollIndicator={false}>
     <Filterx text={"Recent Districts"} shareBtn={true} txtClr={COLORS.primary}/>
     {Object.keys(apiDatas.own[0]).map((data,index)=>{
     return(
     <View key={index}>
       <SingleCard  district={data} index={index} item={apiDatas.own[0][data]} openData={openData} onOpen={onOpen} naviKey={"AgentActivities"}/>
     </View>
     )
     })}
     <View style={{paddingVertical:pixelSizeVertical(20)}}>
    <Filterx text={"Other Districts"} txtClr={COLORS.primary}/>
  {Object.keys(apiDatas.other[0]).map((firstLetter,index)=>{
    return(
    <View key={index} style={{marginVertical:pixelSizeVertical(10)}}>
    <Text style={GlobalStyle.filteredHeadTxt}>{firstLetter}</Text>
    {Object.keys(apiDatas.other[0][firstLetter]).map((cityName,subIndex)=>{
    return(
    <View style={[GlobalStyle.districtTxt]} key={subIndex} >
    {openDatao === cityName ? null : 
    <Pressable style={GlobalStyle.flexJusSB} onPress={()=>onOpenOther(cityName)}>
    <Text style={[GlobalStyle.cardHeadlineText,{fontSize:SIZES.medium}]}>{cityName}</Text> 
    <View style={{paddingRight:pixelSizeHorizontal(10)}}>
     <ICONS.cardOpenIcon/> 
    </View>
    </Pressable>
     }
    {openDatao === cityName ? 
    <View>
    <Pressable onPress={onOpenOther} style={GlobalStyle.flexJusSB}>
    <Text style={GlobalStyle.cancelBtn}>{cityName}</Text>
    <ICONS.UpActiveArrow/>
    </Pressable>
    {apiDatas.other[0][firstLetter][cityName].map((datas,insideIndex)=>{
    return(
    <Pressable 
    onPress={()=>navigation.navigate("AgentActivities",{x:datas})} 
    key={insideIndex} style={[GlobalStyle.flexJusSB,{paddingVertical:pixelSizeVertical(13),paddingHorizontal:pixelSizeHorizontal(5)}]}>
    <Text style={[GlobalStyle.cardHeadlineText]}>{datas.fullName}</Text>
    <ICONS.cardOpenIcon/>
    </Pressable>
    )
    })}
    </View> : null }
    </View>
    )
    })}
    </View>
  )})}
    </View> 
    </ScrollView>
    </View>
  )
}




export default AgentsScreen

const styles = StyleSheet.create({

})

