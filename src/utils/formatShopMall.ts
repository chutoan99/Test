export const formatShopMall = (shopMallList: any[]) => {
  const ShopMallArray = []
  for (let i = 0; i < shopMallList.length; i++) {
    const newArray = [
      {
        image: shopMallList[i]?.image,
        promo_text: shopMallList[i]?.promo_text,
        shopid: shopMallList[i]?.shopid,
        url: shopMallList[i]?.url,
        id: shopMallList[i]?.id,
        createdAt: shopMallList[i]?.createdAt,
        updatedAt: shopMallList[i]?.updatedAt
      },
      {
        image: shopMallList[i + 1]?.image,
        promo_text: shopMallList[i + 1]?.promo_text,
        shopid: shopMallList[i + 1]?.shopid,
        url: shopMallList[i + 1]?.url,
        id: shopMallList[i + 1]?.id,
        createdAt: shopMallList[i + 1]?.createdAt,
        updatedAt: shopMallList[i + 1]?.updatedAt
      }
    ]
    i++
    ShopMallArray.push(newArray)
  }
  return ShopMallArray
}
