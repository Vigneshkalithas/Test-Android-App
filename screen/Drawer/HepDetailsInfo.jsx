import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { COLORS, ICONS, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import * as Linking from 'expo-linking';

const DURATION = 1000;
const DELAY = 500;


const HepDetailsInfo = ({route, navigation}) => {
   const { item } = route.params
   const [hideContent, setHideContent] = useState(false)
   const [changeColor,setChangeColor] = useState("")
   const opacity1 = useSharedValue(1);
   const startTime = (c)=>{
    setChangeColor(c)
    opacity1.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
    }
const openGmailAppWithSubjectAndBody = () => {
  const email = 'staciacorp@gmail.com';
  const subject = 'Regarding Support'; // Replace with your desired subject
  const body = 'Hello, I need assistance with...'; // Replace with your desired body
  Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
};
  return (
    <View style={GlobalStyle.globalHead}>
    <View style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(15)}}>
    <Pressable onPress={()=>navigation.goBack()}>
    <ICONS.GoBack/>
    </Pressable>
    <View style={{flexDirection:'column', gap:20, paddingVertical:pixelSizeVertical(20)}}>
     <Text style={[GlobalStyle.districtText,{width:widthPixel(308)}]}>{item.Ques}</Text>
     <Text style={GlobalStyle.privacyPolciAndAboutText}>{item.Ans}</Text>
    </View>
    {/* {hideContent ? null :  */}
    <Animated.View style={{...styles.helpfulHead, opacity: opacity1}}>
    <Text style={GlobalStyle.txtLot}>Was this helpful?</Text>
    <View style={{flexDirection:"row",width:"50%", justifyContent:"space-around"}}>
    <Pressable onPress={()=> startTime("yes")} style={changeColor == "yes"? [styles.bTn,{backgroundColor:COLORS.primary}]: [styles.bTn]}><Text style={changeColor == "yes" ? [GlobalStyle.inputText,{color:COLORS.white}]:[GlobalStyle.inputText]}>No</Text></Pressable>
    <Pressable onPress={()=> startTime("no")} style={changeColor == "no" ? [styles.bTn,{backgroundColor:COLORS.primary}]: [styles.bTn]}><Text style={changeColor == "no" ? [GlobalStyle.inputText,{color:COLORS.white}]:[GlobalStyle.inputText]}>Yes</Text></Pressable>
    </View>
    </Animated.View>
{/* } */}
    </View>
<View style={{flex:1, justifyContent:'flex-end', paddingBottom:pixelSizeVertical(50), width:UNIQUEWIDTH.wid}}>
  <View style={{flexDirection:'column', gap:12}}>
  <Text style={GlobalStyle.overAllHeadLine}>Need more help?</Text>
  <Text style={GlobalStyle.idText}>Our customer service team should be able to help</Text>
  <Pressable onPress={openGmailAppWithSubjectAndBody}>
  <Text style={GlobalStyle.overAllHeadLinePrimary}>Contact Us</Text>
  </Pressable>
  </View>
  </View>
    </View>
  )
}

export default HepDetailsInfo

const styles = StyleSheet.create({
helpfulHead:{
 flexDirection:'row',
 width:UNIQUEWIDTH.wid,
 backgroundColor:COLORS.Secondary,
 height:heightPixel(58),
 alignItems:'center',
 justifyContent:"space-between",
 paddingHorizontal:pixelSizeHorizontal(10)
},
bTn:{
height:heightPixel(32),
width:widthPixel(60),
borderColor:COLORS.primary,
borderWidth:1,
borderRadius:4,
alignItems:"center",
justifyContent:'center'
},
}) 