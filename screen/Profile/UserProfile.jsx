import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext , useRef } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { ButtonUnfill, Buttonx, SearchBar } from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { useNavigation } from '@react-navigation/native'
import { Switch } from 'react-native-paper';
import { MyContext } from '../../context/MyContext'
import RBSheet from "react-native-raw-bottom-sheet";

const UserProfile = () => {
const navigation = useNavigation()
// const {  refLogoutSheet , refShareSheet, Logout } = useContext(MyContext)
const  refLogoutSheet = useRef()
const LogoutSheetOpen = ()=>{
  // LogoutSheet.current.open()
}

const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.container}>
    <View style={{ height:"40%" ,backgroundColor:COLORS.Secondary, alignItems:'center'}}>
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
    <View style={styles.innerContainer}>
<View style={{flexDirection:"column", gap:8}}>
<Text style={GlobalStyle.overAllHeadLine}>Vignesh Kalithas</Text>
<Text style={GlobalStyle.txtLot}>Manager</Text>
<Text style={GlobalStyle.idText}>#ID733797939</Text>
</View>
<View>
<ICONS.userProfileVignesh/>
<Pressable style={{position:"absolute", top:heightPixel(70), right:widthPixel(0)}}>
<ICONS.profilEdit/>
</Pressable>
</View>
    </View>
     <View style={{width:UNIQUEWIDTH.wid, backgroundColor:"#E8EFFF", height:heightPixel(80), borderRadius:8,paddingHorizontal:pixelSizeHorizontal(15), flexDirection:"row", alignItems:"center",justifyContent:"space-between"}}>
     <View style={styles.cardContainer}>
     <ICONS.userImageProfile/>
     <Text style={GlobalStyle.txtLot}>My Leaderboard</Text>
     </View>
     <View style={styles.cardContainer}>
     <ICONS.leaderBoardActive/>
     <Text style={GlobalStyle.districtText}>65</Text>
     <ICONS.arrowSmall/>
     </View>
     </View>
    </View> 
   
    <View style={{alignItems:'center'}}>
     <View style={{flexDirection:"column", gap:30, width:UNIQUEWIDTH.wid, alignItems:'center', marginVertical:pixelSizeVertical(20)}} >

     <Pressable onPress={()=>navigation.navigate("ProfileDetails")} style={{flexDirection:'row', width:"100%" , alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:15}}>
              <ICONS.profileInfo/>
              <Text style={GlobalStyle.districtText}>Profile Info</Text>
            </View>
            <View>
              <ICONS.arrowSmall/>
            </View>
    
     </Pressable>
      <Pressable style={{flexDirection:'row', width:"100%" , alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:15}}>
              <ICONS.notificationBellBlue/>
              <Text style={GlobalStyle.districtText}>Notification</Text>
            </View>
            
            <View>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
     </Pressable>
      <Pressable onPress={()=> refLogoutSheet.current.open()} style={{flexDirection:'row', width:"100%" , alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:15}}>
             <ICONS.logOutIcon/>
              <Text style={GlobalStyle.districtText}>Logout</Text>
            </View>
            <View>
              <ICONS.arrowSmall/>
          </View>   
     </Pressable>
        
     </View>
     </View>
     <RBSheet
      ref={refLogoutSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.5}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
          // backgroundColor: 'transparent',
        },
        
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
         customModalProps:{
          animationType: 'slide',
          statusBarTranslucent: true,
          // backgroundColor: 'transparent',
        },
        customAvoidingViewProps:{
          enabled: false,
        }
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: UNIQUEWIDTH.wid,
          padding: 8,
        }}
      >
       <View>
       <ICONS.LogoutSvg/>
       </View> 
        <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(5)}}>
        <Text style={styles.LogutHeadline}>Logout</Text>
        <Text style={GlobalStyle.idText}>Are you sure want to logout now?</Text>
        </View>
        <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 20,
      }}
    >
      <ButtonUnfill txt={"Cancel"} fn={()=>refLogoutSheet.current.close()}/>
      <Buttonx
        txt={"Logout"}
        style={{
          height: heightPixel(48),
          width: widthPixel(171),
          backgroundColor: COLORS.primary,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
        // fn={}
      />
    </View>
      </View>
    </RBSheet>
    </View>
  )
}


export default UserProfile

const styles = StyleSheet.create({
container:{
flex:1, 
backgroundColor:COLORS.white,
// alignItems:'center'
},
innerContainer:{
flexDirection:'row', 
justifyContent:"space-between", 
width:UNIQUEWIDTH.wid, 
paddingVertical:pixelSizeVertical(30),
alignItems:"center"
},
cardContainer:{
flexDirection:"row",
 alignItems:"center",
  gap:10
},
LogutHeadline:{
color:COLORS.primary,
fontSize:SIZES.xmedium,
fontFamily:FONT.EuclidSemiBold,
marginVertical:pixelSizeVertical(10)
},
})