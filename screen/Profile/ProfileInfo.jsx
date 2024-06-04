import { Pressable, StyleSheet, Text, View, Keyboard, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT, SIZES, UNIQUEWIDTH } from '../../Constants'
import { Formik } from "formik";
import * as Yup from "yup";
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive';
import { TextInput } from 'react-native-gesture-handler';
import { Buttonx } from '../../components';
import LottieView from "lottie-react-native";
import SuccssAnimation from "../../animation/Success.json";
import { useNavigation } from '@react-navigation/native';
import { PostProfileInfo } from '../../apiHelper';
import { MyContext } from '../../context/MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValueFromAsyncStorage } from '../../storage/AsyncStorage';
import { Api } from '../../api/api';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { selectedDistrictAtom, selectedDistrictErrorAtom } from '../../atoms/selectedDistrict';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required*"),
 emailId: Yup.string()
    .email('Invalid email').required("Email is required*"),
  district: Yup.string().required("District is required*"),
});

const ProfileInfo = () => {
  const profileFormRef = useRef()
  const inputemailIdRef = useRef();
  const inputdistrictRef = useRef();
  const [isFocused,setIsFocused] = useState("")
  const [success,setSuccess] = useState(false)
  const navigation = useNavigation()
  const animation = useRef(null);
  const [tempId, setTempId] = useState("")
  const { setIsLoggedIn , refDistrictSheet, setUserInfo} = useContext(MyContext)
  const [selectedDistrict , setSelectedDistrict] = useRecoilState(selectedDistrictAtom)
  const [selectedDistrictError,setselectedDistrictError] = useRecoilState(selectedDistrictErrorAtom)


  const inputFocus=(inputField)=>{
  setIsFocused(inputField)
}




const onOpen = async() => {
   refDistrictSheet.current.open()
  };


const handleCustomSubmit = ()=>{
     if(selectedDistrict==null){
        setselectedDistrictError(true)
      } else{
 profileFormRef.current?.handleSubmit()
      }
 
}


const GetId = async()=>{
const id = await getValueFromAsyncStorage("userTempId")
 console.log(id)
 const temp = JSON.parse(id)
  setTempId(temp)
}

useEffect(() => {
 GetId()
  setSelectedDistrict(null)
}, [])





const handleSubmit = async (values) => {
    const Result = await PostProfileInfo(tempId, values)
    // setUserInfo(Result)
    if(Result=="success"){
    console.log("is hitting result")
    setSuccess(true)
    setIsLoggedIn(true)
    setSelectedDistrict(null);
     setTimeout(() => {
      navigation.navigate("Home")      
     }, 1000);
      }

    };

  return (
    <View style={GlobalStyle.globalHead}> 
    {success ? 
     <View style={{flex:1,justifyContent:'center', alignItems:'center', justifyContent:"center"}}> 
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={SuccssAnimation}
          />
        
          <Text style={[GlobalStyle.overAllHeadLinePrimary,{fontSize:SIZES.xmedium, paddingVertical:pixelSizeVertical(10)}]}>Success</Text>
          <Text style={GlobalStyle.txtLot}>"You're now set for procurement.</Text>
          <Text style={GlobalStyle.txtLot}>Just one final step to complete your proifle!"</Text>
         
    </View> : 
    <>
    <View style={{width:UNIQUEWIDTH.wid}}>
    <View style={{flexDirection:'column', marginVertical:pixelSizeVertical(20), gap:8}}>
    <Text style={[GlobalStyle.dateText,{fontSize:SIZES.medium}]}>Profile Info</Text>
    <Text style={styles.titleTxt}>Please Enter the basic details of yours given below</Text>
    </View>
    <View>
     <Formik
      innerRef={profileFormRef}
      initialValues={{
        userName: "",
       emailId: "",
      district: selectedDistrict,
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
        isValid,
        resetForm,
      }) => (
        <>
          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(30),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            User Name
          </Text>

          <TextInput
            onChangeText={handleChange("userName")}
            onBlur={handleBlur("userName")}
            onFocus={() => inputFocus("userName")}
            value={values.userName}
            returnKeyType="next"
            onSubmitEditing={() => inputemailIdRef.current.focus()}
            style={
              errors.userName && touched.userName
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : isFocused =="userName" ? [GlobalStyle.inputBox,{borderColor:COLORS.primary}]:
                 [GlobalStyle.inputBox]
            }
            placeholder="Vignesh Kalithas"
            placeholderTextColor="#D3DCE5"
          ></TextInput>

          {errors.userName && touched.userName ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.userName}
            </Text>
          ) : null}

          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(30),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            emailId
          </Text>
          <TextInput
            ref={inputemailIdRef}
            onChangeText={handleChange("emailId")}
            onFocus={() => inputFocus("emailId")}
            onBlur={handleBlur("emailId")}
            value={values.emailId}
            returnKeyType="next"
           onSubmitEditing={() => inputdistrictRef.current.focus()}
            style={
              errors.emailId && touched.emailId
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                :
                isFocused == "emailId" ? [GlobalStyle.inputBox,{borderColor:COLORS.primary}]: [GlobalStyle.inputBox]
            }
            placeholder="vigneshkalithas@gmail.com"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.emailId && touched.emailId ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.emailId}
            </Text>
          ) : null}

          <>
            <Text
              style={[
                GlobalStyle.Label,
                {
                  marginTop: pixelSizeVertical(30),
                  marginBottom: pixelSizeVertical(15),
                },
              ]}
            >
              district
            </Text>
            
            <Pressable onPress={onOpen} style={
              selectedDistrictError ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder, {justifyContent:'center'}]
                : 
                [GlobalStyle.inputBox,{justifyContent:'center'}]
            }>
            <Text style={selectedDistrict == null ? [styles.districtText,styles.clrplaceHolder]: [styles.districtText, styles.clrBlack]}>{ selectedDistrict == null ? "Select District" :  selectedDistrict }</Text>
            </Pressable>
            {selectedDistrictError ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              Please select your district
            </Text>
          ) : null}
          </>
        </>
        
      )}
    </Formik>
    </View>
    </View>
    <Buttonx  txt={"Done"} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} fn={handleCustomSubmit}/>
    </>}
    </View>
  )
}

export default ProfileInfo

const styles = StyleSheet.create({
inputWithText: {
    width: widthPixel(375),
    height: heightPixel(48),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D5E8FF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixelSizeHorizontal(15),
  },
  titleTxt:{
   fontFamily: FONT.EuclidRegular,
    fontSize: SIZES.size14,
    color: COLORS.SecondaryText,
  },
districtLabel:{
color:COLORS.PlaceHolderText,
fontFamily:FONT.EuclidMedium,
fontSize:SIZES.size14
},
districtLabelHead:{
width:widthPixel(148),
height:heightPixel(40),
borderColor:COLORS.PlaceHolderText,
borderWidth:1,
borderRadius:6,
justifyContent:"center",
paddingHorizontal:pixelSizeHorizontal(10)
},
districtText:{
fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
},
clrBlack:{
color: COLORS.PrimaryText,
},
clrplaceHolder:{
color: COLORS.PlaceHolderText,
},

})