// import { Dimensions, StyleSheet, Text, View , useWindowDimensions } from 'react-native'
// import React, { useState } from 'react'
// import GlobalStyle from '../../styles/GlobalStyle'
// import { ASPECTRADIO, COLORS, FONT, SIZES, UNIQUEWIDTH } from '../../Constants'
// import { SearchBar } from '../../components'
// import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import PagerView from 'react-native-pager-view';


 



// const InProgressScreen = () => (
//   <View style={styles.tabContainer}>
//     <Text>In Progress</Text>
//   </View>
// );

// const ExportScreen = () => (
//   <View style={styles.tabContainer}>
//     <Text>Export</Text>
//   </View>
// );


 

// const ExportDocuments = () => {
//  const [currentPage, setCurrentPage] = useState(0);

//   return (
//     <View style={{flex:1, backgroundColor:COLORS.white,}}>
//     <View style={{width:UNIQUEWIDTH.wid,  paddingVertical: pixelSizeVertical(15),paddingHorizontal: pixelSizeHorizontal(15),}}>
//      <SearchBar content={"RecentActivity"}/>
//     </View>
//     <View style={styles.container}>
//       <PagerView
//         style={styles.pagerView}
//         initialPage={currentPage}
//         onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
//       >
//         <View key="1">
//           <InProgressScreen />
//         </View>
//         <View key="2">
//           <ExportScreen />
//         </View>
//       </PagerView>
//       {/* Bottom Indicator */}
//       <View style={styles.indicator} />
//     </View>
//     </View>
//   )
// }

// export default ExportDocuments

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
//   },
//   pagerView: {
//     flex: 1,
//   },
//   tabContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   indicator: {
//     position: 'absolute',
//     bottom: 0,
//     left: (Dimensions.get('window').width / 2) - 30, // Centered indicator
//     width: 60,
//     height: 5,
//     backgroundColor: 'blue',
//   },
// })





// import React from 'react';
// import { StyleSheet, View, Text, Pressable } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';

// const TAB_WIDTH = 100;
// const TABS = ['Home', 'Profile'];

// const ExportDocuments = ()=> {
//   const offset = useSharedValue(-TAB_WIDTH);

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [{ translateX: offset.value }],
//   }));

//   const handlePress = (tab) => {
//     const newOffset = (() => {
//       switch (tab) {
//         case 'Home':
//           return -TAB_WIDTH;
//         // case 'Search':
//         //   return 0;
//         case 'Profile':
//           return TAB_WIDTH;
//         default:
//           return -TAB_WIDTH;
//       }
//     })();

//     offset.value = withTiming(newOffset);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabs}>
//         {TABS.map((tab, i) => (
//           <Pressable
//             key={tab}
//             style={
//               i !== TABS.length - 1 ? [styles.tab, styles.divider] : styles.tab
//             }
//             onPress={() => handlePress(tab)}>
//             <Text style={styles.tabLabel}>{tab}</Text>
//           </Pressable>
//         ))}
//       </View>
//       <Animated.View style={[styles.animatedBorder, animatedStyles]} />
//     </View>
//   );
// }

