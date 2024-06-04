import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ASPECTRADIO,
  COLORS,
  FONT,
  ICONS,
  SIZES,
  UNIQUEWIDTH,
} from "../../Constants";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import ListCard from "../DetaillViews/ListCard";
import { BidsDatas } from "../../DataCenter/BidsData";
import ChartComponent from "./ChartComponent";
import LocationComponent from "./LocationComponent";
import ListComponent from "./ListComponent";
import CalendarComponent from "./CalendarComponent";
import Filterx from "../Filter/Filterx";
import { useRecoilState } from "recoil";
import { BidsDataWeekly } from "../../atoms/Home";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState("chart");
  const [bidsWeekData, setBidsWeekData] = useRecoilState(BidsDataWeekly);
  const [currentDate, setCurrentDate] = useState("");
  const PreviousDatas = [
    {
      id: 1,
      size: "10,000kgs",
      date: "31-10-2023",
      percentage: "7.2%",
    },
    {
      id: 2,
      size: "13,000kgs",
      date: "31-10-2023",
      percentage: "7.2%",
    },
    {
      id: 3,
      size: "15,000kgs",
      date: "31-10-2023",
      percentage: "7.2%",
    },
    {
      id: 4,
      size: "8,000kgs",
      date: "31-10-2023",
      percentage: "7.2%",
    },
    {
      id: 5,
      size: "9,000kgs",
      date: "31-10-2023",
      percentage: "7.2%",
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDat = `${day}-${month}-${year}`;
    setCurrentDate(currentDat);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "chart":
        return <ChartComponent />;
      case "location":
        return <LocationComponent />;
      case "list":
        return <ListComponent />;
      case "calendar":
        return <CalendarComponent />;
        ß;
      default:
        return null;
    }
  };

  return (
    <View>
      <Filterx text={"Overview"} txtClr={COLORS.PrimaryText} shareBtn={true} />
      <View>
        {renderContent()}
        <View style={styles.statisticTabMenuHead}>
          <Pressable onPress={() => handleTabClick("chart")}>
            {activeTab === "chart" ? (
              <ICONS.HomeChartActive />
            ) : (
              <ICONS.HomeChart />
            )}
          </Pressable>
          <Pressable onPress={() => handleTabClick("location")}>
            {activeTab === "location" ? (
              <ICONS.LocationActive />
            ) : (
              <ICONS.Location />
            )}
          </Pressable>
          <Pressable onPress={() => handleTabClick("list")}>
            {activeTab === "list" ? (
              <ICONS.ListViewActive />
            ) : (
              <ICONS.ListView />
            )}
          </Pressable>
          <Pressable onPress={() => handleTabClick("calendar")}>
            {activeTab === "calendar" ? (
              <ICONS.CalendarViewActive />
            ) : (
              <ICONS.CalendarView />
            )}
          </Pressable>
        </View>
        {bidsWeekData.length == 0 ? (
          <View style={styles.PreviousDataCard}>
            <Text style={styles.previousCardTextHeadLine}>----</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.previousCardText}>{currentDate}</Text>
              <Text style={styles.previousCardText}>----</Text>
            </View>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            horizontal={true}
          >
            {Object.keys(bidsWeekData[0]).map((data, index) => {
              return (
                <View style={styles.PreviousDataCard} key={index}>
                  <Text style={styles.previousCardTextHeadLine}>
                    {bidsWeekData[0][data].quantity} Kgs
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.previousCardText}>{data}</Text>
                    <Text style={styles.previousCardText}>
                      {bidsWeekData[0][data].averageQualityName}
                    </Text>
                  </View>
                </View>
              );
            })}
            {/* {PreviousDatas.map((data) => {
            return (
              <View style={styles.PreviousDataCard} key={data.id}>
                <Text style={styles.previousCardTextHeadLine}>{data.size}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.previousCardText}>{data.date}</Text>
                  <Text style={styles.previousCardText}>{data.percentage}</Text>
                </View>
              </View>
            );
          })} */}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Statistics;
const styles = StyleSheet.create({
  statisticContainer: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(330),
    backgroundColor: COLORS.Secondary,
    borderRadius: 6,
    marginVertical: pixelSizeVertical(10),
  },
  statisticTabMenuHead: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(50),
    borderRadius: 6,
    marginVertical: pixelSizeVertical(5),
    flexDirection: "row",
    justifyContent: "space-around",
    gap: widthPixel(48),
    alignItems: "center",
  },
  PreviousDataCard: {
    width: widthPixel(140),
    height: heightPixel(70),
    marginVertical: pixelSizeVertical(10),
    backgroundColor: "orange",
    backgroundColor: COLORS.Secondary,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    padding: 9,
    gap: 10,
  },
  previousCardTextHeadLine: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.primary,
  },
  previousCardText: {
    fontFamily: FONT.EuclidRegular,
    fontSize: SIZES.small,
    color: COLORS.SecondaryText,
  },

  contentContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
