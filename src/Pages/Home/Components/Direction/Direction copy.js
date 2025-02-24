// import MapLibreGL from '@maplibre/maplibre-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, PermissionsAndroid, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { openSettings, PERMISSIONS, request } from 'react-native-permissions'
import { useSelector } from 'react-redux'
import Images from '../../../../Theme/Images'
import styles from './style'

const Direction = () => {
  //============================STATE==========================
  const [currentLocation, setCurrentLocation] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState([
    51.356616419024135, 35.74441960479204
  ])
  const [directions, setDirections] = useState(null)
  //============================Constants==========================
  const Device = useSelector(state => state.device.device)
  const Position = useSelector(state => state.position.position)
  const { CarIcon, Location, MotorIcon } = Images
  const styleURL =
    'https://map.ir/vector/styles/main/mapir-xyz-style-min-poi.json'
  //============================Functions==========================
  useEffect(() => {
    if (Position) {
      setDestinationLocation([Position?.longitude, Position?.latitude])
    }
  }, [Position])
  // MapLibreGL.setAccessToken(null)
  // MapLibreGL.addCustomHeader(
  //   'x-api-key',
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNGY3OTlhMmViYzQ5M2VmNzc2YWJkMmQ0NjRhNjgzMjI5ZjAxNTI0NTE3MzViZTcwMDk2ODlhZDNhNTlhOWY5MjMwZjJhYmViMjgyYzgxIn0.eyJhdWQiOiIyNTg1NiIsImp0aSI6ImEyNGY3OTlhMmViYzQ5M2VmNzc2YWJkMmQ0NjRhNjgzMjI5ZjAxNTI0NTE3MzViZTcwMDk2ODlhZDNhNTlhOWY5MjMwZjJhYmViMjgyYzgxIiwiaWF0IjoxNzIxMzA3Mzg0LCJuYmYiOjE3MjEzMDczODQsImV4cCI6MTcyMjE3MTM4NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.A-8Y3s_iEnpIeLXW_4YORy3-GnwZuzNzlcOjXIUKvo0wkG_gkQXOeKxSpvptNdaQwgYguldtDnAZwcE_LCKM89ykzQJ1yT4u7GOfjaWgWi20374vTAEW_D4m5xowM97b-ZjDPwQ0ssv60mZWN5IBWaAOYGN120mWpbdeUKNfUY8YULaumCsCxAZDgREMRBZ1qpN5dZg3dtd1Q-tOPPCzBAhaXYEw4w2uDX-FWrAhvnNv1MSDD-XoZYKoFRzJHdAWDNYSsolVqh5hcndSTb0869faoAOd8LyiXTFM8SNXf9AJRa0kFgXEmRpNbY0G8h8oMrqYa_FVILA1vas3f9PNRQ'
  // )
  useEffect(() => {
    requestLocationPermission()
    requestIosLocationPermission()
  }, [])
  const requestIosLocationPermission = async () => {
    const result = await request(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE // or PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    )
    console.log(result) // Output: 'granted', 'denied', etc.
  }
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Renolos needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getGeoLocation()
      } else {
        Alert.alert(
          'Access denied',
          'To use location you need to grant access to your location',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Go to settings',
              onPress: () =>
                openSettings().catch(() => console.log('cannot open settings'))
            }
          ]
        )
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ latitude, longitude })
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
          `https://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${destinationLocation[0]},${destinationLocation[1]}?overview=full&geometries=geojson`
        )
        const data = await response.json()
        const geometry = data.routes[0].geometry

        const route = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: geometry.coordinates
          }
        }

        setDirections({
          type: 'FeatureCollection',
          features: [route]
        })

        // Fit to bounds
        if (currentLocation) {
          const bounds = [
            [currentLocation.longitude, currentLocation.latitude],
            destinationLocation
          ]
          this.mapCamera.fitBounds(
            [
              Math.min(bounds[0][0], bounds[1][0]),
              Math.min(bounds[0][1], bounds[1][1])
            ],
            [
              Math.max(bounds[0][0], bounds[1][0]),
              Math.max(bounds[0][1], bounds[1][1])
            ],
            50, // padding in pixels
            1000 // animation duration in ms
          )
        }
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
        {/* <MapLibreGL.MapView
          styleURL={styleURL}
          style={styles.map}
          compassEnabled={false}
        >
          <MapLibreGL.Camera
            ref={ref => {
              this.mapCamera = ref
            }}
            animationDuration={1000}
          />

          {currentLocation && (
            <MapLibreGL.PointAnnotation
              id='currentLocationMarker'
              coordinate={[currentLocation.longitude, currentLocation.latitude]}
            />
          )}

          <MapLibreGL.MarkerView
            coordinate={destinationLocation}
            id='destination'
          >
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
          </MapLibreGL.MarkerView>

          {directions && (
            <MapLibreGL.ShapeSource id='directions' shape={directions}>
              <MapLibreGL.LineLayer
                id='directionsLine'
                style={{
                  lineColor: Colors.orange,
                  lineWidth: 3,
                  lineCap: MapLibreGL.LineJoin.Round,
                  lineJoin: MapLibreGL.LineJoin.Round
                }}
              />
            </MapLibreGL.ShapeSource>
          )}
        </MapLibreGL.MapView> */}
      </View>
    </View>
  )
}

export default Direction
