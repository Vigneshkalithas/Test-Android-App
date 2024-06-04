import { Pressable, StyleSheet, Text, View } from 'react-native'
import React , { useContext, useEffect, useState } from 'react'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { Filterx, SingleCard, SingleLineCard , BidsCard } from '../../components'
import { COLORS, ICONS ,FONT, UNIQUEWIDTH, SIZES} from '../../Constants'
import { MyContext } from "../../context/MyContext"
import { ScrollView } from 'react-native-gesture-handler'
import GlobalStyle from '../../styles/GlobalStyle'
import { BidsDatas ,CompetitorsData  } from '../../DataCenter'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import {Bids} from '../../atoms/Agents';



const ParticularBids = () => {
  const [openData, setOpenData] = useState(false)
  const [apiBidsData,setApiBidsData] = useRecoilState(Bids)



  const onOpen = (id) => {
    setOpenData(openData === id ? null : id)

  }
  const navigation = useNavigation()
  if (!apiBidsData) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }
  return (
       <View style={{paddingHorizontal:pixelSizeHorizontal(15), paddingVertical:pixelSizeVertical(15)}}>
      <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:pixelSizeVertical(20)}}>
      <Filterx text={"All Bids"} shareBtn={true} txtClr={COLORS.primary} />
      <View style={{flexDirection:'column', gap:12, marginBottom:pixelSizeVertical(35)}}>
      {apiBidsData[0]?.today?.length==0 ?  
        <View style={{alignItems:'center', gap:10}}>
      <ICONS.emptyOpenBids/>
      <Text style={[GlobalStyle.overAllHeadLinePrimary,{fontSize:SIZES.size14, paddingVertical:pixelSizeVertical(15)}]}>There are no bids for today</Text>
      </View> 
      :
      <>
      {apiBidsData[0].today?.map((item)=>{
      return(
      <View key={item.id}>
      <Pressable 
      onPress={()=>navigation.navigate("DetailsHistory", { item})}
      >
      <BidsCard data={item}/>
      </Pressable>
      </View>
      )
      })}
      
      </>
      }
      
      </View>
      <View>
      <Filterx text={"History"} shareBtn={false} txtClr={COLORS.primary} />
      {apiBidsData[0].history?.length==0 ?  
       <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
       <Text style={GlobalStyle.cardHeadlineText}>We couldn't find History.</Text>
       </View> : 
       <>
       {Object.keys(apiBidsData[0].history).map((data, index)=>{
      return(
       <View style={[GlobalStyle.districtTxt]} key={index} >
                {openData === data ? null :
                  <Pressable style={GlobalStyle.flexJusSB} onPress={() => onOpen(data)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{data}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }
                {openData === data ?
                  <View>
                    <Pressable onPress={onOpen} style={GlobalStyle.flexJusSB}>
                      <Text style={GlobalStyle.cancelBtn}>{data}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    {
                    apiBidsData[0].history[data].map((item,index)=>{
                      //  console.log(apiBidsData[0].history[data])
                     return (
                        <View key={index} style={{marginVertical:pixelSizeVertical(7)}}>
                        <Pressable 
                        onPress={()=>navigation.navigate("DetailsHistory", {item})}
                        >
                         <BidsCard data={item} nestedNavigation={false}/>
                         </Pressable>
                        </View>
                      )
                    })
                    }
                
                  </View> : null}
       </View>
              )

       })}
      </>
}
      </View>
      </ScrollView>
      
      </View>
    </View>
  )
}






export default ParticularBids

const styles = StyleSheet.create({
})









