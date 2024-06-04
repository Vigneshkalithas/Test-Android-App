import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React ,{ useState , useEffect } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from '../../Constants'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../styles/Responsive'
import { ScrollView } from 'react-native-gesture-handler'
import { Buttonx, Divider, Loader } from "../../components"
import { useNavigation } from '@react-navigation/native'
import { GetApiData } from '../../apiHelper'
import { AntDesign } from '@expo/vector-icons';


const Agentwages = () => {

   const texts = [
    {content:"Gunny bag purchase"},
    {content:"Cluster wage"},
    {content:"Security charge,Money transfer charge"},
    {content:"Permit charge"},
    {content:"Comittee weighing charge, class charge"},
    {content:"Charger incurred for weighing, transfer of groundnut and Sesame from APMC bags to Idhayam bags and load the bags into the truck",active:false},
    {content:"Average Wages(Groundnut,Sesame)",active:false},
    {content:"Gunny Shifting, Re-weiging, sewing, Stacking charges",active:false},
    {content:"Gunny shifting Wages",active:false},
    {content:"Sithu jute-rope charges",active:false},
    {content:"Gunny bag",active:false},
    {content:"Lorry Loading and Unloading wages",active:false},
    {content:"Warehouse to warehouse Stacking charges",active:false},
    {content:"Carrier charges",active:false},
    {content:"Comittee service charges(Jaggery)",active:false},
    {content:"Truck custom charges per bag",active:false},
    {content:"Shop commission",active:false},
    {content:"Sithu jute-rope permit",active:false},
    {content:"Gunny bag re-weighing charges",active:false},
    {content: "Truck custom charges per bag",active:false},
    {content:"Sithu jute-rope permit",active:false},
    {content:"Gunny bag re-weighing charges",active:false},

  ];
  
  const [searchText, setSearchText] = useState('');
  const [filteredTexts, setFilteredTexts] = useState(texts);
  const [selectedList, setSelectedList] =useState(null)
  const [wages, setWages] = useState(null)
  const [og, setOg] = useState(null)
  const [isTamil, setIsTamil] = useState(false)
  const navigation = useNavigation()

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = texts.filter(item => item.content.toLowerCase().includes(text.toLowerCase()));
    setFilteredTexts(filtered);
  };



useEffect(() => {
GetApi()
}, [])


const GetApi = async () =>{
const Wages = await GetApiData(`wages/index`, 'Agent wages')
if(Wages !== null){
setWages(Wages)
setOg(Wages)
}
}

const filterData = () => {
    if (!searchText.trim()) {
      return wages;
    }
    return wages.filter(item => item.labelEnglish.toLowerCase().includes(searchText.toLowerCase()) || item.labelTamil.toLowerCase().includes(searchText.toLowerCase()));
  };


   const toggleActive = (items,index)=>{
    setWages(prevArray => {
      const newArray = [...prevArray];
      const clickedItem = newArray[index];
      clickedItem.active = !clickedItem.active;
      if (clickedItem.active) {
        newArray.splice(index, 1);
        newArray.unshift(clickedItem);
      } else {
        const originalIndex = og.findIndex(item => item._id === clickedItem._id);
        if (originalIndex !== -1) {
          newArray.splice(index, 1);
          newArray.splice(originalIndex, 0, clickedItem);
        }
      }
      return newArray;
    });

}
 

if(!wages){
return<Loader/>
}
  return (
    <View style={[GlobalStyle.globalHead, { paddingHorizontal : 0}]}>
    <View style={{width:UNIQUEWIDTH.wid}}>
    <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
      <Pressable onPress={()=>navigation.goBack()}><ICONS.GoBack/></Pressable>
      <Pressable onPress={()=>setIsTamil(!isTamil)}><ICONS.translateSvg/></Pressable>
    </View>
    </View>
     <View style={{paddingVertical:pixelSizeVertical(15), width:UNIQUEWIDTH.wid}}>
     <Text style={GlobalStyle.idText}>Kindly choose which wages you would want to have added to this bill.</Text>
     </View>
     <View style={{paddingVertical:pixelSizeVertical(15), width:UNIQUEWIDTH.wid}}>
     <TextInput
        style={styles.inputSearch}
        placeholder="Search wages"
        placeholderTextColor={COLORS.SecondaryText}
        onChangeText={handleSearch}
        value={searchText}
        // value={searchQuery}
      />
     </View>
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:ASPECTRADIO.width}}>
     
     <View>
     {wages.map((items,index)=>{
     return(
     <View key={items.id} style={{paddingVertical:pixelSizeVertical(10), gap:15, alignItems:"center",}} >
          <Pressable style={{width:UNIQUEWIDTH.wid, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}} onPress={() => toggleActive(items ,index)}>
          <Text style={items.active ?[GlobalStyle.txtLot, {width:"90%", color:COLORS.primary}] : [GlobalStyle.txtLot, {width:"90%"}]}>{isTamil ? `${items.labelTamil}` : `${items.labelEnglish}`}</Text>
          {items.active && <AntDesign name="close" size={22} color={COLORS.SecondaryText} />}
         </Pressable>
          <Divider/>
     </View>
     )
     })}
     </View> 
     
     {/* {filteredTexts.map((item, index) => (
     <View key={index} style={{paddingVertical:pixelSizeVertical(10), gap:15, width:ASPECTRADIO.width}}>
         <Pressable  onPress={() => toggleActive(item)}>
         <Text style={GlobalStyle.txtLot}>{item.content}</Text>
         </Pressable>
         <Divider/>
     </View>
      ))} */}
    
     </ScrollView>
     {selectedList == null ? null : <View style={styles.btnHeadContainer}>
      <Buttonx txt={"Add"} style={GlobalStyle.btnNext} fn={()=>navigation.navigate("ReimburseBill", {status:"Creating"})}/>
      </View>}
    </View>
    
  )
}

export default Agentwages

const styles = StyleSheet.create({
inputSearch:{
width:UNIQUEWIDTH.wid,
borderWidth:1,
borderColor:COLORS.BorderColor,
borderRadius:6,
height:heightPixel(48),
paddingHorizontal:pixelSizeHorizontal(20)
},
btnHeadContainer:{
  width: ASPECTRADIO.width,
  height: heightPixel(90),
  backgroundColor: COLORS.white,

  position: "absolute",
  top: "94%",
  alignItems:'center',
  justifyContent: "center",
  shadowColor: "#101518",
  shadowOpacity: 0.04,
  shadowOffset: { width: 0, height: -3 },
  shadowRadius: 35
}
})