import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Filterx } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { heightPixel, pixelSizeVertical , widthPixel } from '../../styles/Responsive'
import { ASPECTRADIO, COLORS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { HistoryDatas } from '../../DataCenter'
import GlobalStyle from '../../styles/GlobalStyle'
import HistoryCards from '../../components/Procurement/HistoryCards'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil';
import { ProcurementsHistory } from '../../atoms/Procurement';
import { ActivityIndicator } from 'react-native-paper'


const History = () => {
const [procurementHistory,setProcurementHistory] = useRecoilState(ProcurementsHistory)
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [groupedData, setGroupedData] = useState({});
  const navigation = useNavigation();
 const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec']
   useEffect(() => {
    // Sort data by date
      HistoryDatas.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateB - dateA;
    });

    // Group data by date
    const groupedData = HistoryDatas.reduce((acc, item) => {
      const date = item.date;
      acc[date] = acc[date] || [];
      acc[date].push(item);
      return acc;
    }, {});

    setGroupedData(groupedData);
  }, []);
  
      if (!procurementHistory) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:COLORS.white}}>
    <ActivityIndicator size="large" animating={true} color={COLORS.primary} />
        </View>
  }

  return (
     <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop:pixelSizeVertical(10),paddingBottom: pixelSizeVertical(25) }}>
        <Filterx text={'Overall History'} txtClr={COLORS.primary} shareBtn={true} />
        {Object.keys(procurementHistory[0]).length == 0 ? 
       <View style={{alignItems:'center', paddingVertical:pixelSizeVertical(50)}}>
           <Text style={GlobalStyle.cardHeadlineText}>There are no History.</Text>
           </View> 
        :
        <>
        {Object.keys(procurementHistory[0]).map((dates,index)=>{
        return(
        <View key={dates} style={{marginVertical:pixelSizeVertical(10)}}>
           <Text style={[GlobalStyle.dateText, {color:COLORS.PrimaryText}]}>{dates}</Text>
           <View style={{width:UNIQUEWIDTH.wid}}>
           <Pressable onPress={()=>navigation.navigate("DetailsHistoryMonthly",{item : procurementHistory[0][dates].data, month:dates })}>
           <HistoryCards  barClr={"Done"} h1={`${procurementHistory[0][dates].stats.totalMonthQuantity} Kgs`} h2={`${procurementHistory[0][dates].stats.averageMonthlyQualityName} Procurement Quality`}/>
           </Pressable> 
          </View>
          </View>
        )
        })}
        </>
}
      </ScrollView>
      <View>
      </View>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
calendarConatiner:{
width:ASPECTRADIO.width,
backgroundColor:COLORS.Secondary,
height:heightPixel(310),
flexDirection:'row', 
flexWrap:"wrap",
 gap:15,
 justifyContent:'center',
alignContent:'center'
},
})