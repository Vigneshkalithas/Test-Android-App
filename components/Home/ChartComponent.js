import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { COLORS, UNIQUEWIDTH } from "../../Constants";
import { heightPixel, pixelSizeVertical } from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";

const ChartComponent = () => {
  const chartConfig = {
    backgroundColor: "#F5F9FF",
    backgroundGradientFrom: "#F5F9FF",
    backgroundGradientTo: "#F5F9FF",
    color: (opacity = 1) => `rgba(132,147,178, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    stroke: "#ffa726",
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        data: [10, 20, 28, 27, 26, 39, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 1, // optional
        withShadow: false,
      },
    ],
    legend: ["Procurement Details"], // optional
  };
  return (
    // <View style={GlobalStyle.statisticContainer}>
    //   <LineChart
    //     data={data}
    //     width={UNIQUEWIDTH.wid}
    //     height={heightPixel(300)}
    //     chartConfig={chartConfig}
    //   />
    // </View>
    <View
      style={[
        GlobalStyle.statisticContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text style={GlobalStyle.cardTexts}>No reports found</Text>
    </View>
  );
};

export default ChartComponent;

const styles = StyleSheet.create({});
