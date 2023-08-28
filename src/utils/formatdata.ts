export const formatDataResponse = (data: any) => {
  let attributes
  let tier_variations
  let images
  let deep_discount_skin
  let voucher
  let video
  let shop_info
  if (data?.attributes) {
    const names = data.attributes.name !== null ? JSON.parse(data.attributes.name) : null
    const values = data.attributes.value !== null ? JSON.parse(data.attributes.value) : null
    const attributeid = data.attributes.attributeid !== null ? data.attributes.attributeid : null

    if (attributeid != null) {
      attributes = {
        attributeid: attributeid,
        option:
          names !== null
            ? names.map((name: string, index: any) => ({
                name,
                value: values[index]
              }))
            : null
      }
    } else {
      attributes = {}
    }
  }

  if (data?.tier_variations) {
    const options = data?.tier_variations?.option !== null ? JSON.parse(data?.tier_variations?.option) : null
    const images = data?.tier_variations?.images !== null ? JSON.parse(data?.tier_variations?.images) : null
    tier_variations = {
      name: data?.tier_variations?.name !== null ? data?.tier_variations?.name : null,
      options: options !== null ? options : null,
      images: images !== null ? images : null
    }
  }

  if (data?.images) {
    images = JSON.parse(data?.images)
  } else {
    images = data?.images
  }

  if (data?.deep_discount_skin?.discountid === null) {
    deep_discount_skin = {}
  } else {
    deep_discount_skin = data?.deep_discount_skin
  }

  if (data?.voucher?.promotion_id === null) {
    voucher = {}
  } else {
    voucher = data?.voucher
  }

  if (data?.video?.video_id === null) {
    video = {}
  } else {
    video = data?.video
  }

  if (data?.shop_info?.shopid === null) {
    shop_info = {}
  } else {
    shop_info = data?.shop_info
  }

  return {
    ...data,
    images: images,
    tier_variations,
    attributes,
    deep_discount_skin,
    video,
    voucher,
    shop_info
  }
}
