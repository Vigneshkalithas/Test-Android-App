import { Pressable, StyleSheet,Text,TextInput,View,ScrollView,TouchableOpacity,Keyboard,KeyboardAvoidingView,Platform, TouchableWithoutFeedback,} from 'react-native'
import React, { useState, useRef,useEffect, useContext} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT,SIZES, ICONS, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import {  Buttonx, DropDownCard, Uploader, InputGroup, InputLabel, } from "../../components"
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { Api } from '../../api/api'
import { getValueFromAsyncStorage } from '../../storage/AsyncStorage'




const validationSchemaForTravel = Yup.object().shape({
        billDate:Yup.string().required("Please select the date"),
        amount:Yup.number().required("Required"),
        description:Yup.string().required("Required"),
        from:Yup.string().required("Required"),
        to:Yup.string().required("Required"),
        transportType:Yup.string().required("Required"),
        attachment:Yup.string().required("Required"),
        
});
const validationSchema = Yup.object().shape({
        billDate:Yup.string().required("Please select the date"),
        amount:Yup.number().required("Required"),
        description:Yup.string().required("Required"),
        attachment:Yup.string().required("Required")     
})

const DroDownCard = ({compDataLength,apiCompReportData, current, closeDropdown})=>{
return(
<View style={[styles.dropdownHead,{height:heightPixel(compDataLength)}]}>
{apiCompReportData.map((data,index)=>{
return(
 <Pressable
              key={data.id}
              style={GlobalStyle.listHead}
              onPress={() => closeDropdown(data.name)}
            >
              <Text
                style={
                  current == data.name
                    ? [GlobalStyle.districtText, { color: COLORS.primary }]
                    : [GlobalStyle.districtText]
                }
              >
                {data.name}
              </Text>
              {current == data.name ? <ICONS.smallsuccessIcon /> : null}
            </Pressable>
            )
})}
</View>
)
} 


