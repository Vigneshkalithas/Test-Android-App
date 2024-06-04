import { Pressable, StyleSheet, Text, View, Modal,Animated, Easing, ActivityIndicator  } from 'react-native';
import React, { useState, useRef , useEffect, useContext } from 'react';
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, FONT,ICONS,SIZES, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { Buttonx, TopMenu , ConfirmBottmSheet, SuccessModals} from '../../components';
import LottieView from 'lottie-react-native';
import SuccssAnimation from "../../animation/Success.json"
import { CartCards } from '../../components';
import { MyContext } from '../../context/MyContext';
import { GetCartProcurementApi, SendForPricing }from "../../apiHelper/Procurement"
import { selectedDistrictAtom } from '../../atoms/selectedDistrict';
import { useRecoilState } from 'recoil';
import { disableDistrictAtom, lotCountAtom } from '../../atoms/lotsCount';
import { ProcurementCartEmpty } from '../../components/ZeroState';
import axios from 'axios';
import { Api } from '../../api/api';
import { date } from 'yup';

const ProcurementCart = () => {
 const [lotsquantity, setLotsQuantity]= useState(0)
 const { onOpen, updateConfirmModalConfig,  setModalSheetContent, userInfo ,  procurementEdited,} = useContext(MyContext)
 const [selectedDistrict,] = useRecoilState(selectedDistrictAtom)
 const [lotCount,setLotCountAtom] = useRecoilState(lotCountAtom);
 const [products, setProducts] = useState([])
 const [allQuantities,setAllQuantities] = useState([])
 const [allCartDatas, setAllCartDatas] = useState([])
 const [withBags, setWithBags] = useState(false)
 const [disableDistrict,setDisableDistrict] = useRecoilState(disableDistrictAtom)
 const [loading, setLoading] = useState(false) 



   const OpenConfirmModal = () =>{   
    //  setDisableDistrict(false)
     setModalSheetContent("Confirm");
     updateConfirmModalConfig({ btny: 'Keep Editing', btnx:'Yes', content: 'Are you sure want to send for pricing' });
     onOpen()
    // console.log("hitting")
   }   
   const GetProcuremnets = async(id,district)=>{
   try {
    const apiUrl = `${Api.api}/procurement/grouped-procure/${id}/${district}`;
    const Response = await axios.get(apiUrl);
    const ResponseData = await Response.data;
    console.log("cart api hitting")
    const productKeys = Object.keys(ResponseData.docs) 
    setProducts(productKeys)
    setAllCartDatas(ResponseData.docs)
    setLotsQuantity(ResponseData.data.totalLots)
    setAllQuantities(ResponseData.data.overAllQualityCount)
    setWithBags(ResponseData.data.isBaged)
    return true
   } catch (error) {
    console.log('Fetching Error on get cart procurements',error)
   }
    
  
   }

 const getApi = async()=>{
 const Res = await GetProcuremnets(userInfo.id,selectedDistrict)
 if(Res){
 setLoading(false)
 }
 }
   useEffect(() => {
   setLoading(true)
     getApi()
   }, [procurementEdited])
   

  return (
    <View style={[GlobalStyle.globalHead]}>
     {lotCount == 1 && lotsquantity == 0 ?
    <ProcurementCartEmpty title={"No New Lots"} helperText={"Good news! No pending bills to worry about. Your financial slate is clean and clear"}/>
     :
     loading ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color={COLORS.primary} />
     </View> :
   
    <>
    <View style={[{width:UNIQUEWIDTH.wid}]}>
    <TopMenu btnAction={"cancel"}/>
       <>
      <View style={{paddingVertical:pixelSizeVertical(15)}}>
      <Text style={GlobalStyle.overAllHeadLine}><Text style={{color:COLORS.primary}}>All Lots</Text> ( {lotsquantity} )</Text>
       </View>
       <CartCards products={products} totalQuantity={allQuantities} allDatas={allCartDatas} Bags={withBags}/>
      </> 
      </View>
    <Buttonx fn={OpenConfirmModal} style={[GlobalStyle.LoginButton,{position:'absolute', bottom:15}]} txt={"Send For Pricing"} />
    <SuccessModals content={"Procurement sent for pricing"}/>
    </> 
  
    }
    </View>
  )
}






export default ProcurementCart

const styles = StyleSheet.create({
  SuccessmodalContainer: {
    width: widthPixel(210),
    height: heightPixel(240),
    backgroundColor: COLORS.white,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
   container: {
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subContainer: {
    marginLeft: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listContainer: {
    marginLeft: 10,
  },
})


