import * as yup from 'yup'
import CONSTANTS from '../Constants'
const {
  USER_REQUIRED,
  USER,
  NAME_REQUIRED,
  NAME,
  FAMILY_REQUIRED,
  FAMILY,
  MAIL_REQUIRED,
  VALID_MAIL,
  MAIL,
  PHONE_REQUIRED,
  PHONE,
  ADDRESS_REQUIRED,
  ADDRESS,
  DEVICE_NAME_LENGTH,
  DEVICE_NAME_REQUIRED,
  DEVICE_NAME,
  IMEI_LENGTH,
  IMEI_REQUIRED,
  IMEI,
  MOVING_REQUIRED,
  MOVING,
  MOBILE_LENGTH,
  MOBILE_REQUIRED,
  MOBILE,
  FULL_NAME_REQUIRED,
  FULL_NAME,
  EMAIL_REQUIRED,
  EMAIL,
  PASSWORD_LENGTH,
  PASSWORD_REQUIRED,
  PASSWORD,
  PASSWORD_EQUAL,
  ADDRESS_LENGTH
} = CONSTANTS.SCHEMES

const SIGN_IN_FORM = yup.object().shape({
  user: yup
    .string()
    .required(USER_REQUIRED)
    .label(USER)
    .min(11, MOBILE_LENGTH)
    .max(11, 'شماره موبایل صحیح نیست'),
  password: yup
    .string()
    .min(8, PASSWORD_LENGTH)
    .required(PASSWORD_REQUIRED)
    .label(PASSWORD)
})
const REGISTER_FORM = yup.object().shape({
  mobile: yup
    .string()
    .required(MOBILE_REQUIRED)
    .label(MOBILE)
    .min(11, MOBILE_LENGTH)
    .max(11, 'شماره موبایل صحیح نیست'),
  fullname: yup.string().required(FULL_NAME_REQUIRED).label(FULL_NAME),
  email: yup.string().required(EMAIL_REQUIRED).label(EMAIL).email(VALID_MAIL),
  password: yup
    .string()
    .required(PASSWORD_REQUIRED)
    .label(PASSWORD)
    .min(8, PASSWORD_LENGTH),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], PASSWORD_EQUAL)
    .required(PASSWORD_REQUIRED)
    .label(PASSWORD)
    .min(8, PASSWORD_LENGTH)
})
const SIGN_UP_FORM = yup.object().shape({
  mobile: yup
    .string()
    .min(11, MOBILE_LENGTH)
    .max(11, 'شماره موبایل صحیح نیست')
    .required(MOBILE_REQUIRED)
    .label(MOBILE)
})
const FORGET_PASSWORD_FORM = yup.object().shape({
  mobile: yup
    .string()
    .min(11, MOBILE_LENGTH)
    .max(11, 'شماره موبایل صحیح نیست')
    .required(MOBILE_REQUIRED)
    .label(MOBILE)
})

const USER_ACCOUNT_FORM = yup.object().shape({
  name: yup.string().required(NAME_REQUIRED).label(NAME),
  email: yup.string().email(VALID_MAIL).required(MAIL_REQUIRED).label(MAIL),
  phone: yup
    .string()
    .required(PHONE_REQUIRED)
    .label(PHONE)
    .min(11, MOBILE_LENGTH)
    .max(11, 'شماره موبایل صحیح نیست')
})
const NEW_PASSWORD_FORM = yup.object().shape({
  password: yup
    .string()
    .min(8, PASSWORD_LENGTH)
    .required(PASSWORD_REQUIRED)
    .label(PASSWORD),
  newPassword: yup
    .string()
    .min(8, PASSWORD_LENGTH)
    .required(PASSWORD_REQUIRED)
    .label(PASSWORD)
})

const DEVICE_DATA_FORM = yup.object().shape({
  deviceName: yup
    .string()
    .min(4, DEVICE_NAME_LENGTH)
    .required(DEVICE_NAME_REQUIRED)
    .label(DEVICE_NAME),
  address: yup.string().min(10, IMEI_LENGTH).required(IMEI_REQUIRED).label(IMEI)
})
const TRANSFER_DEVICE_FORM = yup.object().shape({
  mobile: yup
    .string()
    .min(11, MOBILE_LENGTH)
    .required(MOBILE_REQUIRED)
    .label(MOBILE)
})

const ADD_DEVICE_FORM = yup.object().shape({
  deviceName: yup
    .string()
    .min(3, DEVICE_NAME_LENGTH)
    .required(DEVICE_NAME_REQUIRED)
    .label(DEVICE_NAME),
  address: yup
    .string()
    .min(3, ADDRESS_LENGTH)
    .required(ADDRESS_REQUIRED)
    .label(ADDRESS),
  IMEI: yup
    .string()
    .min(10, IMEI_LENGTH)
    .max(10, IMEI_LENGTH)
    .required(MOBILE_REQUIRED)
    .label(MOBILE),
  wayToInstall: yup
    .number()
    .required('انتخاب روش نصب الزامی است')
    .label('روش نصب'),
  movingType: yup
    .number()
    .required('انتخاب نوع متحرک الزامی است')
    .label('نوع متحرک')
})
const ADD_DEVICE_FORM2 = yup.object().shape({
  deviceName: yup
    .string()
    .min(3, DEVICE_NAME_LENGTH)
    .required(DEVICE_NAME_REQUIRED)
    .label(DEVICE_NAME),
  IMEI: yup
    .string()
    .min(10, IMEI_LENGTH)
    .max(10, IMEI_LENGTH)
    .required(MOBILE_REQUIRED)
    .label(MOBILE),
  wayToInstall: yup
    .number()
    .required('انتخاب روش نصب الزامی است')
    .label('روش نصب'),
  movingType: yup
    .number()
    .required('انتخاب نوع متحرک الزامی است')
    .label('نوع متحرک')
})
export default {
  SIGN_IN_FORM,
  SIGN_UP_FORM,
  FORGET_PASSWORD_FORM,
  REGISTER_FORM,
  NEW_PASSWORD_FORM,
  USER_ACCOUNT_FORM,
  DEVICE_DATA_FORM,
  TRANSFER_DEVICE_FORM,
  ADD_DEVICE_FORM,
  ADD_DEVICE_FORM2
}
