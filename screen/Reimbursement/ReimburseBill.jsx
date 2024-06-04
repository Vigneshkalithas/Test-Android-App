import { Pressable, StyleSheet, Text, View ,  useWindowDimensions , Image , Share} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { ASPECTRADIO, COLORS, FONT, ICONS, Images, SIZES, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { useNavigation } from '@react-navigation/native';
// import PagerView from 'react-native-pager-view';
import GlobalStyle from '../../styles/GlobalStyle';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AntDesign,Entypo ,Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonUnfill, Buttonx, Loader, SelectProcurementCard, Uploader, showToaster } from '../../components';
import { ActivityIndicator } from 'react-native-paper';
import CustomStepIndicator from './CustomStepIndicator';
import * as Sharing from 'expo-sharing';
import RBSheet from "react-native-raw-bottom-sheet";
import {  GetApiData, } from '../../apiHelper';
import { Api } from '../../api/api';
import axios from 'axios';



const PriceDetailsData = [
{
reimburse:'Black Sesame',
quantity:'12,895',
price:'₹5,698.56'
},
{
reimburse:'White Sesame',
quantity:'10,658',
price:'₹9,635.65'
},
{
reimburse:'Red Sesame',
quantity:'25,647',
price:'₹2,14,896.56'
},
{
reimburse:'Groundnuts',
quantity:'4852',
price:'₹5,698.56'
},
{
reimburse:'Tarvel',
quantity:null,
price:'₹5,698.56'
},
{
reimburse:'Food',
quantity:null,
price:'₹5,698.56'
},

]

const SingleData =
{
reimburse:'Black Sesame',
quantity:'12,895 Kg',
price:'₹5,698.56'
}

const unbillData = [
{
productName:'Black Sesame',
count:'13 Lots',
price:'₹5,698.56'
},
{
productName:'White Sesame',
count:'10 Lots',
price:'₹9,635.65'
},
// {
// productName:'Red Sesame',
// count:'80 Lots',
// price:'₹2,14,896.56'
// },
// {
// productName:'Red Sesame',
// count:'20 Lots',
// price:'₹2,14,896.56'
// },
// {
// productName:'Black Sesame',
// count:'13 Lots',
// price:'₹5,698.56'
// },
]


const DetailsCard=( { name , Ptype , Bid, Date} )=>{


return(
<View style={styles.DetailsCardConatiner}>
<View style={{flexDirection:'column',justifyContent:'space-between', gap:20 }}>
<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>Bill Id</Text>
<Text style={GlobalStyle.districtText}>{Bid ? Bid : "--"}</Text>
</View>
<View style={styles.innerContainer}>
<Text style={GlobalStyle.cardDateText}>Name</Text>
<Text style={GlobalStyle.districtText}>{name ? name : "--"}</Text>
</View>
</View>
<View style={{flexDirection:'column',justifyContent:'space-between', gap:20 }}>
<View style={styles.innerContainer}>
<Text style={GlobalStyle.cardDateText}>Bill Type</Text>
<Text style={GlobalStyle.districtText}>{Ptype ? Ptype : "---"}</Text>
</View>
<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>Date</Text>
<Text style={GlobalStyle.districtText}>{Date ? Date : "---"}</Text>
</View>
</View>

</View>
)
} 
const PriceDeatail=( {data})=>{
return(
<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:pixelSizeVertical(8)}}>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-start",flexDirection:'row', alignItems:'center', gap:10}}>
<Text style={GlobalStyle.reimText}>{data.name ? data.name : "--"}</Text>
{data.name ? 
<Pressable>
  <AntDesign name="exclamationcircleo" size={15} color={COLORS.PrimaryText}/>
  </Pressable> : null }
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"center"}}>
<Text style={GlobalStyle.reimText}>{data.quantity ? `${data.quantity} Kg` : "--"}</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-end"}}>
<Text style={GlobalStyle.reimText}> {data.amount ? `₹ ${data.amount}` : "--"}</Text>
</View>
</View>
)
}
const DottedBorder = ()=>{
return(<View style={{borderTopWidth:1, borderColor:COLORS.BorderColor,borderStyle:"dashed", marginVertical:pixelSizeVertical(20)}}></View>)
}
 
