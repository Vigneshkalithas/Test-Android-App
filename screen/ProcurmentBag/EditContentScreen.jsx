import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect ,useState} from 'react'
import GlobalStyle from '../../styles/GlobalStyle';
import { TopMenu } from '../../components';
import { COLORS, ICONS, SIZES, UNIQUEWIDTH } from '../../Constants';
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../styles/Responsive';
import { CartCards } from "../../components"
import { useNavigation } from '@react-navigation/native';
import { Api } from '../../api/api';
import { MyContext } from '../../context/MyContext';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const EditContentScreen = ({ route}) => {
const { item ,itemDistrict,itemCount } = route.params;
const { userInfo } = useContext(MyContext)
const [products, setProducts] = useState(null) 


useEffect(()=>{
   setProducts(Object.keys(item))
},[])


  return (
    <View style={[GlobalStyle.globalHead]}>
    <View style={{width:UNIQUEWIDTH.wid}}>
    <TopMenu btnAction={"without"}/>
    <View style={[GlobalStyle.flexJusSB,{paddingVertical:pixelSizeVertical(5)}]}>
    <Text style={GlobalStyle.overAllHeadLinePrimary}>{itemDistrict}</Text>
    <Text style={GlobalStyle.txtLot}>All Lots({itemCount})</Text>
    </View>
    <View style={{paddingVertical:pixelSizeVertical(10)}}>
    <CartCards2 products={Object.keys(item)}  data={item}/>
    </View>
    </View>
    
    </View>
  )
}



export default EditContentScreen


const CartCards2 = ({ products,data , }) => {
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
              item == "districtCount" ? null :
              extentCart === index 
                ?  
                 [styles.cartCardContainer, styles.cartCardContainerExtendView]
                : [styles.cartCardContainer, styles.cartCardContainerNormal]
            }
          >
            { item == "districtCount" ? null :
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
                   { data[item].data.isBag ? `(${data[item].data.totalProductQuantity} Bags)`: `(${data[item].data.totalProductQuantity} Kgs)`}
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
      }
            {extentCart === index ? (
              <>
   
                {Object.keys(data[item]).map((p,idx)=>{
                  return(
                    <View
                    key={idx}
                    style={
                      p == "data" ? null :
                      extendQualityCard === idx
                        ? styles.qualityContainerExtend
                        : styles.qualityContainer
                    }
                  >
                    {extendQualityCard === idx ? null : 
                        p == "data" ? null :
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
                          {p}
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
                    }
                  <View style={{ alignItems: "center" }}>
                        {extendQualityCard === idx ? (
                          <View style={styles.innerMostContainer}>
                            <View style={GlobalStyle.flexJusSB}>
                              <Text style={GlobalStyle.inputText}>{p}</Text>
                              <Pressable onPress={() => toggleQulityCard(idx)}>
                                <ICONS.UpActiveArrow />
                              </Pressable>
                            </View>
                            {data[item][p].map((item, index) => {
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
                                      {item.isBag
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
                    
                  )
                })}
              </>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

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
})