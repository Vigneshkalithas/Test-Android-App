import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState, useRef, useContext } from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import {
  ASPECTRADIO,
  COLORS,
  FONT,
  ICONS,
  SIZES,
  UNIQUEWIDTH,
} from "../../Constants";
import { useNavigation } from "@react-navigation/native";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive.js";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedDistrictAtom,
  selectedDistrictErrorAtom,
  selectedDistrictWithBagsAtom,
} from "../../atoms/selectedDistrict.js";
import { lotCountAtom } from "../../atoms/lotsCount";
import { NewProcurementApi, GetLotNo } from "../../apiHelper/Procurement";
import { MyContext } from "../../context/MyContext.js";
import { showToaster } from "../Toast/Toaster";

const validationSchema = Yup.object().shape({
  Product: Yup.string().required("Please enter the product"),
  Quality: Yup.string().required("Please enter the quality"),
  Quantity: Yup.string().required("Please select product quantity"),
});

const validationSchemaWithBags = Yup.object().shape({
  Product: Yup.string().required("Please enter the product"),
  Quality: Yup.string().required("Please enter the quality"),
  BagsCount: Yup.string().required("Please enter bags count"),
});

export const NewProcurementForm = ({ formRef }) => {
  const inputQualityRef = useRef();
  const inputQuantityRef = useRef();
  const [selectedDistrict, setSelectedDistrict] =
    useRecoilState(selectedDistrictAtom);
  // const [isLoading, setIsLoading] = useState(false);
  const { userInfo, setApiLoading } = useContext(MyContext);
  const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);
  const handleSubmit = async (values) => {
    const Results = {
      lotNo: lotCount,
      productName: values.Product,
      quality: values.Quality,
      quantity: values.Quantity,
      district: selectedDistrict,
      bag: 0,
    };
  setApiLoading(true)
    const Resp = await NewProcurementApi(userInfo.id, Results);
    const Lotno = await GetLotNo(userInfo.id);
    if (Resp == "success") {
      formRef.current.resetForm();
      setLotCountAtom(Lotno);
      setApiLoading(false);
      showToaster("Procurement Added");
    }
  };
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        Product: "",
        Quality: "",
        Quantity: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        values,
        errors,
        isValid,
        resetForm,
      }) => (
        <>
          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(30),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            Product*
          </Text>

          <TextInput
            onChangeText={handleChange("Product")}
            onBlur={handleBlur("Product")}
            value={values.Product}
            returnKeyType="next"
            onSubmitEditing={() => inputQualityRef.current.focus()}
            style={
              errors.Product && touched.Product
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Product Name"
            placeholderTextColor="#D3DCE5"
          ></TextInput>

          {errors.Product && touched.Product ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Product}
            </Text>
          ) : null}

          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(30),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            Quality*
          </Text>
          <TextInput
            ref={inputQualityRef}
            onChangeText={handleChange("Quality")}
            onBlur={handleBlur("Quality")}
            value={values.Quality}
            returnKeyType="next"
            onSubmitEditing={() => inputQuantityRef.current.focus()}
            style={
              errors.Quality && touched.Quality
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Quality"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.Quality && touched.Quality ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Quality}
            </Text>
          ) : null}

          <>
            <Text
              style={[
                GlobalStyle.Label,
                {
                  marginTop: pixelSizeVertical(30),
                  marginBottom: pixelSizeVertical(15),
                },
              ]}
            >
              Quantity*
            </Text>
            <View
              style={
                errors.Quantity && touched.Quantity
                  ? [styles.inputWithText, GlobalStyle.ErrorInputBorder]
                  : [styles.inputWithText]
              }
            >
              <TextInput
                keyboardType="number-pad"
                ref={inputQuantityRef}
                onChangeText={handleChange("Quantity")}
                onBlur={handleBlur("Quantity")}
                value={values.Quantity}
                returnKeyType="done"
                style={styles.inputWithoutBorder}
                placeholder="Enter Quantity"
                placeholderTextColor="#D3DCE5"
              ></TextInput>
              <Text style={GlobalStyle.inputText}>Kgs</Text>
            </View>

            {errors.Quantity && touched.Quantity ? (
              <Text
                style={[
                  GlobalStyle.ErrorText,
                  { position: "relative", top: 10 },
                ]}
              >
                {errors.Quantity}
              </Text>
            ) : null}
          </>
        </>
      )}
    </Formik>
  );
};

