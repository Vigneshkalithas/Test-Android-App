import { StyleSheet, Text, View } from 'react-native'
import React , { useContext, useEffect, useState } from 'react'
import { pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { ActivityCard, Filterx } from '../../components'
import { COLORS, ICONS, SIZES } from '../../Constants'
import { MyContext } from "../../context/MyContext"
import { ScrollView } from 'react-native-gesture-handler'
import { useRecoilState } from 'recoil'
import { OpenBids } from '../../atoms/Agents';
import GlobalStyle from '../../styles/GlobalStyle'

const ParticularOpenBits = () => {
const {ownData} = useContext(MyContext)
const [apiOpenBidsData, setApiOpenBidsData] = useRecoilState(OpenBids);
const [apiDataLength, setApiDataLength] = useState(null)


useEffect(() => {
setApiDataLength(apiOpenBidsData.length)
}, [apiOpenBidsData])



  return (
    <View style={{paddingHorizontal:pixelSizeHorizontal(15), paddingVertical:pixelSizeVertical(15)}}>
      <View style={{alignItems:'center'}}>
      {apiDataLength == 0 ? 
      <View style={{alignItems:'center', gap:10}}>
      <ICONS.emptyOpenBids/>
      <Text style={[GlobalStyle.overAllHeadLinePrimary,{fontSize:SIZES.size14, paddingVertical:pixelSizeVertical(15)}]}>There are no bids for today</Text>
      </View> :
      <ScrollView showsVerticalScrollIndicator={false}>
      <Filterx text={"All Activity"} txtClr={COLORS.primary} />
      <View style={{flexDirection:'column', gap:12, marginBottom:pixelSizeVertical(35)}}>
      
      {apiOpenBidsData.map((item,index)=>{
      return(
      <View key={item.id}>
      <ActivityCard data={item}/>
      </View>
      )
      })}
    

      </View>
      </ScrollView>
}
      
      </View>
    </View>
  )
}

export default ParticularOpenBits

const styles = StyleSheet.create({})