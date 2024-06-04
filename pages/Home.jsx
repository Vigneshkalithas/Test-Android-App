
import { Pressable, StyleSheet, View, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import {ASPECTRADIO, ICONS } from "../Constants"
import GlobalStyle from '../styles/GlobalStyle'
import  {RecentActivityCard,SearchBar,Statistics, FilterBottomSheet, ExportBottomSheet, FloatButton,DatePickerSheet,FloatBtn, BackgroundBtn ,EmptyCard } from '../components'
import ActionMenu from '../screen/ActionMenu'
import { GetBidsData } from '../apiHelper'

import { useRecoilState } from 'recoil';
import { 
BidsDataList,
BidsDataCalendar,
BidsDataMaps,
BidsDataChart,
BidsDataWeekly
 } from '../atoms/Home';
import { MyContext } from '../context/MyContext'
import AsyncStorage from '@react-native-async-storage/async-storage'




const Home = () => {

const [bidsChart,setBidsChart] = useRecoilState(BidsDataChart)
const [bidsMap,setBidsMap] = useRecoilState(BidsDataMaps)
const [bidsList,setBidsList] = useRecoilState(BidsDataList)
const [bidsCalendar,setBidsCalendar] = useRecoilState(BidsDataCalendar)
const [bidsWeekData,setBidsWeekData] = useRecoilState(BidsDataWeekly)
const [products, setProducts] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const { userInfo } = useContext(MyContext)
const [uId,SetUId] = useState(null)



const GetId = async()=>{
  const storedValue = await AsyncStorage.getItem('userId');
  const id = JSON.parse(storedValue)
 GetListData(id)
 GetWeekLyData(id)
 GetRecenetCardData(id)

}

useEffect(() => {
 GetId()
}, [])

const GetListData = async(id)=>{
  // id,endPoint,message
const RES = await GetBidsData(id, "procurement/day-history", "Days wise History List")
if(RES==null){
     setBidsList([])
}else{
   setBidsList(RES)
}
}
const GetWeekLyData = async(id)=>{
  const RES = await GetBidsData(id,"procurement/weekly-history", "Weekly History List")
  if(RES==null){
       setBidsWeekData([])
  }else{
     setBidsWeekData(RES)
  }
  }
const GetRecenetCardData = async(id)=>{
  const RES = await GetBidsData(id,"procurement/home-open-bids", "Recent Card Data")
  if(RES==null){
    setProducts([]);
  }else{
    console.log('pro', RES)
    setProducts(RES);
  }
}

useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
  }, 5000);

  return () => clearInterval(intervalId);
}, [products]);

  return (
    <View style={[GlobalStyle.globalHead]}>   
    <SearchBar content={"Home"}/>
    {products.length > 0 ? 
    <RecentActivityCard product={products[currentIndex]}/> :
    <EmptyCard/> 
  }
    
    <Statistics/>
    {/* <FloatButton/> */}
    <ActionMenu/>
    {/* <FloatBtn/> */}
    {/* <BackgroundBtn/> */}
    <FilterBottomSheet/>
    <ExportBottomSheet/>
    <DatePickerSheet/>
    </View>
  )
}



export default Home

export const styles = StyleSheet.create({

})