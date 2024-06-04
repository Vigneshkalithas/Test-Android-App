import { Pressable, StyleSheet,Text,TextInput,View,ScrollView,TouchableOpacity,Keyboard,KeyboardAvoidingView,Platform, TouchableWithoutFeedback,} from 'react-native'
import React, { useState, useRef,useEffect, useContext} from 'react'
import { COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import GlobalStyle from '../../styles/GlobalStyle'
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from "yup";
import { Buttonx, InputComponent, InputGroup, InputLabel ,Uploader} from '../../components'


const validationSchema = Yup.object().shape({
    eventName:Yup.string().required("*Please enter event name"),
    startDate:Yup.number().required("*Please select start date"),
    endDate:Yup.string().required("*Please select end date"),
    startTime:Yup.string().required("*Please select start time"),
    endTime:Yup.string().required("*Please select end time"),
    location:Yup.string().required("*Please enter location")
}) 
const RadioInputs = ({lable, opt1, opt2, option, setOption})=>{
 return(
  <View>
<InputLabel lable={lable} />
<View style={{flexDirection:'row', gap:widthPixel(30)}}>
  <Pressable style={styles.radioFlexBtn} onPress={()=>setOption(opt1)}>
  {option===opt1 ? <ICONS.radioBtnRoundactive/> :  <ICONS.radioBtnRoundInactive/> }
  <Text style={GlobalStyle.txtLot}>{opt1}</Text>
  </Pressable>
  <Pressable style={styles.radioFlexBtn} onPress={()=>setOption(opt2)}>
  {option===opt2 ? <ICONS.radioBtnRoundactive/> :  <ICONS.radioBtnRoundInactive/> }
  <Text style={GlobalStyle.txtLot}>{opt2}</Text>
  </Pressable>
</View>
</View>
 )
}

const DescribtionInput = ()=>{
  return(
    <TextInput
    // onChangeText={oNChange}
    // onBlur={oNBlur}
    // value={vAlue}
    // returnKeyType={rtrnKey}
    // onSubmitEditing={oNSubmit}
    style={styles.describtionInput}
    placeholder={'Enter Describtion'}
    placeholderTextColor={COLORS.SecondaryText}
    multiline
        numberOfLines={4}
        // maxLength={40}
  ></TextInput>)
}

const CreateEvent = () => {
    const navigation = useNavigation()
    const eventCreationFormRef = useRef();
    const handleSubmit = async (values) => {
        console.log(values)
    }
    const [isAlldayEvent, setIsAlldayEvent] = useState()
    const [meeting,setMeeting] = useState("Offline Meet")
    const [option,setOption] = useState("Notification")
    const eventNameRef = useRef()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
    <View style={{flex:1, alignItems:'center'}}>
     <View style={{width:UNIQUEWIDTH.wid, flexDirection:'row', paddingVertical:pixelSizeVertical(15), justifyContent:"space-between"}}>
        <Pressable onPress={()=>navigation.goBack()}><ICONS.GoBack/></Pressable>
        <Pressable onPress={()=>navigation.goBack()}><Text style={GlobalStyle.cancelBtn}>Cancel</Text></Pressable>
     </View>
    
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
     <View style={{width:UNIQUEWIDTH.wid , paddingVertical:pixelSizeVertical(10)}}>
        <Text style={GlobalStyle.overAllHeadLine}>Create New Event</Text>
     </View>
     <Formik
    innerRef={eventCreationFormRef}
      initialValues={{
        eventName:"",
        startDate:"",
        endDate:"",
        startTime:"",
        endTime:"",
        location:"",
        meet:"",
        peoples:[],
        reminder:"",
        exjactTime:"",
        describtion:"",
        attachment:""
      
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        values,
        errors,
        resetForm,
      }) => (
<View style={{paddingVertical:pixelSizeVertical(10)}}>
<InputGroup lable={"Event Name*"} inputRef={eventNameRef} oNChange={handleChange("eventName")} oNBlur={handleBlur("eventName")} oNSubmit={null} vAlue={values.eventName} rtrnKey={"next"}  plceHolder={"Event Name"} keyBoardType={"default"} StyleSHeet={ errors.eventName && touched.eventName
? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} Error={errors.eventName && touched.eventName} ErrorTxt={errors.eventName}/>
  <View style={GlobalStyle.flexJusSB}>
 <InputGroup lable={"Date*"} inputRef={null} oNChange={handleChange("startDate")} oNBlur={handleBlur("startDate")} oNSubmit={()=>toRef.current.focus()} vAlue={values.startDate} rtrnKey={"next"}  plceHolder={"Start Date"} keyBoardType={"default"} StyleSHeet={ errors.startDate && touched.startDate
 ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.startDate && touched.startDate} ErrorTxt={errors.startDate}/>
 <InputGroup lable={""} inputRef={null} oNChange={handleChange("endDate")} oNSubmit={null} oNBlur={handleBlur("endDate")}  vAlue={values.endDate} rtrnKey={"next"}  plceHolder={"End Date"} keyBoardType={"default"} StyleSHeet={ errors.endDate && touched.endDate
 ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.endDate && touched.endDate} ErrorTxt={errors.endDate}/>
</View>
<Pressable style={{flexDirection:"row", gap:10, alignItems:"center", justifyContent:"flex-end", paddingVertical:pixelSizeVertical(5)}} onPress={()=>setIsAlldayEvent(!isAlldayEvent)}>
   {isAlldayEvent ? <ICONS.RadioCheckActive/> : <ICONS.RadioCheckInActive/> }
   <Text style={GlobalStyle.txtLot}>All Day Event</Text>
 </Pressable>
</View>
  )}
  </Formik>
</ScrollView>
<View style={[GlobalStyle.btnNextContainer,{alignItems:'center'}]}>
<Buttonx txt={"Create Event"} style={GlobalStyle.btnNext} fn={()=>console.log("event create button")}/>
</View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default CreateEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.white,
        paddingVertical:pixelSizeVertical(20)
       },
       scrollContainer: {
        flexGrow: 2,
         },
         inputBoxKgs: {
            width: widthPixel(168),
            height: heightPixel(48),
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#D5E8FF",
            paddingHorizontal: 15,
            fontFamily: FONT.EuclidMedium,
            fontSize: SIZES.size14,
            color: COLORS.PrimaryText,
          },
          radioFlexBtn:{
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            paddingVertical:pixelSizeVertical(10)
          },
          selector:{
            width: widthPixel(375),
            height: heightPixel(48),
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#D5E8FF",
            paddingHorizontal: 15,
            flexDirection:'row',
            alignItems:"center",
            justifyContent:'space-between'
          },
          describtionInput:{
            width: widthPixel(375),
            height: heightPixel(100),
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#D5E8FF",
            paddingHorizontal: 15,
            textAlignVertical:'top',
            paddingVertical:10,
            fontFamily: FONT.EuclidMedium,
            fontSize: SIZES.size14,
            color: COLORS.PrimaryText,
          },
})



