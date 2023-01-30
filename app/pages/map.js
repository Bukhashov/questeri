import React, {useEffect, useState} from 'react';
import MapView ,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
// import { GOOGLE_MAPS_API_KEY } from '@env';
import * as Location from 'expo-location';
// import MapViewDirections from 'react-native-maps-directions';

export default function Map() {
  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELETA = 0.09;
  const LONGITUDE_DELTA = LATITUDE_DELETA * ASPECT_RATIO;
  
  const [mapRegion, setMapRegion] = useState({
    latitude: 49.8057253,
    longitude: 73.077113,
    latitudeDelta: LATITUDE_DELETA,
    longitudeDelta: LONGITUDE_DELTA,
  })

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922,
          })
          // setLocation(location);
        })();
    }, []);

    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 37.771707, longitude: -122.4053769};

    return(
        <View style={styles.container}>
            <MapView
              style={styles.map} 
              provider={PROVIDER_GOOGLE}
              region={mapRegion}
              >
                <Marker coordinate={mapRegion} title="marker"/>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
      backgroundColor: '#0000',
    },
});