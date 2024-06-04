import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { ICONS } from "../../Constants";
import { heightPixel, pixelSizeVertical } from "../../styles/Responsive";
import GlobalStyle from "../../styles/GlobalStyle";

const LocationComponent = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  return (
    <View style={[GlobalStyle.statisticContainer, { overflow: "hidden" }]}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 13.0129852,
          longitude: 80.2118398,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
            // icon={require('path/to/custom/icon.png')}
            // You can customize the marker icon here
            // For example, you can use custom images or the default marker icon
          />
        ))}
      </MapView>
      <Pressable
        onPress={() => navigation.navigate("MapFullView")}
        style={{ position: "absolute", right: 10, top: 10 }}
      >
        <ICONS.FullViewBtn />
      </Pressable>
    </View>
  );
};

export default LocationComponent;

const styles = StyleSheet.create({});
