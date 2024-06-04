import { StyleSheet, Text, View, Image } from 'react-native'
import React,{useState , useRef} from 'react'
import { ICONS, COLORS, FONT, SIZES ,Images, ASPECTRADIO} from "../Constants"
import { SearchBar } from '../components'
import { heightPixel, pixelSizeVertical, widthPixel } from '../styles/Responsive'
import GlobalStyle from '../styles/GlobalStyle'
import LottieView from 'lottie-react-native';
import NewTruck from "../animation/NewTruck.json"

const Logistics = () => {
 const animation = useRef(null);
  return (
    <View style={GlobalStyle.globalHead}>
      <SearchBar content={"Home"} />
      <View style={styles.SuccessmodalContainer}>
      <View style={{width:widthPixel(300),height:heightPixel(300),justifyContent:'center',alignItems:'center'}}>
      <Image source={Images.LogisticsTruck} style={{width:widthPixel(380),height:heightPixel(380)}}/>
      </View>
      <View style={{alignItems:'center', gap:10}}>
      <Text style={[GlobalStyle.overAllHeadLinePrimary,{fontSize:SIZES.xmedium}]}>Logistics Coming Soon...</Text>
      <ICONS.LogisticsEmptyStateText/>
      </View>
      </View>
       
    </View>
  )
}

export default Logistics

const styles = StyleSheet.create({
SuccessmodalContainer: {
    flex:1,
    marginTop:pixelSizeVertical(80)
  },
})