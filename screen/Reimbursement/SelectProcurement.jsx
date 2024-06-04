import { Pressable, StyleSheet, Text, View , ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from '../../Constants'
import { useNavigation } from '@react-navigation/native'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { ScrollView } from 'react-native-gesture-handler'
import { Buttonx, Filterx, Loader, SelectProcurementCard, showToaster } from '../../components'
import { getValueFromAsyncStorage } from '../../storage/AsyncStorage'
import { GetApiData } from '../../apiHelper'

const SelectProcurement = ( {route , navigation} ) => {
const { x } = route.params;
const [procurementDatas, setProcurementDatas] = useState()

const DataLists = [{
"22 Oct" : [ {productName:"White Sesame", count:"20 Lots",active:false},
{productName:"Red Sesame", count:"80 Lots",active:false},
{productName:"Black Sesame", count:"100 Lots",active:false}],
"23 Oct" : [ {productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}],
"24 Oct" : [{productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}],
 "25 Oct" : [{productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}],
 "26 Oct" : [{productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}],
 "27 Oct" : [{productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}],
 "28 Oct" : [{productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}],
 "29 Oct" : [{productName:"White Sesame", count:"20 Lots",active:false},
 {productName:"Black Sesame", count:"100 Lots",active:false}]

 }
]
useEffect(() => {
GetId(x.id)
}, [])
const GetId = async(agentId)=>{ 
const id = await getValueFromAsyncStorage("userId")
CallApi(id, agentId)
}

const CallApi = async(id, agentId)=>{
  const ProcDatas = await GetApiData(`bill-statement/statements/${id}/${agentId}`, "Get Procurment in Reimbursement");
  if(ProcDatas != null){
    setProcurementDatas(ProcDatas)}
    }
const [temp, setTemp] = useState()
const [datas,setDatas] = useState(DataLists)
 const [activeDate, setActiveDate] = useState(null);
const ChangeStatus = (item)=>{
  const ChoosenStates = { date : item.date , uniqueID : item.id}
 if(activeDate===null || activeDate?.uniqueID != item.id){
  setActiveDate(ChoosenStates)
 }
 else{
  setActiveDate(null)
  }
 }

if(!procurementDatas){
return <Loader/>
}


return (
    <View style={GlobalStyle.globalHead}>
      <View style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(5)}}>
      <Pressable onPress={()=>navigation.goBack()}>
       <ICONS.GoBack/>
      </Pressable>
      <View style={{paddingVertical:pixelSizeVertical(10)}}>
      <Filterx  text={"Select Procurement"} txtClr={COLORS.primary}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:pixelSizeVertical(150)}}>
      {Object.keys(procurementDatas).map((data,index)=>{
      return(
      <View key={index} style={{paddingVertical:pixelSizeVertical(5)}}>
      <Text style={[GlobalStyle.dateTextReim,{paddingVertical:pixelSizeVertical(5)}]}>{data}</Text>
      {procurementDatas[data].map((item,subIndex)=>{
       return(
      <View key={subIndex}>
      <SelectProcurementCard item={item} actionFn={ChangeStatus} activeDate={activeDate}/>
      </View>
      )
      })}
      </View>
      )
      })}
      </ScrollView>
      </View>
       {activeDate === null ? null :
       <View style={styles.btnHeadContainer}>
       <Buttonx txt={"Next"} style={GlobalStyle.btnNext} fn={()=>navigation.navigate("AgentWages")}/>
      </View>}
    </View>
  )
}

export default SelectProcurement

const styles = StyleSheet.create({
btnHeadContainer:{
    width: ASPECTRADIO.width,
    height: heightPixel(90),
    backgroundColor: COLORS.white,
    position: "absolute",
    top: "94%",
    alignItems:'center',
    justifyContent: "center",
    shadowColor: "#101518",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 35
}
})