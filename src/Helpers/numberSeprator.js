export const numberSeprator = number => {
  const numericValue = number.replace(/[^\d]/g, '')
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
