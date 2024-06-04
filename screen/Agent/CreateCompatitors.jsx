import { Pressable, StyleSheet,Text,TextInput,View,ScrollView,TouchableOpacity,Keyboard } from 'react-native'
import React, { useState, useRef,useEffect, useContext} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT,SIZES, ICONS, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import {  Buttonx ,TopMenu } from "../../components"
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik } from "formik";
import * as Yup from "yup";
import { FetchCompetitorsData, FetchDistrictData ,FetchProductsData, SendProductsData ,SendCompetitorsData , SendCompetitorsReport} from '../../apiHelper'
import { showToaster } from "../../components"
import { Api } from '../../api/api'
import axios from 'axios'
import { MyContext } from '../../context/MyContext'
import { useNavigation } from '@react-navigation/native'





const validationSchema = Yup.object().shape({
  districtName:Yup.string().required("District is Required"),
  competitorName: Yup.string().required("Competitors Name is Required"),
  productName: Yup.string().required("Product name is Required"),
  quantity: Yup.string().required("Quantity is Required"),
  priceStart: Yup.number().required("Required"),
  priceEnd: Yup.number()
    .required("Required")
    .when("priceStart", (priceStart, schema) =>
      priceStart
        ? schema.moreThan(priceStart, "Bigger than Price Start")
        : schema
    ),
  lots: Yup.number(),
});