// export default ExportDocuments

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   tabs: {
//     flexDirection: 'row',
//   },
//   tab: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     // width: TAB_WIDTH,
//   },
//   tabLabel: {
//     fontSize: 20,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   divider: {
//     borderRightWidth: 1,
//     borderRightColor: '#ddd',
//   },
//   animatedBorder: {
//     height: 8,
//     width: 64,
//     backgroundColor: 'tomato',
//     borderRadius: 20,
//   },
// });





import React, { useState } from 'react';
import { View, StyleSheet, Dimensions , Text, Pressable} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import GlobalStyle from '../../styles/GlobalStyle';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive';
import { ASPECTRADIO, CENTERSCREEN, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants';
import { Accordion, DownloadCard, SearchBar } from '../../components';
import { ProgressBar} from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const uploadingData = [
   {
   fileType:"Excel",
   fileName:"Idhayam Documents.csv",
   fileSize:"36MB",
   icon:<ICONS.ExcelLogo/>,
   status:"uploading",
   date:""
   },
    {
   fileType:"Pdf",
   fileName:"Idhayam Documents.pdf",
   fileSize:"36MB",
   icon:<ICONS.PdfLogo/>,
   status:"uploading",
    date:""
   },
    
]

const uploadedData =[
  {
   fileType:"Excel",
   fileName:"Idhayam Documents.csv",
   fileSize:"36MB",
   icon:<ICONS.ExcelLogo/>,
   status:"uploaded",
   date:"29 Sep"
   },
    {
   fileType:"Pdf",
   fileName:"Idhayam Documents.pdf",
   fileSize:"36MB",
   icon:<ICONS.PdfLogo/>,
   status:"uploaded",
  date:"20 Mar"
   },
]

  const Progress = ()=>{
   const [uploadDocumentsCount, setUploadDocumentCount] = useState(2) 
    
  return(
   <View style={{paddingVertical:pixelSizeVertical(20)}}>
   <Text style={GlobalStyle.overAllHeadLinePrimary}>Exporting Documents ({uploadDocumentsCount})</Text>
   {uploadingData.map((item,index)=>{
   return(
   <View key={index}>
   <UpoadingCard item={item}/>
   </View>
   )
   })}
   </View>
  )
  }


  const Exports = ()=>{
   const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

    const [openData, setOpenData] = useState(false)
  const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }
  return(
   <View style={{paddingVertical:pixelSizeVertical(20)}}>


   <View>
     {uploadedData.map((item,index)=>{
return(     
     <View style={[GlobalStyle.districtTxt]} key={index} >
                {openData == index ? null :
                  <Pressable style={[GlobalStyle.flexJusSB,{alignItems:'center'}]} onPress={() => onOpen(index)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{item.date}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }

                 {openData == index ?
                  <View>
                    <Pressable onPress={onOpen} style={[GlobalStyle.flexJusSB,{alignItems:'center'}]}>
                      <Text style={GlobalStyle.cancelBtn}>{item.date}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    <DownloadCard item={item} child={<Feather name="more-vertical" size={18} color="#1C274C" />}/>
                  </View> : null}
                </View>
)
})}
   </View>

   </View>
  )
  }


  const UpoadingCard = ( {item} )=>{
  return(
  <View style={[styles.uploadCardContainer,{height:heightPixel(88)}]}>
  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',width:widthPixel(337) }}>
  <View style={{flexDirection:'row', alignItems:'center', gap:20}}>
  <View style={{width:widthPixel(46), height:heightPixel(46), backgroundColor:"#E8EFFF", borderRadius:3, alignItems:'center', justifyContent:'center'}}>
   {item.icon}
  </View>
  <View style={{flexDirection:"column", gap:5}}>
  <Text style={GlobalStyle.cardHeadlineText}>{item.fileName}</Text>
  <View style={{flexDirection:'row', alignItems:'center', gap:15, width:"50%"}}>
  <Text style={GlobalStyle.cardTexts}>{item.fileSize}</Text>
  <View style={{width:4, height:4, backgroundColor:COLORS.SecondaryText,borderRadius:4 }}></View>
  <Text style={GlobalStyle.cardTexts}>2min left</Text>
  </View>
  </View>
  </View>
  <View><ICONS.CloseIconLogin/></View>
  </View>
  <ProgressBar style={styles.progressBar} progress={0.3}  fillStyle={{borderRadius:17, backgroundColor:COLORS.primary}} />
  </View>
  )
  }






const ExportDocuments = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'inprogress', title: 'In-progress' },
    { key: 'exports', title: 'Exports' },
  ]);



  const renderScene = SceneMap({
    inprogress: Progress,
     exports: Exports,
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
    <View style={{flex:1, marginVertical:pixelSizeVertical(15),width:ASPECTRADIO.width, alignItems:"center" }}>
    <View style={{height:1, width:ASPECTRADIO.width, backgroundColor:COLORS.BorderColor, position:'absolute',top:heightPixel(51.5),}}></View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={CENTERSCREEN.Horizontal}
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
    marginLeft: widthPixel(65), 
    borderTopLeftRadius:22, 
    borderTopRightRadius:22
  },
  tabBar:{
  width:UNIQUEWIDTH.wid,
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
    alignItems: 'center', 
    justifyContent: 'center',
  },
  uploadCardContainer:{
  width:UNIQUEWIDTH.wid,
  backgroundColor:COLORS.Secondary,
  borderRadius:6,
  marginVertical:pixelSizeVertical(10),
alignItems:'center',
 flexDirection:'column',
 justifyContent:"space-evenly",
 gap:3
  },
  progressBar:{
  width:widthPixel(337),
  height:heightPixel(5),
  borderRadius:17,
  backgroundColor:"#D9E2EB"
  }

});

export default ExportDocuments;
