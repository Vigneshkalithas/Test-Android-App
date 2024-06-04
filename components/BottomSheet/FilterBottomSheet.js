import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import RBSheet from "react-native-raw-bottom-sheet";
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from "../../Constants";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import Filterx from "../Filter/Filterx";
import GlobalStyle from "../../styles/GlobalStyle";
import { FilterDatas } from "../../DataCenter";
import { TextInput } from "react-native-gesture-handler";
import Buttonx from "../Btn/Buttonx";
import ButtonUnfill from "../Btn/ButtonUnfill";

const FilterBottomSheet = () => {
  const { refRBSheet } = useContext(MyContext);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={ASPECTRADIO.height * 0.92}
      customStyles={{
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        draggableIcon: {
          backgroundColor: COLORS.BorderColor,
          width: widthPixel(51),
          height: heightPixel(4),
        },
      }}
    >
      <FilterHead refRBSheet={refRBSheet} />
      <FilterContenet data={FilterDatas} />
      <FilterBottomBtns refRBSheet={refRBSheet} />
    </RBSheet>
  );
};

const FilterHead = ({ refRBSheet }) => {
  return (
    <View
      style={{
        alignItems: "center",
        // paddingVertical: pixelSizeVertical(12),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BorderColor,
        justifyContent: "center",
        alignItems: "center",
        height: ASPECTRADIO.height * 0.05,
      }}
    >
      <View style={[GlobalStyle.flexJusSB, { width: UNIQUEWIDTH.wid }]}>
        <Text style={[GlobalStyle.overAllHeadLine, { color: COLORS.primary }]}>
          Filters
        </Text>
        <Pressable onPress={() => refRBSheet.current.close()}>
          <ICONS.CloseIconLogin />
        </Pressable>
      </View>
    </View>
  );
};

const FilterContenet = ({ data }) => {
  const [isActive, setIsActive] = useState("Product");
  return (
    <View
      style={{
        flexDirection: "row",
        height: heightPixel(ASPECTRADIO.height * 0.8),
        width: ASPECTRADIO.width,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.Secondary,
          width: ASPECTRADIO.width * 0.4,
          flexDirection: "column",
        }}
      >
        {data.map((data, index) => {
          return (
            <Pressable
              key={index}
              style={
                isActive == data.Key
                  ? [styles.Tab, styles.ActiveTab]
                  : [styles.Tab]
              }
              // style={styles.Tab}
              onPress={() => setIsActive(data.Key)}
            >
              <Text
                style={
                  isActive == data.Key
                    ? [GlobalStyle.cardBtnText]
                    : [GlobalStyle.cardBtnText, { color: COLORS.SecondaryText }]
                }
              >
                {data.Key}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          paddingHorizontal: pixelSizeHorizontal(15),
          paddingVertical: pixelSizeVertical(10),
          width: ASPECTRADIO.width * 0.6,
        }}
      >
        {isActive == "Product" ? <Product /> : null}
        {isActive == "Date" ? <Date /> : null}
        {isActive == "Quality" ? <Quality /> : null}
        {isActive == "Quantity" ? <Quantity /> : null}
        {isActive == "Location" ? <Location /> : null}
        {isActive == "Status" ? <Status /> : null}
        {isActive == "Procurement ID" ? <ProcurementID /> : null}
        {isActive == "Agents" ? <Agents /> : null}
      </View>
    </View>
  );
};

const FilterBottomBtns = ({ refRBSheet }) => {
  return (
    <View
      style={{
        height: ASPECTRADIO.height * 0.1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <ButtonUnfill txt={"Clear All"} fn={() => refRBSheet.current.close()} />
      <Buttonx
        txt={"Apply"}
        style={{
          height: heightPixel(48),
          width: widthPixel(171),
          backgroundColor: COLORS.primary,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
};

const Product = () => {
  const InitialData = [
    {
      id: 1,
      name: "Black Sesame Seed",
      choosenStatus: false,
    },
    {
      id: 2,
      name: "Red Sesame Seed",
      choosenStatus: false,
    },
    {
      id: 3,
      name: "Brown Sesame Seed",
      choosenStatus: false,
    },
  ];
  const [products, setProducts] = useState(InitialData);
  const selectedProducts = (id) => {
    const updatedData = products.map((item) =>
      item.id === id ? { ...item, choosenStatus: !item.choosenStatus } : item
    );
    setProducts(updatedData);
  };

  return (
    <>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Product</Text>
      </View>
      {products.map((data, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => selectedProducts(data.id)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pixelSizeVertical(8),
            }}
          >
            <Text style={GlobalStyle.txtLot}>{data.name}</Text>
            {data.choosenStatus ? (
              <ICONS.RadioCheckActive />
            ) : (
              <ICONS.RadioCheckInActive />
            )}
          </Pressable>
        );
      })}
    </>
  );
};

const Date = () => {
  const [selectDate, setSelectDate] = useState("");
  return (
    <>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Date</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          paddingVertical: pixelSizeVertical(10),
        }}
      >
        <Pressable
          style={[GlobalStyle.DateInputHead, { width: widthPixel(220) }]}
        >
          <Text style={GlobalStyle.placeHolderText}>From Date</Text>
          <ICONS.CalendarView />
        </Pressable>
        <Pressable
          style={[GlobalStyle.DateInputHead, { width: widthPixel(220) }]}
        >
          <Text style={GlobalStyle.placeHolderText}>To Date</Text>
          <ICONS.CalendarView />
        </Pressable>
      </View>
    </>
  );
};

const Quality = () => {
  const InitialQualities = [
    {
      id: 1,
      name: "Q-A1",
      choosenStatus: false,
    },
    {
      id: 2,
      name: "Q-A2",
      choosenStatus: false,
    },
    {
      id: 3,
      name: "Q-A3",
      choosenStatus: false,
    },
  ];
  const [qualities, setQualities] = useState(InitialQualities);
  const selectedQualities = (id) => {
    const updatedData = qualities.map((item) =>
      item.id === id ? { ...item, choosenStatus: !item.choosenStatus } : item
    );
    setQualities(updatedData);
  };
  return (
    <>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Quality</Text>
      </View>
      {qualities.map((data, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => selectedQualities(data.id)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pixelSizeVertical(8),
            }}
          >
            <Text style={GlobalStyle.txtLot}>{data.name}</Text>
            {data.choosenStatus ? (
              <ICONS.RadioCheckActive />
            ) : (
              <ICONS.RadioCheckInActive />
            )}
          </Pressable>
        );
      })}
    </>
  );
};

