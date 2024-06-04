import React from "react";
import { View, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";

const CustomStepIndicator = ({ activePosition, getStepsData }) => {
  const styles = {
    // Customize your step indicator styles here
    customStyles: {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 40,
      separatorStrokeWidth: 3,
      currentStepStrokeWidth: 5,
      stepStrokeCurrentColor: "#00AA00", // Filled icon color
      separatorFinishedColor: "#00AA00", // Dashed line color
      separatorUnFinishedColor: "#00AA00", // Dashed line color
      stepIndicatorFinishedColor: "#00AA00", // Filled icon color
      stepIndicatorUnFinishedColor: "#00AA00", // Unfilled icon color
      stepIndicatorCurrentColor: "#FFFFFF", // Active icon color
      stepIndicatorLabelFontSize: 15,
      currentStepIndicatorLabelFontSize: 15,
      stepIndicatorLabelCurrentColor: "#000000",
      stepIndicatorLabelFinishedColor: "#FFFFFF",
      stepIndicatorLabelUnFinishedColor: "#FFFFFF",
      labelColor: "#333333",
      labelSize: 15,
      currentStepLabelColor: "#00AA00", // Active label color
    },
  };

  return (
    <StepIndicator
      stepCount={getStepsData?.getSteps?.length}
      customStyles={styles.customStyles}
      currentPosition={activePosition}
      labels={getStepsData?.getSteps?.map((step) => step.name)}
      onPress={(position) => setActivePosition(position)}
      renderLabel={({ position, stepStatus, label, currentPosition }) => (
        <View key={position}>
          <Text
            style={
              position === activePosition ? styles.pressedTitle : styles.title
            }
          >
            {getStepsData?.getSteps[position].name}
          </Text>
          {position === activePosition && (
            <Text style={styles.stepDescription}>
              {getStepsData?.getSteps[position].description}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomStepIndicator;
