import { Pressable, StyleSheet, Text, View, Keyboard, ActivityIndicator} from 'react-native'
import React, { useState, useRef , useContext, useEffect} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT,SIZES, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import {  BottomSheetx, Buttonx , Label, NewProcurementForm , NewProcurementWithBags,TopMenu } from "../../components"
import { AgentData } from '../../DataCenter/AgentData'
import { useRecoilState} from "recoil";
import { selectedDistrictAtom, selectedDistrictErrorAtom, selectedDistrictWithBagsAtom } from "../../atoms/selectedDistrict";
import { disableDistrictAtom, lotCountAtom ,districtListAtom} from "../../atoms/lotsCount";
import { MyContext } from '../../context/MyContext'
import { FetchDistrictData, GetLotNo } from "../../apiHelper/Procurement"
import axios from 'axios';
import { Api } from '../../api/api';
import { StoreValueToAsyncStorage, getValueFromAsyncStorage } from '../../storage/AsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'



const NewProcurement = () => {

    const formRef = useRef()
    const [bottomSheetContent ,setBottomSheetContent] = useState('district')
    const [selectedDistrict , setSelectedDistrict] = useRecoilState(selectedDistrictAtom)
    const [selectedDistrictError,setselectedDistrictError] = useRecoilState(selectedDistrictErrorAtom)
    const [selectedDistrictWithBags, setSelectedDistrictWithBags] = useRecoilState(selectedDistrictWithBagsAtom)
    const [bagsWeight, setBagsWeight]= useState(75);
    const {userInfo,apiLoading,setApiLoading , refDistrictSheet } = useContext(MyContext)
    const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);
    const [disableDistrict,setDisableDistrict] = useRecoilState(disableDistrictAtom)
    const [districtList,setDistrictList] = useRecoilState(districtListAtom)
    const [districtStatus, setDistrictStatus] = useState(false)
    

    

const handleCustomSubmit = async() => {
      if(selectedDistrict==null){
        setselectedDistrictError(true)
      }      
      else{
        // setApiLoading(true);
        setDisableDistrict(true)
        await StoreValueToAsyncStorage("disableDistrict", "true")
        formRef.current?.handleSubmit()
        // setApiLoading(true);
      }
    }

const modalizeRef = useRef(null);
const onOpen = async() => {
   setBottomSheetContent("district")
   Keyboard.dismiss();
    setTimeout( async() => {
       try {
      await modalizeRef.current?.open();  
      // await  refDistrictSheet.current.open();   
  } catch (error) {
    console.error('Error opening bottom sheet:', error);
  }
    }, 50);
  };

  const FetchLotno = async(id)=>{
   const Lotno = await GetLotNo(id)
   setLotCountAtom(Lotno)
   }

  const setDistrict = async()=>{
   const dist = await getValueFromAsyncStorage("district")
   const bag = await getValueFromAsyncStorage("withBags")
  const districtSts = await getValueFromAsyncStorage("disableDistrict")
   if(dist!==null){
     setSelectedDistrict(dist)
   }if(bag=="true"){
   setSelectedDistrictWithBags(true)
   }
   if(districtSts=="true"){
    console.log("true")
   setDistrictStatus(true)
   }
   }

const FetchDistrictDatas = async () => {
    const Res = await FetchDistrictData();
    setDistrictList(Res);
  };


 useEffect(() => {
   setDistrict()
   GetId()
  //  FetchLotno(userInfo.id) 
 }, [districtStatus])

useEffect(() => {
FetchDistrictDatas()
}, [])


const GetId = async()=>{
  const storedValue = await AsyncStorage.getItem('userId');
  const id = JSON.parse(storedValue)
  console.log('eid',id)
  FetchLotno(id) 
}

 
  
  return (
  <> 
    <View style={[GlobalStyle.globalHead]}>
    <View style={{width:UNIQUEWIDTH.wid}}>
     <TopMenu lotCount={lotCount}/>   
    <View style={[GlobalStyle.flexJusSB, {alignItems:"center", marginVertical:pixelSizeVertical(10)}]}>
    <Text style={GlobalStyle.overAllHeadLine}>New Procurement</Text>
    <Pressable disabled={districtStatus} onPress={onOpen} style={selectedDistrictError ? [styles.districtLabelHead,GlobalStyle.ErrorInputBorder] : districtStatus ?[ styles.districtLabelHead, {opacity:0.5} ] : [styles.districtLabelHead]}>
    <Text style={selectedDistrict==null ? selectedDistrictError ? [styles.districtLabel , {color:COLORS.ErrorRed}] : districtStatus ? [styles.districtLabel]: [styles.districtLabel]:[styles.districtLabel,{color:COLORS.PrimaryText}]}>{selectedDistrict == null ? "Slect District": selectedDistrict}</Text>
    </Pressable>
     </View>
    <View style={{marginVertical:pixelSizeVertical(10)}}>
     <Label txt={`Lot No : ${lotCount}`} w={79} h={25} />
    </View>
    {
    selectedDistrictWithBags ? 
    <NewProcurementWithBags formRef={formRef} setBottomSheetContent={setBottomSheetContent} modalizeRef={modalizeRef} bagsWeight={bagsWeight}/> :
    <NewProcurementForm  formRef={formRef} setBottomSheetContent={setBottomSheetContent} modalizeRef={modalizeRef} /> } 
    </View>
    {apiLoading ? 
    <Buttonx  txt={"Loading..."} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} disabled={true}/> : 

    <Buttonx  txt={"+Add"} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} fn={handleCustomSubmit}/>
    }
    </View> 
    <BottomSheetx modalizeRef={modalizeRef}  content={bottomSheetContent} setBagsWeight={setBagsWeight} />

    </>
  )
}



export default NewProcurement

const styles = StyleSheet.create({


districtLabel:{
color:COLORS.PlaceHolderText,
fontFamily:FONT.EuclidMedium,
fontSize:SIZES.size14
},
districtLabelHead:{
width:widthPixel(148),
height:heightPixel(40),
borderColor:COLORS.PlaceHolderText,
borderWidth:1,
borderRadius:6,
justifyContent:"center",
paddingHorizontal:pixelSizeHorizontal(10)
},

})


