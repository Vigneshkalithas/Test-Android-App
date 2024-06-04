// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
//   Keyboard,
// } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { Modalize } from "react-native-modalize";
// import {
//   heightPixel,
//   pixelSizeHorizontal,
//   pixelSizeVertical,
//   widthPixel,
// } from "../../styles/Responsive";
// import { COLORS, ICONS, SIZES, ASPECTRADIO } from "../../Constants";
// import GlobalStyle from "../../styles/GlobalStyle";
// import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
// import {
//   selectedDistrictAtom,
//   selectedDistrictErrorAtom,
//   selectedDistrictWithBagsAtom,
// } from "../../atoms/selectedDistrict";
// import axios from "axios";
// import { Api } from "../../api/api";
// import { StoreValueToAsyncStorage } from "../../storage/AsyncStorage";
// import { lotCountAtom } from "../../atoms/lotsCount";
// import { FetchDistrictData } from "../../apiHelper";
// import { MyContext } from "../../context/MyContext";
// import { ActivityIndicator } from "react-native-paper";

// const BottomSheetx = ({ modalizeRef, content, setBagsWeight }) => {
//   // const BottomSheetx = ({ modalizeRef, jsonData, content, setBagsWeight }) => {
//   const [datas, setDatas] = useState([]);
//   //  Fetching District
//   useEffect(() => {
//     FetchDistrictDatas();
//   }, []);

//   const FetchDistrictDatas = async () => {
//     const Res = await FetchDistrictData();
//     if (Res == null) {
//       setDatas([]);
//     }
//     setDatas(Res);
//   };
//   // Bottomsheet for District
//   const setSelectedDistrict = useSetRecoilState(selectedDistrictAtom);
//   const setselectedDistrictError = useSetRecoilState(selectedDistrictErrorAtom);
//   const [selectedDistrictWithBags, setSelectedDistrictWithBags] =
//     useRecoilState(selectedDistrictWithBagsAtom);
//   const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { isEditedQuantityBags, setIsEditedQuantityBags } =
//     useContext(MyContext);

//   const groupedData = {};
//   if (datas.length !== 0) {
//     datas.forEach((item) => {
//       const { district } = item;
//       const firstLetter = district[0].toUpperCase();
//       if (!groupedData[firstLetter]) {
//         groupedData[firstLetter] = [];
//       }
//       groupedData[firstLetter].push(item);
//     });
//   }

//   const filteredData = Object.keys(groupedData).reduce((result, key) => {
//     const filteredItems = groupedData[key].filter((item) =>
//       item.district.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     if (filteredItems.length > 0) {
//       result[key] = filteredItems;
//     }
//     return result;
//   }, {});

//   const toggleSelection = (item) => {
//     // FetchLotno(userInfo, item.district);
//     setselectedDistrictError(false);
//     setSelectedDistrict(item.district);
//     StoreValueToAsyncStorage("district", item.district);
//     console.log(item.isBag);
//     const newValue = item.isBag;
//     StoreValueToAsyncStorage("withBags", newValue.toString());
//     modalizeRef.current?.close();
//     if (item.isBag) {
//       setSelectedDistrictWithBags(true);
//     } else {
//       setSelectedDistrictWithBags(false);
//     }
//   };

//   // bottomsheet for quantity
//   const [isMyInputFocused, setIsMyInputFocused] = useState(false);
//   const [dataArray, setDataArray] = useState([70, 80, 100]);
//   const [inputText, setInputText] = useState("");

//   const addNewItem = () => {
//     Keyboard.dismiss();
//     if (inputText.trim() !== "") {
//       const newItem = parseInt(inputText);
//       if (!dataArray.includes(newItem)) {
//         setDataArray((prevArray) => [...prevArray, parseInt(inputText)]);
//         setInputText("");
//       } else {
//         console.log("Value already exists in the array");
//       }
//     }
//   };

//   const searchAndFilter = () => {
//     // Filter array based on the input text
//     const filteredArray = dataArray.filter((item) =>
//       item.toString().includes(inputText)
//     );
//     return filteredArray;
//   };
//   const selectedVlues = (item) => {
//     modalizeRef.current?.close();
//     setBagsWeight(item);
//   };

//   return (
//     <Modalize
//       ref={modalizeRef}
//       adjustToContentHeight={true}
//       snapPoint={ASPECTRADIO.height * 0.95}
//       withHandle={false}
//       HeaderComponent={
//         <View style={{ alignItems: "center", paddingTop: 16 }}>
//           <View
//             style={{
//               width: widthPixel(41),
//               height: heightPixel(4),
//               backgroundColor: COLORS.BorderColor,
//               borderRadius: 4,
//             }}
//           />
//         </View>
//       }
//     >
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: COLORS.white,
//         }}
//       >
//         <ActivityIndicator
//           size="large"
//           animating={true}
//           color={COLORS.primary}
//         />
//       </View>
//     </Modalize>
//   );

