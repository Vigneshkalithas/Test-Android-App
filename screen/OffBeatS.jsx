// import { StyleSheet, Text, View , Button } from 'react-native'
// import React from 'react'
// import {Animated ,SharedTransition, withSpring } from 'react-native-reanimated';

// const Sample1 = ( { navigation }) => {

// const customTransition = SharedTransition.custom((values) => {
//   'worklet';
//   return {
//     height: withSpring(values.targetHeight),
//     width: withSpring(values.targetWidth),
//     originX: withSpring(values.targetOriginX),
//     originY: withSpring(values.targetOriginY),
//   };
// });
//   return (
//     <View style={{ flex: 1, marginTop: 50 }}>
//       <Animated.View
//         style={{ width: 100, height: 100, backgroundColor: 'green' }}
//         sharedTransitionTag="sharedTag"
//         // sharedTransitionStyle={customTransition} 
//       />
//       <Button title="Screen1" onPress={() => navigation.navigate('Sample2')} />
//     </View>
//   )
// }

// export default Sample1

// const styles = StyleSheet.create({})


import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import React from 'react';
// import { Link } from 'expo-router';
// import image from '../assets/image.png';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import GlobalStyle from '../styles/GlobalStyle';
// import CarouselComponent from '../components/Home/CarouselComponent';

// const IMAGE = Image.resolveAssetSource(image).uri;

const OffBeatS = () => {
const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<Text style={GlobalStyle.districtText}>We are Working on offBeat</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		justifyContent: 'center',
		alignItems:'center'
		
	},
	
});

export default OffBeatS;