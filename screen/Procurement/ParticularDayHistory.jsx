import { StyleSheet, Text, View , Pressable} from 'react-native'
import React from 'react'
import { COLORS, UNIQUEWIDTH } from '../../Constants'
import { pixelSizeVertical } from '../../styles/Responsive'
import { Filterx , BidsCard } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import GlobalStyle from '../../styles/GlobalStyle'
import { SearchBar } from '../../components'
import { BidsDatas } from '../../DataCenter'
import { useNavigation } from '@react-navigation/native'

const ParticularDayHistory = ({ route }) => {
 const { data, exjactDate } = route.params;
//  const date = `${data.date[0]}${data.date[1]} Oct`
 const navigation = useNavigation()
  return (
    <View style={GlobalStyle.globalHead}>
    <SearchBar content={'RecentActivity'}/>
    <ScrollView style={{width:UNIQUEWIDTH.wid, paddingTop:pixelSizeVertical(15), }} showsVerticalScrollIndicator={false}>
    <Filterx text={exjactDate} txtClr={COLORS.primary} shareBtn={true}/>
     <View style={{marginVertical:pixelSizeVertical(10), flexDirection:'column', gap:15}}>
  
     {data.map((data, index)=>{
     return(
     <Pressable key={data.id} onPress={()=>navigation.navigate("DetailsHistory",{item:data})}>
     <BidsCard data={data}/>
      </Pressable>
     )
     })}
     </View>
    </ScrollView>
    </View>
  )
}

export default ParticularDayHistory

const styles = StyleSheet.create({})