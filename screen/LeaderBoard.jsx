import React, { useState , useRef, useContext } from 'react';
import { View, StyleSheet, Dimensions , Text, Pressable, ScrollView} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import GlobalStyle from '../styles/GlobalStyle';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../styles/Responsive';
import { ASPECTRADIO, CENTERSCREEN, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../Constants';
import { Divider, Filterx, SearchBar } from '../components';
import RBSheet from "react-native-raw-bottom-sheet";
import { MyContext } from '../context/MyContext';
import { AntDesign } from '@expo/vector-icons'




const othersDetails = [
{
 rank:"01",
 name:"Marcus Culhane",
 districstCount:"9",
 procuremenstPoints:"12000 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
},
{
 rank:"02",
 name:"Brandon Gouse",
 districstCount:"5",
 procuremenstPoints:"11,695 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
},
{
 rank:"03",
 name:"Zain Septimus",
 districstCount:"2",
 procuremenstPoints:"10654 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
},
{
 rank:"04",
 name:"Talan Baptisa",
 districstCount:"7",
 procuremenstPoints:"8840 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
},
{
 rank:"05",
 name:"Angel Kenter",
 districstCount:"4",
 procuremenstPoints:"8839 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
},
{
 rank:"06",
 name:"Randy Geidt",
 districstCount:"6",
 procuremenstPoints:"7983 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
},
]

const Managers = ()=>{
const ownDetails = 
{
 rank:"07",
 name:"Vignesh Kalithas",
 districstCount:"3",
 procuremenstPoints:"457 P",
 userDP:<ICONS.userImageSmall/>,
 own:true,
}


return(
<ScrollView style={styles.head} showsVerticalScrollIndicator={false}>
<Filterx text={"Leaderboard"} txtClr={COLORS.PrimaryText} shareBtn={false}/>
<Text style={GlobalStyle.idText}>Your Ranking</Text>
<Ranking details={ownDetails}/>
<View style={{marginVertical:pixelSizeVertical(10)}}>
<Text style={GlobalStyle.idText}>Overal Ranking</Text>
<ScrollView>

 {othersDetails.map((item,index)=>{
 return(
 <View key={index}>
 <Ranking details={item}/>
 </View>
 )})}
 </ScrollView>
</View>
</ScrollView>
)
}

const Agents = ()=>{
return(
<ScrollView style={styles.head} showsVerticalScrollIndicator={false}>
<Filterx text={"Leaderboard"} txtClr={COLORS.PrimaryText} shareBtn={false}/>
<View style={{marginVertical:pixelSizeVertical(10)}}>
<Text style={GlobalStyle.idText}>Overal Ranking</Text>
<ScrollView>

 {othersDetails.map((item,index)=>{
 return(
 <View key={index}>
 <Ranking details={item}/>
 </View>
 )})}
 </ScrollView>
</View>
</ScrollView>
)
}

const Ranking = ({details})=>{
  const  LeaderBoardRef  = useRef(null)
  const [data, setData] = useState({
 rank:"01",
 name:"Marcus Culhane",
 districstCount:"9",
 procuremenstPoints:"12000 P",
 userDP:<ICONS.userImageSmall/>,
 own:false,
})
  const Trigger = (details)=>{
  setData(details)
  console.log(details)
  LeaderBoardRef.current.open()
  }
return(
<>
 <Pressable onPress={()=>Trigger(details)} style={details.own ? [styles.RankingHead,{backgroundColor:COLORS.secondaryBlue,  marginVertical:pixelSizeVertical(10),}] : [styles.RankingHead, { marginVertical:pixelSizeVertical(5)}]}>
<View style={{ flexDirection:'row', alignItems:'center',  gap:15,}}>
<View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
{details.own == 0 ? details.rank == "01" ? <ICONS.RankingYellow/> : details.rank == "03"? <ICONS.RankingTeal/> : details.rank=="02" ? <ICONS.RankingGreen/>:null : null}
<Text style={GlobalStyle.txtLot}>{details.rank}</Text>
</View>
{details.userDP}
<View style={{flexDirection:'column', gap:5}}>
<Text style={GlobalStyle.txtLot}>{details.name}</Text>
<Text style={GlobalStyle.cardTexts}>{details.districstCount} Districts</Text>
</View>
</View>
<View>
<Text style={GlobalStyle.inputText}>{details.procuremenstPoints}</Text>
</View>

</Pressable>
<RBSheet
      ref={LeaderBoardRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.5}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
      }}
    >
    <View style={{ paddingVertical:pixelSizeVertical(10),  alignItems:"center", gap:16}}>
        <View style={[GlobalStyle.rowSpaceBetweenCenter,{width:UNIQUEWIDTH.wid}]}>
        <Text style={GlobalStyle.inputText}>Profile Details</Text>
        <Pressable onPress={()=>LeaderBoardRef.current.close()}>
        <AntDesign name="close" size={20} color={COLORS.SecondaryText} />
        </Pressable>
        </View>
        <View style={styles.CardHead}>
        <View style={{flexDirection:'row', gap:10}}>
        {details.userDP}
        <View style={{flexDirection:'column', gap:5}}>
        <Text style={GlobalStyle.txtLot}>{details.name}</Text>
        <Text style={GlobalStyle.cardTexts}>Manager</Text>
        </View>         
        </View>
        <View style={{flexDirection:'row',  alignItems:'center', gap:10}}>
        {details.own == 0 ? details.rank == "01" ? <ICONS.RankingYellow/> : details.rank == "03"? <ICONS.RankingTeal/> : details.rank=="02" ? <ICONS.RankingGreen/>:null : null}
       <Text style={GlobalStyle.txtLot}>{details.rank}</Text>
       </View>
        </View>
        <View style={[GlobalStyle.rowSpaceBetweenCenter,{width:UNIQUEWIDTH.wid}]}>
        <Text style={GlobalStyle.idText}>Overall Procurement</Text>
        <Text style={[GlobalStyle. LoginBtnText,{color:COLORS.PrimaryText}]}>1000 kg</Text>
        </View>
        <View style={[GlobalStyle.rowSpaceBetweenCenter,{width:UNIQUEWIDTH.wid}]}>
        <Text style={GlobalStyle.idText}>Average Quality</Text>
        <Text style={[GlobalStyle. LoginBtnText,{color:COLORS.PrimaryText}]}>A1</Text>
        </View>
         <View style={{marginVertical:pixelSizeVertical(10)}}>
         <Divider/>
         </View>
         <View style={{width:UNIQUEWIDTH.wid}}>
         <Text style={GlobalStyle.txtLot}>Districts</Text>
         <View style={{flexDirection:'row',flexWrap:"wrap", marginVertical:pixelSizeVertical(15), gap:15}}>
         <Text style={styles.chipText}>Coimbatore</Text>
         <Text style={styles.chipText}>Theni</Text>
         <Text style={styles.chipText}>Erode</Text>
         <Text style={styles.chipText}>Salem</Text>
         <Text style={styles.chipText}>Karur</Text>
         </View>
         </View>
    </View>
</RBSheet>
</>
)
}

