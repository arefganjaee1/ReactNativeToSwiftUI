import { combineReducers } from 'redux'
import accToken from './AccTokenReducer'
import cookie from './CookieReducer'
import device from './DeviceReducer'
import devices from './DevicesReducer'
import mail from './EmailReducer'
import fcmToken from './FcmTokenReducer'
import mobile from './MobileReducer'
import position from './PositionReducer'
import QRCode from './QRCodeReducer'
import token from './TokenReducer'
import userData from './UserDataReducer'

export default combineReducers({
  token,
  mail,
  QRCode,
  device,
  position,
  accToken,
  fcmToken,
  cookie,
  userData,
  devices,
  mobile
})
