import { Pressable, StyleSheet, Text, View, Keyboard, ActivityIndicator} from 'react-native'
import React, { useState, useRef , useContext, useEffect} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT,SIZES, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import {  BottomSheetx, Buttonx , Label, NewProcurementForm , NewProcurementWithBags,TopMenu } from "../../components"
import { AgentData } from '../../DataCenter/AgentData'
import { useRecoilState} from "recoil";
import { selectedDistrictAtom, selectedDistrictErrorAtom, selectedDistrictWithBagsAtom } from "../../atoms/selectedDistrict";
import { disableDistrictAtom, lotCountAtom } from "../../atoms/lotsCount";
import { MyContext } from '../../context/MyContext'
import { GetLotNo } from "../../apiHelper/Procurement"
import axios from 'axios';
import { Api } from '../../api/api';
import { getValueFromAsyncStorage } from '../../storage/AsyncStorage'
import { FastField, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import {  EditProcurementApi  } from '../../apiHelper/Procurement'
import { showToaster } from '../../components/Toast/Toaster'

const EditParticularProcurement = ( { route } ) => {
const { item } = route.params;
 const formRef = useRef()
    const [bottomSheetContent ,setBottomSheetContent] = useState('district')
    const [selectedDistrict , setSelectedDistrict] = useRecoilState(selectedDistrictAtom)
    const [selectedDistrictError,setselectedDistrictError] = useRecoilState(selectedDistrictErrorAtom)
    const [selectedDistrictWithBags, setSelectedDistrictWithBags] = useRecoilState(selectedDistrictWithBagsAtom)
    const [bagsWeight, setBagsWeight]= useState(75);
    const {userInfo,apiLoading,setApiLoading,  } = useContext(MyContext)
    const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);
    const [disableDistrict,setDisableDistrict] = useRecoilState(disableDistrictAtom)

     
 
const handleCustomSubmit = () => {
       formRef.current?.handleSubmit()     
    }

const modalizeRef = useRef(null);
const onOpen = async() => {
   setBottomSheetContent("district")
   Keyboard.dismiss();
    setTimeout( async() => {
       try {
      await modalizeRef.current?.open();   
  } catch (error) {
    console.error('Error opening bottom sheet:', error);
  }
    }, 50);
  };


  const SetEditFields = async()=>{
    setLotCountAtom(item.lotNo)
    setSelectedDistrict(item.district)
  }

 useEffect(() => {
   SetEditFields()
   setBagsWeight(item.quantity)
 }, [])
 



  return (
  <>
    <View style={[GlobalStyle.globalHead]}>
    <View style={{width:UNIQUEWIDTH.wid}}>
    <TopMenu btnAction={"without"} />    
    <View style={[GlobalStyle.flexJusSB, {alignItems:"center", marginVertical:pixelSizeVertical(10)}]}>
    <Text style={GlobalStyle.overAllHeadLine}>Edit Procurement</Text>
    <Pressable disabled={true} onPress={onOpen} style={[styles.districtLabelHead] }><Text style={[styles.districtLabel,{color:COLORS.PlaceHolderText}]}>{selectedDistrict}</Text></Pressable>
     </View>
    <View style={{marginVertical:pixelSizeVertical(10)}}>
     <Label txt={`Lot No : ${lotCount}`} w={79} h={25} />
    </View>
    {item.bag == 0 ? 
    <EditProcurement item={item} formRef={formRef} setBottomSheetContent={setBottomSheetContent} modalizeRef={modalizeRef} bagsWeight={bagsWeight} /> :
     <EditProcurementWithBags item={item} formRef={formRef} setBottomSheetContent={setBottomSheetContent} modalizeRef={modalizeRef} bagsWeight={bagsWeight} />  }

    </View>
    {apiLoading ? 
    <Buttonx  txt={"Sending..."} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} disabled={true}/> : 
    <Buttonx  txt={"Save Changes"} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} fn={handleCustomSubmit}/>
    }

    </View> 
    <BottomSheetx modalizeRef={modalizeRef}  content={bottomSheetContent} setBagsWeight={setBagsWeight} />
    </>
  )
}