// <View style={GlobalStyle.flexJusSB}>
// <InputGroup lable={"Start Date"} inputRef={null} oNChange={handleChange("startDate")} oNBlur={handleBlur("startDate")} oNSubmit={()=>toRef.current.focus()} vAlue={values.startDate} rtrnKey={"next"}  plceHolder={"Start Date"} keyBoardType={"default"} StyleSHeet={ errors.startDate && touched.startDate
// ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.startDate && touched.startDate} ErrorTxt={errors.startDate}/>
// <InputGroup lable={"End Date"} inputRef={null} oNChange={handleChange("endDate")} oNSubmit={null} oNBlur={handleBlur("endDate")}  vAlue={values.endDate} rtrnKey={"next"}  plceHolder={"End Date"} keyBoardType={"default"} StyleSHeet={ errors.endDate && touched.endDate
// ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.endDate && touched.endDate} ErrorTxt={errors.endDate}/>
// </View>
// <Pressable style={{flexDirection:"row", gap:10, alignItems:"center", justifyContent:"flex-end"}} onPress={()=>setIsAlldayEvent(!isAlldayEvent)}>
//   {isAlldayEvent ? <ICONS.RadioCheckActive/> : <ICONS.RadioCheckInActive/> }
//   <Text style={GlobalStyle.txtLot}>All Day Event</Text>
// </Pressable>
// <View style={GlobalStyle.flexJusSB}>
// <InputGroup lable={"Start Time"} inputRef={null} oNChange={handleChange("startTime")} oNBlur={handleBlur("startTime")} oNSubmit={null} vAlue={values.startTime} rtrnKey={"next"}  plceHolder={"Start Time"} keyBoardType={"default"} StyleSHeet={ errors.startTime && touched.startTime
// ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.startTime && touched.startTime} ErrorTxt={errors.startTime}/>
// <InputGroup lable={"End Time"} inputRef={null} oNChange={handleChange("endTime")} oNSubmit={null} oNBlur={handleBlur("endTime")}  vAlue={values.endTime} rtrnKey={"next"}  plceHolder={"End Time"} keyBoardType={"default"} StyleSHeet={ errors.endTime && touched.endTime
// ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.endTime && touched.endTime} ErrorTxt={errors.endTime}/>
// </View>
//  <View>
// {/* <InputLabel lable={"Location*"} />
// <View style={{flexDirection:'row', gap:widthPixel(30)}}>
//   <Pressable style={styles.radioFlexBtn} onPress={()=>setMeeting("offline")}>
//   {meeting==="offline" ? <ICONS.radioBtnRoundactive/> :  <ICONS.radioBtnRoundInactive/> }
//   <Text style={GlobalStyle.txtLot}>Offline Meet</Text>
//   </Pressable>
//   <Pressable style={styles.radioFlexBtn} onPress={()=>setMeeting("online")}>
//   {meeting==="online" ? <ICONS.radioBtnRoundactive/> :  <ICONS.radioBtnRoundInactive/> }
//   <Text style={GlobalStyle.txtLot}>Online Meet</Text>
//   </Pressable>
// </View> */}
// <RadioInputs lable={"Location*"} opt1={"Offline Meet"} opt2={"Online Meet"} option={meeting} setOption={setMeeting} />
// <InputGroup lable={""} inputRef={null} oNChange={handleChange("location")} oNSubmit={null} oNBlur={handleBlur("location")}  vAlue={values.location} rtrnKey={"next"}  plceHolder={"Enter Locaion"} keyBoardType={"default"} StyleSHeet={ errors.location && touched.location
// ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} Error={errors.location && touched.location} ErrorTxt={errors.location}/>
// <InputGroup lable={"Add People"} inputRef={null} oNChange={handleChange("location")} oNSubmit={null} oNBlur={handleBlur("location")}  vAlue={values.location} rtrnKey={"next"}  plceHolder={"Select People"} keyBoardType={"default"} StyleSHeet={ errors.location && touched.location
// ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} Error={errors.location && touched.location} ErrorTxt={errors.location}/>
// <RadioInputs lable={"Set Reminder"} opt1={"Notification"} opt2={"Email"} option={option} setOption={setOption} />
// <Pressable style={styles.selector}>
//   <Text style={GlobalStyle.txtLot}>30 Min Before The Event</Text>
//   <ICONS.DownArrow/>
// </Pressable>
// <View>
// <InputGroup lable={"Describtion"} inputRef={null} oNChange={handleChange("describtion")} oNSubmit={null} oNBlur={handleBlur("describtion")}  vAlue={values.describtion} rtrnKey={"next"}  plceHolder={"Enter Describtion"} keyBoardType={"default"} StyleSHeet={ errors.describtion && touched.describtion
// ? [styles.describtionInput, GlobalStyle.ErrorInputBorder] : [styles.describtionInput]} Error={errors.describtion && touched.describtion} ErrorTxt={errors.describtion}/>
// </View>
// <Uploader txt={"Attachment"} optn={null} fn={()=>console.log("yes pressed uload button")} Error={null} ErrorTxt={null}/>
// </View>