//   return (
//     <Modalize
//       ref={modalizeRef}
//       adjustToContentHeight={true}
//       snapPoint={ASPECTRADIO.height * 0.95}
//       withHandle={false}
//       HeaderComponent={
//         <View style={{ alignItems: "center", paddingTop: 16 }}>
//           <View
//             style={{
//               width: widthPixel(41),
//               height: heightPixel(4),
//               backgroundColor: COLORS.BorderColor,
//               borderRadius: 4,
//             }}
//           />
//         </View>
//       }
//     >
//       {content == "district" ? (
//         <View
//           style={{
//             flex: 1,
//             height: ASPECTRADIO.height * 0.95,
//             paddingHorizontal: pixelSizeHorizontal(20),
//           }}
//         >
//           <View
//             style={[
//               GlobalStyle.flexJusSB,
//               { paddingVertical: pixelSizeVertical(15) },
//             ]}
//           >
//             <Text style={GlobalStyle.cancelBtn}>Select District</Text>
//             <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
//               <ICONS.CloseIconLogin />
//             </TouchableOpacity>
//           </View>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View
//               style={[
//                 GlobalStyle.searchBar,
//                 { marginVertical: pixelSizeVertical(15) },
//               ]}
//             >
//               <ICONS.SearchIcon />
//               <TextInput
//                 style={{
//                   // backgroundColor: "red",
//                   width: "92%",
//                   height: heightPixel(53),
//                 }}
//                 placeholder="Search"
//                 placeholderTextColor={COLORS.PlaceHolderText}
//                 value={searchQuery}
//                 onChangeText={(text) => setSearchQuery(text)}
//               />
//             </View>
//             {/* {Object.keys(filteredData).map((key) => (
//               <View key={key}>
//                 <View
//                   style={{
//                     // backgroundColor: "lightgray",
//                     paddingVertical: pixelSizeVertical(10),
//                   }}
//                 >
//                   <Text
//                     style={[
//                       GlobalStyle.cardDateText,
//                       { color: COLORS.primary },
//                     ]}
//                   >
//                     {key}
//                   </Text>
//                 </View>
//                 {filteredData[key].map((item) => (
//                   <Pressable
//                     onPress={() => toggleSelection(item)}
//                     key={item.id}
//                     style={{ paddingVertical: pixelSizeVertical(10) }}
//                     disabled={item.disabled}
//                   >
//                     <Text
//                       style={
//                         item.disabled
//                           ? [
//                               GlobalStyle.cardBtnText,
//                               {
//                                 fontSize: SIZES.size14,
//                                 color: COLORS.PlaceHolderText,
//                               },
//                             ]
//                           : [
//                               GlobalStyle.cardBtnText,
//                               {
//                                 fontSize: SIZES.size14,
//                               },
//                             ]
//                       }
//                     >
//                       {item.district}
//                     </Text>
//                     {/* <TouchableOpacity
//                       onPress={() => toggleSelection(item.district)}
//                     >
//                       <View
//                         style={{
//                           width: widthPixel(30),
//                           height: heightPixel(30),
//                           borderWidth: 1,
//                           borderColor: COLORS.BorderColor,
//                           borderRadius: 50,
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         {selectedDistricts.includes(item.district) && (
//                           <View
//                             style={{
//                               width: widthPixel(15),
//                               height: widthPixel(15),
//                               borderRadius: 15,
//                               backgroundColor: COLORS.primary,
//                             }}
//                           />
//                         )}
//                       </View>
//                     </TouchableOpacity> */}
//             {/* </Pressable>
//                 ))}
//               </View>
//             ))} */}
//           </ScrollView>
//         </View>
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             height: ASPECTRADIO.height * 0.45,
//             paddingHorizontal: pixelSizeHorizontal(20),
//             marginVertical: pixelSizeVertical(20),
//           }}
//         >
//           <View
//             style={[
//               GlobalStyle.flexJusSB,
//               { paddingVertical: pixelSizeVertical(20) },
//             ]}
//           >
//             <Text style={GlobalStyle.cancelBtn}>Select Quantity</Text>
//             <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
//               <ICONS.CloseIconLogin />
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             style={
//               isMyInputFocused
//                 ? [GlobalStyle.inputBox, { borderColor: COLORS.primary }]
//                 : [GlobalStyle.inputBox]
//             }
//             onBlur={() => setIsMyInputFocused(false)}
//             onFocus={() => setIsMyInputFocused(true)}
//             value={inputText}
//             onChangeText={(text) => setInputText(text)}
//             placeholder="Search or Add"
//             keyboardType="number-pad"
//             placeholderTextColor={COLORS.PlaceHolderText}
//           ></TextInput>
//           <Pressable
//             style={{ paddingVertical: pixelSizeVertical(20) }}
//             onPress={addNewItem}
//           >
//             <Text style={[GlobalStyle.cancelBtn, { fontSize: SIZES.size14 }]}>
//               +Add new
//             </Text>
//           </Pressable>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             {searchAndFilter().map((item, index) => {
//               return (
//                 <View
//                   key={index + 1}
//                   style={{ paddingVertical: pixelSizeVertical(15) }}
//                 >
//                   <Pressable onPress={() => selectedVlues(item)}>
//                     <Text style={GlobalStyle.inputText}>{`${item} Kgs`}</Text>
//                   </Pressable>
//                 </View>
//               );
//             })}
//           </ScrollView>
//         </View>
//       )}
//     </Modalize>
//   );
// };

// export default BottomSheetx;

// const styles = StyleSheet.create({});


import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Modalize } from "react-native-modalize";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { COLORS, ICONS, SIZES, ASPECTRADIO } from "../../Constants";
import GlobalStyle from "../../styles/GlobalStyle";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  selectedDistrictAtom,
  selectedDistrictErrorAtom,
  selectedDistrictWithBagsAtom,
} from "../../atoms/selectedDistrict";
import axios from "axios";
import { Api } from "../../api/api";
import { StoreValueToAsyncStorage } from "../../storage/AsyncStorage";
import { lotCountAtom } from "../../atoms/lotsCount";
import { FetchDistrictData } from "../../apiHelper";
import { MyContext } from "../../context/MyContext";
import { ActivityIndicator } from "react-native-paper";
const BottomSheetx = ({ modalizeRef, content, setBagsWeight }) => {
  // const BottomSheetx = ({ modalizeRef, jsonData, content, setBagsWeight }) => {
  const [datas, setDatas] = useState([]);
  //  Fetching District
  useEffect(() => {
    FetchDistrictDatas();
  }, []);
  const FetchDistrictDatas = async () => {
    const Res = await FetchDistrictData();
    if (Res == null) {
      setDatas([]);
    }
    setDatas(Res);
  };
  // Bottomsheet for District
  const setSelectedDistrict = useSetRecoilState(selectedDistrictAtom);
  const setselectedDistrictError = useSetRecoilState(selectedDistrictErrorAtom);
  const [selectedDistrictWithBags, setSelectedDistrictWithBags] =
    useRecoilState(selectedDistrictWithBagsAtom);
  const [lotCount, setLotCountAtom] = useRecoilState(lotCountAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const { isEditedQuantityBags, setIsEditedQuantityBags } =
    useContext(MyContext);

  const groupedData = {};
  if (datas.length !== 0) {
    datas.forEach((item) => {
      const { district } = item;
      const firstLetter = district[0].toUpperCase();
      if (!groupedData[firstLetter]) {
        groupedData[firstLetter] = [];
      }
      groupedData[firstLetter].push(item);
    });
  }

  const filteredData = Object.keys(groupedData).reduce((result, key) => {
    const filteredItems = groupedData[key].filter((item) =>
      item.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      result[key] = filteredItems;
    }
    return result;
  }, {});

  const toggleSelection = (item) => {
    // FetchLotno(userInfo, item.district);
    setselectedDistrictError(false);
    setSelectedDistrict(item.district);
    StoreValueToAsyncStorage("district", item.district);
    console.log(item.isBag);
    const newValue = item.isBag;
    StoreValueToAsyncStorage("withBags", newValue.toString());
    modalizeRef.current?.close();
    if (item.isBag) {
      setSelectedDistrictWithBags(true);
    } else {
      setSelectedDistrictWithBags(false);
    }
  };
  // bottomsheet for quantity
  const [isMyInputFocused, setIsMyInputFocused] = useState(false);
  const [dataArray, setDataArray] = useState([70, 80, 100]);
  const [inputText, setInputText] = useState("");
  const addNewItem = () => {
    Keyboard.dismiss();
    if (inputText.trim() !== "") {
      const newItem = parseInt(inputText);
      if (!dataArray.includes(newItem)) {
        setDataArray((prevArray) => [...prevArray, parseInt(inputText)]);
        setInputText("");
      } else {
        console.log("Value already exists in the array");
      }
    }
  };
  const searchAndFilter = () => {
    // Filter array based on the input text
    const filteredArray = dataArray.filter((item) =>
      item.toString().includes(inputText)
    );
    return filteredArray;
  };
  const selectedVlues = (item) => {
    modalizeRef.current?.close();
    setBagsWeight(item);
  };

  if (!filteredData) {
    return (
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        snapPoint={ASPECTRADIO.height * 0.95}
        withHandle={false}
        HeaderComponent={
          <View style={{ alignItems: "center", paddingTop: 16 }}>
            <View
              style={{
                width: widthPixel(41),
                height: heightPixel(4),
                backgroundColor: COLORS.BorderColor,
                borderRadius: 4,
              }}
            />
          </View>
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <ActivityIndicator
            size="large"
            animating={true}
            color={COLORS.primary}
          />
        </View>
      </Modalize>
    );
  }
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      snapPoint={ASPECTRADIO.height * 0.95}
      withHandle={false}
      HeaderComponent={
        <View style={{ alignItems: "center", paddingTop: 16 }}>
          <View
            style={{
              width: widthPixel(41),
              height: heightPixel(4),
              backgroundColor: COLORS.BorderColor,
              borderRadius: 4,
            }}
          />
        </View>
      }
    >
      {content == "district" ? (
        <View
          style={{
            flex: 1,
            height: ASPECTRADIO.height * 0.95,
            paddingHorizontal: pixelSizeHorizontal(20),
          }}
        >
          <View
            style={[
              GlobalStyle.flexJusSB,
              { paddingVertical: pixelSizeVertical(15) },
            ]}
          >
            <Text style={GlobalStyle.cancelBtn}>Select District</Text>
            <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
              <ICONS.CloseIconLogin />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                GlobalStyle.searchBar,
                { marginVertical: pixelSizeVertical(15) },
              ]}
            >
              <ICONS.SearchIcon />
              <TextInput
                style={{
                  // backgroundColor: "red",
                  width: "92%",
                  height: heightPixel(53),
                }}
                placeholder="Search"
                placeholderTextColor={COLORS.PlaceHolderText}
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {Object.keys(filteredData).map((key) => (
              <View key={key}>
                <View
                  style={{
                    // backgroundColor: "lightgray",
                    paddingVertical: pixelSizeVertical(10),
                  }}
                >
                  <Text
                    style={[
                      GlobalStyle.cardDateText,
                      { color: COLORS.primary },
                    ]}
                  >
                    {key}
                  </Text>
                </View>
                {filteredData[key].map((item) => (
                  <Pressable
                    onPress={() => toggleSelection(item)}
                    key={item.id}
                    style={{ paddingVertical: pixelSizeVertical(10) }}
                    disabled={item.disabled}
                  >
                    <Text
                      style={
                        item.disabled
                          ? [
                              GlobalStyle.cardBtnText,
                              {
                                fontSize: SIZES.size14,
                                color: COLORS.PlaceHolderText,
                              },
                            ]
                          : [
                              GlobalStyle.cardBtnText,
                              {
                                fontSize: SIZES.size14,
                              },
                            ]
                      }
                    >
                      {item.district}
                    </Text>
                    {/* <TouchableOpacity
                      onPress={() => toggleSelection(item.district)}
                    >
                      <View
                        style={{
                          width: widthPixel(30),
                          height: heightPixel(30),
                          borderWidth: 1,
                          borderColor: COLORS.BorderColor,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {selectedDistricts.includes(item.district) && (
                          <View
                            style={{
                              width: widthPixel(15),
                              height: widthPixel(15),
                              borderRadius: 15,
                              backgroundColor: COLORS.primary,
                            }}
                          />
                        )}
                      </View>
                    </TouchableOpacity> */}
                  </Pressable>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            height: ASPECTRADIO.height * 0.45,
            paddingHorizontal: pixelSizeHorizontal(20),
            marginVertical: pixelSizeVertical(20),
          }}
        >
          <View
            style={[
              GlobalStyle.flexJusSB,
              { paddingVertical: pixelSizeVertical(20) },
            ]}
          >
            <Text style={GlobalStyle.cancelBtn}>Select Quantity</Text>
            <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
              <ICONS.CloseIconLogin />
            </TouchableOpacity>
          </View>
          <TextInput
            style={
              isMyInputFocused
                ? [GlobalStyle.inputBox, { borderColor: COLORS.primary }]
                : [GlobalStyle.inputBox]
            }
            onBlur={() => setIsMyInputFocused(false)}
            onFocus={() => setIsMyInputFocused(true)}
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            placeholder="Search or Add"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.PlaceHolderText}
          ></TextInput>
          <Pressable
            style={{ paddingVertical: pixelSizeVertical(20) }}
            onPress={addNewItem}
          >
            <Text style={[GlobalStyle.cancelBtn, { fontSize: SIZES.size14 }]}>
              +Add new
            </Text>
          </Pressable>
          <ScrollView showsVerticalScrollIndicator={false}>
            {searchAndFilter().map((item, index) => {
              return (
                <View
                  key={index + 1}
                  style={{ paddingVertical: pixelSizeVertical(15) }}
                >
                  <Pressable onPress={() => selectedVlues(item)}>
                    <Text style={GlobalStyle.inputText}>{`${item} Kgs`}</Text>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </Modalize>
  );
};
export default BottomSheetx;
const styles = StyleSheet.create({});