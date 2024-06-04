import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS, ICONS, UNIQUEWIDTH, SIZES } from "../../Constants";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { MyContext } from "../../context/MyContext";
import { useNavigation } from "@react-navigation/native";

const CartCards = ({ products, totalQuantity, allDatas, Bags }) => {
  const [extentCart, setExtendCart] = useState(false);
  const [extendQualityCard, setExtendQualityCard] = useState(false);
  const [product, setProduct] = useState("");
  const navigation = useNavigation();

  const toggleCard = (index, item) => {
    setExtendCart(extentCart === index ? null : index);
    setProduct(item);
  };
  const toggleQulityCard = (idx) => {
    setExtendQualityCard(extendQualityCard === idx ? null : idx);
  };
  const NavigateEditProcurement = (item) => {
    console.log(item);
    navigation.navigate("EditParticularProcurement", {
      item,
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {products.map((item, index) => {
        return (
          <View
            key={index}
            style={
              extentCart === index
                ? [styles.cartCardContainer, styles.cartCardContainerExtendView]
                : [styles.cartCardContainer, styles.cartCardContainerNormal]
            }
          >
            <Pressable
              style={GlobalStyle.flexJusSB}
              onPress={() => toggleCard(index, item)}
            >
              <Text
                style={
                  extentCart === index
                    ? [GlobalStyle.cancelBtn]
                    : [GlobalStyle.cancelBtn, { color: COLORS.PrimaryText }]
                }
              >
                {item}
              </Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                {extentCart === index ? null : (
                  <Text
                    style={[
                      GlobalStyle.cancelBtn,
                      { color: COLORS.PrimaryText },
                    ]}
                  >
                   { Bags ? `(${totalQuantity[item]} Bags)`: `(${totalQuantity[item]} Kgs)`}
                  </Text>
                )}
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {extentCart === index ? (
                    <ICONS.UpActiveArrow />
                  ) : (
                    <ICONS.DownArrow />
                  )}
                </View>
              </View>
            </Pressable>
            {extentCart === index ? (
              <>
                {Object.keys(allDatas[item]).map((item, idx) => {
                  return (
                    <View
                      key={idx}
                      style={
                        extendQualityCard === idx
                          ? styles.qualityContainerExtend
                          : styles.qualityContainer
                      }
                    >
                      {extendQualityCard === idx ? null : (
                        <Pressable
                          onPress={() => toggleQulityCard(idx)}
                          style={GlobalStyle.flexJusSB}
                        >
                          <Text
                            style={[
                              GlobalStyle.cardTexts,
                              { fontSize: SIZES.size14 },
                            ]}
                          >
                            {item}
                          </Text>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {extendQualityCard === idx ? (
                              <ICONS.UpActiveArrow />
                            ) : (
                              <ICONS.DownArrow />
                            )}
                          </View>
                        </Pressable>
                      )}
                      <View style={{ alignItems: "center" }}>
                        {extendQualityCard === idx ? (
                          <View style={styles.innerMostContainer}>
                            <View style={GlobalStyle.flexJusSB}>
                              <Text style={GlobalStyle.inputText}>{item}</Text>
                              <Pressable onPress={() => toggleQulityCard(idx)}>
                                <ICONS.UpActiveArrow />
                              </Pressable>
                            </View>
                            {allDatas[product][item].map((item, index) => {
                              return (
                                <View
                                  key={index}
                                  style={styles.innerContainerListHead}
                                >
                                  <Text
                                    style={[
                                      GlobalStyle.inputText,
                                      { color: COLORS.PrimaryText },
                                    ]}
                                  >
                                    {`Lot ${item.lotNo}`}
                                  </Text>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      gap: 5,
                                      width: widthPixel(95),
                                    }}
                                  >
                                    <ICONS.EmptyCart />
                                    <Text
                                      style={[
                                        GlobalStyle.inputText,
                                        { color: COLORS.PrimaryText },
                                      ]}
                                    >
                                      {Bags
                                        ? `${item.bag} Bags`
                                        : `${item.quantity} Kg`}
                                    </Text>
                                  </View>
                                  <Pressable
                                    onPress={() =>
                                      NavigateEditProcurement(item)
                                    }
                                  >
                                    <ICONS.ProcurementEditBtn />
                                  </Pressable>
                                </View>
                              );
                            })}
                          </View>
                        ) : null}
                      </View>
                    </View>
                  );
                })}
              </>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CartCards;

const styles = StyleSheet.create({
  cartCardContainer: {
    width: UNIQUEWIDTH.wid,
    borderRadius: 8,
    backgroundColor: COLORS.Secondary,
    padding: 10,
    paddingVertical: pixelSizeVertical(20),
    marginVertical: pixelSizeVertical(5),
  },
  cartCardContainerNormal: {
    // height:heightPixel(52),
  },
  cartCardContainerExtendView: {
    // height:heightPixel(415),
  },
  qualityContainer: {
    width: "100%",
    // height:heightPixel(52),
    // backgroundColor:"red",
    paddingVertical: pixelSizeVertical(20),
    borderBottomWidth: 1,
    borderColor: COLORS.BorderColor,
  },
  qualityContainerExtend: {
    width: "100%",
    // height:heightPixel(220),
    // backgroundColor:"green",
    paddingVertical: pixelSizeVertical(15),
    borderBottomWidth: 1,
    borderColor: COLORS.BorderColor,
    // alignItems:'center',
  },
  innerMostContainer: {
    width: widthPixel(333),
    // height:heightPixel(191),
    backgroundColor: COLORS.Added,
    padding: 10,
    paddingVertical: pixelSizeVertical(15),
    borderRadius: 8,
  },

  innerContainerListHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: pixelSizeVertical(10),
    paddingHorizontal: pixelSizeHorizontal(15),
    borderBottomWidth: 1,
    borderColor: COLORS.BorderColor,
  },
});
