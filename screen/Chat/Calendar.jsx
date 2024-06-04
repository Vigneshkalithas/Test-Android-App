import { Pressable, StyleSheet, Text, View  } from 'react-native'
import React , {useState, useEffect} from 'react'
import { ASPECTRADIO, COLORS, FONT, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants'
import { HistoryDatas } from '../../DataCenter';
import { PanGestureHandler, State , ScrollView } from 'react-native-gesture-handler';
import { format, startOfMonth, startOfWeek, addDays, isSameMonth , isToday , addMonths, subYears, addYears , isSameDay} from 'date-fns';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive';
import GlobalStyle from '../../styles/GlobalStyle';
import { Divider } from '../../components';
import { useNavigation } from '@react-navigation/native';


const Datas = [{
"05 Oct":[{id:"27822773" , venue:"Theni Farmers Meetup", organizer:"Vignesh kalithas"},{id:"27822773" , venue:"Madurai Farmers Meetup", organizer:"Kalithas Ramasamy"}],
"04 Oct":[{id:"2782277234" , venue:"Theni Farmers Meetup", organizer:"Vignesh kalithas"}],
"03 Oct":[{id:"2782277927" , venue:"Theni Farmers Meetup", organizer:"Vignesh kalithas"}],
"02 Oct":[{id:"2782277352" , venue:"Theni Farmers Meetup", organizer:"Vignesh kalithas"}]
,
}]

const Calendar = () => {
const [selectedDate, setSelectedDate] = useState(new Date());
 const [groupedData, setGroupedData] = useState({});
 const [monthData, setMonthData] = useState(false)

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

  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const startOfMonthDate = startOfMonth(new Date(selectedYear, selectedMonth));
  const startOfWeekDate = startOfWeek(startOfMonthDate);
  const daysInMonth = [];
  // const [monthSelected,setMonthSelected] = useState(true)

  for (let i = 0; i < 42; i++) {
    const date = addDays(startOfWeekDate, i);
    if (isSameMonth(date, startOfMonthDate)) {
      daysInMonth.push(date);
    } else {
      daysInMonth.push(null);
    }
  }



  const changeYear = (delta) => {
  const newYear = selectedYear2 + delta;
  const currentYear = new Date().getFullYear();
  if (newYear <= currentYear) {
    setSelectedYear2(newYear)
  }
  };

  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(startOfMonth(addMonths(new Date(selectedYear, 0), i)));
  }

  const isFutureMonth = (month) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
   
    if (selectedYear2 === currentYear) {
     return month > currentMonth;
    } else {
      return false;
    }
  };

  const isActiveMonth = (month) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return selectedYear2 === selectedYear && isSameMonth(month, new Date(selectedYear, selectedMonth));
  };

  const changeMonthByName = (monthIndex,year) => {
    console.log('ind',monthIndex)
    
 const dateObject = new Date(monthIndex); 
  const selectedMonth = dateObject.getMonth();
  setSelectedMonth(selectedMonth); 
  setSelectedYear(year)
  setMonthData(!monthData)

  };

const onPressDay = (date) => {
    setSelectedDay(date.getDate());
    setSelectedMonth(date.getMonth());
    setSelectedYear(date.getFullYear());
    console.log(`${selectedDay}-${selectedMonth}-${selectedYear}`)
  };

  const [openData, setOpenData] = useState(false)
    const [showData, setShowData] = useState(false)
    const onOpen = (id) => {
    setOpenData(openData === id ? null : id)
  }
  const navigation = useNavigation()

  return (
  <View style={{flex: 1, borderTopColor:COLORS.BorderColor, borderTopWidth:1, alignItems:'center',}}>
  {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:pixelSizeHorizontal(30)}}>
       <View style={[GlobalStyle.spaceBetweenContainer,{marginVertical:pixelSizeVertical(15)}]}>
       <Pressable 
       onPress={()=>setMonthData(!monthData)}
       style={{paddingHorizontal:pixelSizeHorizontal(15)}}
       >
        <Text style={GlobalStyle.overAllHeadLine}>{format(startOfMonthDate, 'MMMM yyyy')}</Text>
       </Pressable>
        
      </View>
     {monthData ? 
     <View style={styles.cont}>
     <View style={{flexDirection:'row', justifyContent:'space-between', width:ASPECTRADIO.wid, paddingHorizontal:pixelSizeHorizontal(35),  alignItems:'center'}}>
<Pressable onPress={()=>changeYear(-1)}><ICONS.prevYear/></Pressable>
<Pressable><Text style={GlobalStyle.overAllHeadLine}>{selectedYear2}</Text></Pressable>
<Pressable onPress={()=>changeYear(1)}><ICONS.nextYear/></Pressable>
</View>
     <View style={styles.monthsContainer}>
        {months.map((month, index) => (
          <Pressable
            key={index}
             onPress={()=>changeMonthByName(month,selectedYear2)}
            style={[styles.month, isFutureMonth(index) && styles.disabledMonth, isActiveMonth(month) && styles.activeMonth]}
            disabled={isFutureMonth(index)}>            
            <Text style={[ GlobalStyle.cardTexts,{fontSize:SIZES.size14}, isActiveMonth(month) && {color:COLORS.white}]}>{format(month, 'MMM')}</Text>
          </Pressable>
        ))}
      </View>
      </View>
     :  
    <View style={styles.container}>     
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayOfWeek}>
            {day[0]}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {daysInMonth.map((date, index) => {
          if (date) {
            const dateText = format(date, 'dd');
            // const isActive = isToday(date);
            // const isActive = isSameDay(date, currentDate); // Check if the date is today
            // const isSameMonthAndYear = isSameMonth(date, new Date(selectedYear, selectedMonth));
            const isActive = isSameDay(date, new Date(selectedYear, selectedMonth, selectedDay));
            const isSameMonthAndYear = isSameMonth(date, new Date(selectedYear, selectedMonth));
            return (
              <Pressable key={index} style={styles.dayContainer} 
              onPress={()=>onPressDay(date)}>
                <Text style={[styles.date, isActive && isSameMonthAndYear && styles.activeDate]}>{dateText}</Text>
              </Pressable>
            );
          } else {
            return <View key={index} style={styles.dayContainer}></View>;   // Empty space for days not in current month
          }
        })}
      </View>
    </View>
}



    
      </ScrollView> */}
     
     {
    Object.keys(Datas[0]).map((item,index)=>{
     return(
      <View style={{paddingVertical:pixelSizeVertical(0)}} key={item}>
                {openData === item ? null :
                  <Pressable style={styles.clickerHead} onPress={() => onOpen(item)}>
                    <Text style={[GlobalStyle.cardHeadlineText, {fontSize: SIZES.medium }]}>{item}</Text>
                    <View style={{ paddingRight: pixelSizeHorizontal(10) }}>
                      <ICONS.cardOpenIcon />
                    </View>
                  </Pressable>
                }
                {openData === item ?
                  <View>
                    <Pressable onPress={onOpen} style={[styles.clickerHead]}>
                      <Text style={GlobalStyle.cancelBtn}>{item}</Text>
                      <ICONS.UpActiveArrow />
                    </Pressable>
                    {Datas[0][item].map((data, index) => {
                      return (
                        <View key={index} style={styles.insideCard}>
                          <View style={{gap:6}}>
                          <Text style={GlobalStyle.districtText}>{data.venue}</Text>
                         <Text style={GlobalStyle.cardDateText}>Created By {data.organizer}</Text>
                          </View>
                         <ICONS.arrowSmall/>
                        </View>
                      )
                    })}
                  </View> : null}
                  <Divider/>
      </View>
     )
     })}

