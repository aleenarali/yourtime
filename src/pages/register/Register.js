import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid, Dimensions, Button } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux'

import { ADD_LOCATION, ADD_COORDINATE } from "../../reducer/Types";

const { width, height } = Dimensions.get("screen");

export default function Register({ navigation }) {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState([]);
  const [latitude] = useState(38.7259284);
  const [longitude] = useState(-9.137382, 17);
  const dispatch = useDispatch()

  useEffect(() => {
    getLocationUser()
  }, [])

  function getLocationUser() {
    let infoRegion = {
      key: markers.length,
      coords: {
        latitude: latitude,
        longitude: longitude,
      },
      pinColor: "#FF0000"
    }
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    setMarkers(() => [infoRegion])

  }

  function newMarker(e) {
    let infoNewRegion = {
      key: markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: "#FF0000"
    }
    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    setMarkers(() => [infoNewRegion])
    let coordinate = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
    }
    setLocation(() => [...coordinate])
  }


  const onPressMapLocation = () => {
    const data = {
      latitude: markers[0].coords.latitude,
      longitude: markers[0].coords.longitude
    }
    dispatch({ type: ADD_LOCATION, payload: data })
    dispatch({ type: ADD_COORDINATE, payload: location })
    navigation.navigate('Time')
  }

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={() => {
          Platform.OS === "android" ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            : ""
        }}
        style={styles.maps}
        region={region}
        zoomEnabled={true}
        minZoomLevel={7}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={(e) => newMarker(e)}
      >
        {markers.map(pins => {
          return (
            <Marker Key={pins.key} coordinate={pins.coords} pinColor={pins.pinColor}></Marker>
          )
        })}
      </MapView>
      <Button
        onPress={onPressMapLocation}
        style={styles.button}
        title="Salvar localização com o mapa"
        accessibilityLabel="Salvar localização com o mapa"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    height: height,
    width: width,
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: "#0089a5",
    borderRadius: 20,
    width: width,
  },
  buttonSave: {
    width: 50,
    height: 40,
    background: "#0089a5",
  },
  containerInput: {
    position: "absolute",
    justifyContent: "space-around",
    alignItems: 'flex-end',
    width: width,
    height: height,
    marginBottom: 20,
    paddingBottom: 115,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    width: "38%",
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#0089a5",
    borderRadius: 20,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1
  }
})
