// import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
// import React, { useContext, useState, useRef, useEffect } from "react";
// import { MyContext } from "../../context/MyContext";
// import {
//   heightPixel,
//   pixelSizeHorizontal,
//   pixelSizeVertical,
//   widthPixel,
// } from "../../styles/Responsive";
// import {
//   ASPECTRADIO,
//   COLORS,
//   FONT,
//   ICONS,
//   SIZES,
//   UNIQUEWIDTH,
// } from "../../Constants";
// import RBSheet from "react-native-raw-bottom-sheet";
// import GlobalStyle from "../../styles/GlobalStyle";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native-gesture-handler";

// import { FetchDistrictData } from "../../apiHelper";
// import { useRecoilState, useSetRecoilState } from "recoil";
// import {
//   selectedDistrictAtom,
//   selectedDistrictErrorAtom,
// } from "../../atoms/selectedDistrict";
// import {
//   disableDistrictAtom,
//   lotCountAtom,
//   districtListAtom,
// } from "../../atoms/lotsCount";

// const DistrictSheet = () => {
//   const { refDistrictSheet } = useContext(MyContext);
//   const [districtList, setDistrictList] = useRecoilState(districtListAtom);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [apiData, setApiData] = useState([]);
//   const [error, setError] = useState(null);

//   //Fetching District
//   useEffect(() => {
//     // Filter the data based on searchQuery
//     const filtered = {};
//     for (const key in districtList) {
//       filtered[key] = districtList[key].filter((item) =>
//         item.district.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     setFilteredData(filtered);
//   }, [searchQuery, districtList]);

//   // const [searchQuery, setSearchQuery] = useState("");
//   // const groupedData = {};

//   // datas.forEach((item) => {
//   //   const { district } = item;
//   //   const firstLetter = district[0].toUpperCase();
//   //   if (!groupedData[firstLetter]) {
//   //     groupedData[firstLetter] = [];
//   //   }
//   //   groupedData[firstLetter].push(item);
//   // });

//   // const filteredData = Object.keys(groupedData).reduce((result, key) => {
//   //   const filteredItems = groupedData[key].filter((item) =>
//   //     item.district.toLowerCase().includes(searchQuery.toLowerCase())
//   //   );
//   //   if (filteredItems.length > 0) {
//   //     result[key] = filteredItems;
//   //   }
//   //   return result;
//   // }, {});

//   const toggleSelection = (item) => {
//     // setselectedDistrictError(false);
//     // setSelectedDistrict(item.district);
//     refDistrictSheet.current?.close();
//   };

//   return (
//     <RBSheet
//       ref={refDistrictSheet}
//       closeOnDragDown={true}
//       closeOnPressMask={false}
//       height={ASPECTRADIO.height * 0.9}
//       customStyles={{
//         container: {
//           borderTopLeftRadius: 12,
//           borderTopRightRadius: 12,
//           alignItems: "center",
//         },
//         draggableIcon: {
//           backgroundColor: COLORS.BorderColor,
//           width: widthPixel(51),
//           height: heightPixel(4),
//         },
//       }}
//     >
//       <View
//         style={{
//           flex: 1,
//           height: ASPECTRADIO.height * 0.95,
//           paddingHorizontal: pixelSizeHorizontal(20),
//         }}
//       >
//         <View
//           style={[
//             GlobalStyle.flexJusSB,
//             { paddingVertical: pixelSizeVertical(15) },
//           ]}
//         >
//           <Text style={GlobalStyle.cancelBtn}>Select District</Text>
//           <Pressable onPress={() => refDistrictSheet.current?.close()}>
//             <ICONS.CloseIconLogin />
//           </Pressable>
//         </View>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View
//             style={[
//               GlobalStyle.searchBar,
//               { marginVertical: pixelSizeVertical(15) },
//             ]}
//           >
//             <ICONS.SearchIcon />
//             <TextInput
//               style={{
//                 width: "92%",
//                 height: heightPixel(53),
//               }}
//               placeholder="Search"
//               placeholderTextColor={COLORS.PlaceHolderText}
//               value={searchQuery}
//               onChangeText={(text) => setSearchQuery(text)}
//             />
//           </View>

//           {districtList.length === 0 ? (
//             <Text>No data available</Text>
//           ) : (
//             <FlatList
//               data={filteredData}
//               keyExtractor={(item) => item._id}
//               renderItem={({ item }) => <Text>{item.name}</Text>}
//             />
//           )}

