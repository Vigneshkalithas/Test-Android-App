import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import { COLORS, ICONS, UNIQUEWIDTH,ASPECTRADIO,CENTERSCREEN,FONT,SIZES } from '../../Constants'
import { BidsCard, ChartComponent, Filterx, SearchBar } from '../../components'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { BidsDatas } from '../../DataCenter'
import { ScrollView } from 'react-native-gesture-handler'
import { CompetitorsData } from '../../DataCenter'
import { useRecoilState } from 'recoil'
import { OpenBids,Bids,CompReport} from "../../atoms/Agents";
import { GetCompetitorsDetailsDatas } from "../../apiHelper"
import { date } from 'yup'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

const CompetitorsDetails = ( {route, navigation} ) => {
 const { item } = route.params;
 const [current, setCurrent] = useState("")
 const [apiCompReportData,setApiCompReportData] = useRecoilState(CompReport)
 const [compDataLength, setCompDataLength] = useState("")
 const [reports,setReports] = useState([])

 useEffect(() => {
setCurrent(item.name)
GetDetailDataForCompetitors(item.name)
setCompDataLength(apiCompReportData.length*43.42857142857143)
 }, [])

 const GetDetailDataForCompetitors=async(name)=>{
const Datas = await GetCompetitorsDetailsDatas(name)
  if(Datas==null){
   setReports([])
 }else{
   setReports(Datas)
 }
 }

    const [openData, setOpenData] = useState(false)
    const [showData, setShowData] = useState(false)
    const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }
 const closeDropdown =(data)=>{
        setCurrent(data)
        GetDetailDataForCompetitors(data)
        setShowData(false)
 }
    return (
    <View style={{flex:1,backgroundColor:COLORS.white,paddingVertical: pixelSizeVertical(15)}}>
    <View style={{ alignItems:'center',paddingHorizontal: pixelSizeHorizontal(15)}}>
    <>
    <SearchBar content={"RecentActivity"}/>
    <View style={{width:UNIQUEWIDTH.wid,marginVertical:pixelSizeVertical(10),paddingVertical:pixelSizeVertical(10)}}>
    <Text style={GlobalStyle.cardDateText}>{item.district}</Text> 
    {/* <ContactCard agentModal={agentModal} setAgentModal={setAgentModal} current={current}/> */}
    {/* <ContactCard  data={data}/> */}
    <ContactCard showData={showData} setShowData={setShowData} current={current}/>
    {showData ? <DropDownCard apiCompReportData={apiCompReportData} DropDownheight={compDataLength} closeDropdown={closeDropdown} current={current} />: null}
    </View>
    </>
    </View>
     <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal:pixelSizeHorizontal(15)}}>
     <Filterx text={"Overview"} txtClr={COLORS.PrimaryText} shareBtn={true}/>
     <ChartComponent/>
     <View style={{paddingVertical:pixelSizeVertical(15)}}>
     <Filterx text={"Reports"} txtClr={COLORS.PrimaryText} shareBtn={false}/>
     </View>

      {reports.length == 0 ? 
       <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
           <Text style={GlobalStyle.cardHeadlineText}>There are no Reports</Text>
      </View> : 
      <> 
     {
    Object.keys(reports[0]).map((item,index)=>{
     return(
      <View style={[GlobalStyle.districtTxt]} key={item} >
                {openData === item ? null :
                  <Pressable style={GlobalStyle.flexJusSB} onPress={() => onOpen(item)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{item}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }
                {openData === item ?
                  <View>
                    <Pressable onPress={onOpen} style={GlobalStyle.flexJusSB}>
                      <Text style={GlobalStyle.cancelBtn}>{item}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    {reports[0][item].map((data, index) => {
                      return (
                        <View key={index} style={{marginVertical:pixelSizeVertical(7)}}>
                         <BidsCardReport data={data}/>
                        </View>
                      )
                    })}
                  </View> : null}
      </View>
     )
     })}
     </>
     }
     </View>
    </ScrollView>
    </View>
  )
}



