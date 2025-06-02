export const parseLocalDate = str => {
  const [year, month, day] = str.split('-').map(Number)
  return new Date(year, month - 1, day)
}
