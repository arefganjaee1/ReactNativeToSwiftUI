import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux'
import RootScreen from './src/Pages/Root/RootScreen'
import { NetworkProvider } from './src/Services/NetworkContext'
import { store } from './src/Stores/storeConfig/store'
import { Colors } from './src/Theme'

const App = () => {
  const height = StatusBar.currentHeight + 5

  return (
    <Provider store={store}>
      <ToastProvider offsetTop={height} swipeEnabled={true}>
        <NetworkProvider>
          <StatusBar backgroundColor={Colors.dark} />
          <RootScreen />
        </NetworkProvider>
      </ToastProvider>
    </Provider>
  )
}

export default App
