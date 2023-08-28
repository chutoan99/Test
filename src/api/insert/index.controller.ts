const db = require('../../models/index')
import bcrypt from 'bcrypt'
const datas = require('../../../../data/data')
const HomeCategory = require('../../../../data/category_tree.json')
const banner = require('../../../../data/banner.json')
const batch_list = require('../../../../data/batch_list.json')
const search_suggestion = require('../../../../data/search_suggestion.json')
const notify = require('../../../../data/notify.json')
const flash_sale = require('../../../../data/flashSale/flash_sale.json')
const shopMall = require('../../../../data/shopMall.json')
const Top_Product = require('../../../../data/top.json')

const formatDate = (time: any) => {
  const date = new Date(time * 1000)
  return date.toLocaleString()
}

const hashPassWord = (password: any) => {
  const result = bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  return result
}

const InsertControllers = {
  Industries: async (req: any, res: any) => {
    try {
      for (let index = 1; index < 15; index++) {
        const global_cats = require(`../../../../data/cate/cate_${index}.json`).data.global_cats
        await global_cats.map((item: any, i: any) => {
          for (let j = 0; j < item?.path?.length; j++) {
            insertIndustry(item, j)
          }
        })
      }
      res.status(200).send('Industries processed successfully.')
    } catch (error) {
      console.log('loi server')
    }
  },

  Insert: async (req: any, res: any) => {
    try {
      for (const item of datas?.items || undefined) {
        insertPost(item)
        insertAttributes(item)
        insertTierVariations(item)
        insertVoucherInfo(item)
        insertVideoInfoList(item)
        insertDeepDiscountSkin(item)
      }
      res.status(200).send('insert processed successfully.')
    } catch {
      res.status(500).send('Internal Server Error')
    }
  },

  App: async (req: any, res: any) => {
    try {
      insertHomeCategory()
      insertBanner()
      insertShopMall()
      insertSearchSuggestion()
      insertNotify()
      insertBatchList()
      insertTopProduct()
      insertFlashSale()
      res.status(200).send('app processed successfully.')
    } catch (error) {
      console.log('loi server', error)
      res.status(500).send('Internal Server Error')
    }
  },

  Comment: async (req: any, res: any) => {
    try {
      // index from 0 - 1939
      const { start, end } = req.params
      for (let index = start; index < end; index++) {
        const ratings = require(`../../../../data/ratings/rating_${index}.json`).data?.ratings
        ratings.forEach((item: any) => {
          insertComment(item)
        })
      }
      res.status(200).send('comment processed successfully.')
    } catch (error) {
      console.log('loi server')
    }
  },

  Post: async (req: any, res: any) => {
    try {
      // index from 0 - 1314
      const { start, end } = req.params
      for (let index = start; index < end; index++) {
        const hotItems = require(`../../../../data/post/hot_items_${index}.json`).data.items
        hotItems.forEach((item: any) => {
          insertPost(item)
          insertTierVariations(item)
          insertVideoInfoList(item)
          insertVoucherInfo(item)
          insertDeepDiscountSkin(item)
        })
      }
      res.status(200).send('post processed successfully.')
    } catch (error) {
      console.log('loi server')
    }
  },

  Shop: async (req: any, res: any) => {
    const { start, end } = req.params
    // index from 1 - 714
    try {
      for (let index = start; index < end; index++) {
        const item = require(`../../../../data/shopDetail/shopDetail_${index}.json`)
        insertShop(item)
        insertUser(item)
      }
      res.status(200).send('Shops processed successfully.')
    } catch (error) {
      console.log('Error processing shops:', error)
      res.status(500).send('Internal server error.')
    }
  }
}
export default InsertControllers