const validationSchemaWithBags = Yup.object().shape({
  Product: Yup.string().required("Please enter the product"),
  Quality: Yup.string().required("Please enter the quality"),
  BagsCount: Yup.string().required("Please enter bags count"),
});


const EditProcurementWithBags = ({
formRef,
setBottomSheetContent,
modalizeRef,
bagsWeight,
item
}) =>{
  const inputQualityRef = useRef();
  const inputQuantityRef = useRef();
  const inputBagsRef = useRef();
  const navigation = useNavigation()
  const { userInfo, apiLoading, setApiLoading ,setProcurementEdited } = useContext(MyContext);
  const [selectedDistrict] = useRecoilState(selectedDistrictAtom);
  const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);
  
  


    const BottosheetOpen = () => {
    setBottomSheetContent("quantity");
    Keyboard.dismiss(); // Dismiss the keyboard
    setTimeout(async () => {
      try {
        await modalizeRef.current?.open();
      } catch (error) {
        console.error("Error opening bottom sheet:", error);
      }
    }, 50);
  };

  const handleSubmit = async (values) => {
  
    const Results = {
      lotNo: item.lotNo,
      productName: values.Product,
      quality: values.Quality,
      quantity: bagsWeight,
      district: selectedDistrict,
      bag: values.BagsCount
    };
     console.log(Results)
     setApiLoading(true);
    const Resp = await EditProcurementApi(userInfo.id,item.id,Results);
    if (Resp == "success") {
      setApiLoading(false);
      setProcurementEdited(true)
      navigation.goBack()
      showToaster("Changes Saved");
    }

  } 

return(
    <Formik
      innerRef={formRef}
      initialValues={{
      Product: item.productName,
      Quality: item.quality,
      BagsCount:item.bag.toString(),
      }}
      validationSchema={validationSchemaWithBags}
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
            Product*
          </Text>
          <TextInput
            onChangeText={handleChange("Product")}
            onBlur={handleBlur("Product")}
            value={values.Product}
            returnKeyType="next"
            onSubmitEditing={() => inputQualityRef.current.focus()}
            style={
              errors.Product && touched.Product
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Product Name"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.Product && touched.Product ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Product}
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
            Quality*
          </Text>
          <TextInput
            ref={inputQualityRef}
            onChangeText={handleChange("Quality")}
            onBlur={handleBlur("Quality")}
            value={values.Quality}
            returnKeyType="next"
            onSubmitEditing={() => inputBagsRef.current.focus()}
            style={
              errors.Quality && touched.Quality
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Quality"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.Quality && touched.Quality ? (
            <Text style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}>
              {errors.Quality}
            </Text>
          ) : null}

          <View style={{ flexDirection: "column" }}>
            <Text
              style={[
                GlobalStyle.Label,
                {
                  marginTop: pixelSizeVertical(30),
                  marginBottom: pixelSizeVertical(15),
                },
              ]}
            >
              Quantity*
            </Text>
            <View style={[GlobalStyle.flexJusSB, { width: widthPixel(375) }]}>
              <View>
                <TextInput
                  keyboardType="number-pad"
                  ref={inputBagsRef}
                  onChangeText={handleChange("BagsCount")}
                  onBlur={handleBlur("BagsCount")}
                  value={values.BagsCount}
                  returnKeyType="done"
                  style={
                    errors.BagsCount && touched.BagsCount
                      ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder]
                      : [styles.inputBoxKgs]
                  }
                  placeholder="Bags Count"
                  placeholderTextColor="#D3DCE5"
                ></TextInput>
                {errors.BagsCount && touched.BagsCount ? (
                  <Text
                    style={[
                      GlobalStyle.ErrorText,
                      { position: "relative", top: 10 },
                    ]}
                  >
                    {errors.BagsCount}
                  </Text>
                ) : null}
              </View>
              <View>
                <View>
                  <Pressable
                    onPress={BottosheetOpen}
                    style={
                      //   bagsWeightError
                      //     ? [
                      //         styles.inputBoxKgs,
                      //         GlobalStyle.ErrorInputBorder,
                      //         { justifyContent: "center" },
                      //       ]
                      //     :
                      [styles.inputBoxKgs, { justifyContent: "center" }]
                    }
                  >
                    <Text
                      style={
                        bagsWeight == ""
                          ? [styles.districtLabel]
                          : [
                              styles.districtLabel,
                              { color: COLORS.PrimaryText },
                            ]
                      }
                    >
                           {bagsWeight} Kgs
                    </Text>
                  </Pressable>
                  {/* {bagsWeightError ? (
                    <Text
                      style={[
                        GlobalStyle.ErrorText,
                        { position: "relative", top: 10 },
                      ]}
                    >
                      Please choose one
                    </Text>
                  ) : null} */}
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </Formik>
)}





  const validationSchema = Yup.object().shape({
  Product: Yup.string().required("Please enter the product"),
  Quality: Yup.string().required("Please enter the quality"),
  Quantity: Yup.string().required("Please select product quantity"),
});


