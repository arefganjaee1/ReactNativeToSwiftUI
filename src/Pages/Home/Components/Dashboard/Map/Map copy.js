import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import Images from '../../../../../Theme/Images'
import styles from './style'

const Map = ({ socketData }) => {
  const INITIAL_ZOOM = 15
  const INITIAL_REGION = {
    latitude: 35.74441960479204,
    longitude: 51.356616419024135,
    latitudeDelta: 0.01, // Adjust for zoom level
    longitudeDelta: 0.01 // Adjust for zoom level
  }

  const [region, setRegion] = useState(INITIAL_REGION)

  const Device = useSelector(state => state.device.device)
  const Position = useSelector(state => state.position.position)
  const { Minus, Plus, Location, CarIcon, MotorIcon } = Images

  useEffect(() => {
    if (Position) {
      setRegion(prev => ({
        ...prev,
        latitude: Position.latitude,
        longitude: Position.longitude
      }))
    }
  }, [Position])

  useEffect(() => {
    if (
      socketData?.positions?.length > 0 &&
      socketData?.positions?.[0]?.deviceId === Device?.id
    ) {
      setRegion(prev => ({
        ...prev,
        latitude: socketData.positions[0].latitude,
        longitude: socketData.positions[0].longitude
      }))
    }
  }, [socketData])

  const handleMarkerPress = () => {
    console.log(`${Device?.name} marker pressed`)
  }

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsCompass={false}
        showsUserLocation={false}
      >
        {/* Marker */}
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}
          onPress={handleMarkerPress}
        >
          {/* <View style={styles.touchableContainer}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={handleMarkerPress}
            >
              <Text style={styles.touchableText}>{Device?.name}</Text>
              <View style={styles.carCover}>
                {Device?.category === 'motorcycle' ? (
                  <MotorIcon />
                ) : (
                  <CarIcon />
                )}
              </View>
              <Location />
            </TouchableOpacity>
          </View> */}
        </Marker>
      </MapView>
    </View>
  )
}

export default Map