const insertPost = (item: any) => {
  db.Post.create(
    {
      itemid: item?.itemid,
      shopid: item?.shopid,
      currency: item?.currency,
      stock: item?.stock,
      status: item?.status,
      sold: item?.sold,
      liked_count: item?.liked_count,
      promotion_id: item?.voucher_info?.promotion_id,
      video_id: item?.video_info_list[0]?.video_id,
      discountid: item?.itemid,
      tierid: item?.itemid,
      attributeid: item?.itemid,
      catid: item?.catid,
      cmt_count: item?.cmt_count,
      discount: item?.discount,
      description: item?.description,
      raw_discount: item?.raw_discount,
      size_chart: item?.size_chart === null ? null : `https://cf.shopee.vn/file/${item?.size_chart}`,
      shop_name: item?.shop_name,
      transparent_background_image:
        item?.transparent_background_image === '' ? null : `https://cf.shopee.vn/file/${item?.transparent_background_image}`,
      images: JSON.stringify(
        item?.images.map((item: any) => {
          return `https://cf.shopee.vn/file/${item}`
        })
      ),
      view_count: item?.view_count ? item?.view_count : 0,
      name: item?.name,
      image: item?.image === '' ? null : `https://cf.shopee.vn/file/${item?.image}`,
      historical_sold: item?.historical_sold,
      price: +item?.price / 100000,
      price_min: +item?.price_min / 100000,
      price_max: +item?.price_max / 100000,
      price_before_discount: +item?.price_before_discount / 100000,
      price_min_before_discount: +item?.price_min_before_discount / 100000,
      price_max_before_discount: +item?.price_max_before_discount / 100000,
      shop_rating: item?.shop_rating,
      liked: item?.liked ? true : false,
      is_official_shop: item?.is_official_shop,
      is_service_by_shopee: item?.is_service_by_shopee,
      show_free_shipping: item?.show_free_shipping,
      is_deep_discount_skin: item?.deep_discount_skin?.skin_data?.promo_label?.promotion_price !== '',
      is_video: typeof item?.video_info_list[0]?.video_id !== 'undefined',
      is_voucher: typeof item?.voucher_info?.promotion_id !== 'undefined',
      is_attributes: typeof item?.attributes?.[0].name !== 'undefined',
      ctime: formatDate(item?.ctime),
      createdAt: formatDate(item?.ctime)
    },
    { ignoreDuplicates: true }
  )
}

const insertTierVariations = (item: any) => {
  if (item?.tier_variations[0]?.name !== '') {
    item?.tier_variations?.map((ele: any) => {
      db.TierVariation.create(
        {
          tierid: item.itemid,
          name: ele?.name,
          option: JSON.stringify(ele?.options),
          images:
            ele?.images === null
              ? null
              : JSON.stringify(
                  ele?.images?.map((item: any) => {
                    return `https://cf.shopee.vn/file/${item}`
                  })
                )
        },
        { ignoreDuplicates: true }
      )
    })
  }
}

const insertAttributes = (item: any) => {
  if (typeof item?.attributes?.[0].name !== 'undefined') {
    db.Attribute.create(
      {
        attributeid: item.itemid,
        name: JSON.stringify(item?.attributes?.map((item: any) => item?.name)),
        value: JSON.stringify(item?.attributes?.map((item: any) => item?.value))
      },
      { ignoreDuplicates: true }
    )
  }
}

const insertVoucherInfo = (item: any) => {
  if (typeof item?.voucher_info?.promotion_id !== 'undefined') {
    db.VoucherProduct.create(
      {
        promotion_id: item?.voucher_info?.promotion_id,
        voucher_code: item?.voucher_info?.voucher_code,
        label: item?.voucher_info?.voucher_code
      },
      { ignoreDuplicates: true }
    )
  }
}

const insertVideoInfoList = (item: any) => {
  if (typeof item?.video_info_list[0]?.video_id !== 'undefined') {
    db.Video.create(
      {
        video_id: item?.video_info_list[0]?.video_id,
        thumb_url: item?.video_info_list[0]?.thumb_url,
        duration: item?.video_info_list[0]?.duration,
        version: item?.video_info_list[0]?.version,
        defn: item?.video_info_list[0]?.default_format?.defn,
        profile: item?.video_info_list[0]?.default_format?.profile,
        url: item?.video_info_list[0]?.default_format?.url,
        width: item?.video_info_list[0]?.default_format?.width,
        height: item?.video_info_list[0]?.default_format?.height
      },
      { ignoreDuplicates: true }
    )
  }
}

const insertDeepDiscountSkin = (item: any) => {
  if (item?.deep_discount_skin?.skin_data?.promo_label?.promotion_price !== '') {
    db.DeepDiscountSkin.create(
      {
        discountid: item?.itemid,
        promotion_price: item?.deep_discount_skin?.skin_data?.promo_label?.promotion_price,
        hidden_promotion_price: item?.deep_discount_skin?.skin_data?.promo_label?.hidden_promotion_price,
        start_time: formatDate(item?.deep_discount_skin?.skin_data?.promo_label?.start_time),
        end_time: formatDate(item?.deep_discount_skin?.skin_data?.promo_label?.end_time)
      },
      { ignoreDuplicates: true }
    )
  }
}

