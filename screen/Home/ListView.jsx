import { StyleSheet, Text, View } from "react-native";
import React , {useState , useEffect} from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { SearchBar,ListCard } from "../../components";
import { COLORS, FONT, ICONS, SIZES } from "../../Constants";
import { pixelSizeVertical } from "../../styles/Responsive";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilState } from 'recoil';
import { BidsDataList } from '../../atoms/Home';


 const OverViewListDatas = [
    {
      id: 1,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "05-10-2023",
      productName: "Black Seseme",
      status: "Pending",
      month:'Oct'
      
    },
    {
      id: 2,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "05-10-2023",
      productName: "Black Seseme",
      status: "Done",
      month:'Oct'
    },
    {
      id: 3,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "05-10-2023",
      productName: "Black Seseme",
      status: "Decline",
      month:'Oct'
    },
    {
      id: 4,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "04-10-2023",
      productName: "Black Seseme",
      status: "Done",
      month:'Oct'
    },
    {
      id: 5,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "03-10-2023",
      productName: "Black Seseme",
      status: "Done",
      month:'Oct'
    },
    {
      id: 6,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "03-10-2023",
      productName: "Black Seseme",
      status: "Done",
      month:'Oct'
    },
    {
      id: 7,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "03-10-2023",
      productName: "Black Seseme",
      status: "Done",
      month:'Oct'
    },
    {
      id: 8,
      procureMentId: "#ID7878680",
      quantity: "15854kg",
      quality: "Q-A1",
      date: "03-10-2023",
      productName: "Black Seseme",
      status: "Done",
      month:'Oct'
    },
  ];

const ListView = () => {
const [groupedData, setGroupedData] = useState({});
let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec'];
const [bidsList,setBidsList] = useRecoilState(BidsDataList)

useEffect(() => {
    // Sort data by date
    OverViewListDatas.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateB - dateA;
    });

    // Group data by date
    const groupedData = OverViewListDatas.reduce((acc, item) => {
      const date = item.date;
      acc[date] = acc[date] || [];
      acc[date].push(item);
      return acc;
    }, {});

    setGroupedData(groupedData);
  }, []);

  return (
    <View style={GlobalStyle.globalHead}>
      <SearchBar content={"RecentActivity"}/>
     
      <ScrollView contentContainerStyle={{flexDirection:'column',gap:10 , marginVertical: pixelSizeVertical(15),paddingBottom:pixelSizeVertical(57) }} showsVerticalScrollIndicator={false}>
       <View style={[GlobalStyle.spaceBetweenContainer,]}>
        <Text style={GlobalStyle.overAllHeadLine}>Procurements</Text>
        <ICONS.Filter />
      </View>

      {/* {Object.keys(groupedData).map(date => (
        <View key={date} style={{marginTop:pixelSizeVertical(15)}}>
          <Text style={GlobalStyle.dateText}>{"0"}{date[1]} {"Oct"}</Text>
          {groupedData[date].map(item => (
          <View key={item.id}> 
          <ListCard data={item} />
          </View>
))}
        </View>
      ))} */}
      {Object.keys(bidsList[0]).map((data,index)=>{
return(
  <View key={index} style={{marginTop:pixelSizeVertical(15)}}>
  <Text style={GlobalStyle.dateText}>{data}</Text>
  {bidsList[0][data].map((item, subIndex) => {
return(
  <View key={subIndex}>
    
      <ListCard data={item} />
      
  </View>
)})}
</View>
)
      })}
  
     
      </ScrollView>
      
      <View>
      
      </View>
    </View>
  )
}

export default ListView

const styles = StyleSheet.create({

})