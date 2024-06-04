import { Pressable, StyleSheet, Text, View  } from 'react-native'
import React , {useState} from 'react'
import GlobalStyle from '../../styles/GlobalStyle'
import MapView, { Marker } from "react-native-maps";
import { ICONS, UNIQUEWIDTH, COLORS, ASPECTRADIO} from '../../Constants';
import { pixelSizeHorizontal, pixelSizeVertical,heightPixel,} from '../../styles/Responsive';
import { useNavigation } from "@react-navigation/native";

const MapFullView = () => {
 const [locations, setLocations] = useState([]);
 const navigation = useNavigation();
  return (
    <View style={styles.MapContainer}>    
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
       <View style={{position:"absolute", top:10, flexDirection:'row', width:UNIQUEWIDTH.wid , justifyContent:'space-between', paddingHorizontal:pixelSizeHorizontal(20) }}>
   <Pressable onPress={()=>navigation.goBack()}><ICONS.GoBack/></Pressable>
   <Pressable><ICONS.Filter/></Pressable>
    </View>
   
    </View>
  )
}

export default MapFullView

const styles = StyleSheet.create({
MapContainer:{
// flex:1,
height:ASPECTRADIO.height,
width:ASPECTRADIO.width
}
})