import { Pressable, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect , useRef, useMemo , useCallback, useContext} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { COLORS, ICONS, UNIQUEWIDTH,ASPECTRADIO, CENTERSCREEN, FONT,SIZES } from '../../Constants'
import { ChartComponent, Filterx, SearchBar,SuccessModals,CardQualityAndDistrict , DateRange, CompPriceTable, Buttonx, ButtonUnfill} from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { BidsDatas } from '../../DataCenter'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { MyContext } from '../../context/MyContext'
import { Modalize } from "react-native-modalize";
import {SendProcurementPrice } from '../../apiHelper/Agents'
import { useNavigation } from '@react-navigation/native'

const PricingScreen = ( { route } ) => {
     const { data } = route.params;
     const navigation = useNavigation()
     const { onOpen, updateConfirmModalConfig , setModalSheetContent,closeModal,setOpenSuccessModal,userInfo } = useContext(MyContext)
     const ConfirmSheetRef = useRef()
     const [inputValue, setInputValue] = useState('');
     const [isInputFocused, setIsInputFocused] = useState(false);
     const SendProcuremenePrice = async()=>{
     const values = {
     productName:data.productName, 
     quality:data.quality, 
     quantity:data.totalQuantity, 
     district:data.district, 
     noOfLots:data.totalLots, 
     currentPrice:inputValue
     }
    
  const Response = await SendProcurementPrice(userInfo.id, values );
      if(Response == "Procurement price sended successfully"){
      closeModal();
      setOpenSuccessModal(true);
      navigation.navigate("Agent");
      }
     }
   const OpenConfirmModal = () =>{
    ConfirmSheetRef.current?.open()
   }


  return (
     <View style={{flex:1,backgroundColor:COLORS.white,paddingVertical: pixelSizeVertical(15),paddingHorizontal:pixelSizeHorizontal(15)}}>
     <View style={{alignItems:'centerS'}}>
     <SearchBar content={"RecentActivity"}/>
     </View>
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:pixelSizeVertical(50)}}>
     <View style={{paddingVertical:pixelSizeVertical(15)}}>
     <Text style={GlobalStyle.overAllHeadLinePrimary}>Procurement Details</Text>
     </View>
     <CardQualityAndDistrict Ltop={"Quality"} Lbottom={data.quality} RTop={"District"} Rbottom={data.district}/>
     <CardsAndDetails product={data.productName} quantity={data.totalQuantity} lots={data.totalLots} date={data.date} bags={data.totalBags}/>
     <Filterx text={"Competitors Graph"} shareBtn={true} txtClr={COLORS.primary}/>
     <ChartComponent/>
     {/* <SelectDate/> */}
     <DateRange/>
     <CompPriceTable/>
     <EnterPrice onOpen={OpenConfirmModal} inputValue={inputValue} setInputValue={setInputValue} isInputFocused={isInputFocused} setIsInputFocused={setIsInputFocused}/>
    </ScrollView>

     <SuccessModals content={"Procurement Price added"}/>
     <ConfirmSheet ConfirmSheetRef={ConfirmSheetRef} closeModal={closeModal} SendProcuremenePrice={SendProcuremenePrice}/>
    </View>
  )
}





const CardsAndDetails = ({product,quantity,lots,date, bags})=>{
return(
<View style={styles.CardsAndDetailsContainer}>
<View>
<View style={{paddingVertical:pixelSizeVertical(8)}}>
<Text style={GlobalStyle.cardDateText}>Product</Text>
<Text style={GlobalStyle.districtText}>{product}</Text>
</View>

<View style={{paddingVertical:pixelSizeVertical(8)}}>
<Text style={GlobalStyle.cardDateText}>No.of Lots</Text>
<Text style={GlobalStyle.districtText}>{lots}</Text>
</View>

</View>
<View>
<View style={{paddingVertical:pixelSizeVertical(8)}}>
<Text style={GlobalStyle.cardDateText}>Quantity/Bags</Text>
<Text style={GlobalStyle.districtText}>{quantity} Kgs / {bags} Bags</Text>
</View>

<View style={{paddingVertical:pixelSizeVertical(8)}}>
<Text style={GlobalStyle.cardDateText}>Date</Text>
<Text style={GlobalStyle.districtText}>{date}</Text>
</View>

</View>
</View>
)
}

