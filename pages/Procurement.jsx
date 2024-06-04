import { StyleSheet, Text, View ,TouchableOpacity, Button} from 'react-native'
import React ,{ useState , useRef, useMemo, useCallback , useEffect, useContext} from 'react'
import {ICONS, COLORS, FONT, SIZES ,CENTERSCREEN, ASPECTRADIO, UNIQUEWIDTH } from "../Constants"
import { SearchBar } from '../components'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../styles/Responsive'
import { AllProcurements, History, CompReport, OffBeat} from '../screen';
import GlobalStyle from '../styles/GlobalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { GetProcurementHistory } from '../apiHelper'
import { MyContext } from '../context/MyContext';
import { useRecoilState } from 'recoil';
import { 
MyProcurements,
ProcurementsHistory,
ProcurementCompReport,
ProcurementOffBeatDatas, } from '../atoms/Procurement';

const Procurement = () => {
const [index, setIndex] = useState(0);
const { userInfo } = useContext(MyContext)
const [procurementHistory,setProcurementHistory] = useRecoilState(ProcurementsHistory)

useEffect(() => {
GetHistory(userInfo.id)
  }, [])
  
const GetHistory = async(id)=>{
 const Datas = await GetProcurementHistory(id)
  if(Datas==null){
   setProcurementHistory([])
 }else{
   setProcurementHistory(Datas)
 }
}

  const [routes] = useState([
    { key: 'procurement', title: 'Procurement' },
    { key: 'history', title: 'History' },
    { key: 'compreport', title: 'Competitors & Report' },
    { key: 'offbeat', title: 'Off-Beat' },
  ]);

  const renderScene = SceneMap({
    procurement : AllProcurements,
    history : History,
    compreport : CompReport,
    offbeat :  OffBeat,
  });

  // const renderTabBar = (props) => ( 
  // <View style={styles.tabBarContainer}>
  //   <TabBar
  //         {...props}
  //         scrollEnabled
  //         indicatorStyle={[styles.indicator, {marginLeft: index == 0 ? widthPixel(30) : index == 1 ? widthPixel(-25) : index == 2 ? widthPixel(-80) : widthPixel(-145)}]}
  //         style={styles.tabBar}
  //         tabStyle={styles.tab}
  //         labelStyle={styles.label}
  //         renderLabel={({ route, focused, color }) => (
  //           <Text numberOfLines={1} style={[{color:focused ? COLORS.primary : COLORS.SecondaryText },styles.label]}>
  //             {route.title}
  //           </Text>
  //         )}
  //       />
   
  //   </View>
  // );
 
     const renderTabBar = (props) => ( 
    <TabBar
      {...props}
      // indicatorStyle={[styles.indicator, {marginLeft: index==0 ? 0 : widthPixel(8)}]}
      indicatorStyle={{display:'none'}}    
      style={styles.tabBar}
      scrollEnabled
      renderLabel={({ route, focused, color }) => (
        <View style={{alignItems:'center'}}>
        <Text style={[styles.label,{color:focused ? COLORS.primary : COLORS.SecondaryText }]}>{route.title}</Text>
        {focused ? <View style={styles.focustedLabelBar}></View> : null }
        </View>
      )}
      tabStyle={styles.tabStyle}
    />
  );
 
 
  return (
    <View style={GlobalStyle.globalHead}>
    <SearchBar content={'Home'}/>
    {/* <View style={{flex:1, marginVertical:pixelSizeVertical(10),width:UNIQUEWIDTH.wid}}>
    <View style={{height:1, width:ASPECTRADIO.width,backgroundColor:COLORS.BorderColor, position:'absolute',top:heightPixel(51.5),}}></View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
    </View> */}
    <View style={{flex:1, marginVertical:pixelSizeVertical(5),}}>
  {/* <View style={{height:1, width:ASPECTRADIO.width, backgroundColor:COLORS.BorderColor, position:'absolute',top:heightPixel(51.5),}}></View> */}
    <TabView
   
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width:ASPECTRADIO.width}}
      renderTabBar={renderTabBar}
    />
</View>
    {/* <FloatBtn/> */}
    {/* <BackgroundBtn/> */}
    </View>
  )
}

export default Procurement

const styles = StyleSheet.create({


  indicator: {
    backgroundColor:COLORS.primary,
    // width: widthPixel(60),
    height: heightPixel(6),
    // marginLeft: 10, 
    borderTopLeftRadius:22, 
    borderTopRightRadius:22
  },

  tabBar:{
  width:'auto',
  backgroundColor:COLORS.white,
  paddingHorizontal:0,
  elevation: 0,
  shadowOpacity: 0,
    
  },
  label:{
  fontFamily:FONT.EuclidMedium,
  fontSize: SIZES.size14,
  color:COLORS.primary,
  textTransform:"capitalize"
  },
  tabStyle: {
    width: 'auto', 
    paddingHorizontal:pixelSizeHorizontal(20), 
    alignItems: 'flex-start', 
    justifyContent: 'center',
 },

 focustedLabelBar:{
 width:widthPixel(60),
 height:heightPixel(6),
 borderTopLeftRadius:22, 
 borderTopRightRadius:22,
 backgroundColor:COLORS.primary,
marginVertical:pixelSizeVertical(10)
 }
  
})