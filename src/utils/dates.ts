const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-')
  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}

export { formatDate }
