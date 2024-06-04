import { StyleSheet, Text, View, Pressable , RefreshControl, } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { SearchBar, ActivityCard, Filterx } from "../../components";
import { COLORS, ICONS, UNIQUEWIDTH, SIZES, ASPECTRADIO } from "../../Constants";
import { pixelSizeVertical, pixelSizeHorizontal, heightPixel } from "../../styles/Responsive";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { MyContext } from "../../context/MyContext";
import { useNavigation } from "@react-navigation/native";
import { GetOpenBids } from "../../apiHelper/Agents";
import { ActivityIndicator } from "react-native-paper";
import { getValueFromAsyncStorage } from "../../storage/AsyncStorage";


const OpenBidsScreen = () => {
   const { userInfo  } = useContext(MyContext)
  const [apiDatas,setApiDatas] = useState(null)
  const [openData, setOpenData] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchBids(userInfo.id)
    setTimeout(() => {

      setRefreshing(false);
    }, 2000);
  }, []);

  const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }
const FetchBids = async(id)=>{
  const data = await GetOpenBids(id)
  setApiDatas(data)
}

const GetUserInfo = async ()=>{
const UserD = await getValueFromAsyncStorage("userId")
FetchBids(UserD)
}

 useEffect(() => {
 GetUserInfo()
}, [])






 if (!apiDatas) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: pixelSizeVertical(20), paddingBottom:heightPixel(80) }}
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        } >
        {/* <Filterx text={'Recent Activity'} txtClr={COLORS.primary}/> */}
        {Object.keys(apiDatas.recent).length==0 ? <View style={{
        alignItems:'center',
        paddingVertical:pixelSizeVertical(30)}}>
        <ICONS.emptyOpenBids/>
        <Text style={[GlobalStyle.overAllHeadLinePrimary,{fontSize:SIZES.size14, paddingVertical:pixelSizeVertical(15)}]}>No Recent Activity Yet</Text>
        </View> :
        <View style={{  flexDirection: 'column', gap: 10, marginVertical: pixelSizeVertical(10) }}>
          <Filterx text={'Recent Activity'} txtClr={COLORS.primary}/>          
    {Object.keys(apiDatas.recent).map((firstLetter,index)=>{
return(
           <View key={index}>
           <Text style={[GlobalStyle.filteredHeadTxt, { color: COLORS.primary }]}>{firstLetter}</Text>
           {Object.keys(apiDatas.recent[firstLetter]).map((city,index)=>{
           return(
           <View key={index}>
           <Text style={[GlobalStyle.overAllHeadLinePrimary, { paddingVertical: pixelSizeVertical(10) }]}>{city}</Text>
           {apiDatas.recent[firstLetter][city].map((item,index)=>{
           return(
           <View key={index} style={{paddingVertical:pixelSizeVertical(10)}}>
           <ActivityCard data={item}/>
           </View>
           )
           })}
          
           </View>
           )
           })}
           </View>
)
})}
        </View> }
        <Filterx text={'Others Activity'} txtClr={COLORS.primary} />
           {Object.keys(apiDatas.others).length==0 ? 
           <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
           <Text style={GlobalStyle.cardHeadlineText}>There are no records for today.</Text>
           </View> :  
           <>    
{Object.keys(apiDatas.others).map((firstLetter,index)=>{
return(
            <View key={index} style={{ marginVertical: pixelSizeVertical(10) }}>
            <Text style={[GlobalStyle.filteredHeadTxt, { color: COLORS.primary }]}>{firstLetter}</Text>
             {Object.keys(apiDatas.others[firstLetter]).map((city,index)=>{
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

          {apiDatas.others[firstLetter][city].map((item,index)=>{
           return(
           <View key={index} style={{paddingVertical:pixelSizeVertical(10)}}>
           <ActivityCard data={item}/>
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

</>}
      </ScrollView> 
      <View>
      </View>
    </View>
  )
}
export default OpenBidsScreen

const styles = StyleSheet.create({})