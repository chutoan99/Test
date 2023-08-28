export const formatCommentsResponse = (data: any) => {
  const formated = data
  const lengthResponse = formated.length
  for (let i = 0; i < lengthResponse; i++) {
    formated[i].images = JSON.parse(formated[i].images)
  }
  return formated
}
