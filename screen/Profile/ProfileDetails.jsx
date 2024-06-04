import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { useNavigation } from '@react-navigation/native'
import { pixelSizeVertical } from '../../styles/Responsive'
import GlobalStyle from '../../styles/GlobalStyle'

const ProfileDetails = () => {
  const navigation = useNavigation()
  const [userName , setUserName] = useState("Vignesh kalithas")
  const [userEmail, setUserEmail] = useState("Vigneshkalithas@gmail.com") 
  const [userMobile , setUserMobile] = useState("8072019799") 
  const [userDistrict , setUserDistrict] = useState("Theni") 


  return (
    <View style={{flex:1, backgroundColor:COLORS.white, alignItems:"center"}}>
      <View style={{flexDirection:'row', justifyContent:"space-between", width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(30)}}>
      <Pressable onPress={()=>navigation.goBack()}>
     <ICONS.GoBack/>
     </Pressable>
     <View style={{flexDirection:'row', gap:20}}>
     <Pressable>
     <ICONS.NotificationIcon/>
     </Pressable>
     <Pressable >
     <ICONS.MessageIcon/>
     </Pressable>
     </View>
      </View>
    

      <View style={{width:UNIQUEWIDTH.wid}}>
    <View style={{marginVertical:pixelSizeVertical(10),}}>
    <Text style={[GlobalStyle.dateText,{fontSize:SIZES.medium}]}>Profile Info</Text>
    </View>
    <View>
        
          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(25),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            User Name
          </Text>
          <TextInput
            value={userName}
            style={
              [GlobalStyle.inputBox,{color:COLORS.SecondaryText}]
            }
          ></TextInput>

          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(25),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
          Email
          </Text>
          <TextInput
            value={userEmail}
            style={
              [GlobalStyle.inputBox,{color:COLORS.SecondaryText}]
            }
          ></TextInput>
           <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(25),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            Mobile Number
          </Text>
          <TextInput
            value={userMobile}
            style={
              [GlobalStyle.inputBox,{color:COLORS.SecondaryText}]
            }
          ></TextInput>
          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(25),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            District
          </Text>
          <TextInput
            value={userDistrict}
            style={
              [GlobalStyle.inputBox,{color:COLORS.SecondaryText}]
            }
          ></TextInput>
    </View>
    </View>

      
    </View>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({})