const insertBatchList = () => {
  batch_list?.data?.banners[1]?.banners?.map((item: any) => {
    db.BatchList.create({
      banner_image: item?.banner_image,
      title: JSON.parse(item.navigate_params.navbar.title).default,
      end: formatDate(item?.end),
      start: formatDate(item?.start)
    })
  })
}

const insertNotify = () => {
  notify?.map((item: any) => {
    db.Notification.create({
      userid: item?.userid,
      seen: item?.seen,
      image: item?.image,
      title: item?.title,
      content: item?.content,
      time: item?.time
    })
  })
}

const insertSearchSuggestion = () => {
  search_suggestion?.map((item: any) => {
    db.SearchSuggestion.create({
      text: item?.text,
      count: item?.count
    })
  })
}

const insertShopMall = () => {
  shopMall?.data?.shops?.map((item: any) => {
    db.ShopMall.findOrCreate({
      where: { shopid: item?.shopid },
      defaults: {
        url: item?.url,
        image: `https://cf.shopee.vn/file/dec6ad9d361464deee14f9bec977d29f/${item?.image}`,
        shopid: item?.shopid,
        promo_text: item?.promo_text
      }
    })
  })
}

const insertBanner = () => {
  banner?.data?.space_banners[0]?.banners.map((item: any) => {
    db.Banner.create({
      image_url: `https://cf.shopee.vn/file/${item?.image_url}`
    })
  })
}

const insertHomeCategory = () => {
  HomeCategory.data.category_list.map((item: any) => {
    db.HomeCategory.create({
      catid: item?.catid,
      parent_catid: item?.parent_catid,
      name: item?.name,
      display_name: item?.display_name,
      image: `https://cf.shopee.vn/file/${item?.image}`,
      unselected_image: `https://cf.shopee.vn/file/${item?.unselected_image}`,
      selected_image: `https://cf.shopee.vn/file/${item?.selected_image}`,
      level: item?.level
    })
    item?.children?.map((ele: any) => {
      db.HomeCategory.create({
        catid: ele?.catid,
        parent_catid: ele?.parent_catid,
        name: ele?.name,
        display_name: ele?.display_name,
        image: `https://cf.shopee.vn/file/${ele?.image}`,
        unselected_image: ele?.unselected_image,
        selected_image: ele?.selected_image,
        level: ele?.level
      })
    })
  })
}

const insertFlashSale = () => {
  flash_sale.data.items?.forEach((item: any) => {
    db.FlashSale.findOrCreate({
      where: { itemid: item?.itemid, shopid: item?.shopid },
      defaults: {
        itemid: item?.itemid,
        shopid: item?.shopid,
        catid: item?.catid,
        name: item?.name,
        image: item?.image === '' ? null : `https://cf.shopee.vn/file/${item?.image}`,
        stock: item?.stock,
        historical_sold: item?.historical_sold,
        price: +item?.price / 100000,
        price_min: +item?.price_min / 100000,
        price_max: +item?.price_max / 100000,
        price_min_before_discount: ((+item.price_min / 100) * (100 - item?.raw_discount)) / 100000,
        price_max_before_discount: ((item.price_max / 100) * (100 - item?.raw_discount)) / 100000,
        discount: item?.discount,
        shop_rating: item?.shop_rating,
        liked: item?.liked ? true : false,
        is_official_shop: item?.is_official_shop,
        is_service_by_shopee: item?.is_service_by_shopee,
        show_free_shipping: item?.show_free_shipping,
        start_time: formatDate(item?.start_time),
        end_time: formatDate(item?.end_time)
      }
    })
  })
}

const insertTopProduct = () => {
  Top_Product?.data?.sections[0]?.data?.top_product?.forEach((item: any) => {
    db.TopProduct.create({
      data_type: item?.data_type,
      count: item?.count,
      name: item?.name,
      images: JSON.stringify(
        item?.images.map((item: any) => {
          return `https://cf.shopee.vn/file/${item}`
        })
      ),
      sort_type: item?.sorttype,
      best_price: item?.best_price,
      display_text: item?.display_text
    })
  })
}

