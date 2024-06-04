import { Pressable, StyleSheet, Text, View ,} from 'react-native'
import React, { useState, useEffect, useContext} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { COLORS, ICONS, UNIQUEWIDTH,ASPECTRADIO, CENTERSCREEN, FONT,SIZES } from '../../Constants'
import { Filterx, SearchBar, ContactCard } from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ParticularBids from './ParticularBids'
import ParticularOpenBits from './ParticularOpenBits'
import CompetitorsReport from './CompetitorsReport'
import Analytics from './Analytics'
// import { CompetitorsData } from '../../DataCenter'
// import { MyContext } from '../../context/MyContext'
import { GetAgnetsListDistrictVice , GetAgentsOpenBids, GetAgentsBids, GetAgentsCompetitrosReport,GetAgentsAnalytics} from '../../apiHelper'
import { ActivityIndicator } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { OpenBids,Bids,CompReport,AnalyticsData } from '../../atoms/Agents';

const AgentActivities = ({route, navigation}) => {
 const { x } = route.params;
 const [agentModal, setAgentModal] = useState(false)
 const [index, setIndex] = useState(0);
 const [current, setCurrent] = useState("")
 const [compDataLength, setCompDataLength] = useState("")
 const [agents,setAgents] = useState(null)
 const [apiOpenBidsData, setApiOpenBidsData] = useRecoilState(OpenBids);
 const [apiBidsData,setApiBidsData] = useRecoilState(Bids)
 const [apiCompReportData,setApiCompReportData] = useRecoilState(CompReport)
 const [analyticsData,setAnalyticsData] = useRecoilState(AnalyticsData)

 useEffect(() => {
 setCurrent(x)
 GetAgentList()
 GetAgentsOpenBidsDeatails(x.id)
 GetAgentsBidsDetails(x.id)
 GetAgentsCompetitors(x.district,x.id)
 GetAgentsAnalyticsDatas(x.id)
 }, [])



 const GetAgentList = async()=>{
  const Datas = await GetAgnetsListDistrictVice(x.district)
  setAgents(Datas)
  setCompDataLength(Datas.length*41.42857142857143)
 }

 const GetAgentsOpenBidsDeatails = async(id)=>{
 const Datas = await GetAgentsOpenBids(id)
 if(Datas==null){
  setApiOpenBidsData([])
 }else{
 setApiOpenBidsData(Datas)
 }
 }
 const GetAgentsBidsDetails = async(id)=>{
  const Datas = await GetAgentsBids(id)
  if(Datas==null){
  setApiBidsData([{today:[],history:[]}])
 }else{
   setApiBidsData(Datas)
 }
       
 }

const GetAgentsCompetitors = async(district,id)=>{
  const Datas = await GetAgentsCompetitrosReport(district,id)
  if(Datas==null){
 setApiCompReportData([])
 }else{
    setApiCompReportData(Datas)
 }   
}

 const GetAgentsAnalyticsDatas = async(id)=>{
  const Datas = await GetAgentsAnalytics(id)
  if(Datas==null){
  setAnalyticsData([])
 }else{
   setAnalyticsData(Datas)
 }
 }

const closeDropdown =(data)=>{  
        setCurrent(data)
        GetAgentsOpenBidsDeatails(data.id)
        GetAgentsBidsDetails(data.id)
        GetAgentsCompetitors(data.district,data.id)
        GetAgentsAnalyticsDatas(data.id)  
        setAgentModal(false)
 }
  const 
  [routes] = useState([
    { key: 'openBids', title: 'Open Bids' },
    { key: 'bids', title: 'Bids' },
    { key: 'competitors', title: 'Competitors & Report' },
    { key: 'analytics', title: 'Analytics' },
  ]);


  const renderScene = SceneMap({
    openBids:ParticularOpenBits,
    bids:ParticularBids,
    competitors:CompetitorsReport,
    analytics:Analytics
  });


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

  if (!agents) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:COLORS.white}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }

  return (
    <View style={{flex:1,backgroundColor:COLORS.white,paddingVertical: pixelSizeVertical(15)}}>
    <View style={{ alignItems:'center',
    paddingHorizontal: pixelSizeHorizontal(15)}}>
    <>
    <SearchBar content={"RecentActivity"}/>
    <ContactCard agentModal={agentModal} setAgentModal={setAgentModal} current={current}/>
    </>
    {agentModal ? 
    <DropDownCard agents={agents} DropDownheight={compDataLength} closeDropdown={closeDropdown} current={current} /> 
    : null}
    </View>

<View style={{flex:1, marginVertical:pixelSizeVertical(5),}}>
  <View style={{height:1, width:ASPECTRADIO.width, backgroundColor:COLORS.BorderColor, position:'absolute',top:heightPixel(51.5),}}></View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width:ASPECTRADIO.width}}
      renderTabBar={renderTabBar}
    />
</View>
    </View>
  )
}

const DropDownCard = ({agents,DropDownheight,closeDropdown,current})=>{
return(
 <View style={[styles.DropdownHeadAgents, {height:heightPixel(DropDownheight), }]}>
        <View style={{padding:10}}>
        {agents.map((data,index)=>{
        // console.log(data)
        return(
        <Pressable key={index} style={GlobalStyle.listHead} onPress={()=>closeDropdown(data)}>
        <Text style={current == data.fullName ? [GlobalStyle.districtText,{color:COLORS.primary}] :[GlobalStyle. districtText]}>{data.fullName}</Text>
        {current.fullName == data.fullName ? <ICONS.smallsuccessIcon/> : null}
        </Pressable>
        )
        })}
        </View>
     </View>
)
}


export default AgentActivities

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
 },
 DropdownHeadAgents:{
  position: "absolute",
    top: heightPixel(155),
    zIndex: 999,
    width: UNIQUEWIDTH.wid,
    backgroundColor: COLORS.white,
    elevation: 1,
    justifyContent:'center'
 }
})