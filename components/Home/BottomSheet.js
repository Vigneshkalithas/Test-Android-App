import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ICONS, COLORS, FONT, SIZES, CENTERSCREEN } from "../../Constants";
import {
  widthPixel,
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import axios from "axios";
import { Api } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomSheet = ({ isVisible, onClose }) => {
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  // OTP Configs
  const {
    setIsLoggedIn,
    userMobile,
    otpTimer,
    setOtpTimer,
    isTimerActive,
    setIsTimerActive,
    otp,
    setOTP,
    setUserToken,
    setUserInfo,
  } = useContext(MyContext);
  const navigation = useNavigation();
  const [sendingApi, setSendingApi] = useState(false);
  const startOtpTimer = () => {
    setOtpTimer(30);
    setIsTimerActive(true);
    ResendOtp();
  };

  const ResendOtp = async () => {
    const values = { mobileNo: userMobile };
    try {
      const Response = await fetch(`${Api.api}/manager/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const ResponseData = await Response.json();
      // console.log(ResponseData);
      if (ResponseData.message == "otp sended") {
      }
    } catch (error) {
      console.log(error);
      showToast("Try Again");
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setOtpTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);
  // const [otp, setOTP] = useState("");
  const otpInputRefs = useRef([]);
  const OTP_LENGTH = 6;

  const renderOTPInputs = () => {
    const inputs = [];
    for (let i = 0; i < OTP_LENGTH; i++) {
      inputs.push(
        <TextInput
          key={i}
          ref={(ref) => (otpInputRefs.current[i] = ref)}
          style={[
            styles.otpInput,
            i === OTP_LENGTH - 1 && styles.lastOTPInput,
            i == 3 && styles.marginRight,
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[i] || ""}
          onChangeText={(text) => handleOTPChange(text, i)}
          onKeyPress={(e) => handleOTPKeyPress(e, i)}
        />
      );
    }
    return inputs;
  };
  const handleOTPChange = (text, index) => {
    if (text.length <= 1) {
      setOTP([...otp.slice(0, index), text, ...otp.slice(index + 1)]);
      if (text.length === 1 && index < OTP_LENGTH - 1) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOTPKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      setOTP([...otp.slice(0, index - 1), "", ...otp.slice(index)]);
      otpInputRefs.current[index - 1].focus();
    }
  };
  const NavigateHome = async () => {
    let result = parseInt(otp.join(""));

    const values = {
      mobileNo: userMobile,
      otp: result,
    };
    //  setSendingApi(true);
    try {
      const Response = await fetch(`${Api.api}/manager/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const ResponseData = await Response.json();
      if (ResponseData.message == "Invalid Otp") {
        showToast(ResponseData.message);
      }
      if (ResponseData.message == "Time Out") {
        showToast(ResponseData.message);
      }
      if (ResponseData.message == "otp verified successfully") {
        if (ResponseData.doc.newManager) {
          console.log("New Manager");
          AsyncStorage.setItem("userToken", JSON.stringify(ResponseData.token));
          // setUserToken(ResponseData.token);
          AsyncStorage.setItem(
            "userTempId",
            JSON.stringify(ResponseData.doc.id)
          );
          AsyncStorage.setItem("userId", JSON.stringify(ResponseData.doc.id));
          navigation.navigate("OnBoarding");
          setSendingApi(false);
        } else {
          AsyncStorage.setItem("userToken", JSON.stringify(ResponseData.token));
          // setUserToken(ResponseData.token);
          AsyncStorage.setItem("userInfo", JSON.stringify(ResponseData.doc));
          AsyncStorage.setItem("userId", JSON.stringify(ResponseData.doc.id));
          // setUserInfo(ResponseData.doc);
          setIsLoggedIn(true);
          setSendingApi(false);
        }
      }
    } catch (error) {
      console.log(error);
      showToast("Try Again");
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.6} // Set the opacity of the background mask
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <Pressable style={{ alignItems: "center" }}>
        <View style={styles.bottomsheetTopBar}></View>
      </Pressable>
      <View style={styles.bottomSheet}>
        <View style={styles.headerOtpSheet}>
          <Text style={GlobalStyle.HeadLine}>Enter OTP</Text>
          <Pressable onPress={onClose}>
            <ICONS.CloseIconLogin />
          </Pressable>
        </View>
        <View style={{ marginVertical: pixelSizeVertical(10) }}>
          <Text style={styles.otpSlogan}>
            Enter the 6-digit OTP code we sent to {"\n"} +{userMobile}
          </Text>
        </View>
        <View style={styles.otpContainer}>{renderOTPInputs()}</View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.timerView}>
            {!isTimerActive ? (
              <Pressable onPress={() => startOtpTimer()}>
                <Text style={styles.ResendOtpText}>Resend OTP</Text>
              </Pressable>
            ) : (
              <>
                <ICONS.OTPclockicon />
                <Text style={styles.timer}>00:{otpTimer}</Text>
              </>
            )}
          </View>
        </View>
        <Pressable
          disabled={sendingApi}
          onPress={NavigateHome}
          style={
            sendingApi
              ? [
                  GlobalStyle.LoginButton,
                  { marginTop: heightPixel(30), opacity: 0.8 },
                ]
              : [GlobalStyle.LoginButton, { marginTop: heightPixel(30) }]
          }
        >
          <Text style={GlobalStyle.LoginBtnText}>
            {sendingApi ? "Loading" : "Done"}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  //bottom sheet style
  bottomSheet: {
    backgroundColor: "white",
    paddingVertical: pixelSizeVertical(16),
    paddingHorizontal: pixelSizeHorizontal(20),
    height: CENTERSCREEN.Vertical,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
  },
  bottomsheetTopBar: {
    width: widthPixel(27),
    height: heightPixel(6),
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    position: "relative",
    top: heightPixel(10),
  },
  headerOtpSheet: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: pixelSizeVertical(10),
  },

  //otp style
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: pixelSizeVertical(25),
    // width:
  },
  otpInput: {
    height: heightPixel(40),
    width: widthPixel(35),
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#E4E6E8",
    textAlign: "center",
    marginHorizontal: pixelSizeHorizontal(14),
    fontFamily: FONT.EuclidSemiBold,
    fontStyle: "normal",
    fontSize: SIZES.medium,
    color: COLORS.PrimaryText,
  },
  lastOTPInput: {
    marginRight: 0,
  },
  marginRight: {
    marginLeft: pixelSizeHorizontal(15),
  },
  otpSlogan: {
    fontFamily: FONT.EuclidMedium,
    fontStyle: "normal",
    fontSize: SIZES.size14,
    color: COLORS.SecondaryText,
  },
  timerView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: pixelSizeVertical(20),
  },
  timer: {
    fontFamily: FONT.EuclidMedium,
    fontSize: SIZES.size14,
    color: COLORS.PrimaryText,
  },
  ResendOtpText: {
    fontFamily: FONT.EuclidSemiBold,
    fontSize: SIZES.size14,
    color: COLORS.primary,
  },
});