const CreateCompatitors = () => {
 const competitorsFormRef = useRef(null)
 const districtFormRef = useRef(null)
 const [btnLoading, setBtnLoading] = useState(false)
 const [BtmSheetContent, setBtmSheetContent] = useState("competitor")
 const PriceStartRef = useRef();
 const PriceEndRef = useRef();
 const LotsNoRef = useRef();
 const [tempDistrict, setTempDistrict] = useState(true)
 const [apiLoading, SetApiLoading] = useState(false)
 const {userInfo} = useContext(MyContext)
 const navigation = useNavigation()

   const bottomSheetRef = useRef(null);
    const handleCustomSubmit = async() => {
      competitorsFormRef.current?.handleSubmit()
    }


//  Competitors Details


  const [competitorsNames, setCompetitorsNames] = useState(null);
  const [isMyInputFocused, setIsMyInputFocused] = useState(false);




  const [productArray, setProductArray] = useState([])
  const [productUpdate,setProdUpdate] = useState(null)
  const [competitorsDataEmpty,setCompetitorsDataEmpty] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [districtUpdate, setDistrictUpdate] = useState("")


  const handleSearch = (text, data) => {
    setSearchTerm(text);
    const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredDatas(filtered);
  };



  const handleAddObject = async(data)=>{
       Keyboard.dismiss();
       const newName = searchTerm
      if(searchTerm.trim() !==""){
      const nameExists = data.some(item => item.name === newName);

    if(!nameExists){
      const newObject = {
       __v: 0,
       _id: Math.random().toString(36).substr(2, 9), // Generate a random ID (you can adjust this according to your requirements)
      createdAt: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID (you can adjust this according to your requirements)
      isDeleted: 0,
      name: newName,
      updatedAt: new Date().toISOString()
      };
       if(BtmSheetContent=="competitor"){
      selectedVlues("competitorName",searchTerm)
      setCompetitorsNames([...competitorsNames, newObject]);
      FetchCompetirosDatas(districtUpdate)
      setSearchTerm("")
      const DataSend = await SendCompetitorsDatas(searchTerm,districtUpdate)
      console.log("send Competitors", DataSend)
    }if(BtmSheetContent=="product"){
      selectedVlues("productName",searchTerm)}
      setProductArray([...productArray, newObject]);
      setProdUpdate("update")
      setSearchTerm("")
      const DataSend = await SendProducts(searchTerm)
      console.log("send products", DataSend)
      
    }

      }
    else {
      showToaster("Name Already Exist")
      console.log("This is already exist")
    }

      }

  const SendProducts = async(value)=>{
  try {
    const Response = await axios.post(`${Api.api}/product/store`, {
      name: value,
    });
    if(Response.data.success)
    return "success";
  } catch (error) {
    console.log(error);
  }
  }


  const SendCompetitorsDatas = async(value, district)=>{
  try {
    const Response = await axios.post(`${Api.api}/competitor/store/${userInfo.id}`, {
      name: value,
      district:district
    });
    if(Response.data.success)
    return "success";
  } catch (error) {
    console.log(error);
  }
  }
  
  const selectedVlues = (fieldName,item) => {
      competitorsFormRef.current.setFieldValue(fieldName, item);
      bottomSheetRef.current?.close()    
  };

// district Sheet 

  const [datas, setDatas] = useState([]);
  //Fetching District



useEffect(() => {
  FetchProducts()
}, [productUpdate])


useEffect(() => {
  FetchDistrictDatas()
}, [])

const FetchDistrictDatas=async()=>{
const Res = await FetchDistrictData();
    setDatas(Res)
}



const FetchCompetirosDatas = async (district) => {
try {
 const Result = await FetchCompetitorsData(district);
 if (Result !== null) {
    setCompetitorsDataEmpty(false)
    setCompetitorsNames(Result)     
    }else{
    setCompetitorsDataEmpty(true)
    setCompetitorsNames(null)
    }
    
} catch (error) {
  console.log(error)
   
}
  };



  const FetchProducts = async()=>{
  const Res = await FetchProductsData();
   setProductArray(Res)
}



  const [searchQuery, setSearchQuery] = useState("");
  const groupedData = {};

  datas.forEach((item) => {
    const { district } = item;
    const firstLetter = district[0].toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(item);
  });

  const filteredData = Object.keys(groupedData).reduce((result, key) => {
    const filteredItems = groupedData[key].filter((item) =>
      item.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      result[key] = filteredItems;
    }
    return result;
  }, {});



const OpenBottomSheet = (item)=>{
if(item=="competitor"){
   if(!tempDistrict){
  setBtmSheetContent(item)
  bottomSheetRef.current?.open()
   }else{
   showToaster("Please select district")
   }
}
if(item=="product"){
  setBtmSheetContent(item)
  bottomSheetRef.current?.open()
}
}
    
    
  const handleSubmit = async (values) => {
     setBtnLoading(true)
    const Response = await SendCompetitorsReport(userInfo.id,values)
    if(Response=="success"){
      competitorsFormRef.current.resetForm();
      navigation.navigate("Home")
      setBtnLoading(true)
      showToaster("Reported Successfully")
    } 
    setBtnLoading(true)
  };

  const toggeleSelect = (item)=>{
   setTempDistrict(false)
   setDistrictUpdate(item.district)
   console.log(item.district)
   FetchCompetirosDatas(item.district)
  competitorsFormRef.current.setFieldValue("districtName", item.district);
  districtFormRef.current?.close()
  }


  
    

 return (
  <> 
    <View style={[GlobalStyle.globalHead]}>
    <ScrollView contentContainerStyle={{width:UNIQUEWIDTH.wid}} showsVerticalScrollIndicator={false}>
     <TopMenu btnAction={"without"}/>
      
    {/* <CompetitorsForm competitorsFormRef={competitorsFormRef} bottomSheetRef={bottomSheetRef}/>   */}
    <Formik
      innerRef={competitorsFormRef}
      initialValues={{
        districtName:"",
        competitorName: "",
        productName: "",
        quantity: "",
        priceStart: "",
        priceEnd: "",
        lots: "",
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
        <>
         <View style={[GlobalStyle.flexJusSB, {alignItems:"center", marginVertical:pixelSizeVertical(10)}]}>
    <Text style={GlobalStyle.overAllHeadLine}>Competitors Report</Text>
    <Pressable onPress={()=>districtFormRef.current?.open()} style={errors.districtName && touched.districtName ? [styles.districtLabelHead,GlobalStyle.ErrorInputBorder] :[styles.districtLabelHead]}>
     <TextInput
                editable={false}
                onBlur={handleBlur("districtName")}
                value={values.districtName}
                style={styles.inputWithoutBorder}
                placeholder="Select District"
                placeholderTextColor={errors.districtName && touched.districtName ? "red" : "#D3DCE5"}
              ></TextInput>
    </Pressable>
    </View>
          {/* Select Competitor  */}
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
              Select Competitor<Text style={{color:'red'}}>*</Text>
            </Text>
            {/* <Pressable onPress={() => OpenSelectionSheet("Competiter")}> */}
            <Pressable onPress={() => OpenBottomSheet("competitor")}>
              <TextInput
                editable={false}
                onBlur={handleBlur("competitorName")}
                value={values.competitorName}
                returnKeyType="next"
                style={
                  errors.competitorName && touched.competitorName
                    ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                    : [GlobalStyle.inputBox]
                }
                placeholder="Add or Select Competitors"
                placeholderTextColor="#D3DCE5"
              ></TextInput>
            </Pressable>

            {errors.competitorName && touched.competitorName ? (
              <Text
                style={[
                  GlobalStyle.ErrorText,
                  { position: "relative", top: 10 },
                ]}
              >
                {errors.competitorName}
              </Text>
            ) : null}
          </>

           {/* Select Product  */}
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
              Product<Text style={{color:'red'}}>*</Text>
            </Text>
            {/* <Pressable onPress={() => OpenSelectionSheet("Competiter")}> */}
            <Pressable onPress={() =>  OpenBottomSheet("product")}>
              <TextInput
                editable={false}
                onBlur={handleBlur("productName")}
                value={values.productName}
                returnKeyType="next"
                style={
                  errors.productName && touched.productName
                    ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                    : [GlobalStyle.inputBox]
                }
                placeholder="Add or Select Competitors"
                placeholderTextColor="#D3DCE5"
              ></TextInput>
            </Pressable>

            {errors.productName && touched.productName ? (
              <Text
                style={[
                  GlobalStyle.ErrorText,
                  { position: "relative", top: 10 },
                ]}
              >
                {errors.productName}
              </Text>
            ) : null}
          </>

         {/* quantity */}
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
           Quantity<Text style={{ color: "red" }}>*</Text>
         </Text>
         <View
           style={
               errors.quantity && touched.quantity
               ? [styles.inputWithText, GlobalStyle.ErrorInputBorder]
               : styles.inputWithText
           }
         >
           <TextInput
             keyboardType="number-pad"
             value={values.quantity}
             onChangeText={handleChange("quantity")}
             returnKeyType="next"
             onSubmitEditing={() => PriceStartRef.current.focus()}
             style={styles.inputWithoutBorder}
             placeholder="Enter Quantity"
             placeholderTextColor="#D3DCE5"
           ></TextInput>
           <Text style={GlobalStyle.inputText}>Kgs</Text>
         </View>
         {errors.quantity && touched.quantity ? (
           <Text
             style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
           >
             {errors.quantity}
           </Text>
         ) : null}
       </> 

     


           {/* price range  */}
       <View style={{ flexDirection: "column" }}>
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
             Price Range<Text style={{ color: "red" }}>*</Text>
           </Text>
           <View style={[GlobalStyle.flexJusSB, { width: widthPixel(375) }]}>
             <View>
               <TextInput
                 ref={PriceStartRef}
                 keyboardType="number-pad"
                //  onChangeText={(text) => handleInputChange("priceStart", text)}
                  onChangeText={handleChange("priceStart")}
                  onBlur={handleBlur("priceStart")}
                 value={values.priceStart}
                 returnKeyType="next"
                 onSubmitEditing={() => PriceEndRef.current.focus()}
                 style={
                   errors.priceStart && touched.priceStart
                     ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder]
                     : [styles.inputBoxKgs]
                 }
                 placeholder="Enter Price"
                 placeholderTextColor="#D3DCE5"
               ></TextInput>
               {errors.priceStart && touched.priceStart ? (
                 <Text
                   style={[
                     GlobalStyle.ErrorText,
                     { position: "relative", top: 10 },
                   ]}
                 >
                   {errors.priceStart}
                 </Text>
               ) : null}
             </View>
             <View>
               <View>
                 <TextInput
                   keyboardType="number-pad"
                   ref={PriceEndRef}
                    onChangeText={handleChange("priceEnd")}
                    onBlur={handleBlur("priceEnd")}
                  //  onChangeText={(text) => handleInputChange("priceEnd", text)}
                   value={values.priceEnd}
                   onSubmitEditing={() => LotsNoRef.current.focus()}
                   returnKeyType="next"
                   style={
                     errors.priceEnd && touched.priceEnd
                       ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder]
                       : [styles.inputBoxKgs]
                   }
                   placeholder="Enter Price"
                   placeholderTextColor="#D3DCE5"
                 ></TextInput>
                 {touched.priceEnd && errors.priceEnd ? (
                   <Text
                     style={[
                       GlobalStyle.ErrorText,
                       { position: "relative", top: 10 },
                     ]}
                   >
                     {errors.priceEnd}
                   </Text>
                 ) : null}
               </View>
             </View>
           </View>
           <View>
             
           </View>
         </>
       </View>


       {/* lot no  */}
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
           Lot No. <Text style={GlobalStyle.cardDateText}>(optional)</Text>
         </Text>
         <TextInput
           ref={LotsNoRef}
           keyboardType="numeric"
            onChangeText={handleChange("lots")}
            onBlur={handleBlur("lots")}
            value={values.lots}
           returnKeyType="done"
             onSubmitEditing={() => competitorsFormRef.current?.handleSubmit()}
           style={[GlobalStyle.inputBox]}
           placeholder="Enter Lot"
           placeholderTextColor="#D3DCE5"
         ></TextInput>
       </>


        </>
      )}
    </Formik>

    </ScrollView>
    {btnLoading ? 
     <Buttonx  txt={"Loading..."} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} disabled={true}/> : 
    <Buttonx  txt={"Done"} style={[GlobalStyle.LoginButton,{position:"absolute", top:ASPECTRADIO.height-55}]} fn={handleCustomSubmit}/>
    }
    
    </View> 

     <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.45}
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
    <View>
    {BtmSheetContent === "competitor" ?
   ( 
 <View
            style={{
              flex: 1,
              // height: ASPECTRADIO.height * 0.45,
              paddingHorizontal: pixelSizeHorizontal(20),
              marginVertical: pixelSizeVertical(20),
            }}
          >
            <View
              style={[
                GlobalStyle.flexJusSB,
                { paddingVertical: pixelSizeVertical(20) },
              ]}
            >
              <Text style={GlobalStyle.cancelBtn}>Select Competitors</Text>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.close()}
              >
                <ICONS.CloseIconLogin />
              </TouchableOpacity>
            </View>
            <TextInput
              style={
                isMyInputFocused
                  ? [GlobalStyle.inputBox, { borderColor: COLORS.primary }]
                  : [GlobalStyle.inputBox]
              }
              onBlur={() => setIsMyInputFocused(false)}
              onFocus={() => setIsMyInputFocused(true)}
              onChangeText={(text) => handleSearch(text,  competitorsNames)}
              value={searchTerm}
              placeholder="Search or Add"
              // keyboardType="number-pad"
              placeholderTextColor={COLORS.PlaceHolderText}
            ></TextInput> 
             <Pressable
              style={{ paddingVertical: pixelSizeVertical(20) }}
              onPress={()=>handleAddObject(competitorsNames)}
            >
              <Text style={[GlobalStyle.cancelBtn, { fontSize: SIZES.size14 }]}>
                +Add new
              </Text>
            </Pressable>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: pixelSizeVertical(20) }}
            > 
              {/* {competitorsDataEmpty ?  */}
              {competitorsNames == null || competitorsDataEmpty ?
              <View>
              <Text>No competitors found in this district</Text>
              </View> :
             searchTerm ? (
          filteredDatas.map((item, index) => (
           <View
                    key={index}
                    style={{ paddingVertical: pixelSizeVertical(15) }}
                  >
                    <Pressable
                      onPress={() => selectedVlues("competitorName", item.name)}
                    >
                      <Text style={GlobalStyle.inputText}>{item.name}</Text>
                    </Pressable>
                  </View>
        ))
      ) : ( 
         competitorsNames ===null ? <View></View> :
        competitorsNames.map((item, index) => (
           <View
                    key={index}
                    style={{ paddingVertical: pixelSizeVertical(15) }}
                  >
                    <Pressable
                      onPress={() => selectedVlues("competitorName", item.name)}
                    >
                      <Text style={GlobalStyle.inputText}>{item.name}</Text>
                    </Pressable>
                  </View>
        ))
      )
}

        
            </ScrollView>
          </View>
          
          )
          
          : (
           <View
            style={{
              flex: 1,
              // height: ASPECTRADIO.height * 0.45,
              paddingHorizontal: pixelSizeHorizontal(20),
              marginVertical: pixelSizeVertical(20),
            }}
          >
            <View
              style={[
                GlobalStyle.flexJusSB,
                { paddingVertical: pixelSizeVertical(20) },
              ]}
            >
              <Text style={GlobalStyle.cancelBtn}>Select Products</Text>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.close()}
              >
                <ICONS.CloseIconLogin />
              </TouchableOpacity>
            </View>
            <TextInput
              style={
                isMyInputFocused
                  ? [GlobalStyle.inputBox, { borderColor: COLORS.primary }]
                  : [GlobalStyle.inputBox]
              }
              onBlur={() => setIsMyInputFocused(false)}
              onFocus={() => setIsMyInputFocused(true)}
              onChangeText={(text) => handleSearch(text,  productArray)}
              value={searchTerm}
              // value={productInput}
              // onChangeText={(text) => setProductInput(text)}
              placeholder="Search or Add"
              // keyboardType="number-pad"
              placeholderTextColor={COLORS.PlaceHolderText}
            ></TextInput> 
             <Pressable
              style={{ paddingVertical: pixelSizeVertical(20) }}
              onPress={()=>handleAddObject(productArray)}
            >
              <Text style={[GlobalStyle.cancelBtn, { fontSize: SIZES.size14 }]}>
                +Add new
              </Text>
            </Pressable>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: pixelSizeVertical(20) }}
            > 

             {searchTerm ? (
        filteredDatas.map((item, index) => (
           <View
                    key={index}
                    style={{ paddingVertical: pixelSizeVertical(15) }}
                  >
                    <Pressable
                      onPress={() => selectedVlues("productName", item.name)}
                    >
                      <Text style={GlobalStyle.inputText}>{item.name}</Text>
                    </Pressable>
                  </View>
        ))
      ) : (
        productArray.map((item, index) => (
           <View
                    key={index}
                    style={{ paddingVertical: pixelSizeVertical(15) }}
                  >
                    <Pressable
                      onPress={() => selectedVlues("productName", item.name)}
                    >
                      <Text style={GlobalStyle.inputText}>{item.name}</Text>
                    </Pressable>
                  </View>
        ))
      )}
        
            </ScrollView>
          </View>
          )
}
           </View>
     </RBSheet>
     <RBSheet
      ref={districtFormRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.9}
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
          flex: 1,
          height: ASPECTRADIO.height * 0.95,
          paddingHorizontal: pixelSizeHorizontal(20),
        }}
      >
        <View
          style={[
            GlobalStyle.flexJusSB,
            { paddingVertical: pixelSizeVertical(15) },
          ]}
        >
          <Text style={GlobalStyle.cancelBtn}>Select District</Text>
          <Pressable onPress={() =>districtFormRef.current?.close()}>
            <ICONS.CloseIconLogin />
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              GlobalStyle.searchBar,
              { marginVertical: pixelSizeVertical(15) },
            ]}
          >
            <ICONS.SearchIcon />
            <TextInput
              style={{
                width: "92%",
                height: heightPixel(53),
              }}
              placeholder="Search"
              placeholderTextColor={COLORS.PlaceHolderText}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          {Object.keys(filteredData).map((key) => (
            <View key={key}>
              <View
                style={{
                  // backgroundColor: "lightgray",
                  paddingVertical: pixelSizeVertical(10),
                }}
              >
                <Text
                  style={[GlobalStyle.cardDateText, { color: COLORS.primary }]}
                >
                  {key}
                </Text>
              </View>
              {filteredData[key].map((item) => {
               return(
                <Pressable
                  onPress={() => toggeleSelect(item)}
                  key={item.id}
                  style={{ paddingVertical: pixelSizeVertical(10) }}
                >
                  <Text
                    style={[
                      GlobalStyle.cardBtnText,
                      {
                        fontSize: SIZES.size14,
                      },
                    ]}
                  >
                    {item.district}
                  </Text>
                </Pressable>
)})}
            </View>
          ))}
        </ScrollView>
      </View>
     </RBSheet>
    </>
  )
}

export default CreateCompatitors

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











