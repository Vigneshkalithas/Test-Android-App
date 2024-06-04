import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../styles/Responsive";
import { ASPECTRADIO, COLORS, ICONS, UNIQUEWIDTH } from "../../Constants";
import CustomAnimatedInput from "./CustomAnimatedInput";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import GlobalStyle from "../../styles/GlobalStyle";
import { Drawer } from "react-native-paper";

const SearchBar = ({ content, active }) => {
  const placeholderTexts = [
    "Search",
    "Search Procurement",
    "Search Events",
    "Search Agents",
    "Search Locations",
  ];
  const navigation = useNavigation();
  const { searchMoadal, setSearchModal } = useContext(MyContext);
  const inputRef = useRef();
  const handleModalBackButtonPress = () => {
    setSearchModal(false);
  };

  return (
    <View style={styles.head}>
      {content == "Home" ? (
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Image
            source={require("../../assets/userImage.png")}
            alt="userImage"
            // style={{ width: 50, height: 50 }}
          /> */}
          <ICONS.userImageSmall />
        </Pressable>
      ) : (
        ""
      )}
      {content == "RecentActivity" ? (
        <Pressable onPress={() => navigation.goBack()}>
          <ICONS.GoBack />
        </Pressable>
      ) : (
        ""
      )}
      <CustomAnimatedInput
        placeholderTexts={placeholderTexts}
        inputRef={inputRef}
      />
      <View style={{ flexDirection: "row", gap: 13 }}>
        <Pressable onPress={() => navigation.navigate("Notification")}>
          {active == "notification" ? (
            <ICONS.notificationActivewithoutDot />
          ) : (
            <ICONS.NotificationIcon />
          )}
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ChatHome")}>
          {active == "message" ? <ICONS.msgActive /> : <ICONS.MessageIcon />}
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={searchMoadal}
        onRequestClose={() => handleModalBackButtonPress()}
        // backButtonHandler={() => handleModalBackButtonPress()}
      >
        <View
          style={[
            // GlobalStyle.globalHead,
            { alignItems: "center" },
            // { paddingVertical: pixelSizeVertical(0) },
          ]}
        >
          <View style={styles.head}>
            <Pressable
              onPress={() => setSearchModal(false)}
              style={{
                width: widthPixel(50),
                height: heightPixel(50),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ICONS.GoBack />
            </Pressable>
            <CustomAnimatedInput2
              placeholderTexts={placeholderTexts}
              inputRef={inputRef}
            />

            <View style={{ flexDirection: "row", gap: 13 }}>
              <Pressable onPress={() => console.log("pressed")}>
                <ICONS.NotificationIcon />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("ChatHome")}>
                <ICONS.MessageIcon />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchBar;

const CustomAnimatedInput2 = ({ placeholderTexts, searchIcon, inputRef }) => {
  const { searchMoadal, setSearchModal } = useContext(MyContext);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % placeholderTexts.length
      );
    }, 2000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [placeholderTexts]);

  const placeholderText = placeholderTexts[currentTextIndex];

  const handleSearch = () => {
    setSearchModal(true);
    // inputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <ICONS.SearchIcon />
      <TextInput
        style={styles.input}
        placeholderTexts={placeholderTexts}
        // inputRef={inputRef}
        placeholderTextColor={COLORS.PlaceHolderText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    width: UNIQUEWIDTH.wid,
    height: heightPixel(53),
    backgroundColor: COLORS.Secondary,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: pixelSizeHorizontal(5),
  },
  input: {
    height: heightPixel(53),
    width: ASPECTRADIO.width * 0.5,
    paddingHorizontal: pixelSizeHorizontal(7),
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