// APMC Bill
const FirstRoute = ({data }) => {
return(
  <View style={{flex: 1, borderTopColor:COLORS.BorderColor, borderTopWidth:1, alignItems:'center'}}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <View style={{width:UNIQUEWIDTH.wid}}>
  <DetailsCard/>
  <View style={{marginTop:heightPixel(10)}}>
  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
  <Text style={GlobalStyle.inputText}>Price Details</Text>
  <Pressable>
  <AntDesign name="exclamationcircleo" size={20} color={COLORS.primary}/>
  </Pressable>
  </View>
  <DottedBorder/>
  {PriceDetailsData.map((data,index)=>{
  return(
  <View key={index}>
  <PriceDeatail data={data}/>
  </View>
  )
  })}
  <DottedBorder/>
  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-start"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>Total ({PriceDetailsData.length})</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"center"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>49,885 Kg</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-end"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>₹32986.65</Text>
</View>
  </View>
  <DottedBorder/>
  </View>
   {data=="Creating" ? 
    <Uploader txt={"Attachment"} optn={"Optional"} />
  :
  <View>
   <Text style={GlobalStyle.Label}>Attachment</Text>
   <View style={{flexDirection:'row', gap:15}}>
   <View style={{marginVertical:pixelSizeVertical(10), flexDirection:'row', alignItems:'center', gap:5, justifyContent:'center', width:widthPixel(110), height:heightPixel(40) ,backgroundColor:COLORS.primary, borderRadius:6}}>
    <AntDesign name="pdffile1" size={15} color={COLORS.white} />
    <Text style={[GlobalStyle.idText,{color:COLORS.white}]}>Invoice</Text>
   </View>
   <View style={{marginVertical:pixelSizeVertical(10), flexDirection:'row', alignItems:'center', gap:5, justifyContent:'center', width:widthPixel(70), height:heightPixel(40) ,backgroundColor:COLORS.Secondary, borderRadius:6}}>
    <Text style={GlobalStyle.txtLot}>+20</Text>
    <Entypo name="attachment" size={16} color={COLORS.primary} />
   </View>
   </View>
  </View>
  }
  </View>
   {/* {data==="Pending" ? null :
   <View styles={{width:UNIQUEWIDTH.wid}}>
    <Image source={Images.reimStatus}/>
    </View>
} */}
<View>
{/* <CustomStepIndicator/> */}
</View>
   </ScrollView>

   
   
  </View>
);
}

