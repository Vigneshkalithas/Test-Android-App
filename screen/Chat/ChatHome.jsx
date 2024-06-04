import { Pressable, StyleSheet, Text, View ,  useWindowDimensions , Image , Share} from 'react-native'
import React , {useState, useEffect} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT, SIZES, UNIQUEWIDTH } from '../../Constants'
import { SearchBar } from '../../components'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { heightPixel, widthPixel } from '../../styles/Responsive'
import Feeds from './Feeds';
import Calendar from './Calendar';
import ChatScreen from './ChatScreen'








const renderTabBar = (props) => ( 

    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={{ 
  backgroundColor:COLORS.primary,
  height:heightPixel(5),
  borderTopRightRadius:22,
  borderTopLeftRadius:22,
//   alignSelf:'center',
//   alignItems:'center',
  width:widthPixel(60),
  marginLeft: props.navigationState.index == 0 ? widthPixel(37) : widthPixel(39)
  }}
    //   scrollEnabled
      renderLabel={({ route, focused, color }) => (
        <Text style={[styles.label,{color:focused ? COLORS.primary : COLORS.SecondaryText }]}>{route.title}</Text>
      )}
      tabStyle={styles.tabStyle}
    />
  );


const ChatHome = () => {

const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feeds', title: 'Feeds' },
    { key: 'chatscreen', title: 'Chats' },
    { key: 'calendar', title: 'Calendar' },
  ]);


const renderScene = ({ route }) => {
    switch (route.key) {
      case 'feeds':
        return <Feeds />;
      case 'chatscreen':
        return <ChatScreen/>;
         case 'calendar':
        return <Calendar/>;
      default:
        return null;
    }
  };

  return (
    <View style={GlobalStyle.head}>
     <View style={{width:UNIQUEWIDTH.wid}}>
     <SearchBar content={"RecentActivity"} active={"message"}/>
     </View>
     {/* <View style={{position:'relative', right:widthPixel(50)}}> */}
          <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
     {/* </View> */}

    </View>
  )
}

export default ChatHome

const styles = StyleSheet.create({
  tabBar:{
   backgroundColor:COLORS.white,
//    backgroundColor:'red',
   width:ASPECTRADIO.width,
   paddingHorizontal:0,
   elevation: 0,
   shadowOpacity: 0,   
},
  tabStyle:{
     color:COLORS.PrimaryText,
    //  alignSelf:'center',
    //  alignItems:'center',
  },
  label:{
  fontFamily:FONT.EuclidMedium,
  fontSize: SIZES.size14,
  color:COLORS.primary,
  textTransform:"none"
  },
})