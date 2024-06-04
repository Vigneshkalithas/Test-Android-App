import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { MyContext } from '../../context/MyContext'
import { COLORS } from '../../Constants'
import { pixelSizeVertical } from '../../styles/Responsive'


const LogoutScreen = () => {
const{Logout} = useContext(MyContext)
  return (
    <View style={{flex:1,  padding:40, backgroundColor:COLORS.white}}>
      <Pressable style={{width:100, height:40, backgroundColor:COLORS.primary, borderRadius:6,justifyContent:'center', alignItems:'center'}} onPress={()=>Logout()}><Text style={{color:COLORS.white}}>Logout</Text></Pressable>
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({})