import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import {
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import {
  ASPECTRADIO,
  COLORS,
  FONT,
  ICONS,
  SIZES,
  UNIQUEWIDTH,
} from "../../Constants";
import RBSheet from "react-native-raw-bottom-sheet";
import GlobalStyle from "../../styles/GlobalStyle";
import ButtonUnfill from "../Btn/ButtonUnfill";
import Buttonx from "../Btn/Buttonx";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const ExportBottomSheet = () => {
  const { refShareSheet, setOpenSuccessModal } = useContext(MyContext);
  const [btnActive, setBtnActive] = useState("Excel");
  const backgroundAnimation = useRef(new Animated.Value(0)).current;

  const moveBackground = (toValue) => {
    Animated.timing(backgroundAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const InitialData = [
    {
      id: 1,
      name: "Graph",
      choosenStatus: false,
      disabled: false,
    },
    {
      id: 2,
      name: "Report",
      choosenStatus: false,
      disabled: false,
    },
  ];
  const [products, setProducts] = useState(InitialData);
  const selectedProducts = (id) => {
    const updatedData = products.map((item) =>
      item.id === id ? { ...item, choosenStatus: !item.choosenStatus } : item
    );
    setProducts(updatedData);
  };
  const updateStatus = () => {
    const updatedData = products.map((item) =>
      btnActive == "Excel" && item.id === 1
        ? { ...item, disabled: true }
        : { ...item, disabled: false }
    );
    setProducts(updatedData);
  };

  useEffect(() => {
    updateStatus();
  }, [btnActive]);

  return (
    <RBSheet
      ref={refShareSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.4}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: "center",
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: UNIQUEWIDTH.wid,
          padding: 8,
        }}
      >
        <View>
          <Text style={GlobalStyle.districtText}>
            Please ensure the export file type
          </Text>
        </View>

        <View style={[styles.exportBtnHead]}>
          <Pressable
            onPress={() => {
              setBtnActive("Excel");
            }}
            style={
              btnActive == "Excel"
                ? [
                    styles.exportBtn,
                    { backgroundColor: COLORS.primary, borderRadius: 6 },
                  ]
                : [styles.exportBtn]
            }
          >
            <ICONS.ExcelLogo />
            <Text
              style={
                btnActive == "Excel"
                  ? [styles.Btnfonts, { color: COLORS.white }]
                  : [styles.Btnfonts]
              }
            >
              Excel
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setBtnActive("Pdf");
            }}
            style={
              btnActive == "Pdf"
                ? [
                    styles.exportBtn,
                    { backgroundColor: COLORS.primary, borderRadius: 6 },
                  ]
                : [styles.exportBtn]
            }
          >
            <ICONS.PdfLogo />
            <Text
              style={
                btnActive == "Pdf"
                  ? [styles.Btnfonts, { color: COLORS.white }]
                  : [styles.Btnfonts]
              }
            >
              PDF
            </Text>
          </Pressable>
        </View>

        <View>
          {products.map((data, index) => {
            return (
              <Pressable
                // disabled={btnActive == "Excel" && data === "Graph"}
                key={index}
                onPress={() => selectedProducts(data.id)}
                style={styles.content}
              >
                <Text
                  style={
                    data.disabled
                      ? styles.disabledText
                      : GlobalStyle.districtText
                  }
                >
                  {data.name}
                </Text>
                {data.disabled ? (
                  <ICONS.DisableRadioBtn />
                ) : data.choosenStatus ? (
                  <ICONS.RadioCheckActive />
                ) : (
                  <ICONS.RadioCheckInActive />
                )}
              </Pressable>
            );
          })}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ButtonUnfill
            txt={"Cancel"}
            fn={() => () => refShareSheet.current.close()}
          />
          <Buttonx
            txt={"Export"}
            style={{
              height: heightPixel(48),
              width: widthPixel(171),
              backgroundColor: COLORS.primary,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
            fn={() => {
              setOpenSuccessModal(true);
              refShareSheet.current.close();
            }}
          />
        </View>
      </View>
    </RBSheet>
  );
};

export default ExportBottomSheet;

const styles = StyleSheet.create({
  exportBtnHead: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(50),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  exportBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    backgroundColor: COLORS.white,
    height: heightPixel(48),
    gap: 8,
  },
  Btnfonts: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
  content: {
    width: UNIQUEWIDTH.wid,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: pixelSizeVertical(10),
  },

  container: {
    width: UNIQUEWIDTH.wid,
    height: 48,
    flexDirection: "row",
    position: "relative",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    backgroundColor: "red",
    zIndex: -1,
  },
  disabledText: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.medium,
    color: COLORS.BorderColor,
  },
});
