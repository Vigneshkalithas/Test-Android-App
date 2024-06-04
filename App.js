import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SafeViewAndroid from "./styles/SafeAndroidView";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { MyContextProvider } from "./context/MyContext";
import Layout from "./Layout/Layout.jsx";
import { Login } from "./pages";
import { useCallback } from "react";
import React from "react";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { LogBox } from "react-native";
import { COLORS } from "./Constants";

LogBox.ignoreLogs(["Require cycle: node_modules/"]);

export default function App() {
  const [fontsLoaded] = useFonts({
    EuclidBold: require("./assets/Fonts/EuclidCircularABold.ttf"),
    EuclidSemiBold: require("./assets/Fonts/EuclidCircularASemiBold.ttf"),
    EuclidMedium: require("./assets/Fonts/EuclidCircularAMedium.ttf"),
    EuclidRegular: require("./assets/Fonts/EuclidCircularARegular.ttf"),
    EuclidLight: require("./assets/Fonts/EuclidCircularALight.ttf"),
    EuclidBoldItalic: require("./assets/Fonts/EuclidCircularABoldItalic.ttf"),
    EuclidSemiBoldItalic: require("./assets/Fonts/EuclidCircularASemiBoldItalic.ttf"),
    EuclidMediumItalic: require("./assets/Fonts/EuclidCircularAMediumItalic.ttf"),
    EuclidItalic: require("./assets/Fonts/EuclidCircularAItalic.ttf"),
    EuclidLightItalic: require("./assets/Fonts/EuclidCircularALightItalic.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={SafeViewAndroid.AndroidSafeArea}
      onLayout={onLayoutRootView}
    >
      <RecoilRoot>
        <MyContextProvider>
          <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: COLORS.white }}
          >
            <PaperProvider>
              <Layout />
            </PaperProvider>
          </GestureHandlerRootView>
        </MyContextProvider>
      </RecoilRoot>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
