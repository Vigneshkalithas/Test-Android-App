import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { heightPixel, pixelSizeHorizontal } from "../../styles/Responsive";
import { COLORS, FONT } from "../../Constants";

const ListCard = ({ data }) => {
  return (
    <View style={styles.SmallListCard} key={data.id}>
      <View style={[GlobalStyle.flexJusSB, { paddingVertical: 10 }]}>
        <Text style={[GlobalStyle.cardHeadlineText, { fontSize: 14 }]}>
          {data.productName}
        </Text>
        <Text style={[GlobalStyle.cardHeadlineText, { fontSize: 14 }]}>
          {data.quality}
        </Text>
      </View>
      <View style={GlobalStyle.flexJusSB}>
        <Text
          style={[GlobalStyle.cardTexts, { fontFamily: FONT.EuclidRegular }]}
        >
          {data.quantity} Kgs
        </Text>
        <Text
          style={[GlobalStyle.cardTexts, { fontFamily: FONT.EuclidRegular }]}
        >
          {data.procurementId}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 50,
              backgroundColor:
                data.status == "Pending"
                  ? COLORS.preBid
                  : data.status == "Done"
                  ? COLORS.DoneGreen
                  : COLORS.DeclineRed,
            }}
          ></View>
          <Text
            style={[
              GlobalStyle.cardTexts,
              {
                fontFamily: FONT.EuclidRegular,
                color:
                  data.status == "Pending"
                    ? COLORS.preBid
                    : data.status == "Done"
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
  );
};

export default ListCard;

const styles = StyleSheet.create({
  SmallListCard: {
    width: "100%",
    height: heightPixel(90),
    // paddingHorizontal: pixelSizeHorizontal(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BorderColor,
    justifyContent: "center",
  },
});
