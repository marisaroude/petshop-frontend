export const parseLocalDate = str => {
  const [year, month, day] = str.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatLocalDate(date) {
  // Utiliza toLocaleDateString sin que el huso horario te cambie el número de dia
  return date.toLocaleDateString('es-ES', { timeZone: 'UTC' })
}
