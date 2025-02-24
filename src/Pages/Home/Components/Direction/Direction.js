import React, { useEffect, useState } from 'react'
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, Polyline } from 'react-native-maps'
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS
} from 'react-native-permissions'
import { useSelector } from 'react-redux'
import { Colors } from '../../../../Theme'
import Images from '../../../../Theme/Images'
import styles from './style'

const Direction = () => {
  //============================STATE==========================
  const [currentLocation, setCurrentLocation] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 35.74441960479204,
    longitude: 51.356616419024135
  })
  const [directions, setDirections] = useState([])

  //============================Constants==========================
  const Device = useSelector(state => state.device.device)
  const Position = useSelector(state => state.position.position)
  const { CarIcon, Location, MotorIcon } = Images

  //============================Functions==========================
  useEffect(() => {
    if (Position) {
      setDestinationLocation({
        latitude: Position.latitude,
        longitude: Position.longitude
      })
    }
  }, [Position])

  useEffect(() => {
    handlePermissions()
  }, [])
  const handlePermissions = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

      const status = await check(permission)

      switch (status) {
        case RESULTS.UNAVAILABLE:
          console.log('Location permission unavailable on this device.')
          handlePermissionResult(result)
          break

        case RESULTS.DENIED:
          // Request permission if not already granted
          const result = await request(permission)
          handlePermissionResult(result)
          break

        case RESULTS.GRANTED:
          console.log('Location permission already granted.')
          handlePermissionResult(RESULTS.GRANTED)
          break

        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Location permission is blocked. Please enable it in settings.',
            [
              { text: 'Open Settings', onPress: () => openSettings() },
              { text: 'Cancel', style: 'cancel' }
            ]
          )
          break

        default:
          console.log('Unhandled permission status:', status)
      }
    } catch (error) {
      console.error('Error checking/requesting location permission:', error)
    }
  }

  const handlePermissionResult = result => {
    switch (result) {
      case RESULTS.GRANTED:
        getGeoLocation()
        console.log('Location permission granted.')
        break
      case RESULTS.DENIED:
        console.log('Location permission denied.')
        break
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'Location permission is blocked. Please enable it in settings.',
          [
            { text: 'Open Settings', onPress: () => openSettings() },
            { text: 'Cancel', style: 'cancel' }
          ]
        )
        break

      default:
        console.log('Unhandled permission result:', result)
    }
  }

  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ latitude, longitude })
        console.log('currentLocation >>>', currentLocation)
      },
      error => {
        console.log('Error getting current location:', error)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  const calculateDirections = async () => {
    if (currentLocation && destinationLocation) {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${destinationLocation.longitude},${destinationLocation.latitude}?overview=full&geometries=geojson`
        )
        const data = await response.json()
        const geometry = data.routes[0].geometry

        setDirections(
          geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0]
          }))
        )
      } catch (error) {
        console.log('Error calculating directions:', error)
      }
    }
  }

  useEffect(() => {
    if (currentLocation) {
      calculateDirections()
    }
  }, [currentLocation])

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: destinationLocation.latitude,
            longitude: destinationLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          showsCompass={false}
        >
          {currentLocation && (
            <Marker coordinate={currentLocation} title='Current Location' />
          )}

          <Marker coordinate={destinationLocation} title={Device?.name}>
            <View style={styles.touchableContainer}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => console.log('')}
              >
                <Text style={styles.touchableText}>{Device?.name}</Text>
                <View style={styles.carCover}>
                  {Device?.category === 'motorcycle' ? (
                    <MotorIcon />
                  ) : Device?.category === 'car' ? (
                    <CarIcon />
                  ) : (
                    <CarIcon />
                  )}
                </View>
                <Location />
              </TouchableOpacity>
            </View>
          </Marker>

          {directions.length > 0 && (
            <Polyline
              coordinates={directions}
              strokeColor={Colors.orange}
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>
    </View>
  )
}

export default Direction
