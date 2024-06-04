import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT, ICONS, SIZES } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { useNavigation } from '@react-navigation/native'
import GlobalStyle from '../../styles/GlobalStyle'

const PrivacyAndPolicy = () => {
  const navigation = useNavigation()
  return (
    <View style={{flex:1,backgroundColor:COLORS.white, paddingHorizontal:pixelSizeHorizontal(20), paddingVertical:pixelSizeVertical(50)}}>
    <Pressable onPress={()=>navigation.goBack()}>
    <ICONS.GoBack/>
    </Pressable>
    <View style={{paddingTop:pixelSizeVertical(25)}}>
    <Text style={[styles.HeadLine,{paddingVertical:pixelSizeVertical(7)}]}>Terms & Conditions</Text>
    <Text style={[GlobalStyle.idText]}>Last Updated On 24-10-2020</Text>
    <Text style={[GlobalStyle.overAllHeadLinePrimary,{paddingVertical:pixelSizeVertical(20)}]}>Terms & Conditions</Text>
    <View>
    <Text style={GlobalStyle.privacyPolciAndAboutText}>
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
    <Lists/>
    </View>
    </View>
    </View>
   
  )
}


const Lists = (content)=>{
return(
<View style={{flexDirection:'row', alignItems:'center', }}>
<Text style={styles.Dot}></Text>
<Text style={[GlobalStyle.privacyPolciAndAboutText,]}>Lorem ipsum dolor sit amet consectetur. Semper
      mus eu lorem eu. Magna dignissim sed vel.</Text>
</View>
)
}


export default PrivacyAndPolicy

const styles = StyleSheet.create({
HeadLine:{
    fontFamily: FONT.EuclidSemiBold,
    fontSize: SIZES.large,
    color: COLORS.primary,
},
Dot:{
// width:widthPixel(4),
// height:heightPixel(4),
// borderRadius:4,
// backgroundColor:COLORS.SecondaryText
 fontSize: 16,
    marginRight: 5,
    color:COLORS.SecondaryText
}
})