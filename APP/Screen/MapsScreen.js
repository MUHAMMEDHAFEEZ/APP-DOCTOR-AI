import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Find nearest hospital in Egypt
        findNearestHospital(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocationPermission();
  }, []);

  const findNearestHospital = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&limit=1`
      );

      const data = await response.json();

      // Check if the response contains address details
      if (data && data.address) {
        const hospitalResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=hospital&lat=${latitude}&lon=${longitude}&addressdetails=1&countrycodes=EG`
        );

        const hospitalData = await hospitalResponse.json();

        if (hospitalData.length > 0) {
          const nearest = hospitalData[0];
          setNearestHospital({
            latitude: parseFloat(nearest.lat),
            longitude: parseFloat(nearest.lon),
            name: nearest.display_name,
          });

          // Move map to the nearest hospital
          mapRef.current.animateToRegion({
            latitude: parseFloat(nearest.lat),
            longitude: parseFloat(nearest.lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          Alert.alert('Error', 'No hospitals found nearby in Egypt.');
        }
      } else {
        Alert.alert('Error', 'Address details not found.');
      }
    } catch (error) {
      console.error('Error finding nearest hospital:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
            />
          )}

          {nearestHospital && (
            <Marker
              coordinate={{
                latitude: nearestHospital.latitude,
                longitude: nearestHospital.longitude,
              }}
              title={nearestHospital.name}
              pinColor="red"
            />
          )}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
