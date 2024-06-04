import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from '../../Constants'
import { SearchBarWithout } from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import GlobalStyle from '../../styles/GlobalStyle'
import { useNavigation } from '@react-navigation/native'
import * as Linking from 'expo-linking';


const HelpAndSupport = () => {
const Datas = [
{
name:"Procurement",
Nav:"HelpDetails",
details:[
{
Ques:"What is the procurement app, and how does it benefilt my organization",
Ans:"The procurement app streamlines the purchasing process, helping your organization save time and resources. It enhances efficiency, reduces errors, and provides better control over procurement activities."
},
{
Ques:"How do I get started with the procurement app?",
Ans:""
},
{
Ques:"What features does the procurement app offer?",
Ans:""
},
{
Ques:"Can the app integrate with our existing systems?",
Ans:""
}
],

},
{
name:"Leader Board",
Nav:"HelpDetails",
details:[
{
Ques:"What is the procurement app, and how does it benefilt my organization",
Ans:"The procurement app streamlines the purchasing process, helping your organization save time and resources. It enhances efficiency, reduces errors, and provides better control over procurement activities."
},
{
Ques:"How do I get started with the procurement app?",
Ans:""
},
{
Ques:"What features does the procurement app offer?",
Ans:""
},
{
Ques:"Can the app integrate with our existing systems?",
Ans:""
}
],
},
{
name:"Reimbursement",
Nav:"HelpDetails",
details:[
{
Ques:"What is the procurement app, and how does it benefilt my organization",
Ans:"The procurement app streamlines the purchasing process, helping your organization save time and resources. It enhances efficiency, reduces errors, and provides better control over procurement activities."
},
{
Ques:"How do I get started with the procurement app?",
Ans:""
},
{
Ques:"What features does the procurement app offer?",
Ans:""
},
{
Ques:"Can the app integrate with our existing systems?",
Ans:""
}
],
},
{
name:"Notification",
Nav:"HelpDetails",
details:[
{
Ques:"What is the procurement app, and how does it benefilt my organization",
Ans:"The procurement app streamlines the purchasing process, helping your organization save time and resources. It enhances efficiency, reduces errors, and provides better control over procurement activities."
},
{
Ques:"How do I get started with the procurement app?",
Ans:""
},
{
Ques:"What features does the procurement app offer?",
Ans:""
},
{
Ques:"Can the app integrate with our existing systems?",
Ans:""
}
],
},
{
name:"Events",
Nav:"HelpDetails",
details:[
{
Ques:"What is the procurement app, and how does it benefilt my organization",
Ans:"The procurement app streamlines the purchasing process, helping your organization save time and resources. It enhances efficiency, reduces errors, and provides better control over procurement activities."
},
{
Ques:"How do I get started with the procurement app?",
Ans:""
},
{
Ques:"What features does the procurement app offer?",
Ans:""
},
{
Ques:"Can the app integrate with our existing systems?",
Ans:""
}
],
},{
name:"Off-Beat",
Nav:"HelpDetails",
details:[
{
Ques:"What is the procurement app, and how does it benefilt my organization",
Ans:"The procurement app streamlines the purchasing process, helping your organization save time and resources. It enhances efficiency, reduces errors, and provides better control over procurement activities."
},
{
Ques:"How do I get started with the procurement app?",
Ans:""
},
{
Ques:"What features does the procurement app offer?",
Ans:""
},
{
Ques:"Can the app integrate with our existing systems?",
Ans:""
}
],
}
]
const openGmailAppWithSubjectAndBody = () => {
  const email = 'staciacorp@gmail.com';
  const subject = 'Regarding Support'; // Replace with your desired subject
  const body = 'Hello, I need assistance with...'; // Replace with your desired body
  Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
};
  return (
    <View style={{flex:1, backgroundColor:COLORS.white, alignItems:'center'}}>
    <View style={{paddingVertical:pixelSizeVertical(30)}}>
    <SearchBarWithout/>
    </View>
    <View style={{width:UNIQUEWIDTH.wid }}>
    <Text style={GlobalStyle.overAllHeadLinePrimary}>Help Topics</Text>
    <View style={{flexDirection:'column', gap:10, marginVertical:pixelSizeVertical(30)}}>
    {Datas.map((data,index)=>{
    return(
    <View key={index}>
    <Cards data={data}/>
    </View>
    )
    })}
    </View>
    </View>
    <View style={{flex:1, justifyContent:'flex-end', paddingBottom:pixelSizeVertical(50), width:UNIQUEWIDTH.wid}}>
  <View style={{flexDirection:'column', gap:12}}>
  <Text style={GlobalStyle.overAllHeadLine}>Need more help?</Text>
  <Text style={GlobalStyle.idText}>Our customer service team should be able to help</Text>
  <Pressable onPress={openGmailAppWithSubjectAndBody}>
  <Text style={GlobalStyle.overAllHeadLinePrimary}>Contact Us</Text>
  </Pressable>
  </View>
  </View>
    </View>
  )
}


const Cards = ({data})=>{
const navigation = useNavigation()
return(
<Pressable style={styles.cardHead} onPress={()=>navigation.navigate("HelpDetails",{data : data})}>
<Text style={GlobalStyle.districtText}>{data.name}</Text>
<ICONS.arrowSmall/>
</Pressable>
)
}
export default HelpAndSupport

const styles = StyleSheet.create({
cardHead:{
width:"100%",
backgroundColor:COLORS.Secondary,
height:heightPixel(52),
borderRadius:8,
flexDirection:'row',
alignItems:"center",
justifyContent:'space-between',
paddingHorizontal:pixelSizeHorizontal(15),
}
})