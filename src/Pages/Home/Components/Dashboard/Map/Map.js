import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import Images from '../../../../../Theme/Images'
import styles from './style'

const Map = ({ socketData }) => {
  const INITIAL_REGION = {
    latitude: 35.74441960479204,
    longitude: 51.356616419024135,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }

  const [region, setRegion] = useState(INITIAL_REGION)
  const [markerPosition, setMarkerPosition] = useState({
    latitude: INITIAL_REGION.latitude,
    longitude: INITIAL_REGION.longitude
  })
  const [isFirstLoad, setIsFirstLoad] = useState(true) // Track first load

  const Device = useSelector(state => state.device.device)
  const Position = useSelector(state => state.position.position)
  const { Minus, Plus, Location, CarIcon, MotorIcon } = Images

  // Update marker position and center map during first load
  useEffect(() => {
    if (Position) {
      const newMarkerPosition = {
        latitude: Position.latitude,
        longitude: Position.longitude
      }
      setMarkerPosition(newMarkerPosition)

      if (isFirstLoad) {
        setRegion({
          ...region,
          ...newMarkerPosition
        })
        setIsFirstLoad(false) // Prevent recentering on subsequent updates
      }
    }
  }, [Position])

  // Update marker position based on socketData
  useEffect(() => {
    if (
      socketData?.positions?.length > 0 &&
      socketData?.positions?.[0]?.deviceId === Device?.id
    ) {
      const newMarkerPosition = {
        latitude: socketData.positions[0].latitude,
        longitude: socketData.positions[0].longitude
      }
      setMarkerPosition(newMarkerPosition)

      if (isFirstLoad) {
        setRegion({
          ...region,
          ...newMarkerPosition
        })
        setIsFirstLoad(false) // Prevent recentering on subsequent updates
      }
    }
  }, [socketData])

  const handleZoomIn = () => {
    setRegion(prev => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2
    }))
  }

  const handleZoomOut = () => {
    setRegion(prev => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2
    }))
  }

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
          coordinate={markerPosition} // Marker is controlled independently
          onPress={handleMarkerPress}
        ></Marker>
      </MapView>
    </View>
  )
}

export default Map
