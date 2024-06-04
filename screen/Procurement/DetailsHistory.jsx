import { StyleSheet, Text, View, Button } from 'react-native'
import React , {useEffect, useState} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { COLORS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { SearchBar, CardQualityAndDistrict, ProgressTracker,  } from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'

const DetailsHistory = ({route}) => {
   const { item } = route.params;


  return (
    <View style={GlobalStyle.globalHead}>
    <SearchBar content={'RecentActivity'}/>
     <View style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(25)}}>
      <CardQualityAndDistrict Ltop={"Procurement ID"} Lbottom={`${item.procurementId}`} RTop={"Date"} Rbottom={item.date}/>
      <DetailsCard data={item}/>
      <BottomCard />
      <LogissticStatus status={item.status}/>
     </View>
    </View>
  )
}

const DetailsCard=( {data} )=>{

return(
<View style={styles.DetailsCardConatiner}>
<View style={{flexDirection:'column',justifyContent:'space-between' }}>

<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>AgentName</Text>
<Text style={GlobalStyle.districtText}>{data.displayName?data.displayName:'--'}</Text>
</View>

<View style={styles.innerContainer}>
<Text style={GlobalStyle.cardDateText}>Product</Text>
<Text style={GlobalStyle.districtText}>{data.productName?data.productName:"--"}</Text>
</View>

<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>Quality</Text>
<Text style={GlobalStyle.districtText}>{data.quality?data.quality:"--"}</Text>
</View>


<View style={styles.innerContainer}>
<Text style={GlobalStyle.cardDateText}>Lot no.</Text>
<Text style={GlobalStyle.districtText}>{data.lotNo?data.lotNo:"--"}</Text>
</View>

</View>
<View style={{flexDirection:'column',justifyContent:'space-between' }}>

<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>Status</Text>
<Text style={GlobalStyle.districtText}>{data.status?data.status:"--"}</Text>
</View>
<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>Quantity</Text>
<Text style={GlobalStyle.districtText}>{data.quantity?data.quantity:"--"}</Text>
</View>
<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>Price</Text>
<Text style={GlobalStyle.districtText}>{data.overAllPrice?data.overAllPrice:"--"}</Text>
</View>
<View style={styles.innerContainer} >
<Text style={GlobalStyle.cardDateText}>District</Text>
<Text style={GlobalStyle.districtText}>{data.district?data.district:"--"}</Text>
</View>

</View>



</View>
)
} 

const BottomCard=()=>{
return(
<View style={[styles.DetailsCardConatiner,{height:heightPixel(77)}]}>
 <View style={styles.col}>
  <Text style={GlobalStyle.cardDateText}>IV</Text>
  <Text style={GlobalStyle.cardHeadlineText}>---</Text>
 </View>
 <View style={styles.HorizontalLine}></View>
  <View style={styles.col}>
  <Text style={GlobalStyle.cardDateText}>FFA</Text>
  <Text style={GlobalStyle.cardHeadlineText}>---</Text>
 </View>
 <View style={styles.HorizontalLine}></View>
  <View style={styles.col}>
  <Text style={GlobalStyle.cardDateText}>O^</Text>
  <Text style={GlobalStyle.cardHeadlineText}>---</Text>
 </View>
 <View style={styles.HorizontalLine}></View>
  <View style={styles.col}>
  <Text style={GlobalStyle.cardDateText}>Yield</Text>
  <Text style={GlobalStyle.cardHeadlineText}>---</Text>
 </View>
</View>
  
)
} 

const LogissticStatus = ({status})=>{
const [currentStep, setCurrentStep] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep < 2 ? prevStep + 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, []);
const stages = [
{
label:"Awaiting Arrival",
completed:true,
txtWidht:54,
},
{
label:"In Transit",
completed:false,
txtWidht:52,
},
{
label:"Received By Idhayam",
completed:false,
txtWidht:67,
},
]

return(
<View style={{marginTop:pixelSizeVertical(30)}}>
<View>
<Text style={GlobalStyle.overAllHeadLine}>
Logistics Status
</Text>
</View>
<View>
      <ProgressTracker stages={stages} status={status} />
     {/* <StepIndicator steps={3} currentStep={currentStep} /> */}
    </View>
</View>
)
}


export default DetailsHistory

const styles = StyleSheet.create({
DetailsCardConatiner:{
width:"100%",
height : heightPixel(275),
borderWidth:1,
borderColor:COLORS.BorderColor,
borderRadius:6,
paddingHorizontal:pixelSizeHorizontal(20),
paddingVertical:pixelSizeVertical(20),
marginVertical:pixelSizeVertical(15),
flexDirection:'row',
justifyContent:'space-between',
},
innerContainer:{
flexDirection:'column',
gap:5
},

 HorizontalLine: {
    height: heightPixel(40),
    width: 2,
    backgroundColor: COLORS.BorderColor,
  },
  col:{
  flexDirection:'column',
  justifyContent:"center",
  alignItems:'center'
  }
})