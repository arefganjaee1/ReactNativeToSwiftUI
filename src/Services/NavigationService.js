import { DrawerActions } from '@react-navigation/native'
import React from 'react'

export const isReadyRef = React.createRef()
export const navigationRef = React.createRef()

export const toggleDrawer = () => {
  navigationRef?.current?.dispatch(DrawerActions.toggleDrawer())
}

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params)
}

export const navigateAndReset = (route, params = {}) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef?.current?.reset({
      index: 0,
      routes: [{ name: route, params }]
    })
  }
}

export default {
  navigate,
  navigateAndReset,
  toggleDrawer
}