// Agent Bill
const SecondRoute = ({data, openSelectSheet, agentData}) => {
const navigation = useNavigation()
// console.log(agentData[0].billStatement.data)
if(!agentData){
 return(<Loader/>)
}
return(
   <View style={{flex: 1, borderTopColor:COLORS.BorderColor, borderTopWidth:1, alignItems:'center'}}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <View style={{width:UNIQUEWIDTH.wid}}>
  <DetailsCard name={agentData[0].agent.fullName} Ptype={agentData[0].procureType} Bid={agentData[0].billId} Date={agentData[0].displayDate} />
  <View style={{marginTop:heightPixel(10)}}>
  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
  <Text style={GlobalStyle.inputText}>Price Details</Text>
  <Pressable>
  <AntDesign name="exclamationcircleo" size={20} color={COLORS.primary}/>
  </Pressable>
  </View>
  <DottedBorder/>
  {data=="Creating" ? 
  <View>
  <PriceDeatail data={SingleData}/>
  <View style={styles.unbill}>
  <Text style={GlobalStyle.tabelText}>There are 4 unbilled Expenses</Text>
  <Pressable onPress={openSelectSheet}><Text style={GlobalStyle.inputText}>+Add</Text></Pressable>
  </View>
  </View>
  :
  <>
  {agentData[0].displayArray.map((data,index)=>{
  return(
  <View key={index}>
  <PriceDeatail data={data}/>
  </View>
  )
  })}
  </>
  }
<DottedBorder/>
  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-start"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>Total ({agentData[0].totalLength ? agentData[0].totalLength : "--" })</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"center"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}>{agentData[0].overAllProductQuantity ?  `${agentData[0].overAllProductQuantity} Kg` : "--" }</Text>
</View>
<View style={{width:UNIQUEWIDTH.wid/3, alignItems:"flex-end"}}>
<Text style={GlobalStyle.overAllHeadLinePrimary}> {agentData[0].overAllProductAmount ?  `₹ ${agentData[0].overAllProductAmount}` : "--" }</Text>
</View>
  </View>
  <DottedBorder/>
  </View>
  {data=="Creating" ? 
  <>
   <Pressable onPress={()=>navigation.navigate("CreateReimbursement")} style={{paddingVertical:pixelSizeVertical(15)}}><Text style={GlobalStyle.overAllHeadLinePrimary}>+ Add Reimbursement</Text></Pressable>
   <Uploader txt={"Attachment"} optn={"Optional"} />
  </>
  :
  <View>
   <Text style={GlobalStyle.Label}>Attachment</Text>
   <View style={{flexDirection:'row', gap:15}}>
   <View style={{marginVertical:pixelSizeVertical(10), flexDirection:'row', alignItems:'center', gap:5, justifyContent:'center', width:widthPixel(110), height:heightPixel(40) ,backgroundColor:COLORS.primary, borderRadius:6}}>
    <AntDesign name="pdffile1" size={15} color={COLORS.white} />
    <Text style={[GlobalStyle.idText,{color:COLORS.white}]}>Invoice</Text>
   </View>
   {agentData[0].attachmentLength === 0 ? null :
   <Pressable style={{marginVertical:pixelSizeVertical(10), flexDirection:'row', alignItems:'center', gap:5, justifyContent:'center', width:widthPixel(70), height:heightPixel(40) ,backgroundColor:COLORS.Secondary, borderRadius:6}}>
    <Text style={GlobalStyle.txtLot}>+{agentData[0].attachmentLength}</Text>
    <Entypo name="attachment" size={16} color={COLORS.primary} />
   </Pressable> }
   </View>
  </View>
  }
  </View>
   {/* {data==="Pending" ? null :
   <View styles={{width:UNIQUEWIDTH.wid}}>
    <Image source={Images.reimStatus}/>
    </View>
} */}
<View>
{/* <CustomStepIndicator/> */}
</View>
   </ScrollView>


   
  </View>
)
}



const renderTabBar = (props) => ( 

    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={{ 
  backgroundColor:COLORS.primary,
  height:heightPixel(5),
  borderTopRightRadius:22,
  borderTopLeftRadius:22,
  alignSelf:'center',
  alignItems:'center',
  width:widthPixel(60),
  marginLeft: props.navigationState.index == 0 ? widthPixel(24) : widthPixel(25)}}
      scrollEnabled
      renderLabel={({ route, focused, color }) => (
        <Text style={[styles.label,{color:focused ? COLORS.primary : COLORS.SecondaryText }]}>{route.title}</Text>
      )}
      tabStyle={styles.tabStyle}
    />
  );


const ReimburseBill = ( {route} ) => {
const { status,ID,bilID } = route.params
// const [sts,setSts] = useState(null)
const [shareBtnVisible, setShareBtnVisible] = useState(false)
const refApproveSheet = useRef(null)
const refSelectSheet = useRef(null)
const refEditSheet = useRef(null)
const [apmc, setApmc] = useState(false)
const [agent,setAgent] = useState(false)
const [selectNxtProcure, setSelectNxtProcure] = useState(true)
const [agentData, setAgentData] = useState(null)

useEffect(() => {
CallApi()
}, [])

const CallApi = async()=>{
const Datas = await GetApiData(`bill/show/${ID}/${bilID}`, `Reimbursement Bill Details`)
if(Datas!=null){
setAgentData(Datas)
}
}

const Approved = ()=>{
refApproveSheet.current.close()
}
const OpenSheet = ()=>{
refApproveSheet.current.open()
}
const openSelectSheet = ()=>{
refSelectSheet.current.open()
}

const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app!',
        // You can also specify other properties like `url` for sharing a URL.
        // url: 'https://example.com',
      });

      if (result.action === Share.sharedAction) {
        // Sharing was successful
        console.log('Content shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Sharing was dismissed
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error('Error sharing content:', error.message);
    }
};