const LeaderBoard = () => {
const [index, setIndex] = useState(0);
const [routes] = useState([
    { key: 'managers', title: 'Managers' },
    { key: 'agents', title: 'Agents' },
  ]);

  const renderScene = SceneMap({
    managers: Managers,
    agents: Agents,
  });

  const renderTabBar = (props) => ( 
    <TabBar
      {...props}
      indicatorStyle={[styles.indicator,]}
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
    <SearchBar content={'RecentActivity'}/>
    <View style={{flex:1, marginVertical:pixelSizeVertical(10),width:UNIQUEWIDTH.wid}}>
   
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={CENTERSCREEN.Horizontal}
      renderTabBar={renderTabBar}
    />
    </View>
    
    </View>
  );
};

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
head:{
paddingVertical:pixelSizeVertical(10)
},
RankingHead:{
width:UNIQUEWIDTH.wid,
  height:heightPixel(80),
  flexDirection:'row',
  alignItems:'center',
  justifyContent:"space-between",
  paddingHorizontal:pixelSizeHorizontal(12),
  borderRadius:10,
},
CardHead:{
  width:UNIQUEWIDTH.wid,
  height:heightPixel(80),
  backgroundColor:COLORS.Secondary,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:"space-between",
  paddingHorizontal:pixelSizeHorizontal(12)
  
  
},
chipText:{
backgroundColor:COLORS.Secondary, 
paddingHorizontal:pixelSizeHorizontal(10),
paddingVertical:pixelSizeVertical(12),
borderRadius:6,
fontFamily: FONT.EuclidMedium,
color: COLORS.PrimaryText,
fontSize: SIZES.size13,
}

});

export default LeaderBoard