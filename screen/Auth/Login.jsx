import { Pressable, StyleSheet, Text, View , TextInput ,Keyboard, KeyboardAvoidingView,ActivityIndicator, ToastAndroid, Platform} from 'react-native'
import React, { useState,useEffect, useContext} from 'react'
import {ICONS, COLORS, FONT, SIZES, ASPECTRADIO, UNIQUEWIDTH } from "../../Constants"
import {  
  heightPixel,
  pixelSizeVertical,
  } from "../../styles/Responsive"
import GlobalStyle from '../../styles/GlobalStyle'
import BottomSheet from '../../components/Home/BottomSheet'
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from '../../api/api'
import axios from 'axios'
import { MyContext } from '../../context/MyContext'



const validationSchema = Yup.object().shape({
  mobileNo: Yup.string()
  .matches(/^\+?[0-9\s-]+$/, '*Invalid mobile number')
  .min(10, '*Too short, must be at least 10 digits')
  .max(15, '*Too long, must be at most 15 digits')
  .required('*Mobile number is required'),
});



const Login = () => {
const [loading ,setLoading] = useState(false)
const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
const {  setUserMobile, setOtpTimer , setIsTimerActive, setOTP, setIsLoggedIn} = useContext(MyContext)
 function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
}

   const GetOtp = async(values)=>{

   try {
    const Response = await fetch(`${Api.api}/manager/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const ResponseData = await Response.json();
      console.log(ResponseData)
       setLoading(false)
      if(ResponseData.message=="otp sended"){
       setUserMobile(values.mobileNo)
       setLoading(false) 
       setOTP("")
      //  toggleBottomSheet()
       NavigateHome(values.mobileNo, ResponseData.otp)
       setOtpTimer(30)
       setIsTimerActive(true)
      }
      if(ResponseData.message=="Invalid Mobile Number"){
      showToast(ResponseData.message)
      setLoading(false)
      }
   } catch (error) {
    console.log(error)
    showToast("Try Again")
    setLoading(false)
   }
   }
 
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

    const NavigateHome = async (m,o) => {
    // let result = parseInt(otp.join(""));

    const values = {
      mobileNo: m,
      otp:o,
    };
    //  setSendingApi(true);
    try {
      const Response = await fetch(`${Api.api}/manager/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const ResponseData = await Response.json();
      if (ResponseData.message == "Invalid Otp") {
        showToast(ResponseData.message);
      }
      if (ResponseData.message == "Time Out") {
        showToast(ResponseData.message);
      }
      if (ResponseData.message == "otp verified successfully") {
        if (ResponseData.doc.newManager) {
          console.log("New Manager");
          AsyncStorage.setItem("userToken", JSON.stringify(ResponseData.token));
          // setUserToken(ResponseData.token);
          AsyncStorage.setItem(
            "userTempId",
            JSON.stringify(ResponseData.doc.id)
          );
          AsyncStorage.setItem("userId", JSON.stringify(ResponseData.doc.id));
          navigation.navigate("OnBoarding");
          setSendingApi(false);
        } else {
          AsyncStorage.setItem("userToken", JSON.stringify(ResponseData.token));
          // setUserToken(ResponseData.token);
          AsyncStorage.setItem("userInfo", JSON.stringify(ResponseData.doc));
          AsyncStorage.setItem("userId", JSON.stringify(ResponseData.doc.id));
          // setUserInfo(ResponseData.doc);
          setIsLoggedIn(true);
          // setSendingApi(false);
        }
      }
    } catch (error) {
      console.log(error);
      showToast("Try Again");
    }
  };

    const handleSubmit = async (values) => {
      setLoading(true)
      GetOtp(values)  
  };


    const [bottomSheetHeight, setBottomSheetHeight] = useState(1/2);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (Platform.OS === "ios") {
          setBottomSheetHeight(500); // Adjust the height based on your requirements
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (Platform.OS === "ios") {
          setBottomSheetHeight(300); // Set it back to the normal height
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (

    <KeyboardAvoidingView style={styles.container} behavior="padding">       
     <View style={[styles.Top]}>
      <View>
      <ICONS.StaciaLogo/>
      </View>
      <View style={{position:'relative', top:heightPixel(25)}}>
      <ICONS.WelcomeLogo/>
      </View>
      </View> 
      
      <View style={[styles.Bottom , ]}>
       {loading ? (<View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>) :
      (
      <View>
        <Text style={[GlobalStyle.HeadLine, {marginTop:pixelSizeVertical(50)}]}>Sign In</Text>
      <Text style={[GlobalStyle.Label , {marginTop:pixelSizeVertical(30), marginBottom:pixelSizeVertical(15)}]}>Mobile Number</Text>
      <Formik
                  initialValues={{
                   mobileNo:""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched,
                    values,
                    errors,
                  }) => (
                  <>
                  
                   <TextInput keyboardType="number-pad"
                   onChangeText={handleChange("mobileNo")}
                            onBlur={handleBlur("mobileNo")}
                            value={values.mobileNo}
        returnKeyType="done" style={errors.mobileNo && touched.mobileNo ? [GlobalStyle.inputBox,GlobalStyle.ErrorInputBorder] : [GlobalStyle.inputBox]} placeholder='Enter Mobile Number' placeholderTextColor="#D3DCE5"></TextInput>
        {errors.mobileNo && touched.mobileNo ? (
                              <Text style={[GlobalStyle.ErrorText, {position:"relative" , top:10}]}>
                                {errors.mobileNo}
                              </Text>
                            ) : null}
         <Pressable onPress={handleSubmit} style={[GlobalStyle.LoginButton,{ marginTop:heightPixel(30)}]}><Text style={GlobalStyle.LoginBtnText}>Get OTP</Text></Pressable>
                  </>
                  )}
                </Formik>
      
      </View> )}
      </View>
      <View style={{ position:'absolute',bottom:heightPixel(40), width:ASPECTRADIO.width, alignItems:'center'}}><Text style={styles.staciaCorp}>Powered By Stacia Corp</Text></View>
       
      <BottomSheet isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
    </KeyboardAvoidingView>
  

)}
export default Login




const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
Top:{
  flex:3/4,
  justifyContent:'center',alignItems:'center',
  backgroundColor:COLORS.primary,
  borderBottomLeftRadius:16,
  borderBottomRightRadius:16,
},

Bottom:{
  flex:1/2,
  backgroundColor:COLORS.white,
  alignItems:'center'
},

staciaCorp:{
fontFamily:FONT.EuclidMedium,
fontSize:SIZES.small,
color:COLORS.SecondaryText,
},
})