export const NewProcurementWithBags = ({
  formRef,
  setBottomSheetContent,
  modalizeRef,
  bagsWeight,
}) => {
  const inputQualityRef = useRef();
  const inputQuantityRef = useRef();
  const inputBagsRef = useRef();
  const { userInfo, apiLoading, setApiLoading } = useContext(MyContext);
  const [selectedDistrict] = useRecoilState(selectedDistrictAtom);
  const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);

  const BottosheetOpen = () => {
    setBottomSheetContent("quantity");
    Keyboard.dismiss(); // Dismiss the keyboard
    setTimeout(async () => {
      try {
        await modalizeRef.current?.open();
      } catch (error) {
        console.error("Error opening bottom sheet:", error);
      }
    }, 50);
  };

  const handleSubmit = async (values) => {
    const Results = {
      lotNo: lotCount,
      productName: values.Product,
      quality: values.Quality,
      quantity: bagsWeight,
      bag: values.BagsCount,
      district: selectedDistrict, 
    };
    setApiLoading(true);
    const Resp = await NewProcurementApi(userInfo.id, Results);
    const Lotno = await GetLotNo(userInfo.id);
    if (Resp == "success") {
      formRef.current.resetForm();
      setLotCountAtom(Lotno);
      setApiLoading(false);
    }
  };
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        Product: "",
        Quality: "",
        BagsCount: "",
        // kgs:""
      }}
      validationSchema={validationSchemaWithBags}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        values,
        errors,
        resetForm,
      }) => (
        <>
          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(30),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            Product*
          </Text>
          <TextInput
            onChangeText={handleChange("Product")}
            onBlur={handleBlur("Product")}
            value={values.Product}
            returnKeyType="next"
            onSubmitEditing={() => inputQualityRef.current.focus()}
            style={
              errors.Product && touched.Product
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Product Name"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.Product && touched.Product ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Product}
            </Text>
          ) : null}

          <Text
            style={[
              GlobalStyle.Label,
              {
                marginTop: pixelSizeVertical(30),
                marginBottom: pixelSizeVertical(15),
              },
            ]}
          >
            Quality*
          </Text>
          <TextInput
            ref={inputQualityRef}
            onChangeText={handleChange("Quality")}
            onBlur={handleBlur("Quality")}
            value={values.Quality}
            returnKeyType="next"
            onSubmitEditing={() => inputBagsRef.current.focus()}
            style={
              errors.Quality && touched.Quality
                ? [GlobalStyle.inputBox, GlobalStyle.ErrorInputBorder]
                : [GlobalStyle.inputBox]
            }
            placeholder="Enter Quality"
            placeholderTextColor="#D3DCE5"
          ></TextInput>
          {errors.Quality && touched.Quality ? (
            <Text
              style={[GlobalStyle.ErrorText, { position: "relative", top: 10 }]}
            >
              {errors.Quality}
            </Text>
          ) : null}

          <View style={{ flexDirection: "column" }}>
            <Text
              style={[
                GlobalStyle.Label,
                {
                  marginTop: pixelSizeVertical(30),
                  marginBottom: pixelSizeVertical(15),
                },
              ]}
            >
              Quantity*
            </Text>
            <View style={[GlobalStyle.flexJusSB, { width: widthPixel(375) }]}>
              <View>
                <TextInput
                  keyboardType="number-pad"
                  ref={inputBagsRef}
                  onChangeText={handleChange("BagsCount")}
                  onBlur={handleBlur("BagsCount")}
                  value={values.BagsCount}
                  returnKeyType="done"
                  style={
                    errors.BagsCount && touched.BagsCount
                      ? [styles.inputBoxKgs, GlobalStyle.ErrorInputBorder]
                      : [styles.inputBoxKgs]
                  }
                  placeholder="Bags Count"
                  placeholderTextColor="#D3DCE5"
                ></TextInput>
                {errors.BagsCount && touched.BagsCount ? (
                  <Text
                    style={[
                      GlobalStyle.ErrorText,
                      { position: "relative", top: 10 },
                    ]}
                  >
                    {errors.BagsCount}
                  </Text>
                ) : null}
              </View>
              <View>
                <View>
                  <Pressable
                    onPress={BottosheetOpen}
                    style={
                      //   bagsWeightError
                      //     ? [
                      //         styles.inputBoxKgs,
                      //         GlobalStyle.ErrorInputBorder,
                      //         { justifyContent: "center" },
                      //       ]
                      //     :
                      [styles.inputBoxKgs, { justifyContent: "center" }]
                    }
                  >
                    <Text
                      style={
                        bagsWeight == ""
                          ? [styles.districtLabel]
                          : [
                              styles.districtLabel,
                              { color: COLORS.PrimaryText },
                            ]
                      }
                    >
                      {bagsWeight == "" ? "75" : bagsWeight} Kgs
                    </Text>
                  </Pressable>
                  {/* {bagsWeightError ? (
                    <Text
                      style={[
                        GlobalStyle.ErrorText,
                        { position: "relative", top: 10 },
                      ]}
                    >
                      Please choose one
                    </Text>
                  ) : null} */}
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  districtLabel: {
    color: COLORS.PlaceHolderText,
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
  },
  districtLabelHead: {
    width: widthPixel(148),
    height: heightPixel(40),
    borderColor: COLORS.PlaceHolderText,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  inputBoxKgs: {
    width: widthPixel(168),
    height: heightPixel(48),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D5E8FF",
    paddingHorizontal: 15,
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
  inputWithText: {
    width: widthPixel(375),
    height: heightPixel(48),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D5E8FF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixelSizeHorizontal(15),
  },
  inputWithoutBorder: {
    width: widthPixel(320),
    height: heightPixel(48),
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
});
