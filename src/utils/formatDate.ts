const formatDate = (time: number): string => {
  const date = new Date(time * 1000)
  return date.toLocaleString()
}

export default formatDate
