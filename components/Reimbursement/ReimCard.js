import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES, UNIQUEWIDTH } from "../../Constants";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";

const ReimCard = ({ data }) => {
  return (
    <View style={styles.cradHead}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: pixelSizeHorizontal(15),
        }}
      >
        <View style={{ gap: 12 }}>
          <Text style={GlobalStyle.idText}>Bill ID: {data.billId}</Text>
          <Text style={GlobalStyle.districtText}>
            {data.agentDetail.fullName}
          </Text>
        </View>
        <View style={{ gap: 12, alignItems: "flex-end" }}>
          <Text style={GlobalStyle.districtText}>₹ {data.totalAmount}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor:
                  data.status == "Pending"
                    ? COLORS.PendingYellow
                    : data.status == "Approved"
                    ? COLORS.primary
                    : data.status == "Paid"
                    ? COLORS.DoneGreen
                    : COLORS.DeclineRed,
              }}
            ></View>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    data.status == "Pending"
                      ? COLORS.PendingYellow
                      : data.status == "Approved"
                      ? COLORS.primary
                      : data.status == "Paid"
                      ? COLORS.DoneGreen
                      : COLORS.DeclineRed,
                },
              ]}
            >
              {data.status}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: UNIQUEWIDTH.wid,
          backgroundColor: COLORS.BorderColor,
          height: 1,
          marginVertical: pixelSizeVertical(12),
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: heightPixel(10),
          paddingHorizontal: pixelSizeHorizontal(15),
        }}
      >
        <Text style={GlobalStyle.idText}>{data.procureType}</Text>
        <View style={styles.dot}></View>
        <Text style={GlobalStyle.idText}>{data.totalQuantity} Kg</Text>
        <View style={styles.dot}></View>
        <Text style={GlobalStyle.idText}>{data.formattedDate}</Text>
      </View>
    </View>
  );
};

export default ReimCard;

const styles = StyleSheet.create({
  cradHead: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(140),
    backgroundColor: COLORS.Secondary,
    borderRadius: 6,
    paddingVertical: pixelSizeVertical(12),
  },
  dot: {
    width: widthPixel(4),
    height: heightPixel(4),
    borderRadius: 4,
    backgroundColor: COLORS.dot,
  },
  statusText: {
    fontFamily: FONT.EuclidRegular,
    fontSize: SIZES.small,
  },
});
