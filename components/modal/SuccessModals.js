import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useRef, useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import LottieView from "lottie-react-native";
import SuccssAnimation from "../../animation/Success.json";
import GlobalStyle from "../../styles/GlobalStyle";
import { COLORS } from "../../Constants";
import { heightPixel, widthPixel } from "../../styles/Responsive";

const SuccessModals = ({ content }) => {
  const animation = useRef(null);
  const { openSuccessModal, setOpenSuccessModal } = useContext(MyContext);

  useEffect(() => {
    let timeout;
    if (openSuccessModal) {
      timeout = setTimeout(() => {
        setOpenSuccessModal(false);
      }, 800);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openSuccessModal]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={openSuccessModal}
      onRequestClose={() => setOpenSuccessModal(false)}
    >
      <View style={GlobalStyle.modalBackground}>
        <View style={styles.SuccessmodalContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={SuccssAnimation}
          />

          <View
            style={{ position: "absolute", bottom: 15, alignItems: "center" }}
          >
            <Text style={GlobalStyle.overAllHeadLinePrimary}>Success</Text>
            <Text style={[GlobalStyle.Label, { color: "#000000" }]}>
              {content}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModals;

const styles = StyleSheet.create({
  SuccessmodalContainer: {
    width: widthPixel(210),
    height: heightPixel(240),
    backgroundColor: COLORS.white,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
