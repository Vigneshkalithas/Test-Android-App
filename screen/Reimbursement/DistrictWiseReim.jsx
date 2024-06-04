import { StyleSheet, Text, View, Pressable } from 'react-native'
import React ,{useState, useEffect} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { SearchBar, Filterx ,SingleCard} from '../../components'
import { GetAgnetDetails } from '../../apiHelper'
import { ActivityIndicator } from 'react-native-paper'
import { COLORS, ICONS, SIZES, UNIQUEWIDTH, } from '../../Constants';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

const DistrictWiseReim = () => {
const [apiDatas,setApiDatas] = useState(null);
const [openData,setOpenData] = useState(false);
const [openDatao,setOpenDatao] = useState(false);
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
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:COLORS.white}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
    </View>
  }

  return (
    <View style={GlobalStyle.globalHead}>
      <SearchBar content={"RecentActivity"}/>
    <ScrollView contentContainerStyle={{paddingVertical:pixelSizeVertical(20), width:UNIQUEWIDTH.wid}} showsVerticalScrollIndicator={false}>
     <Filterx text={"Recent Districts"} shareBtn={false} filterBtn={true} txtClr={COLORS.primary}/>
     {Object.keys(apiDatas.own[0]).map((data,index)=>{
     
     return(
     <View key={index}>
       <SingleCard  district={data} index={index} item={apiDatas.own[0][data]} openData={openData} onOpen={onOpen} naviKey={"SelectProcurement"}/>
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
    onPress={()=>navigation.navigate("SelectProcurement",{ x:datas})} 
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

export default DistrictWiseReim

const styles = StyleSheet.create({})