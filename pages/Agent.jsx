import { StyleSheet, Text, View ,TouchableOpacity, Button} from 'react-native'
import React ,{ useState , useRef, useMemo, useCallback } from 'react'
import {ICONS, COLORS, FONT, SIZES ,CENTERSCREEN, ASPECTRADIO, UNIQUEWIDTH} from "../Constants"
import { SearchBar } from '../components'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../styles/Responsive'
import {AgentsScreen , OpenBidsScreen} from "../screen"
import GlobalStyle from '../styles/GlobalStyle';


const Agent = () => {
const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'openBids', title: 'Open bids' },
    { key: 'agents', title: 'Agents' },
  ]);

  const renderScene = SceneMap({
    agents: AgentsScreen,
    openBids: OpenBidsScreen,
  });

  const renderTabBar = (props) => ( 
    <TabBar
      {...props}
      indicatorStyle={[styles.indicator, {marginLeft: index==0 ? widthPixel(10) : widthPixel(-2)}]}
      style={styles.tabBar}
      renderLabel={({ route, focused, color }) => (
        <Text style={[{
             fontFamily:FONT.EuclidMedium,
             fontSize: SIZES.size14,
             textTransform:"capitalize"},
             {color:focused ? COLORS.primary : COLORS.SecondaryText }]}>
             {route.title}</Text>
      )}
      tabStyle={styles.tabStyle}
    />
  );


  return (
    <View style={GlobalStyle.globalHead}>
    <SearchBar content={'Home'}/>
    <View style={{flex:1, marginVertical:pixelSizeVertical(10),width:UNIQUEWIDTH.wid}}>
    {/* <View style={{height:1, width:ASPECTRADIO.width, backgroundColor:COLORS.BorderColor, position:'absolute',top:heightPixel(51.5),}}></View> */}
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={CENTERSCREEN.Horizontal}
      renderTabBar={renderTabBar}
    />
    </View>
    </View>
  )
}


export default Agent

const styles = StyleSheet.create({
indicator: {
    backgroundColor:COLORS.primary,
    width: widthPixel(60),
    height: heightPixel(6),
    // marginLeft: 10, 
    borderTopLeftRadius:22, 
    borderTopRightRadius:22
  },
  tabBar:{
  width:CENTERSCREEN.Horizontal,
  backgroundColor:COLORS.white,
  // backgroundColor:'red',
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
    // width: 'auto', 
    paddingHorizontal: 3, 
    alignItems: 'flex-start', 
    justifyContent: 'center',

  },


   container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})