//           {/* {Object.keys(districtList).map((firstLetter, index) => {
//             return (
//               <View key={index}>
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
//                     {firstLetter}
//                   </Text>
//                 </View>
//                 {districtList[firstLetter].map((dis, subIndex) => {
//                   return (
//                     <Pressable
//                       onPress={() => toggleSelection(dis)}
//                       key={dis.id}
//                       style={{ paddingVertical: pixelSizeVertical(10) }}
//                     >
//                       <Text
//                         style={[
//                           GlobalStyle.cardBtnText,
//                           {
//                             fontSize: SIZES.size14,
//                           },
//                         ]}
//                       >
//                         {dis.district}
//                       </Text>
//                     </Pressable>
//                   );
//                 })}
//               </View>
//             );
//           })} */}
//           {/* {Object.keys(filteredData).map((key) => (
//             <View key={key}>
//               <View
//                 style={{
//                   // backgroundColor: "lightgray",
//                   paddingVertical: pixelSizeVertical(10),
//                 }}
//               >
//                 <Text
//                   style={[GlobalStyle.cardDateText, { color: COLORS.primary }]}
//                 >
//                   {key}
//                 </Text>
//               </View>
//               {filteredData[key].map((item) => (
//                 <Pressable
//                   onPress={() => toggleSelection(item)}
//                   key={item.id}
//                   style={{ paddingVertical: pixelSizeVertical(10) }}
//                 >
//                   <Text
//                     style={[
//                       GlobalStyle.cardBtnText,
//                       {
//                         fontSize: SIZES.size14,
//                       },
//                     ]}
//                   >
//                     {item.district}
//                   </Text>
//                 </Pressable>
//               ))}
//             </View>
//           ))} */}
//         </ScrollView>
//       </View>
//     </RBSheet>
//   );
// };

// export default DistrictSheet;

// const styles = StyleSheet.create({
//   exportBtnHead: {
//     width: UNIQUEWIDTH.wid,
//     height: heightPixel(50),
//     borderWidth: 1,
//     borderColor: COLORS.BorderColor,
//     borderRadius: 6,
//     flexDirection: "row",
//     alignItems: "center",
//     // justifyContent: "center",
//   },
//   exportBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "50%",
//     backgroundColor: COLORS.white,
//     height: heightPixel(48),
//     gap: 8,
//   },
//   Btnfonts: {
//     fontFamily: FONT.EuclidMedium,
//     fontSize: SIZES.size14,
//     color: COLORS.PrimaryText,
//   },
//   content: {
//     width: UNIQUEWIDTH.wid,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: pixelSizeVertical(10),
//   },

//   container: {
//     width: UNIQUEWIDTH.wid,
//     height: 48,
//     flexDirection: "row",
//     position: "relative",
//   },
//   button: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000",
//   },
//   background: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     width: "50%",
//     backgroundColor: "red",
//     zIndex: -1,
//   },
// });



import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import {
  heightPixel,
  pixelSizeHorizontal,
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
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { FetchDistrictData } from "../../apiHelper";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedDistrictAtom,
  selectedDistrictErrorAtom,
} from "../../atoms/selectedDistrict";

const DistrictSheet = () => {
  const { refDistrictSheet } = useContext(MyContext);
  const [datas, setDatas] = useState([]);
  // const [selectedDistrict, setSelectedDistrict] =
  //   useRecoilState(selectedDistrictAtom);
  // const [selectedDistrictError, setselectedDistrictError] = useRecoilState(
  //   selectedDistrictErrorAtom
  // );
  //Fetching District
  useEffect(() => {
    FetchDistrictDatas();
  }, []);

  const FetchDistrictDatas = async () => {
    const Res = await FetchDistrictData();
    setDatas(Res);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const groupedData = {};

  datas.forEach((item) => {
    const { district } = item;
    const firstLetter = district[0].toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(item);
  });

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
    // setselectedDistrictError(false);
    // setSelectedDistrict(item.district);
    refDistrictSheet.current?.close();
  };
  return (
    <RBSheet
      ref={refDistrictSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.9}
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
          <Pressable onPress={() => refDistrictSheet.current?.close()}>
            <ICONS.CloseIconLogin />
          </Pressable>
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
                  style={[GlobalStyle.cardDateText, { color: COLORS.primary }]}
                >
                  {key}
                </Text>
              </View>
              {filteredData[key].map((item) => (
                <Pressable
                  onPress={() => toggleSelection(item)}
                  key={item.id}
                  style={{ paddingVertical: pixelSizeVertical(10) }}
                >
                  <Text
                    style={[
                      GlobalStyle.cardBtnText,
                      {
                        fontSize: SIZES.size14,
                      },
                    ]}
                  >
                    {item.district}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </RBSheet>
  );
};
export default DistrictSheet;
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
});