const CreateReimbursement = () => {
const navigation = useNavigation()
const reimbursementFormRef = useRef()
const [current, setCurrent] = useState("Travel")
const [compDataLength, setCompDataLength] = useState(4 * 40.42857142857143)
const [showData, setShowData] = useState(false)
const [apiCompReportData, setapiCompReportData] = useState([
{
 "_id": "65d341f01e912a6d548b521e213",
  "name": "Travel",
  "id": "65d341f01e912a6d548b521e213"
},
{
 "_id": "65d341f01e912a6d548b521e214",
  "name": "Food",
  "id": "65d341f01e912a6d548b521e214"
},
{
 "_id": "65d341f01e912a6d548b521e215",
  "name": "Petrol",
  "id": "65d341f01e912a6d548b521e215"
},
{
 "_id": "65d341f01e912a6d548b521e216",
  "name": "Miscellaneous",
  "id": "65d341f01e912a6d548b521e216"
}
])
const billDateRef = useRef(null)
const fromRef = useRef(null)
const toRef = useRef(null)
const transportTypeRef = useRef(null)
const amountRef = useRef(null)
const describtionRef = useRef(null)
const billTypeRef = useRef(null)
const [doc, setDoc] = useState()
const [userID,setUserID] = useState(null)


// if code didnot run check thi method 
useEffect(() => {
GetUserId()
}, [])

const GetUserId = async()=>{
const id = await getValueFromAsyncStorage("userId");
setUserID(id)
}

 const handleCustomSubmit = async() => {
      reimbursementFormRef.current?.handleSubmit()
 }
const closeDropdown =(data)=>{
        setCurrent(data)
        setShowData(false)
}
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const formData = new FormData();
    formData.append('file', doc);
    formData.append('billType', current);
    formData.append('billDate', values.billDate);
    formData.append('amount', values.amount);
    formData.append('description', values.description);
    formData.append('from', values.from);
    formData.append("to", values.to)
    formData.append("transporttype", values.transportType)

await axios.post(`${Api.api}/reimbursement/store/${userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
console.log(formData)
console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

const pickDocument = async () => {
let result = await DocumentPicker.getDocumentAsync({
    type: '*/*', 
    copyToCacheDirectory: true,
    multiple:true
  });
    console.log(result.type === 'success')
      if(result.assets){
    const {name , size, uri, mimeType} = result.assets[0]
    const nameParts = name.split('.');
    const fileType = nameParts[nameParts.length - 1].toLowerCase();
    if (fileType === 'pdf' || ['jpg', 'jpeg', 'png'].includes(fileType)) {
      const fileToUpload = {
        name,
        size,
        uri,
        type: mimeType,
      };
      console.log(doc)
      setDoc(fileToUpload);
      reimbursementFormRef.current.setFieldValue("attachment", fileToUpload.name)
    } else {
      reimbursementFormRef.current.setFieldError("attachment", "Unsupported file type")
      console.log('Unsupported file type. Please select an image or PDF.');
    }
  }
  };

 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={{paddingVertical:pixelSizeVertical(25),alignItems:'center'}}>
      <View style={{width:UNIQUEWIDTH.wid}}>
      <Pressable onPress={()=>navigation.goBack()}><ICONS.GoBack/></Pressable>
      <Text style={[GlobalStyle.overAllHeadLinePrimary,{paddingVertical:pixelSizeHorizontal(20)}]}>New Reimbursement</Text>
      </View>
      <View style={{width:UNIQUEWIDTH.wid}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
     <Formik
    innerRef={reimbursementFormRef}
      initialValues={{
        billDate:"",
        from:"",
        to:"",
        transportType:"",
        amount:"",
        description:"",
        attachment:""
      
      }}
      validationSchema={current === "Travel" ? validationSchemaForTravel : validationSchema}
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
<View style={{gap:10, paddingVertical:pixelSizeVertical(5)}}>
<InputLabel lable={"Bill Type"}/>
<Pressable onPress={()=>setShowData(!showData)} style={errors.billType && touched.billType ? [styles.districtLabelHead,GlobalStyle.ErrorInputBorder] :[styles.districtLabelHead]}>
     <TextInput
                ref={billTypeRef}
                editable={false}
                onBlur={handleBlur("billType")}
                value={current}
                style={styles.inputWithoutBorder}
                placeholder="Bill Type"
                placeholderTextColor={COLORS.SecondaryText}
                onChange={handleChange("billType")}
              ></TextInput>
    </Pressable>
    
    {showData && <DroDownCard apiCompReportData={apiCompReportData} compDataLength={compDataLength} closeDropdown={closeDropdown} current={current}/>}
</View>
<InputGroup lable={"Bill Date"} inputRef={billDateRef} oNChange={handleChange("billDate")} oNBlur={handleBlur("billDate")} oNSubmit={()=>fromRef.current.focus()} vAlue={values.billDate} rtrnKey={"next"}  plceHolder={"25-02-2024"} keyBoardType={"default"} StyleSHeet={ errors.billDate && touched.billDate
? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} Error={errors.billDate && touched.billDate} ErrorTxt={errors.billDate}/>
{current === "Travel" && 
<>
<View style={GlobalStyle.flexJusSB}>
<InputGroup lable={"From"} inputRef={fromRef} oNChange={handleChange("from")} oNBlur={handleBlur("from")} oNSubmit={()=>toRef.current.focus()} vAlue={values.from} rtrnKey={"next"}  plceHolder={"Theni"} keyBoardType={"default"} StyleSHeet={ errors.from && touched.from
? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.from && touched.from} ErrorTxt={errors.from}/>
<InputGroup lable={"To"} inputRef={toRef} oNChange={handleChange("to")} oNSubmit={()=>transportTypeRef.current.focus()} oNBlur={handleBlur("to")}  vAlue={values.to} rtrnKey={"next"}  plceHolder={"Madurai"} keyBoardType={"default"} StyleSHeet={ errors.to && touched.to
? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder] : [styles.inputBoxKgs]} Error={errors.to && touched.to} ErrorTxt={errors.to}/>
</View>
<InputGroup lable={"Transport Type"} inputRef={transportTypeRef} oNChange={handleChange("transportType")} oNBlur={handleBlur("transportType")} oNSubmit={()=>amountRef.current.focus()} vAlue={values.transportType} rtrnKey={"next"}  plceHolder={"Enter Purpose"} keyBoardType={"default"} StyleSHeet={ errors.transportType && touched.transportType
? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} Error={errors.transportType && touched.transportType} ErrorTxt={errors.transportType}/>
</>
}
<InputGroup lable={"Amount"} inputRef={amountRef} oNChange={handleChange("amount")} oNBlur={handleBlur("amount")} oNSubmit={()=>describtionRef.current.focus()} vAlue={values.amount} rtrnKey={"next"}  plceHolder={"Enter Amount"} keyBoardType={"numeric"} StyleSHeet={ errors.amount && touched.amount
? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} Error={errors.amount && touched.amount} ErrorTxt={errors.amount}/>
<InputGroup lable={"Describtion"} inputRef={describtionRef} oNChange={handleChange("description")} oNBlur={handleBlur("description")} vAlue={values.description} rtrnKey={"done"}  plceHolder={"Enter re-marks"} keyBoardType={"default"} StyleSHeet={ errors.description && touched.description
? [styles.DescribtionInput, GlobalStyle.ErrorInputBorder] : [styles.DescribtionInput]} Error={errors.description && touched.description} ErrorTxt={errors.description}/>
    <Uploader txt={"Attachment"} optn={"Bill & Receipts"} fn={pickDocument} Error={errors.attachment && touched.attachment} ErrorTxt={errors.attachment}/>
</View>     
      )}
    </Formik>
</ScrollView>
<View style={GlobalStyle.btnNextContainer}>
<Buttonx txt={"Upload"} style={GlobalStyle.btnNext} fn={handleCustomSubmit}/>
</View>
</View>
</View>
{/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
container: {
 flex: 1,
 backgroundColor:COLORS.white
},
scrollContainer: {
 flexGrow: 2,
  },
ContactCardContainer:{
width:"100%",
height:heightPixel(48),
borderWidth:1,
borderColor:COLORS.BorderColor, 
borderRadius:6,
marginTop:pixelSizeVertical(15),
paddingHorizontal:pixelSizeHorizontal(10),
},
dropdownHead:{
width:UNIQUEWIDTH.wid,
backgroundColor:COLORS.white,
paddingHorizontal:pixelSizeHorizontal(20),
position: "absolute",
top:heightPixel(85),
left: 0,
right: 0,
bottom: 0,
zIndex: 999,
elevation: 3,
shadowColor: '#101518',
shadowOffset: {width: 0, height: 9},
shadowOpacity: 0.5,
shadowRadius: 35,
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
   DescribtionInput:{
    width: widthPixel(375),
    height: heightPixel(80),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D5E8FF",
    paddingHorizontal: 15,
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,   
},
districtLabelHead:{
width: widthPixel(375),
height: heightPixel(48),
paddingHorizontal:pixelSizeHorizontal(10),
borderColor:COLORS.PlaceHolderText,
borderRadius: 6,
borderWidth: 1,
borderColor: "#D5E8FF",
paddingHorizontal: 15,
},
inputWithoutBorder: {
    width: widthPixel(320),
    height: heightPixel(48),
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
});

export default CreateReimbursement;