// CustomAnimatedInput.js

import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Text,
  LayoutAnimation,
} from "react-native";
import { ICONS, ASPECTRADIO, COLORS } from "../../Constants";
import { heightPixel, pixelSizeHorizontal } from "../../styles/Responsive";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";

const CustomAnimatedInput = ({ placeholderTexts, searchIcon, inputRef }) => {
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
      <Pressable onPress={handleSearch}>
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          editable={false}
          // ref={inputRef}
          // onChangeText={handleSearch}
          // onFocus={handleSearch}
          placeholderTextColor={COLORS.PlaceHolderText}
        />
      </Pressable>

      {/* <Pressable style={styles.input} onPress={handleSearch}>
        <Text style={styles.txt}>Search</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: heightPixel(53),
    width: ASPECTRADIO.width * 0.5,
    paddingHorizontal: pixelSizeHorizontal(7),
    justifyContent: "center",
  },
  txt: {
    color: COLORS.PlaceHolderText,
  },
});

export default CustomAnimatedInput;
