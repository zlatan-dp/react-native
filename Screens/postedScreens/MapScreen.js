import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: "37.4226711",
          longitude: "-122.0849872",
          latitudeDelta: "0.09",
          longitudeDelta: "0.05",
        }}
        zoomEnabled={true}
      >
        <Marker
          coordinate={{ latitude: "37.4226711", longitude: "-122.0849872" }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default MapScreen;
