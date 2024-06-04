import React, {useState,useEffect } from 'react'
import { ASPECTRADIO, COLORS, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive'
import { Chip, Divider, DownloadCard, SearchBar,  } from '../../components'
import { View, StyleSheet,Text,TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import GlobalStyle from '../../styles/GlobalStyle';
import { Feather } from '@expo/vector-icons';




const APMCDetails = ({route, navigation}) => {
const { item, allDatas } = route.params
const [activeItem,setActiveItem] = useState("All")
const [activeItemArray, setActiveItemArray] = useState(null)
const [changedAll,setChangedAll] =useState(false)
const [active, setActive] = useState(false)
const expandedHeight = 150; // Set your desired expanded height
const translateY = useSharedValue(0);


  const onGestureEvent = (event) => {
    translateY.value = event.nativeEvent.translationY;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(expandedHeight - translateY.value),
    };
  });
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
useEffect(() => {
 setActiveItemArray(allDatas)
 setActiveItem(item)
}, [])


const Districts = [
{
district:"Theni",
Documents:[
  {
   fileType:"Excel",
   fileName:"Idhayam Documents.csv",
   fileSize:"36MB",
   icon:<ICONS.ExcelLogo/>,
   status:"uploaded",
   date:"29 Sep"
   },
    {
   fileType:"Pdf",
   fileName:"Idhayam Documents.pdf",
   fileSize:"36MB",
   icon:<ICONS.PdfLogo/>,
   status:"uploaded",
  date:"20 Mar"
   },
]
},
{
district:"Coimbatore",
Documents:[
  {
   fileType:"Excel",
   fileName:"Idhayam Documents.csv",
   fileSize:"36MB",
   icon:<ICONS.ExcelLogo/>,
   status:"uploaded",
   date:"29 Sep"
   },
    {
   fileType:"Pdf",
   fileName:"Idhayam Documents.pdf",
   fileSize:"36MB",
   icon:<ICONS.PdfLogo/>,
   status:"uploaded",
  date:"20 Mar"
   },
]
},
{
district:"Erode",
Documents:[
  {
   fileType:"Excel",
   fileName:"Idhayam Documents.csv",
   fileSize:"36MB",
   icon:<ICONS.ExcelLogo/>,
   status:"uploaded",
   date:"29 Sep"
   },
    {
   fileType:"Pdf",
   fileName:"Idhayam Documents.pdf",
   fileSize:"36MB",
   icon:<ICONS.PdfLogo/>,
   status:"uploaded",
  date:"20 Mar"
   },
]
}
]


const ActiveData = (data)=>{
  setChangedAll(!changedAll)
  setActiveItem(data.name)
  console.log(data.totalData)
  setActiveItemArray(data.totalData)
}
const ActiveInnerData = (index)=>{

    setActiveItemArray(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], sts: newItems[index].sts === false ? true : false };
      return newItems;
    });
}

const [openData, setOpenData] = useState(false)
  const onOpen = (id) => {
  setOpenData(openData === id ? null : id)
  }


 if (!activeItemArray) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'white'}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
    </View>
  }
  return (
     <View style={{flex:1, backgroundColor:COLORS.white, alignItems:'center', paddingVertical:pixelSizeVertical(15)}}>
      <SearchBar content={"RecentActivity"}/> 
     <View style={{width:UNIQUEWIDTH.wid, flexDirection:'row', gap:12, paddingVertical:pixelSizeVertical(12)}}>
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

    {/* <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.handle, animatedStyle]} />
      </PanGestureHandler>
      </View> */}

       <ScrollView contentContainerStyle={{paddingVertical:pixelSizeVertical(10)}} showsVerticalScrollIndicator={false}>
       {Districts.map((data, index)=>{
      return(
       <View key={index} style={{alignItems:"center",}}>
       <View style={styles.accodianText}>
                {openData === index ? null :
                  <Pressable style={[GlobalStyle.rowSpaceBetweenCenter]} onPress={() => onOpen(index)}>
                    <Text style={[GlobalStyle.cardHeadlineText, { fontSize: SIZES.medium }]}>{data.district}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }
                {openData === index ?
                  <View>
                    <Pressable onPress={onOpen} style={GlobalStyle.rowSpaceBetweenCenter}>
                      <Text style={GlobalStyle.cancelBtn}>{data.district}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    {
                    data.Documents.map((item,index)=>{
                     return (
                        <Pressable 
                        key={index}
                        style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}
                        // onPress={()=>navigationWithDetails(item, "particular")}
                        >
                         <DownloadCard item={item} child={<Feather name="download" size={20} color={COLORS.PrimaryText} />}/>
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
      </ScrollView>
      
    </View>
   

  )
}

export default APMCDetails

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  handle: {
    width: ASPECTRADIO.width,
    height: 4,
    // backgroundColor: 'gray',
    backgroundColor:COLORS.secondaryBlue,
    marginBottom: 10,
  },
  accodianText:{
 paddingVertical: pixelSizeVertical(20),
 width:UNIQUEWIDTH.wid,
}
});


//     <View style={{width:UNIQUEWIDTH.wid, flexDirection:'row', gap:12, paddingVertical:pixelSizeVertical(12)}}>
//        <Pressable onPress={chnageStatus}>
//         <Chip active={changedAll} txt={activeItem}/>
//        </Pressable> 
//        {/* {changedAll ? null : <Pressable onPress={()=>setActiveItem("All")}>
//         <Chip active={true} txt={item}/>
//        </Pressable> } */}
//      {changedAll ? 
//      <ScrollView horizontal contentContainerStyle={{gap:12}} showsHorizontalScrollIndicator={false}>
//       {DataList.map((data,index)=>{return(<Pressable onPress={()=>ActiveData(data)} key={index}><Chip active={data.sts} txt={data.name} /></Pressable>)})}
//       </ScrollView> :
//       <ScrollView horizontal contentContainerStyle={{gap:12}} showsHorizontalScrollIndicator={false}>
      
//       <Pressable onPress={()=>setActiveItem("All")}>
//         <Chip active={true} txt={item}/>
//        </Pressable>
//       {activeItemArray.map((data,index)=>{return(<Pressable onPress={()=>ActiveInnerData(index)} key={index}><Chip active={data.sts} txt={data.name} /></Pressable>)})}
//       </ScrollView>
// }
//        {/* {activeItem =="All" ? 
//       <ScrollView horizontal contentContainerStyle={{gap:12}} showsHorizontalScrollIndicator={false}>
//       {DataList.map((data,index)=>{return(<Pressable onPress={()=>ActiveData(data)} key={index}><Chip active={data.sts} txt={data.name} /></Pressable>)})}
//       </ScrollView>
//       :
//       <ScrollView horizontal contentContainerStyle={{gap:12}} showsHorizontalScrollIndicator={false}>
//       {activeItemArray.map((data,index)=>{return(<Pressable onPress={()=>ActiveInnerData(index)} key={index}><Chip active={data.sts} txt={data.name} /></Pressable>)})}
//       </ScrollView>
//       } */}
//       </View>