const ContactCard = ({showData, setShowData,current})=>{
return(
<View style={styles.ContactCardContainer}>
<Pressable onPress={()=>setShowData(!showData)} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:'100%'}}>
<Text style={GlobalStyle.cardHeadlineText}>{current}</Text>
<ICONS.DownArrow/>
</Pressable>

</View>
)
}

const DropDownCard = ({DropDownheight,closeDropdown,current, apiCompReportData})=>{

return(
 <View style={[GlobalStyle.DropdownHead, {height:heightPixel(DropDownheight)}]}>
        <View style={{padding:10}}>
        {apiCompReportData.map((data,index)=>{
        return(
        <Pressable key={data.id} style={GlobalStyle.listHead} onPress={()=>closeDropdown(data.name)}>
        <Text style={current == data.name ? [GlobalStyle.districtText,{color:COLORS.primary}] :[GlobalStyle. districtText]}>{data.name}</Text>
        {current == data.name ? <ICONS.smallsuccessIcon/> : null}
        </Pressable>
        )
        })}
        </View>
     </View>
)
}



const BidsCardReport = ({ data }) => {
  return (
    <View
      style={[
        GlobalStyle.cardContainer,
        { marginVertical: pixelSizeVertical(0) },
      ]}
    >
      <View style={styles.BidsContainerTop}>
        <View style={{ marginVertical: pixelSizeVertical(8) }}>
          <Text style={GlobalStyle.cardTexts}>Lot No : {data.lots}</Text>
        </View>
        <View style={GlobalStyle.flexJusSB}>
          <Text style={GlobalStyle.cardHeadlineText}>{data.productName}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={GlobalStyle.cardHeadlineText}>
              {data.quantity} Kgs
            </Text>
            <ICONS.cardOpenIcon />
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={GlobalStyle.cardTexts}>N/A</Text>
        <Text style={GlobalStyle.cardDot}></Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          
          <Text
            style={[GlobalStyle.cardTexts]}
          >
            Price : {data.priceRange}
          </Text>
        </View>
      </View>
    </View>
  );
};







export default CompetitorsDetails



const styles = StyleSheet.create({

ContactCardContainer:{
width:"100%",
height:heightPixel(48),
borderWidth:1,
borderColor:COLORS.BorderColor, 
borderRadius:6,
marginTop:pixelSizeVertical(15),
paddingHorizontal:pixelSizeHorizontal(10),
},






indicator: {
    backgroundColor:COLORS.primary,
    // width: widthPixel(60),
    height: heightPixel(6),
    // marginLeft: 10, 
    borderTopLeftRadius:22, 
    borderTopRightRadius:22
  },

  tabBar:{
  width:'auto',
  backgroundColor:COLORS.white,
  paddingHorizontal:0,
  elevation: 0,
  shadowOpacity: 0,
    
  },
  label:{
  fontFamily:FONT.EuclidMedium,
  fontSize: SIZES.size14,
  color:COLORS.primary,
  textTransform:"capitalize"
  },
  tabStyle: {
    width: 'auto', 
    paddingHorizontal:pixelSizeHorizontal(20), 
    alignItems: 'flex-start', 
    justifyContent: 'center',
 },

 focustedLabelBar:{
 width:widthPixel(60),
 height:heightPixel(6),
 borderTopLeftRadius:22, 
 borderTopRightRadius:22,
 backgroundColor:COLORS.primary,
marginVertical:pixelSizeVertical(10)
 },
 BidsContainerTop:{
height:heightPixel(100),
borderBottomColor:COLORS.BorderColor,
borderBottomWidth:1,
paddingHorizontal:pixelSizeHorizontal(15),
justifyContent:'center'
},
bottomContainer:{
height:heightPixel(50),
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
paddingHorizontal:pixelSizeHorizontal(15)
},


// modal 

 
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  
   BidsContainerTop: {
    height: heightPixel(100),
    borderBottomColor: COLORS.BorderColor,
    borderBottomWidth: 1,
    paddingHorizontal: pixelSizeHorizontal(15),
    justifyContent: "center",
  },
  bottomContainer: {
    height: heightPixel(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: pixelSizeHorizontal(15),
  },
            
})

