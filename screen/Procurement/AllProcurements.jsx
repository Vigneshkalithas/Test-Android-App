
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { SearchBar, ActivityCard, Filterx, BidsCard } from "../../components";
import { COLORS, ICONS, UNIQUEWIDTH, SIZES } from "../../Constants";
import { pixelSizeVertical, pixelSizeHorizontal } from "../../styles/Responsive";
import { ScrollView } from "react-native-gesture-handler";
import { MyContext } from "../../context/MyContext";
import { BidsDatas ,CompetitorsData  } from '../../DataCenter'
import { useNavigation } from "@react-navigation/native";
import { MyProcrements } from "../../apiHelper/Procurement"
import { ActivityIndicator } from "react-native-paper";
const AllProcurements = () => {
  const {userInfo, filteredOwnData, filteredOthersData, } = useContext(MyContext)
  const [openData, setOpenData] = useState(false)
  const [apiDatas,setApiDatas] = useState(null)

 useEffect(() => {
 GetMyProcurements(userInfo.id)
 }, [])

 const GetMyProcurements=async(id)=>{
  const Datas = await MyProcrements(id)
  if(Datas==null){
   setApiDatas([])
 }else{
   setApiDatas(Datas)
 }
 }
 
  const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }
  const navigation = useNavigation()

    if (!apiDatas) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:COLORS.white}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop:pixelSizeVertical(10),paddingBottom: pixelSizeVertical(25) }}>
        <Filterx text={'My Procurements'} txtClr={COLORS.primary} shareBtn={true} />
        <View style={{ flexDirection: 'column', gap: 10, marginVertical: pixelSizeVertical(10) }}>
         {Object.keys(apiDatas.own[0]).length==0 ? 
         <View style={{paddingVertical:pixelSizeVertical(30), alignItems:'center'}}>
         <ICONS.emptyOpenBids/>
         <Text style={[GlobalStyle.cancelBtn, {paddingVertical:pixelSizeVertical(10)}]}>No Procurements Yet</Text>
         </View> :
        <View style={{  flexDirection: 'column', gap: 10, marginVertical: pixelSizeVertical(10) }}>          
    {Object.keys(apiDatas.own[0]).map((firstLetter,index)=>{
return(
           <View key={index}>
           <Text style={[GlobalStyle.filteredHeadTxt, { color: COLORS.primary }]}>{firstLetter}</Text>
           {Object.keys(apiDatas.own[0][firstLetter]).map((city,index)=>{
           return(
           <View key={index}>
           <Text style={[GlobalStyle.overAllHeadLinePrimary, { paddingVertical: pixelSizeVertical(10) }]}>{city}</Text>
           {apiDatas.own[0][firstLetter][city].map((item,index)=>{
           return(
             <Pressable key={index} style={{paddingVertical:pixelSizeVertical(10)}} onPress={()=>navigation.navigate("DetailsHistory", {item})}>
             <BidsCard data={item}/>
             </Pressable>
           )
           })}
           </View>
           )
           })}
           </View>
)
})}
        </View> }
        </View>
        <Filterx text={'Others Procurement'} txtClr={COLORS.primary} />
         {Object.keys(apiDatas.other[0]).length==0 ? 
           <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
           <Text style={GlobalStyle.cardHeadlineText}>There are no records for today.</Text>
           </View> :  
           <>    
{Object.keys(apiDatas.other[0]).map((firstLetter,index)=>{
return(
          <View key={index} style={{ marginVertical: pixelSizeVertical(10) }}>
            <Text style={[GlobalStyle.filteredHeadTxt, { color: COLORS.primary }]}>{firstLetter}</Text>
             {Object.keys(apiDatas.other[0][firstLetter]).map((city,index)=>{
             return(
            
            <View style={[GlobalStyle.districtTxt]} key={index} >
                {openData == city ? null :
                  <Pressable style={GlobalStyle.flexJusSB} onPress={() => onOpen(city)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{city}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }

                 {openData == city ?
                  <View>
                    <Pressable onPress={onOpen} style={GlobalStyle.flexJusSB}>
                      <Text style={GlobalStyle.cancelBtn}>{city}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>

          {apiDatas.other[0][firstLetter][city].map((item,index)=>{
           return(
           <Pressable key={index} style={{paddingVertical:pixelSizeVertical(10)}} onPress={()=>navigation.navigate("DetailsHistory", {item})}>
             <BidsCard data={item}/>
             </Pressable>    
           )
           })}
   </View> : null}
                </View>
             )
             })}
            </View>
)
})}
</>
}
      </ScrollView>
      <View>
      </View>
    </View>
  )
}

export default AllProcurements

const styles = StyleSheet.create({})










