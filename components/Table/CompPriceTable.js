import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";

import { COLORS } from "../../Constants";
import {
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";

const CompPriceTable = () => {
  const columnHeader = [
    "Name",
    "27/24",
    "26/24",
    "25/24",
    "24/24",
    "23/24",
    "22/24",
  ];
  const competitors = [
    "Your Price",
    "Competitor1",
    "Competitor2",
    "Competitor3",
    "Competitor4",
    "Competitor5",
    "Average",
  ];
  return (
    <ScrollView horizontal={true}>
      <View style={styles.table}>
        {/* Row and column headers */}
        <View style={[styles.row, styles.headerRow]}>
          {/* Empty cell for corner */}
          {columnHeader.map((data, index) => {
            return (
              <Text
                key={index}
                style={[
                  styles.cell,
                  styles.headerCell,
                  GlobalStyle.cardDateText,
                ]}
              >
                {data}
              </Text>
            );
          })}
        </View>

        {/* Rows */}
        {competitors.map((data, rowIndex) => (
          <View
            key={rowIndex}
            style={
              rowIndex === 0
                ? [
                    styles.row,
                    {
                      backgroundColor: COLORS.primary,
                    },
                  ]
                : [styles.row, { backgroundColor: COLORS.Secondary }]
            }
          >
            {/* Row header */}
            <Text
              style={
                rowIndex === 0
                  ? [
                      styles.cell,
                      styles.headerCell,
                      GlobalStyle.cardDateText,
                      { color: COLORS.white },
                    ]
                  : [styles.cell, styles.headerCell, GlobalStyle.cardDateText]
              }
            >
              {data}
            </Text>
            {[...Array(6)].map((_, colIndex) => (
              <View
                key={colIndex}
                style={
                  rowIndex === 0
                    ? [styles.cell, { backgroundColor: COLORS.primary }]
                    : [styles.cell, { backgroundColor: COLORS.white }]
                }
              >
                <Text
                  style={
                    rowIndex === 0
                      ? [GlobalStyle.btnFillText]
                      : [GlobalStyle.tabelText]
                  }
                >
                  Row {rowIndex + 1}, Col {colIndex + 1}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CompPriceTable;

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    // marginBottom: 10,
    marginVertical: pixelSizeVertical(25),
  },
  row: {
    flexDirection: "row",
    // width: widthPixel(100),
  },
  headerRow: {
    // backgroundColor: "#ccc",
    backgroundColor: COLORS.Secondary,
    height: heightPixel(45),
  },
  cell: {
    borderWidth: 0.5,
    borderColor: COLORS.BorderColor,
    padding: 10,
    flex: 1,
    width: widthPixel(109),
    height: heightPixel(48),
  },
  headerCell: {
    borderWidth: 0.5,
    // borderColor: "#000",
    borderColor: COLORS.BorderColor,
    padding: 10,
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  labelText: {},
});
