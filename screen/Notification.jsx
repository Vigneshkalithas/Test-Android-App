// import { StyleSheet, Text, Pressable } from 'react-native'
// import { COLORS } from '../Constants'
// import { SearchBar } from '../components'
// import { pixelSizeVertical } from '../styles/Responsive'
// import React, { useReducer } from 'react';
// import { View, AnimatePresence } from 'moti';


// function Shape() {
//   return (
//     <View
//       from={{
//         opacity: 0,
//         scale: 0.9,
//       }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//       }}
//       exit={{
//         opacity: 0,
//         scale: 0.9,
//       }}
//       exitTransition={{
//         type: 'timing',
//         duration: 200,
//       }}
//       style={styles.shape}
//     />
//   );
// }

// const Notification = () => {
// const [visible, toggle] = useReducer((s) => !s, true);
//   return (
//       <Pressable onPress={toggle} style={styles.container}>
//       <AnimatePresence>{visible && <Shape />}</AnimatePresence>
//     </Pressable>
//   )
// }

// export default Notification

// const styles = StyleSheet.create({
//   shape: {
//     justifyContent: 'center',
//     height: 250,
//     width: 250,
//     borderRadius: 25,
//     marginRight: 10,
//     backgroundColor: COLORS.primary,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#9c1aff',
//   },
// });

// Notification.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

// const Notification = () => {
//   const [expanded, setExpanded] = useState(false);
//   const translateY = useSharedValue(0);

//   const toggleCard = () => {
//     setExpanded(!expanded);
//     translateY.value = withSpring(expanded ? 0 : -100, { damping: 10, stiffness: 100 });
//   };

//   const cardStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//       backgroundColor: 'lightblue',
//       padding: 16,
//       borderRadius: 8,
//     };
//   });

//   return (
//     <View>
//       <TouchableOpacity onPress={toggleCard}>
//         <Animated.View style={cardStyle}>
//           <Text>Card Title</Text>
//         </Animated.View>
//       </TouchableOpacity>

//       {expanded && (
//         <Animated.View style={{ height: 200, backgroundColor: 'lightgreen' }}>
//           {/* Additional cards */}
//           <Text>Additional content here</Text>
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// export default Notification;


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, ICONS, UNIQUEWIDTH } from '../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../styles/Responsive'
import { SearchBar } from '../components'
import GlobalStyle from '../styles/GlobalStyle'

const NotificationsList = [
{
icon:<ICONS.prebidNotification/>,
title:"Prebids",
count:"10",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},
{
icon:<ICONS.postbidNotification/>,
title:"Postbids",
count:"23",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},
{
icon:<ICONS.tlmNotification/>,
title:"TLM Tasks",
count:"12",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},
{
icon:<ICONS.EvenetNotification/>,
title:"Events",
count:"18",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},
{
icon:<ICONS.notificationActivewith/>,
title:"General",
count:"3",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},
{
icon:<ICONS.reimbursementRupeesNotification/>,
title:"Reimbursements",
count:"11",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},
{
icon:<ICONS.LeaderBoadNotification/>,
title:"Leaderboard",
count:"2",
time:"10m ago",
message:[{text:"New Message for the agnet Vignesh kalitahs",textTime:"10m ago"}]
},

]


const NotificationCard = ({data})=>{
return(
<>
<View style={{alignItems:'center', }}>
<View style={styles.backgrounCard}>
</View>
</View>
<View style={styles.NotificationHeadCard}>
<View style={{flexDirection:'row',gap:10, alignItems:'center'}}>
<View style={styles.round}>
{data.icon}
</View>
<View style={{gap:5}}>
<Text style={GlobalStyle.txtLot}>{data.title}</Text>
<Text style={GlobalStyle.cardDateText}>({data.count}) Notifications</Text>
</View>
</View>
<View>
<Text style={GlobalStyle.cardDateText}>{data.time}</Text>
</View>
</View>

</>
)
}

const SeprateNotficationCard =({data})=>{
const text = "New Leader board started for tarted for";
const maxLength = 35;
 const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
return(
<View style={styles.separateNotificationCardText}>
<View style={{flexDirection:'row',gap:10, alignItems:'center'}}>
<View>
<ICONS.userImage2/>
</View>
<View style={{gap:5, width:widthPixel(205)}}>
<Text style={GlobalStyle.txtLot}>{truncatedText}</Text>
</View>
</View>
<View>
<Text style={GlobalStyle.cardDateText}>10m ago</Text>
</View>
</View>
)
}

const Notification = () => {
  return (
    <View style={{flex:1,backgroundColor:COLORS.white,paddingVertical:pixelSizeVertical(15), alignItems:'center'}}>
    <SearchBar content={"Home"} active={"notification"}/>
    <View style={{paddingVertical:pixelSizeVertical(20)}}>
    {NotificationsList.map((data,index)=>{
    return(
    <View key={index} style={{paddingVertical:pixelSizeVertical(8)}}>
    <NotificationCard data={data}/>
    {/* <SeprateNotficationCard data={data}/> */}
    </View>
    )
    })}
    </View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
NotificationHeadCard:{
width:UNIQUEWIDTH.wid,
height:heightPixel(80),
backgroundColor:COLORS.Secondary,
borderRadius:20,
flexDirection:'row',
alignItems:"center",
paddingHorizontal:pixelSizeHorizontal(20),
justifyContent:"space-between",

},
round:{
width:widthPixel(50),
height:heightPixel(50),
borderRadius:50,
backgroundColor:COLORS.secondaryBlue,
justifyContent:'center',
alignItems:"center"
},
separateNotificationCardText:{
width:UNIQUEWIDTH.wid,
height:heightPixel(76),
backgroundColor:"#EDF1F4",
borderRadius:12,
flexDirection:'row',
alignItems:"center",
paddingHorizontal:pixelSizeHorizontal(20),
justifyContent:"space-between"
},
backgrounCard:{
width:UNIQUEWIDTH.wid * 0.94,
height:heightPixel(72),
backgroundColor:COLORS.Secondary,
// backgroundColor:'red',
borderRadius:20,
position:"absolute",
top:heightPixel(15)
// bottom:20
}
})





