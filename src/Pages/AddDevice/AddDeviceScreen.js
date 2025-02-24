import React, { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import AddDeviceForm from '../../Components/AddDeviceForm'
import DrawerMenu from '../../Components/DrawerMenu'
import Header2 from '../../Components/Header2/Header2'
import styles from './AddDeviceStyles'

const AddDeviceScreen = ({ navigation }) => {
  //============================STATE==========================
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  //============================Functions==========================
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    console.log('drawer opened')
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...{ navigation }}
      ></DrawerMenu>
      <Header2 {...{ navigation, toggleDrawer }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrol}
      >
        <AddDeviceForm {...{ navigation }} />
      </ScrollView>
    </SafeAreaView>
  )
}
export default AddDeviceScreen
