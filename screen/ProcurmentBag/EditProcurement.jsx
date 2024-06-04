import { StyleSheet, Text, View, Animated, Button, Pressable } from 'react-native'
import React ,{ useState, useRef, useEffect, useContext } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { COLORS, ICONS, UNIQUEWIDTH } from '../../Constants';
import { SearchBar } from '../../components';
import { pixelSizeVertical } from '../../styles/Responsive';
import { useNavigation } from '@react-navigation/native';
import { FetchEditProcurement } from "../../apiHelper"
import { ActivityIndicator } from 'react-native-paper';
import { MyContext } from '../../context/MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Datas = [
{
id:'1',
name:'Sivagangai',
total:'134',
},
{
id:'2',
name:'Tirupur',
total:'148',
},
{
id:'3',
name:'The Nilgiris',
total:'176',
}
]




const EditProcurement = () => {
      const navigation = useNavigation()
      const [apiData,setApiData] = useState(null)
      const {userInfo , procurementEdited} = useContext(MyContext)
  
      
      useEffect(()=>{
        GetId()
       console.log("Yes backUp is Running")
      },[procurementEdited])

      useEffect(()=>{
        // GetEditProcurement(userInfo.id)
        GetId()
       },[])

      const GetEditProcurement = async(id)=>{
      const Res = await FetchEditProcurement(id)
      if(Res==null){
        setApiData([])
   }else{
    
        setApiData(Res)
   }}

   const GetId = async()=>{
    const storedValue = await AsyncStorage.getItem('userId');
    const id = JSON.parse(storedValue)
    GetEditProcurement(id)
  }
  

    if(!apiData) {
      return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
      </View>
    }
  return (
    <View style={GlobalStyle.globalHead}>
     <View>
       <SearchBar content={'RecentActivity'}/>
       <View style={{marginVertical:pixelSizeVertical(15)}}>
       <Text style={GlobalStyle.overAllHeadLinePrimary}>Edit Procurement</Text>
       </View>

       {Object.keys(apiData).map((cName,index)=>{
        console.log(apiData[cName])
return(
        <Pressable 
          onPress={ ()=>navigation.navigate('EditContentScreen', { item: apiData[cName] , itemDistrict:cName , itemCount:apiData[cName].districtCount , })} 
          key={index} style={[GlobalStyle.flexJusSB,{alignItems:'center', borderBottomColor:COLORS.BorderColor, borderBottomWidth:1}]}>
         <Text style={[GlobalStyle.districtTxt]}>{cName} <Text style={[GlobalStyle.Label,{color:COLORS.primary}]}>({apiData[cName].districtCount})</Text></Text>
         <ICONS.cardOpenIcon/>
        </Pressable>
)
       })}
     </View>
    </View>
  )
}

export default EditProcurement

const styles = StyleSheet.create({})