const shareContents = async () => {
    try {
      const pdfUrl = 'URL_OR_PATH_TO_YOUR_PDF_FILE';
      await Sharing.shareAsync(pdfUrl);
      console.log('PDF file shared successfully');
    } catch (error) {
      console.error('Error sharing PDF file:', error.message);
    }
};

 const navigation = useNavigation()
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'APMC Bill' },
    { key: 'second', title: 'Agent Bill' },
  ]);


const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute data={status} OpenSheet={OpenSheet} />;
      case 'second':
        return <SecondRoute data={status} openSelectSheet={openSelectSheet} agentData={agentData}/>;
      default:
        return null;
    }
  };

  // useEffect(() => {
  // setSts(status)
  // }, [])
  

  if (!agentData) {
    return <Loader/>
  }

  return (
    <View style={{flex:1, backgroundColor:COLORS.white}}>
    <View style={{alignItems:'center', paddingTop:heightPixel(30), paddingBottom:heightPixel(15)}}>
     <View style={{width:UNIQUEWIDTH.wid,}}>
     <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
     <Pressable onPress={()=>navigation.goBack()}>
     <ICONS.GoBack/>
     </Pressable>
     <Pressable onPress={()=>setShareBtnVisible(!shareBtnVisible)}>
      <Feather name="more-vertical" size={20} color="black" />
     </Pressable>
     </View>
     {shareBtnVisible ?
     <View style={styles.sharBTn}> 
     <Pressable onPress={shareContent} >
     <Text style={GlobalStyle.idText}>Share</Text>
    </Pressable> 
    <Pressable onPress={()=>{ 
    setShareBtnVisible(!shareBtnVisible) 
    refEditSheet.current.open()}} >
     <Text style={GlobalStyle.idText}>Edit Agent Bill</Text>
    </Pressable>
    </View>
    : null }
     </View>
     </View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      data={status}
    />
  {status === "Pending" ? 
  <View style={{height:heightPixel(90),shadowColor:'#454545', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 35, shadowRadius: 35, elevation:0.4, width:ASPECTRADIO.width, alignItems:"center"}}>
  <View style={{width:UNIQUEWIDTH.wid, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', flex:1, marginBottom:heightPixel(20), }}>
  <ButtonUnfill txt={"Decline"}/>
  <Buttonx txt={"Approve"} style={styles.btn} fn={()=>refApproveSheet.current.open()}/>
  </View>
    </View> : null }
   
    <View>
    <RBSheet
      ref={refApproveSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.37}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
          
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
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
          <Text style={[GlobalStyle.districtText,{textAlign:'center', width:widthPixel(307)}]}>
            Please confirm that you wish to approve 
            these bills.
          </Text>
        </View>

        <View style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(20), gap:22}}>
          <Pressable style={styles.radioBtnHead} onPress={()=>setApmc(!apmc)}>
          <Text style={GlobalStyle.districtText}>APMC Bill</Text>
          {apmc? <ICONS.RadioCheckActive/>: <ICONS.RadioCheckInActive/>}
          </Pressable>
           <Pressable style={styles.radioBtnHead} onPress={()=>setAgent(!agent)}>
          <Text style={GlobalStyle.districtText}>Agent Bill</Text>
            {agent? <ICONS.RadioCheckActive/>: <ICONS.RadioCheckInActive/>}
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
             
          }}
        >
          <ButtonUnfill
            txt={"Cancel"}
            fn={()=>refApproveSheet.current.close()}
          />
          <Buttonx
            txt={"Approve"}
            style={{
              height: heightPixel(48),
              width: widthPixel(171),
              backgroundColor: COLORS.primary,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
            fn={Approved}
          />
        </View>
      </View>
    </RBSheet>
    </View>
    <RBSheet
      ref={refSelectSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      // height={ASPECTRADIO.height * 0.35}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
          
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
      }}
    >
     <View
        style={{
          flexDirection: "column",
          gap: 20,
          width: UNIQUEWIDTH.wid,
          padding: 8,
        
        
        }}
      >
        <View>
          <Text style={[GlobalStyle.cancelBtn]}>
            Select Procurement
          </Text>
        </View>

        <View>
{unbillData.map((data,index)=>{
return(
<View key={index}>
<SelectProcurementCard item={data} actionFn={()=>refApproveSheet.current.close()}/>
</View>
)
})}
</View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
             
          }}
        >
         
          <Buttonx
            txt={"Next"}
            disabled={selectNxtProcure}
            style={GlobalStyle.btnNext}
            fn={Approved}
          />
        </View>
      </View>
    </RBSheet>
    <RBSheet
      ref={refEditSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      // height={ASPECTRADIO.height * 0.35}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
          
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
      }}
    >
     <View
        style={{
          flexDirection: "column",
          gap: 20,
          width: UNIQUEWIDTH.wid,
          padding: 8,
        
        
        }}
      >
        <View>
          <Text style={[GlobalStyle.cancelBtn]}>
            Edit Procurement
          </Text>
         
        </View>

        <View>
{unbillData.map((data,index)=>{
return(
<View key={index}>
<SelectProcurementCard item={data} actionFn={()=>refApproveSheet.current.close()}/>
</View>
)
})}
</View>
      </View>
    </RBSheet>
    </View> 
    
  )
}

