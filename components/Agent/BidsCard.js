import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { COLORS, FONT, ICONS } from "../../Constants";
import { useNavigation } from "@react-navigation/native";

const BidsCard = ({ data }) => {
  const navigation = useNavigation();
  // const normalNavigate = (data) => {
  //   navigation.navigate("DetailsHistory", { item: data });
  // };
  // const nestedNavigate = (data) => {
  //   navigation.navigate("Procurement", {
  //     screen: "DetailsHistory",
  //     item: data,
  //   });
  // };
  return (
    <View
      style={[
        GlobalStyle.cardContainer,
        { marginVertical: pixelSizeVertical(0) },
      ]}
    >
      <View style={styles.BidsContainerTop}>
        <View style={{ marginVertical: pixelSizeVertical(8) }}>
          <Text style={GlobalStyle.cardTexts}>{data.procurementId}</Text>
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
        <Text style={GlobalStyle.cardTexts}>{data.quality}</Text>
        <Text style={GlobalStyle.cardDot}></Text>
        <Text style={GlobalStyle.cardTexts}>
          {/* {data.date || data.dateOfProcurement} */}
          {data.date}
        </Text>
        <Text style={GlobalStyle.cardDot}></Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <View
            style={{
              width: widthPixel(7),
              height: heightPixel(7),
              borderRadius: 50,
              backgroundColor:
                data.status == "initiated" || data.status == "in-APMC"
                  ? COLORS.primary
                  : data.status == "open-bid" || data.status == "in-transit"
                  ? COLORS.openBids
                  : data.status == "pre-bid" || data.status == "in-warehouse"
                  ? COLORS.inWareHouse
                  : data.status == "bidding" || data.status == "QC"
                  ? COLORS.bidding
                  : data.status == "post-bid"
                  ? COLORS.DoneGreen
                  : data.status == "decline-bid"
                  ? COLORS.DeclineRed
                  : null,
            }}
          ></View>
          <Text
            style={[
              GlobalStyle.cardTexts,
              {
                fontFamily: FONT.EuclidRegular,
                color:
                  data.status == "initiated" || data.status == "in-APMC"
                    ? COLORS.primary
                    : data.status == "open-bid" || data.status == "in-transit"
                    ? COLORS.openBids
                    : data.status == "pre-bid" || data.status == "in-warehouse"
                    ? COLORS.inWareHouse
                    : data.status == "bidding" || data.status == "QC"
                    ? COLORS.bidding
                    : data.status == "post-bid"
                    ? COLORS.DoneGreen
                    : data.status == "decline-bid"
                    ? COLORS.DeclineRed
                    : null,
              },
            ]}
          >
            {data.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BidsCard;

const styles = StyleSheet.create({
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
});