const insertComment = (item: any) => {
  db.Comment.create(
    {
      cmtid: item.cmtid,
      orderid: item?.orderid,
      itemid: item?.itemid,
      rating: item?.rating,
      userid: item?.userid,
      shopid: item?.shopid,
      parent_cmtid: null,
      comment: item?.comment,
      rating_star: item?.rating_star,
      status: item?.status,
      author_username: item?.author_username,
      author_portrait: item?.author_portrait === '' ? null : `https://cf.shopee.vn/file/${item?.author_portrait}`,
      images:
        item?.images?.length > 0
          ? JSON.stringify(
              item?.images?.map((item: any) => {
                return `https://cf.shopee.vn/file/${item}`
              })
            )
          : null,
      cover: item?.videos?.length >= 0 ? item?.videos[0]?.cover : null,
      videos: item?.videos?.length >= 0 ? item?.videos[0]?.url : null,
      model_name: item?.product_items[0].model_name,
      options: item?.product_items[0]?.options?.length > 0 ? item?.product_items[0]?.options[0] : null,
      is_replied: item.ItemRatingReply === null ? false : true,
      level: 0,
      is_shop: item.ItemRatingReply === null ? 0 : 1,
      like_count: item?.like_count ? item?.like_count : 0,
      liked: false,
      mtime: formatDate(item?.mtime),
      ctime: formatDate(item?.ctime),
      createdAt: formatDate(item?.mtime)
    },
    { ignoreDuplicates: true }
  )
  if (item.ItemRatingReply !== null) {
    db.Comment.create(
      {
        cmtid: item.cmtid + item?.userid,
        orderid: item?.orderid,
        itemid: item?.itemid,
        rating: null,
        userid: item?.userid,
        shopid: item?.shopid,
        parent_cmtid: item.cmtid,
        comment: item.ItemRatingReply?.comment,
        rating_star: null,
        status: null,
        author_username: null,
        author_portrait: null,
        images: null,
        cover: null,
        videos: null,
        model_name: null,
        options: null,
        is_replied: true,
        level: 1,
        is_shop: 1,
        like_count: null,
        liked: null,
        mtime: formatDate(item.ItemRatingReply.mtime),
        ctime: formatDate(item.ItemRatingReply.ctime),
        createdAt: formatDate(item.ItemRatingReply.mtime)
      },
      { ignoreDuplicates: true }
    )
  }
}

const insertUser = (item: any) => {
  const sex = 0
  const img_men =
    'https://imgs.search.brave.com/NMbKJRcDath4I02VHl0t8tYf4UJSAmftuegWj3ZCbYs/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTcuanBn'
  const img_women =
    'https://imgs.search.brave.com/GgQ8DyHg0f1QxTAoZOmh4fYbylAOXHK903G1j_P_EaE/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTQuanBn'
  db.User.create(
    {
      userid: item?.data?.userid,
      shopid: item?.data?.shopid,
      name: item?.data?.account?.username,
      email: `admin${item?.data?.userid}@gmail.com`,
      sex: sex,
      role: 'shop_Admin',
      avatar: sex === 0 ? img_men : img_women,
      address: item?.data?.shop_location,
      phone: 0,
      birthday: '',
      password: hashPassWord(`${item?.data?.account?.username}${item?.data?.userid}`)
    },
    { ignoreDuplicates: true }
  )
}

const insertShop = (item: any) => {
  db.Shop.create(
    {
      shopid: item?.data?.shopid,
      userid: item?.data?.userid,
      place: item?.data?.shop_location,
      portrait: item?.data?.account?.portrait === '' ? null : `https://cf.shopee.vn/file/${item?.data?.account?.portrait}`,
      username: item?.data?.account?.username,
      is_official_shop: item?.data?.is_official_shop,
      shop_location: item?.data?.shop_location,
      item_count: item?.data?.item_count,
      name: item?.data?.name,
      cover: item?.data?.cover === '' ? null : `https://cf.shopee.vn/file/${item?.data?.cover}`,
      rating_star: item?.data?.rating_star,
      rating_bad: item?.data?.rating_bad,
      rating_good: item?.data?.rating_good,
      rating_normal: item?.data?.rating_normal,
      follower_count: item?.data?.follower_count,
      status: item?.data?.status,
      response_time: item?.data?.response_time,
      description: item?.data?.description,
      followed: false,
      ctime: formatDate(item?.data?.ctime),
      mtime: formatDate(item?.data?.mtime),
      response_rate: item?.data?.response_rate,
      country: item?.data?.country,
      last_active_time: item?.data?.last_active_time,
      createdAt: formatDate(item?.data?.ctime)
    },
    { ignoreDuplicates: true }
  )
}

const insertIndustry = (item: any, index: number) => {
  db.Industry.create(
    {
      catid: item?.path[index]?.category_id,
      parent_catid: index === 0 ? null : item?.path[index - 1]?.category_id,
      level: index,
      category_name: item?.path[index]?.category_name,
      images: item?.images[index]
    },
    { ignoreDuplicates: true }
  )
}
