// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

// const ParentCard = ({ title, childData }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const height = useSharedValue(isExpanded ? 0 : 200); // Initial height (collapsed)

//   const toggleCard = () => {
//     setIsExpanded(!isExpanded);
//     height.value = withTiming(isExpanded ? 0 : childData.length * 40, { duration: 300, easing: Easing.ease });
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       height: height.value,
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleCard}>
//         <Text style={styles.title}>{title}</Text>
//       </TouchableOpacity>
//       <Animated.View style={[styles.card, animatedStyle]}>
//         <FlatList
//           data={childData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => <Text style={styles.child}>{item.text}</Text>}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     margin: 16,
//   },
//   card: {
//     backgroundColor: 'lightgray',
//     overflow: 'hidden',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   child: {
//     paddingVertical: 4,
//   },
// });

// // Example usage:
// const Experiment = () => {
//   const parent1Data = [
//     { id: 1, text: 'Child Component 1' },
//     { id: 2, text: 'Child Component 2' },
//     // ... Add more child components
//   ];

//   const parent2Data = [
//     { id: 1, text: 'Child Component A' },
//     { id: 2, text: 'Child Component B' },
//     // ... Add more child components
//   ];

//   return (
//     <View>
//       <ParentCard title="Parent Card 1" childData={parent1Data} />
//       <ParentCard title="Parent Card 2" childData={parent2Data} />
//     </View>
//   );
// };

// export default Experiment;



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { COLORS, UNIQUEWIDTH } from '../Constants';
import { heightPixel } from '../styles/Responsive';
// import { Experiment } from '.';

const ParentCard = ({ title, childData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(0); // Initial height (collapsed)

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
    height.value = withTiming(isExpanded ? 0 : childData.length * 40, { duration: 300, easing: Easing.ease });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCard} style={styles.btn}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.card, animatedStyle]}>
        <FlatList
          data={childData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.child}>{item.text}</Text>}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 16,
    // backgroundColor:'red'

  },
  btn:{
  backgroundColor:COLORS.secondaryBlue,
  width:UNIQUEWIDTH.wid,
  height:heightPixel(80),
  borderRadius:20
  },
  card: {
    backgroundColor: 'lightgray',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  child: {
    paddingVertical: 4,
  },
});

// Example usage:
const Experiment = () => {
  const parent1Data = [
    { id: 1, text: 'Child Component 1' },
    { id: 2, text: 'Child Component 2' },
    // ... Add more child components
  ];

  const parent2Data = [
    { id: 1, text: 'Child Component A' },
    { id: 2, text: 'Child Component B' },
    // ... Add more child components
  ];

  return (
    <View>
      <ParentCard title="Parent Card 1" childData={parent1Data} />
      <ParentCard title="Parent Card 2" childData={parent2Data} />
    </View>
  );
};

export default Experiment;