<Pressable style={styles.floatBtnHead} onPress={()=>navigation.navigate("CreateEvent")}>
    <ICONS.createNewEvent/>
</Pressable>   
  </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  calendarCardConatiner:{
    width:"100%", 
    height:heightPixel(75), 
    backgroundColor:COLORS.Secondary, 
    borderRadius:8,
    marginVertical:pixelSizeVertical(10),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:pixelSizeHorizontal(10),
    borderWidth:1,
    borderColor:COLORS.BorderColor
    },
    bar:{
    width:4,
    height:heightPixel(44),
    // backgroundColor:COLORS.primary,
    },
    kgText:{
    fontFamily:FONT.EuclidMedium,
    fontSize:SIZES.medium
    },
    
    container: {
       backgroundColor:COLORS.Secondary,
       height:heightPixel(320),
       alignItems: 'center',
       paddingVertical:pixelSizeVertical(20)
      },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom:pixelSizeVertical(15)
      },
    dayOfWeek: {
      textAlign: 'center',
      width: '14.28%', 
      color:COLORS.PrimaryText,
      fontFamily:FONT.EuclidSemiBold,
      fontSize:SIZES.small,
      },
    
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    dayContainer: {
        width: '14.28%', 
         marginVertical:pixelSizeVertical(5),
         alignItems: 'center',
         height:heightPixel(35),
       
    },
    date: {
      textAlign: 'center',
      color:COLORS.SecondaryText,
      fontFamily:FONT.EuclidMedium,
      fontSize:SIZES.small,
      width:widthPixel(40),
      height:heightPixel(40),
      alignItems:'center',
      paddingVertical:pixelSizeVertical(10),
      paddingHorizontal:pixelSizeHorizontal(10),
    
    },
    activeDate: {
      width:widthPixel(40),
      height:heightPixel(40),
      borderRadius:40,
     paddingVertical:pixelSizeVertical(10),
     paddingHorizontal:pixelSizeHorizontal(10),
      alignItems:'center',
      backgroundColor:"#E0EAFF",
      color: COLORS.primary,
      textAlign:'center',
    
      },
      cont:{
      height:heightPixel(320),
      backgroundColor:COLORS.Secondary,
      justifyContent:'center',
      flexDirection:'column',
      gap:15,
      },
        monthsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap:13
      },
      month: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        width:widthPixel(93),
    height:heightPixel(40),
    backgroundColor:'#E0EAFF',
    borderRadius:4,
      },
      disabledMonth: {
        opacity: 0.5,
      },
      activeMonth:{
       justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        width:widthPixel(93),
    height:heightPixel(40),
    backgroundColor:COLORS.primary,
    borderRadius:4,
      },
      clickerHead:{
        ...GlobalStyle.flexJusSB,
        paddingHorizontal:pixelSizeHorizontal(15),
        paddingVertical:pixelSizeVertical(20)
      },
      insideCard:{
       height:heightPixel(72),
       backgroundColor:COLORS.Secondary,
       borderWidth:1, 
       borderColor:COLORS.BorderColor,
       borderRadius:8,
       marginBottom:heightPixel(15),
       marginHorizontal:pixelSizeHorizontal(15),
       paddingHorizontal:pixelSizeHorizontal(15),
       flexDirection:"row",
       justifyContent:'space-between',
       alignItems:'center'
      },
      floatBtnHead:{
        position:'absolute',
        width:widthPixel(58),
        height:heightPixel(58),
        backgroundColor:COLORS.primary,
        borderRadius:14,
        justifyContent:'center',
        alignItems:'center',
        elevation:5,
        top:"90%",
        // right:widthPixel(20)
        right:widthPixel(25)
        }
})