const EditProcurement = ({
  formRef,
  setBottomSheetContent,
  modalizeRef,
  bagsWeight,
  item,
})=>{
const inputQualityRef = useRef();
  const inputQuantityRef = useRef();
  const inputBagsRef = useRef();
 const navigation = useNavigation()
  const { userInfo, apiLoading, setApiLoading, setProcurementEdited } = useContext(MyContext);
  const [selectedDistrict] = useRecoilState(selectedDistrictAtom);
  const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);

  const handleSubmit = async (values) => {
   const Results = {
      lotNo: item.lotNo,
      productName: values.Product,
      quality: values.Quality,
      quantity: values.Quantity,
      district: selectedDistrict,

    };
     setApiLoading(true)
    const Resp = await EditProcurementApi(userInfo.id,item.id,Results);
    if (Resp == "success") {
      setProcurementEdited(true)
      setApiLoading(false);
      navigation.goBack()
      showToaster("Changes Saved");
    }
  }

return(
<Formik
      innerRef={formRef}
      initialValues={{
      Product: item.productName,
       Quality: item.quality,
       Quantity: item.quantity.toString(),
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
            Product*
          </Text>

          <TextInput
            onChangeText={handleChange("Product")}
            onBlur={handleBlur("Product")}
            value={values.Product}
            returnKeyType="next"
            onSubmitEditing={() => inputQualityRef.current.focus()}
            style={
              errors.Product && touched.Product
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Product Name"
            placeholderTextColor="#D3DCE5"
          ></TextInput>

          {errors.Product && touched.Product ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Product}
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
            Quality*
          </Text>
          <TextInput
            ref={inputQualityRef}
            onChangeText={handleChange("Quality")}
            onBlur={handleBlur("Quality")}
            value={values.Quality}
            returnKeyType="next"
            onSubmitEditing={() => inputQuantityRef.current.focus()}
            style={
              errors.Quality && touched.Quality
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Quality"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.Quality && touched.Quality ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Quality}
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
              Quantity*
            </Text>
            <View
              style={
                errors.Quantity && touched.Quantity
                  ? [styles.inputWithText, GlobalStyle.ErrorInputBorder]
                  : [styles.inputWithText]
              }
            >
              <TextInput
                keyboardType="number-pad"
                ref={inputQuantityRef}
                onChangeText={handleChange("Quantity")}
                onBlur={handleBlur("Quantity")}
                value={values.Quantity}
                returnKeyType="done"
                style={styles.inputWithoutBorder}
                placeholder="Enter Quantity"
                placeholderTextColor="#D3DCE5"
              ></TextInput>
              <Text style={GlobalStyle.inputText}>Kgs</Text>
            </View>

            {errors.Quantity && touched.Quantity ? (
              <Text
                style={[
                  GlobalStyle.ErrorText,
                  { position: "relative", top: 10 },
                ]}
              >
                {errors.Quantity}
              </Text>
            ) : null}
          </>
        </>
      )}
    </Formik>
)
}






export default EditParticularProcurement

const styles = StyleSheet.create({
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
  inputWithoutBorder: {
    width: widthPixel(320),
    height: heightPixel(48),
     fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
})