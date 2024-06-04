import { Pressable, StyleSheet, Text,View  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { Accordion, Divider, Filterx, Loader, ReimCard, SearchBar, ZeroState } from '../../components'
import GlobalStyle from '../../styles/GlobalStyle'
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing, withSpring, interpolate  } from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { getValueFromAsyncStorage } from '../../storage/AsyncStorage';
import { GetApiData } from '../../apiHelper';
import { ReimbursementZeroState } from "../../DataCenter" 





const Reimbursement = () => {
const [isPending, setIsPending] = useState(true);
const [pendingBils, setPendingBils] = useState(null);
const [completedBils, setCompletedBils] = useState(null);
const translateX = useSharedValue(isPending ? 0 : UNIQUEWIDTH.wid/2);
const navigation = useNavigation();
const opacity = useSharedValue(1);
const [pendingBillState, setPendingBillState] = useState(false);
const [completedBillState, setCompletedBillState] = useState(false)
const [openData,setOpenData] = useState(false);
const [managerId, setManagerId] = useState(null)

    const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }

  const toggleSwitch = () => {
    setIsPending(!isPending);
    translateX.value = withTiming(isPending ? UNIQUEWIDTH.wid/2 : 0, { duration: 200, easing: Easing.ease });
    opacity.value = withTiming(isPending ? 0 : 1,{duration: 200, easing: Easing.ease})
    
  };

   const pendingStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 1]),
  }));

  const completedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [1, 0]),
  }));


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));


const CallApi = async(id)=>{
const Pending = await GetApiData(`bill/pending/${id}`, "Reimbursement Pending Bills")
const Completed = await GetApiData(`bill/completed/${id}`, "Reimbursement Completed Bills")
if(Pending === "empty"){
setPendingBillState(true) 
}
if(Pending != null){
setPendingBils(Pending)
}
if(Completed === "empty"){
setCompletedBillState(true)
 }
if(Completed != null){
setCompletedBils(Completed)
}
}

const GetId = async()=>{ 
const id = await getValueFromAsyncStorage("userId")
setManagerId(id)
CallApi(id)
}

useEffect(() => {
GetId()
}, [])


if (!pendingBils && !completedBils) {
    return <Loader/>
  }
  return (
    <View style={{flex:1,backgroundColor:COLORS.white,paddingVertical: pixelSizeVertical(15), alignItems:"center"}}>
      <SearchBar content={"RecentActivity"}/>
      <View style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(10)}}>
      <Filterx text={"Reimbursement Bills"} txtClr={COLORS.primary} shareBtn={false}/>
      </View>
      <View style={styles.tabHead}>
      <Pressable style={styles.tabButton} onPress={toggleSwitch}>
      <Animated.View style={[styles.changeBackground,animatedStyle]}></Animated.View>
      <Text style={isPending ? [styles.tabTextActive] : [GlobalStyle.txtLot]}>Pending Bills</Text>
      </Pressable>
      <Pressable style={styles.tabButton} onPress={toggleSwitch}>
      <Text style={!isPending ? [styles.tabTextActive]:[GlobalStyle.txtLot]}>Completed Bills</Text>
      </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingVertical:pixelSizeVertical(15)}}> 
       {isPending ? (
          <Animated.View style={[pendingStyle]}>
            {pendingBillState ? <ZeroState  data={ReimbursementZeroState[0].pending} /> :
            <>
            {
      pendingBils.map((item,index)=>{
      return(
      <Pressable key={item._id} onPress={()=>navigation.navigate("ReimburseBill",{status:"Pending", ID : managerId, bilID:item._id })} style={{marginVertical:pixelSizeVertical(5)}}>
      <ReimCard data={item}/>
      </Pressable>
      )
      })
      } 
      </>
}
</Animated.View>
        ) : (
          <Animated.View style={[completedStyle]}>
           {completedBillState ? <ZeroState  data={ReimbursementZeroState[0].completed} /> : 
          <>
       {
        Object.keys(completedBils).map((month,index)=>{
        return(            
            <View style={{width:ASPECTRADIO.width,alignItems:"center", borderBottomWidth:1, borderBottomColor:COLORS.BorderColor, paddingVertical:pixelSizeVertical(20)}} key={month}>
                {openData == month ? null :
                   <>
                  <Pressable style={[GlobalStyle.flexJusSB, {width:UNIQUEWIDTH.wid,alignItems:"center"}]} onPress={() => onOpen(month)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{month}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                    </>
                }
                 {openData == month ?
                  <View>
                   <>
                    <Pressable onPress={onOpen} style={[GlobalStyle.flexJusSB, {width:UNIQUEWIDTH.wid,alignItems:"center"}]}>
                      <Text style={GlobalStyle.cancelBtn}>{month}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>                   
                    </>
          {completedBils[month].map((item,index)=>{
           return(
           <Pressable style={{paddingVertical:pixelSizeVertical(10)}} key={item._id} onPress={()=>navigation.navigate("ReimburseBill",{status:"Approve", ID : managerId, bilID:item._id })}>
           <ReimCard data={item}/>
           </Pressable>
           )
           })}
          
          </View> : null}
            </View>    
        )
        })
       }   
           </>
           } 
           
          </Animated.View>
        )}
      </View>
      </ScrollView>
    <Pressable style={styles.floatBtnHead} onPress={()=>navigation.navigate("DistrictWiseReim")}>
    <ICONS.createNewReimbursement/>
    </Pressable>
    </View> 
  )
}

export default Reimbursement

const styles = StyleSheet.create({
tabHead:{
width:UNIQUEWIDTH.wid,
flexDirection:"row",
alignItems:'center',
height:heightPixel(48),
borderRadius:6,
borderWidth:1,
borderColor:COLORS.BorderColor,
borderTopRightRadius:6,
borderBottomRightRadius:6,
},
tabTextActive:{
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.white,
},
tabButton:{
width:"50%",
alignItems:'center',
justifyContent:'center'
},
changeBackground:{
backgroundColor:COLORS.primary,
height:"100%",
width:"100%",
borderRadius:6,
position:'absolute',
},
floatBtnHead:{
position:'absolute',
width:widthPixel(58),
height:heightPixel(58),
backgroundColor:COLORS.primary,
borderRadius:14,
justifyContent:'center',
alignItems:'center',
elevation:5,
top:"90%",
// right:widthPixel(20)
right:widthPixel(25)
}
})



