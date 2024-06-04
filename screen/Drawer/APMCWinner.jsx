import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { Chip, Divider, Filterx, SearchBar } from '../../components'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import GlobalStyle from '../../styles/GlobalStyle'
import { useNavigation } from '@react-navigation/native'


const APMCWinner = () => {
const DataList = [
{
name:"Sesame",
sts:false,
totalData:[
{
name:"Black Sesame",
sts:false,
},
{
name:"  Red Sesame",
sts:false,
},
{
name:"Yellow Sesame",
sts:false,
},
{
name:"White Sesame",
sts:false,
},
]
},
{
name:"Groundnut",
sts:false,
totalData:[
{
name:"Virginia",
sts:false,
},
{
name:"Spanish",
sts:false,
},
{
name:"Valencia",
sts:false,
},
{
name:"Runner",
sts:false,
},
]
},
{
name:"Corn",
sts:false,
totalData:[
{
name:"Dent corn",
sts:false,
},
{
name:"Flint corn",
sts:false,
},
{
name:"Sweet corn",
sts:false,
},
{
name:"Popcorn",
sts:false,
},
]
},
{
name:"Vegitable",
sts:false,
totalData:[
{
name:"Tomato",
sts:false,
},
{
name:"Carrot",
sts:false,
},
{
name:"Spinach",
sts:false,
},
{
name:"Broccoli",
sts:false,
},
]
},
{
name:"Others",
sts:false,
totalData:[
{
name:"Bell Pepper",
sts:false,
},
{
name:"Cucumber",
sts:false,
},
{
name:"Eggplant",
sts:false,
},
{
name:"Lettuce",
sts:false,
},
]
},

]
const [activeItem,setActiveItem] = useState("All")
const [activeItemArray, setActiveItemArray] = useState(null)
const [openData, setOpenData] = useState(false)
const navigation = useNavigation()

const ActiveData = (data)=>{
  setActiveItem(data.name)
  setActiveItemArray(data.totalData)
}
const ActiveInnerData = (index)=>{
    // setActiveItemArray(prevItems => {
    //   const newItems = prevItems.map((item, i) => ({
    //     ...item,
    //     sts: i === index ? !item.sts : false
    //   }));
    //   return newItems;
    // });
    setActiveItemArray(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], sts: newItems[index].sts === false ? true : false };
      return newItems;
    });
}
const AllDatas = [ 
{
dates:"Oct 23",
products:["Sesame", "Groundnut", "Corn", "Vegitable", "Others"]
},
{
dates:"Sep 23",
products:["Sesame", "Groundnut", "Corn", "Vegitable", "Others"]
},
{
dates:"Jun 23",
products:["Sesame", "Groundnut", "Corn", "Vegitable", "Others"]
}
]
  const onOpen = (id) => {
  setOpenData(openData === id ? null : id)
  }


  const navigationWithDetails = (item,content)=>{
  // specific
    if(content=="particular"){
      const DataProduct = DataList.filter((product)=>product.name===item)
      navigation.navigate("APMCDetails", {item , allDatas:DataProduct[0].totalData})
    }
    if (content == "multiple"){
     navigation.navigate("APMCDetails", {item:activeItem , allDatas:activeItemArray})
    }
  
  }


  return (
    <View style={{flex:1, backgroundColor:COLORS.white, alignItems:'center', paddingVertical:pixelSizeVertical(15)}}>
      <SearchBar content={"RecentActivity"}/>
      <View style={{width:UNIQUEWIDTH.wid, paddingVertical:pixelSizeVertical(10)}}>
      <Filterx text={"APMC Winners"} txtClr={COLORS.primary} shareBtn={false}/>
      </View>
      <View style={{width:UNIQUEWIDTH.wid, flexDirection:'row', gap:12}}>
       <Pressable onPress={()=>{
       if(activeItem !=="All"){
          setActiveItem("All")
       }}}>
        <Chip active={true} txt={activeItem}/>
       </Pressable> 
       {activeItem =="All" ? 
      <ScrollView horizontal contentContainerStyle={{gap:12}} showsHorizontalScrollIndicator={false}>
      {DataList.map((data,index)=>{return(<Pressable onPress={()=>ActiveData(data)} key={index}><Chip active={data.sts} txt={data.name} /></Pressable>)})}
      </ScrollView>
      :
      <ScrollView horizontal contentContainerStyle={{gap:12}} showsHorizontalScrollIndicator={false}>
      {activeItemArray.map((data,index)=>{return(<Pressable onPress={()=>ActiveInnerData(index)} key={index}><Chip active={data.sts} txt={data.name} /></Pressable>)})}
      </ScrollView>
      }
      </View>
      {activeItem == "All" ? 
       <View style={{paddingVertical:pixelSizeVertical(10)}}>
       {AllDatas.map((data, index)=>{
      return(
       <View key={index} style={{alignItems:"center",}}>
       <View style={styles.accodianText}>
                {openData === index ? null :
                  <Pressable style={[GlobalStyle.rowSpaceBetweenCenter]} onPress={() => onOpen(index)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{data.dates}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }
                {openData === index ?
                  <View>
                    <Pressable onPress={onOpen} style={GlobalStyle.rowSpaceBetweenCenter}>
                      <Text style={GlobalStyle.cancelBtn}>{data.dates}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    {
                    data.products.map((item,index)=>{
                      //  console.log(apiBidsData[0].history[data])
                     return (

                        <Pressable 
                        key={index}
                        style={{marginVertical:pixelSizeVertical(12), paddingLeft:widthPixel(8),flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}
                        onPress={()=>navigationWithDetails(item, "particular")}
                        >
                         <Text style={GlobalStyle.cardHeadlineText}>{item}</Text>
                         <ICONS.cardOpenIcon/>
                         </Pressable>
                       
                      )
                    })
                    }
                
                  </View> : null}
       </View>
       <Divider/>
      </View>
              )

       })}
      </View> :
       <View style={{paddingVertical:pixelSizeVertical(10)}}>
       {AllDatas.map((data, index)=>{
      return(
       <View key={index} style={{alignItems:"center",}}>
       <View style={styles.accodianText}>
                  <Pressable style={[GlobalStyle.rowSpaceBetweenCenter]}  
                  // onPress={()=>navigation.navigate("APMCDetails", {item : activeItem, allDatas:activeItemArray})}
                  onPress={()=>navigationWithDetails(data, "multiple")}
                  >
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{data.dates}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>   
       </View>
       <Divider/>
      </View>
              )

       })}
      </View>
       }
    </View>
  )
}

export default APMCWinner

const styles = StyleSheet.create({
accodianText:{
 paddingVertical: pixelSizeVertical(20),
 width:UNIQUEWIDTH.wid,
}
})