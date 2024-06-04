import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { useNavigation } from '@react-navigation/native'
import GlobalStyle from '../../styles/GlobalStyle'


const Aboutus = () => {
const navigation = useNavigation()
  return (
    <View style={{flex:1,backgroundColor:COLORS.white, paddingHorizontal:pixelSizeHorizontal(20), paddingVertical:pixelSizeVertical(50)}}>
    
    <Pressable onPress={()=>navigation.goBack()}>
    <ICONS.GoBack/>
    </Pressable>
   <View style={{ alignItems:"center", paddingTop:pixelSizeVertical(50)}}>
    <ICONS.staciaCorpLogo/>
   </View>
  <View style={{paddingVertical:pixelSizeVertical(30)}}>
<Text style={[GlobalStyle.inputText,{paddingVertical:pixelSizeVertical(10)}]}>Version</Text>
<Text style={GlobalStyle.txtLot}>v13.43.7 (3094.2bf7f53b523)</Text>
<Text style={[GlobalStyle.privacyPolciAndAboutText,{paddingVertical: pixelSizeVertical(20)}]}>
Lorem ipsum dolor sit amet consectetur. Semper
mus eu lorem eu. Magna dignissim sed vel 
pellentesque. Eu purus suspendisse praesent 
malesuada diam pellentesque. Ac sem volutpat quis
 vel sagittis pulvinar adipiscing a. Scelerisque arcu 
turpis est quam. Gravida pretium lacus lorem id. 
Turpis morbi viverra quis libero sollicitudin quam 
platea ultrices tristique. At faucibus nisi semper 
dictum dictum orci tellus. Praesent lacus congue 
pharetra est ultrices eu risus malesuada blandit.
</Text>
   </View>
   <View style={{flex:1, flexDirection:'column', gap:30, justifyContent:'flex-end'}}>
  
   <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
   <View>
   <View style={styles.borderHead}>
   <Text style={styles.btmText}>Rate us</Text>
   <View style={[styles.bottomBorder,{width:widthPixel(43)}]}></View>
   </View>
   </View>
   <View style={styles.horizontalLine}></View>
   <View>
   <View  style={styles.borderHead}>
   <Text style={styles.btmText}>Feedback</Text>
   <View style={[styles.bottomBorder,{width:widthPixel(53)}]}></View>
   </View>
   </View>
   <View style={styles.horizontalLine}></View>
   <View>
   <View style={styles.borderHead}>
   <Text style={styles.btmText}>Share</Text>
   <View style={[styles.bottomBorder,{width:widthPixel(33)}]}></View>
   </View>
   </View>
   </View>
   <View style={{alignItems:'center'}}>
    <Text style={GlobalStyle.Label}>© Copyright Stacia<Text style={{color:COLORS.primary}}>Tech</Text>. All Rights Reserved</Text>
   </View>
     </View>
    </View>
   
  )
}

export default Aboutus

const styles = StyleSheet.create({
btmText:{
fontFamily:FONT.EuclidMedium,
fontSize:SIZES.small,
color:COLORS.SecondaryText,
},
horizontalLine:{
height:heightPixel(28),
width:1.5,
backgroundColor:COLORS.BorderColor
},
borderHead:{
flexDirection:"column",
gap:3,
},
bottomBorder:{
height:1,
backgroundColor:COLORS.SecondaryText
}
})