const EnterPrice = ({onOpen , inputValue,
setInputValue,
isInputFocused,
setIsInputFocused})=>{
  
  const inputRef = useRef(null);
  const handlePress = () => {
    setIsInputFocused(true);
     inputRef.current.focus();
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };
return(
     <View>
     <Text style={GlobalStyle.cancelBtn}>Enter Procurement Price</Text>
     <Pressable style={isInputFocused ? [styles.enterProcurementPrice,{borderColor:COLORS.primary}]:[styles.enterProcurementPrice,{borderColor:COLORS.BorderColor,}]} onPress={handlePress}>
     <View style={{flexDirection:'row', alignItems:'center', gap:15}}>
     <ICONS.RupeesIcon/>
     <TextInput style={{width:widthPixel(290), height:heightPixel(54)}} placeholder="Enter Price" placeholderTextColor={COLORS.PlaceHolderText}
      keyboardType="numeric"
     value={inputValue}
     onChangeText={handleInputChange}
     onBlur={handleBlur}
     ref={inputRef}
     onPress={handlePress}
     />

     </View>
      { inputValue.length > 0 && (
     <Pressable onPress={onOpen}>
     <Text style={GlobalStyle.dateText}>Done</Text>
     </Pressable>)}
     </Pressable>
     </View>
)
}



const ConfirmSheet = ({ConfirmSheetRef , closeModal, SendProcuremenePrice})=>{
return(
 <Modalize
      ref={ConfirmSheetRef}
      adjustToContentHeight={true}
      snapPoint={200}
      withHandle={false}
      style={{ position: "absolute", bottom: 0 }}
      HeaderComponent={
        <View style={{ alignItems: "center", paddingTop: 16 }}>
          <View
            style={{
              width: widthPixel(41),
              height: heightPixel(4),
              backgroundColor: COLORS.BorderColor,
              borderRadius: 4,
            }}
          />
        </View>
      }
    >
      <View
        style={
           [
                {
                  flexDirection: "column",
                  alignItems: "center",
                  gap: heightPixel(30),
                  justifyContent: "center",
                  height: heightPixel(160),
                },
              ]
            
        }
      >
      
         <View>
      <View>
        <Text style={[GlobalStyle.cancelBtn, { color: COLORS.PrimaryText }]}>
          Are you sure you want to enter this price  
        </Text>
      </View>
    </View>
      
   <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 20,
      }}
    >
      <ButtonUnfill txt={"Cancel"} fn={closeModal} />
      <Buttonx
        txt={"Yes"}
        style={{
          height: heightPixel(48),
          width: widthPixel(171),
          backgroundColor: COLORS.primary,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
        fn={SendProcuremenePrice}
      />
    </View>
        
      </View>
    </Modalize>

)
}



export default PricingScreen

const styles = StyleSheet.create({

CardsAndDetailsContainer:{
borderWidth:1,
borderColor:COLORS.BorderColor,
// elevation:1,
borderRadius:6,
flexDirection:'row',
justifyContent:'space-between',
paddingHorizontal:pixelSizeHorizontal(15),
paddingVertical:pixelSizeVertical(15),
marginVertical:pixelSizeVertical(20)
},
DateHead:{
flexDirection:'row',
justifyContent:'space-between',
// marginVertical:pixelSizeVertical(10)
},
DateInputHead:{
width:widthPixel(183),
height:heightPixel(54),
borderWidth:1,
borderColor:COLORS.BorderColor,
borderRadius:6,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
paddingHorizontal:pixelSizeHorizontal(10)
},
enterProcurementPrice:{
width:UNIQUEWIDTH.wid,
height:heightPixel(54),
borderWidth:1,
borderRadius:6,
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
paddingHorizontal:pixelSizeHorizontal(15),
marginVertical:pixelSizeVertical(15)
},

})