export default ReimburseBill

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor:'yellow'
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
    page2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'green'
  },
  indiCator:{
  width:widthPixel(60),
  height:heightPixel(5),
  borderTopLeftRadius:22,
  borderTopRightRadius:22,
  backgroundColor:COLORS.primary,
  marginVertical:pixelSizeVertical(10),
  position:'relative',
  },
  tabBar:{
   backgroundColor:COLORS.white,
   width:ASPECTRADIO.width/1.5,
     paddingHorizontal:0,
  elevation: 0,
  shadowOpacity: 0, 
  },
  tabStyle:{
     color:COLORS.PrimaryText,
     alignSelf:'center',
     alignItems:'center',
  },
  label:{
  fontFamily:FONT.EuclidMedium,
  fontSize: SIZES.size14,
  color:COLORS.primary,
  textTransform:"none"
  },
  DetailsCardConatiner:{
width:"100%",
borderWidth:1,
borderColor:COLORS.BorderColor,
borderRadius:6,
paddingHorizontal:pixelSizeHorizontal(20),
paddingVertical:pixelSizeVertical(20),
marginVertical:pixelSizeVertical(20),
flexDirection:'row',
justifyContent:'space-between',
},
innerContainer:{
flexDirection:'column',
gap:5
},
btn:{
width: widthPixel(171),
height: heightPixel(48),
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
}
,
sharBTn:{
backgroundColor:COLORS.white, 
width:widthPixel(120), 
borderRadius:8,
height:heightPixel(92),
position:'absolute',
right:widthPixel(8), 
top:heightPixel(38), 
zIndex:999,
flexDirection:'column',
gap:15,
justifyContent:'center',
paddingHorizontal:pixelSizeHorizontal(10),
shadowColor: '#171717',
// shadowColor: COLORS.SecondaryText,
shadowOffset: {width: -2, height: 4},
shadowOpacity: 0.5,
shadowRadius: 3,
elevation:10
},
radioBtnHead:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between'
},

unbill:{
width:UNIQUEWIDTH.wid,
height:heightPixel(50),
backgroundColor:COLORS.Secondary,
borderRadius:6,
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
paddingHorizontal:pixelSizeHorizontal(15)
}
})