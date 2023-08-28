export const generateItemid = () => {
  return +Math.floor(Math.random() * 10000000000)
}
export const generateShopid = () => {
  return +Math.floor(Math.random() * 1000000000)
}
export const generateUserid = () => {
  return +Math.floor(Math.random() * 100000000)
}
export const generateCatid = () => {
  return +Math.floor(Math.random() * 1000000)
}
export const generateCmtid = () => {
  return +Math.floor(Math.random() * 10000000000)
}
export const generateCartid = () => {
  return +Math.floor(Math.random() * 10000000000000)
}
export const generateOrderid = () => {
  return +Math.floor(Math.random() * 1000000000000000)
}
export const generateChatid = () => {
  return +Math.floor(Math.random() * 100000000000000000)
}
export const generateRoomid = (userid: any, shopid: any) => {
  return userid + shopid
}
