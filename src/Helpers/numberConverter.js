export function convertEnglishToPersianNumber (englishNumber) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  let persianNumber = ''

  for (let i = 0; i < englishNumber?.length; i++) {
    const digit = parseInt(englishNumber[i])
    if (!isNaN(digit)) {
      persianNumber += persianDigits[digit]
    } else {
      persianNumber += englishNumber[i]
    }
  }

  return persianNumber
}
