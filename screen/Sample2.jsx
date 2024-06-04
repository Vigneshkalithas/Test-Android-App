
// import { StyleSheet, Text, View, Button } from 'react-native'
// import React from 'react'
// import Animated from 'react-native-reanimated';

// const Sample2 = ( { navigation }) => {
//   return (
//     <View style={{ flex: 1, marginTop: 50 }}>
//       <Animated.View
//         style={{ width: 50, height: 50, backgroundColor: 'green' }}
//         sharedTransitionTag="sharedTag"
//       />
//       <Button title="Screen2" onPress={() => navigation.navigate('Sample1')} />
//     </View>
//   )
// }

// export default Sample2

// const styles = StyleSheet.create({})




import { Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
// import { useNavigation, useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
// import image from '../assets/image.png';
// const IMAGE = Image.resolveAssetSource(image).uri;

const Sample2 = () => {
	// const router = useRouter();
  const navigation = useNavigation()
	return (
		<BlurView intensity={40} style={styles.container} tint="dark">
			<Pressable onPress={() => navigation.goBack()}>
				<Animated.Image
					sharedTransitionTag="sharedTag"
					// source={{ uri: IMAGE }}
                    source={{ uri: "https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg" }}
					style={styles.image}
				/>

				<Animated.Text style={styles.text} entering={FadeInLeft.duration(400).delay(500)}>
					React Native Shared Element Transition
				       </Animated.Text>
				       <Animated.View entering={FadeInDown.duration(400).delay(600)} style={styles.card}>
					<Text>More cool React Native tutorials on Galaxies.dev!</Text>
				</Animated.View>
			</Pressable>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center'
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'contain'
	},
	text: {
		fontSize: 30,
		margin: 20
	},
	card: {
		width: 350,
		height: 200,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		margin: 20
	}
});
export default Sample2;