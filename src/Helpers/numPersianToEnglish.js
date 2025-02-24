const convertPersianToEnglishNumber = number => {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  return String(number).replace(
    /[\u06F0-\u06F9]/g,
    digit => englishDigits[digit.charCodeAt(0) - 0x06f0]
  )
}