const Quantity = () => {
  const InitialQuantities = [
    {
      id: 1,
      name: "100 kg - 500 kg",
      choosenStatus: false,
    },
    {
      id: 2,
      name: "500 kg - 1000 kg",
      choosenStatus: false,
    },
    {
      id: 3,
      name: "1000kg - 500k g",
      choosenStatus: false,
    },
  ];
  const [quantities, setQuantities] = useState(InitialQuantities);
  const selectedQualities = (id) => {
    const updatedData = quantities.map((item) =>
      item.id === id ? { ...item, choosenStatus: !item.choosenStatus } : item
    );
    setQuantities(updatedData);
  };

  return (
    <>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Quality</Text>
      </View>
      {quantities.map((data, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => selectedQualities(data.id)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pixelSizeVertical(8),
            }}
          >
            <Text style={GlobalStyle.txtLot}>{data.name}</Text>
            {data.choosenStatus ? (
              <ICONS.RadioCheckActive />
            ) : (
              <ICONS.RadioCheckInActive />
            )}
          </Pressable>
        );
      })}
    </>
  );
};

const Location = () => {
  return (
    <View>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Location</Text>
      </View>
      <View>
        <InputBox placeHolderText={"Search Location"} />
      </View>
    </View>
  );
};

const Status = () => {
  const InitialStatus = [
    {
      id: 1,
      name: "Prebid",
      choosenStatus: false,
    },
    {
      id: 2,
      name: "Postbid",
      choosenStatus: false,
    },
    {
      id: 3,
      name: "Declined",
      choosenStatus: false,
    },
  ];
  const [statuses, setStatuses] = useState(InitialStatus);
  const selectedQualities = (id) => {
    const updatedData = statuses.map((item) =>
      item.id === id ? { ...item, choosenStatus: !item.choosenStatus } : item
    );
    setStatuses(updatedData);
  };
  return (
    <>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Status</Text>
      </View>
      {statuses.map((data, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => selectedQualities(data.id)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pixelSizeVertical(8),
            }}
          >
            <Text style={GlobalStyle.txtLot}>{data.name}</Text>
            {data.choosenStatus ? (
              <ICONS.RadioCheckActive />
            ) : (
              <ICONS.RadioCheckInActive />
            )}
          </Pressable>
        );
      })}
    </>
  );
};
const ProcurementID = () => {
  return (
    <View>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Procurement ID</Text>
      </View>
      <View>
        <InputBox placeHolderText={"Search Procurement"} />
      </View>
    </View>
  );
};

const Agents = () => {
  return (
    <View>
      <View style={{ paddingVertical: pixelSizeVertical(10) }}>
        <Text style={GlobalStyle.cancelBtn}>Select Agent</Text>
      </View>
      <View>
        <InputBox placeHolderText={"Search Agent"} />
      </View>
    </View>
  );
};

const InputBox = ({ placeHolderText }) => {
  return (
    <TextInput
      style={styles.inputBox}
      placeholder={placeHolderText}
      placeholderTextColor={COLORS.PlaceHolderText}
    ></TextInput>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  Tab: {
    width: ASPECTRADIO.width * 0.4,
    paddingHorizontal: pixelSizeHorizontal(15),
    height: heightPixel(60),
    justifyContent: "center",
  },
  ActiveTab: {
    backgroundColor: COLORS.white,
  },
  inputBox: {
    width: widthPixel(221),
    height: heightPixel(50),
    borderWidth: 1,
    borderColor: COLORS.BorderColor,
    borderRadius: 6,
    paddingHorizontal: 10,
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
});
