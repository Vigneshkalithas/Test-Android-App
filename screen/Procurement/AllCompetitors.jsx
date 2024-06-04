import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { ContactCard, Filterx, SearchBar, SingleLineCard } from '../../components'
import { COLORS, UNIQUEWIDTH } from '../../Constants'
import { ScrollView } from 'react-native-gesture-handler'




const AllCompetitors = ( { route} ) => {
 const { data } = route.params;
  return (
    <View style={{flex:1,backgroundColor:COLORS.white,paddingVertical: pixelSizeVertical(15)}}>
    <View style={{paddingHorizontal: pixelSizeHorizontal(15)}}>
    <SearchBar content={"RecentActivity"}/>
    <View style={{paddingVertical:pixelSizeVertical(20)}}>
     <ScrollView showsVerticalScrollIndicator={false}>
      <Filterx text={"All Competitors"} shareBtn={true} txtClr={COLORS.primary} />
      {data.length == 0 ? 
      <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
           <Text style={GlobalStyle.cardHeadlineText}>There are no Competitors.</Text>
        </View>
       :
      <>
     {data.map((data,index)=>{
     return(
      <View key={index}>
       <SingleLineCard item={data} />
     </View>
     )
     })}
     </>
}
     </ScrollView>
     </View>
    </View>
    
    </View>
  )
}

export default AllCompetitors

const styles = StyleSheet.create({})