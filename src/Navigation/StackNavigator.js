import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from '../Pages/Home/HomeScreen'
import NotificationsScreen from '../Pages/Notifications/NotificationsScreen'
import VerificationScreen from '../Pages/Verification/VerificationScreen'
import CONSTANTS from '../Values/Constants'
import AddDeviceScreen from './../Pages/AddDevice/AddDeviceScreen'
import CameraScannerScreen from './../Pages/CameraScanner/CameraScannerScreen'
import CommandSendingScreen from './../Pages/CommandSending/CommandSendingScreen'
import ContactSupportScreen from './../Pages/ContactSupport/ContactSupportScreen'
import DevicesScreen from './../Pages/Devices/DevicesScreen'
import EditDeviceScreen from './../Pages/EditDevice/EditDeviceScreen'
import EnterDeviceDataScreen from './../Pages/EnterDeviceData/EnterDeviceDataScreen'
import ForgetPassVerificationScreen from './../Pages/ForgetPassVerification/ForgetPassVerificationScreen'
import ForgotPasswordScreen from './../Pages/ForgotPassword/ForgotPasswordScreen'
import InformationScreen from './../Pages/Information/InformationScreen'
import InstallerScreen from './../Pages/Installer/InstallerScreen'
import NewPasswordScreen from './../Pages/NewPassword/NewPasswordScreen'
import PaymentScreen from './../Pages/Payment/PaymentScreen'
import RegistrationScreen from './../Pages/Registration/RegistrationScreen'
import ReportsScreen from './../Pages/Reports/ReportsScreen'
import SignInScreen from './../Pages/SignIn/SignInScreen'
import SignUpScreen from './../Pages/SignUp/SignUpScreen'
import SMSRechargeScreen from './../Pages/SMSRecharge/SMSRechargeScreen'
import SplashScreen from './../Pages/Splash/SplashScreen'
import SubscriptionRechargeScreen from './../Pages/SubscriptionRecharge/SubscriptionRechargeScreen'
import SurveyScreen from './../Pages/Survey/SurveyScreen'
import UserAccountScreen from './../Pages/UserAccount/UserAccountScreen'

const {
  SIGN_UP_SCREEN,
  SIGN_IN_SCREEN,
  SPLASH_SCREEN,
  VERIFICATION_SCREEN,
  REGISTRATION_SCREEN,
  INSTALLER_SCREEN,
  INFORMATION_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  NEW_PASSWORD_SCREEN,
  HOME_SCREEN,
  REPORTS_SCREEN,
  USER_ACCOUNT_SCREEN,
  NOTIFICATIONS_SCREEN,
  SUBSCRIPTION_RECHARGE_SCREEN,
  SMS_RECHARGE_SCREEN,
  DEVICES_SCREEN,
  ADD_DEVICE_SCREEN,
  EDIT_DEVICE_SCREEN,
  COMMAND_SENDING_SCREEN,
  CONTACT_SUPPORT_SCREEN,
  SURVEY_SCREEN,
  CAMERA_SCANNER_SCREEN,
  ENTER_DEVICE_DATA_SCREEN,
  FORGET_PASS_VERIFICATION_SCREEN,
  PAYMENT_SCREEN
} = CONSTANTS.Routes

const Stack = createNativeStackNavigator()

export const MainStack = () => {
  return (
    <Stack.Navigator headerMode='none' initialRouteName={SplashScreen}>
      <Stack.Screen
        name={SPLASH_SCREEN}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SIGN_IN_SCREEN}
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={VERIFICATION_SCREEN}
        component={VerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CAMERA_SCANNER_SCREEN}
        component={CameraScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={REGISTRATION_SCREEN}
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={INSTALLER_SCREEN}
        component={InstallerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={INFORMATION_SCREEN}
        component={InformationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NEW_PASSWORD_SCREEN}
        component={NewPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={REPORTS_SCREEN}
        component={ReportsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={USER_ACCOUNT_SCREEN}
        component={UserAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NOTIFICATIONS_SCREEN}
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SUBSCRIPTION_RECHARGE_SCREEN}
        component={SubscriptionRechargeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SMS_RECHARGE_SCREEN}
        component={SMSRechargeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={DEVICES_SCREEN}
        component={DevicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ADD_DEVICE_SCREEN}
        component={AddDeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={EDIT_DEVICE_SCREEN}
        component={EditDeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={COMMAND_SENDING_SCREEN}
        component={CommandSendingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CONTACT_SUPPORT_SCREEN}
        component={ContactSupportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SURVEY_SCREEN}
        component={SurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ENTER_DEVICE_DATA_SCREEN}
        component={EnterDeviceDataScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={FORGET_PASS_VERIFICATION_SCREEN}
        component={ForgetPassVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PAYMENT_SCREEN}
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
