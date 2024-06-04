import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, FlatList, Pressable,Animated } from 'react-native';
import { ASPECTRADIO, CENTERSCREEN, COLORS, FONT, ICONS, SIZES } from '../../Constants';
import GlobalStyle from '../../styles/GlobalStyle';
import { heightPixel, pixelSizeVertical, widthPixel } from '../../styles/Responsive';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const data = [
  {
    title: 'Welcome To Procurement Infield Manager',
    content: '"Elevate procurement efficiency with Procurement Infield Manager – your streamlined solution for sourcing and vendor management."',
    image: <ICONS.Onboarding1/>,
  },
  {
    title: 'No More Paperwork',
    content: '"Embrace simplicity with Procurement Infield Manager – no more paperwork, just efficient and streamlined procurement process at your fingertips."',
    image: <ICONS.Onboarding2/>,
  },
  {
    title: 'Gear up for your procurement journey',
    content: `"Hey! Ready for a procurement adventure? Let's make buying stuff easy!"`,
    image: <ICONS.Onboarding3/>,
  },
];

const OnBoarding = () => {
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const cartPosition = useRef(new Animated.Value(20)).current;
  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);

    // Animate cart position
    if (newIndex === 0) {
      Animated.timing(cartPosition, {
        toValue: 20,
        duration:500,
        useNativeDriver: false,
      }).start();
    } else if (newIndex === data.length - 1) {
      Animated.timing(cartPosition, {
        toValue: width/1.5,
        duration:500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(cartPosition, {
        toValue: width / 2.35,
        duration:500,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to the next screen or perform any desired action
      navigation.navigate("ProfileInfo")
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };



//   const handleScrollBeginDrag = () => {
//     setIsMoving(true);
//   };

//   const handleScrollEndDrag = () => {
//     setIsMoving(false);
//   };

const [isMoving, setIsMoving] = useState(false);
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View>{item.image}</View>
      <Text style={[GlobalStyle.onBoaringHeadLine,{marginTop:heightPixel(70)}]}>{item.title}</Text>
      <Text style={[GlobalStyle.onBoaringText,{marginVertical:pixelSizeVertical(20)}]}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        // onScrollBeginDrag={handleScrollBeginDrag}
        // onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      />
      <View style={styles.bottomIndicator}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, { backgroundColor: index === currentIndex ? COLORS.primary : COLORS.PlaceHolderText }]}
          />
        ))}
      </View>
      <Animated.View style={[styles.cartButton, { left: cartPosition }]}>
        {isMoving ? <ICONS.OnbordingCartWithMove/> : <ICONS.OnbordingCartWithoutMove/>}
      </Animated.View>
      {/* <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
        <Text style={styles.prevButtonText}>Previous</Text>
      </TouchableOpacity> */}
      <Pressable style={currentIndex === data.length - 1 ? [styles.nextButton] :[styles.swipeButton] } onPress={handleNext}>
        <Text style={currentIndex === data.length - 1 ? [styles.nextButtonText]:[styles.swipeButtonText]}>{currentIndex === data.length - 1 ? 'Next' : 'Swipe'}</Text>
      </Pressable>
      {/* {currentIndex === data.length - 1 ? null :
      <View style={styles.boreDerHead}>
      <View style={styles.boreDer}></View>
      </View>
} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:pixelSizeVertical(20),
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomIndicator: {
   flexDirection: 'row',
    justifyContent: 'center',
    position:'absolute',
    top:ASPECTRADIO.height*0.87,
    width:ASPECTRADIO.width

  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  prevButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  prevButtonText: {
    color: '#5E8D48',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: COLORS.primary,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    width:widthPixel(110),
    height:heightPixel(42)
  },
swipeButton: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    // backgroundColor: COLORS.primary,
    justifyContent:"center",
    alignItems:'center',
    borderRadius: 6,
    width:widthPixel(80),
    height:heightPixel(42)
  },

  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.size14,
    fontFamily:FONT.EuclidSemiBold
  },
    swipeButtonText: {
    color: COLORS.SecondaryText,
    fontSize: SIZES.medium,
    fontFamily:FONT.EuclidRegular
  },
   cartButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 20,
  },
  boreDerHead:{
    position:"absolute",
   top:ASPECTRADIO.height*0.965,
   alignItems:"center",
   width:ASPECTRADIO.width
  },
  boreDer:{
  width:widthPixel(360), 
  height:heightPixel(1), 
  backgroundColor:COLORS.PlaceHolderText,

  },
});

export default OnBoarding;
