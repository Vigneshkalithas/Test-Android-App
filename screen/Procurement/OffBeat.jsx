import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyle from '../../styles/GlobalStyle'

const OffBeat = () => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={GlobalStyle.cancelBtn}>We're working on offBeat!</Text>
    </View>
  )
}

export default OffBeat

const styles = StyleSheet.create({})