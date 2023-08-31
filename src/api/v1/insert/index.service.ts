import connectDatabase from '~/configs/database'
import bcrypt from 'bcrypt'

const InsertService = {
  formatIndustries: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      const dataBatch = []
      for (let index = 1; index < 15; index++) {
        const jsonData = require(`../../../../data/cate/cate_${index}.json`)
        const globalCats = jsonData.data.global_cats
        for (const item of globalCats) {
          for (let j = 0; j < item.path.length; j++) {
            dataBatch.push([
              item.path[j].category_id,
              j === 0 ? null : item.path[j - 1].category_id,
              j,
              item.path[j].category_name,
              item.images[j],
              new Date(),
              new Date()
            ])
            if (dataBatch.length === batchSize) {
              Industry(db, dataBatch)
              dataBatch.length = 0
            }
          }
        }
      }
      if (dataBatch.length > 0) {
        Industry(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatHomeCategory: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const batchSize = 10
      const dataBatch = []
      const dataBatchChild = []
      const jsonData = require('../../../../data/category_tree.json')
      for (const item of jsonData.data.category_list) {
        dataBatch.push([
          item.catid,
          item.parent_catid,
          item.name,
          item.display_name,
          `https://cf.shopee.vn/file/${item.image}`,
          `https://cf.shopee.vn/file/${item.unselected_image}`,
          `https://cf.shopee.vn/file/${item.selected_image}`,
          item.level,
          new Date(),
          new Date()
        ])
        if (dataBatch.length === batchSize) {
          InsertHomeCategories(db, dataBatch)
          dataBatch.length = 0
        }
        if (item.children) {
          for (const ele of item.children) {
            dataBatchChild.push([
              ele.catid,
              ele.parent_catid,
              ele.name,
              ele.display_name,
              `https://cf.shopee.vn/file/${ele.image}`,
              ele.unselected_image,
              ele.selected_image,
              ele.level,
              new Date(),
              new Date()
            ])
            if (dataBatchChild.length === batchSize) {
              InsertHomeCategories(db, dataBatchChild)
              dataBatchChild.length = 0
            }
          }
        }
      }
      if (dataBatch.length > 0) {
        InsertHomeCategories(db, dataBatch)
      }
      if (dataBatchChild.length > 0) {
        InsertHomeCategories(db, dataBatchChild)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatBanner: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/banner.json')
      const dataBatch: any[] = []
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      jsonData?.data?.space_banners[0]?.banners?.forEach((item: any) => {
        dataBatch.push([item?.image_url, new Date(), new Date()])
        if (dataBatch.length === batchSize) {
          InsertBanner(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertBanner(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatShopMall: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/shopMall.json')
      const dataBatch: any[] = []
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      jsonData?.data?.shops?.forEach((item: any) => {
        dataBatch.push([
          item?.shopid,
          item?.url,
          `https://cf.shopee.vn/file/dec6ad9d361464deee14f9bec977d29f/${item?.image}`,
          item?.promo_text,
          new Date(),
          new Date()
        ])
        if (dataBatch.length === batchSize) {
          InsertShopMall(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertShopMall(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatSearchSuggestion: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/search_suggestion.json')
      const dataBatch: any[] = []
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      jsonData?.forEach((item: any) => {
        dataBatch.push([item?.text, item?.count, new Date(), new Date()])
        if (dataBatch.length === batchSize) {
          InsertSearchSuggestion(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertSearchSuggestion(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatInsertNotify: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/notify.json')
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      const dataBatch: any[] = []
      jsonData?.forEach((item: any) => {
        dataBatch.push([item?.userid, item?.seen, item?.image, item?.title, item?.content, item?.time, new Date(), new Date()])
        if (dataBatch.length === batchSize) {
          InsertNotify(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertNotify(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatBatchList: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/batch_list.json')
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      const dataBatch: any[] = []
      jsonData?.data?.banners[1]?.banners.forEach((item: any) => {
        dataBatch.push([
          item?.banner_image,
          JSON.parse(item.navigate_params.navbar.title).default,
          formatDate(item?.end),
          formatDate(item?.start),
          new Date(),
          new Date()
        ])
        if (dataBatch.length === batchSize) {
          InsertBatchList(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertBatchList(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatTopProduct: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/top.json')
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      const dataBatch: any[] = []
      jsonData?.data?.sections[0]?.data?.top_product?.forEach((item: any) => {
        dataBatch.push([
          item?.data_type,
          item?.count,
          item?.name,
          JSON.stringify(
            item?.images.map((item: any) => {
              return `https://cf.shopee.vn/file/${item}`
            })
          ),
          item?.sorttype,
          item?.best_price,
          item?.display_text,
          new Date(),
          new Date()
        ])
        if (dataBatch.length === batchSize) {
          InsertTopProduct(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertTopProduct(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatFlashSale: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/flash_sale.json')
      const batchSize = 10
      const dataBatch: any = []
      jsonData?.data?.items?.forEach((item: any) => {
        dataBatch.push([
          item.itemid,
          item.shopid,
          item.catid,
          item.name,
          item.image === '' ? null : `https://cf.shopee.vn/file/${item.image}`,
          item.stock,
          item.historical_sold,
          +item.price / 100000,
          +item.price_before_discount / 100000,
          item.discount,
          item.shop_rating,
          item.liked ? true : false,
          item.is_official_shop,
          item.is_service_by_shopee,
          item.show_free_shipping,
          formatDate(item.start_time),
          formatDate(item.end_time),
          new Date(),
          new Date()
        ])

        if (dataBatch.length === batchSize) {
          InsertFlashSale(db, dataBatch)
          dataBatch.length = 0
        }
      })
      if (dataBatch.length > 0) {
        InsertFlashSale(db, dataBatch)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatShopAndUser: async (start: number, end: number) => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const batchSize = 2 // Số lượng bản ghi trong mỗi batch
      const dataUsers: any[] = []
      const dataShops: any[] = []
      for (let index = start; index < end; index++) {
        const jsonData = require(`../../../../data/shopDetail/shopDetail_${index}.json`)
        const sex = 0
        const img_men =
          'https://imgs.search.brave.com/NMbKJRcDath4I02VHl0t8tYf4UJSAmftuegWj3ZCbYs/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTcuanBn'
        const img_women =
          'https://imgs.search.brave.com/GgQ8DyHg0f1QxTAoZOmh4fYbylAOXHK903G1j_P_EaE/rs:fit:640:403:1/g:ce/aHR0cDovL3d3dy5i/aXRyZWJlbHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEx/LzA0L0ZhY2Vib29r/LU5ldy1EZWZhdWx0/LUF2YXRhci1QaWN0/dXJlLTQuanBn'
        dataShops.push([
          jsonData?.data?.shopid,
          jsonData?.data?.userid,
          jsonData?.data?.account?.portrait === '' ? null : `https://cf.shopee.vn/file/${jsonData?.data?.account?.portrait}`,
          jsonData?.data?.account?.username,
          jsonData?.data?.is_official_shop,
          jsonData?.data?.shop_location,
          jsonData?.data?.item_count,
          jsonData?.data?.name,
          jsonData?.data?.cover === '' ? null : `https://cf.shopee.vn/file/${jsonData?.data?.cover}`,
          jsonData?.data?.rating_star,
          jsonData?.data?.rating_bad,
          jsonData?.data?.rating_good,
          jsonData?.data?.rating_normal,
          jsonData?.data?.follower_count,
          jsonData?.data?.status,
          jsonData?.data?.response_time,
          jsonData?.data?.description,
          false,
          jsonData?.data?.response_rate,
          jsonData?.data?.country,
          jsonData?.data?.last_active_time,
          formatDate(jsonData?.data?.ctime),
          formatDate(jsonData?.data?.ctime)
        ])

        if (dataShops.length === batchSize) {
          InsertShop(db, dataShops)
          dataShops.length = 0
        }

        dataUsers.push([
          jsonData?.data?.userid,
          jsonData?.data?.shopid,
          jsonData?.data?.name,
          jsonData?.data?.account?.username,
          `admin${jsonData?.data?.userid}@gmail.com`,
          sex,
          'shop_Admin',
          sex === 0 ? img_men : img_women,
          jsonData?.data?.shop_location,
          0,
          '',
          hashPassWord(`${jsonData?.data?.account?.username}${jsonData?.data?.userid}`),
          new Date(),
          new Date()
        ])

        if (dataUsers.length === batchSize) {
          InsertUser(db, dataUsers)
          dataUsers.length = 0
        }
      }
      if (dataShops.length > 0) {
        InsertShop(db, dataShops)
      }
      if (dataUsers.length > 0) {
        InsertUser(db, dataUsers)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatComment: async (start: number, end: number) => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const batchSize = 500 // Số lượng bản ghi trong mỗi batch
      const dataBatch: any[] = []
      const dataRatingReply: any[] = []
      for (let index = start; index < end; index++) {
        const jsonData = require(`../../../../data/ratings/rating_${index}.json`)
        jsonData?.data?.ratings?.forEach((item: any) => {
          dataBatch.push([
            item.cmtid,
            item?.orderid,
            item?.itemid,
            item?.rating,
            item?.userid,
            item?.shopid,
            null,
            item?.comment,
            item?.rating_star,
            item?.status,
            item?.author_username,
            item?.author_portrait === '' ? null : `https://cf.shopee.vn/file/${item?.author_portrait}`,
            item?.images?.length > 0
              ? JSON.stringify(
                  item?.images?.map((item: any) => {
                    return `https://cf.shopee.vn/file/${item}`
                  })
                )
              : null,
            item?.videos?.length >= 0 ? item?.videos[0]?.cover : null,
            item?.videos?.length >= 0 ? item?.videos[0]?.url : null,
            item?.product_items[0].model_name,
            item?.product_items[0]?.options?.length > 0 ? item?.product_items[0]?.options[0] : null,
            item.ItemRatingReply === null ? false : true,
            0,
            item.ItemRatingReply === null ? 0 : 1,
            item?.like_count ? item?.like_count : 0,
            false,
            formatDate(item?.mtime),
            formatDate(item?.mtime)
          ])
          if (dataBatch.length === batchSize) {
            InsertComment(db, dataBatch)
            dataBatch.length = 0
          }
          if (item.ItemRatingReply !== null) {
            dataRatingReply.push([
              item.cmtid + item?.userid,
              item?.orderid,
              item?.itemid,
              null,
              item?.userid,
              item?.shopid,
              item.cmtid,
              item.ItemRatingReply?.comment,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              true,
              1,
              1,
              null,
              null,
              formatDate(item.ItemRatingReply.mtime),
              formatDate(item.ItemRatingReply.mtime)
            ])
            if (dataRatingReply.length === batchSize) {
              InsertComment(db, dataRatingReply)
              dataRatingReply.length = 0
            }
          }
        })
      }
      if (dataBatch.length > 0) {
        InsertComment(db, dataBatch)
      }
      if (dataRatingReply.length > 0) {
        InsertComment(db, dataRatingReply)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatInsert: async () => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const jsonData = require('../../../../data/data')
      const batchSize = 10 // Số lượng bản ghi trong mỗi batch
      const dataTierVariations: any[] = []
      const dataAttributes: any[] = []
      const dataDeepDiscountSkin: any[] = []
      const dataVideoInfo: any[] = []
      const dataVoucher: any[] = []
      const dataPost: any[] = []
      for (const item of jsonData?.items || undefined) {
        prepareTierVariationsValues(item, dataTierVariations, batchSize, db)
        prepareAttributesValues(item, dataAttributes, batchSize, db)
        prepareDeepDiscountSkinValues(item, dataDeepDiscountSkin, batchSize, db)
        prepareVideoInfoValues(item, dataVideoInfo, batchSize, db)
        prepareVoucherValues(item, dataVoucher, batchSize, db)
        preparePostValues(item, dataPost, batchSize, db)
      }
      if (dataTierVariations.length > 0) {
        InsertTierVariations(db, dataTierVariations)
      }
      if (dataAttributes.length > 0) {
        InsertAttributes(db, dataAttributes)
      }
      if (dataDeepDiscountSkin.length > 0) {
        InsertDeepDiscountSkin(db, dataDeepDiscountSkin)
      }
      if (dataVideoInfo.length > 0) {
        InsertVideoInfoList(db, dataVideoInfo)
      }
      if (dataVoucher.length > 0) {
        InsertVoucherInfo(db, dataVoucher)
      }
      if (dataPost.length > 0) {
        InsertPost(db, dataPost)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  },

  formatPost: async (start: number, end: number) => {
    try {
      const pool = connectDatabase.mysql()
      const db = await pool.getConnection()
      const batchSize = 500 // Số lượng bản ghi trong mỗi batch
      const dataTierVariations: any[] = []
      const dataDeepDiscountSkin: any[] = []
      const dataVideoInfo: any[] = []
      const dataVoucher: any[] = []
      const dataPost: any[] = []
      for (let index = start; index < end; index++) {
        const jsonData = require(`../../../../data/post/hot_items_${index}.json`)
        jsonData?.data?.items.forEach((item: any) => {
          prepareTierVariationsValues(item, dataTierVariations, batchSize, db)
          preparePostValues(item, dataPost, batchSize, db)
          prepareVideoInfoValues(item, dataVideoInfo, batchSize, db)
          prepareVoucherValues(item, dataVoucher, batchSize, db)
          prepareDeepDiscountSkinValues(item, dataDeepDiscountSkin, batchSize, db)
        })
      }
      if (dataTierVariations.length > 0) {
        InsertTierVariations(db, dataTierVariations)
      }
      if (dataDeepDiscountSkin.length > 0) {
        InsertDeepDiscountSkin(db, dataDeepDiscountSkin)
      }
      if (dataVideoInfo.length > 0) {
        InsertVideoInfoList(db, dataVideoInfo)
      }
      if (dataVoucher.length > 0) {
        InsertVoucherInfo(db, dataVoucher)
      }
      if (dataPost.length > 0) {
        InsertPost(db, dataPost)
      }
      db.release()
    } catch (error: any) {
      console.error('Server error:', error.message)
    }
  }
}

const formatDate = (time: any) => {
  const date = new Date(time * 1000)
  return date.toLocaleString()
}

const hashPassWord = (password: any) => {
  const result = bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  return result
}

const prepareTierVariationsValues = (item: any, dataTierVariations: any[], batchSize: number, db: any) => {
  if (item?.tier_variations[0]?.name !== '') {
    item?.tier_variations?.map((ele: any) => {
      dataTierVariations.push([
        item.itemid,
        ele?.name,
        JSON.stringify(ele?.options),
        ele?.images === null
          ? null
          : JSON.stringify(
              ele?.images?.map((item: any) => {
                return `https://cf.shopee.vn/file/${item}`
              })
            ),
        formatDate(item?.ctime),
        formatDate(item?.ctime)
      ])
      if (dataTierVariations.length === batchSize) {
        InsertTierVariations(db, dataTierVariations)
        dataTierVariations.length = 0
      }
    })
  }
}

const prepareAttributesValues = (item: any, dataAttributes: any[], batchSize: number, db: any) => {
  if (typeof item?.attributes?.[0].name !== 'undefined') {
    dataAttributes.push([
      item.itemid,
      JSON.stringify(item?.attributes?.map((item: any) => item?.name)),
      JSON.stringify(item?.attributes?.map((item: any) => item?.value)),
      formatDate(item?.ctime),
      formatDate(item?.ctime)
    ])
    if (dataAttributes.length === batchSize) {
      InsertAttributes(db, dataAttributes)
      dataAttributes.length = 0
    }
  }
}

const prepareDeepDiscountSkinValues = (item: any, dataDeepDiscountSkin: any[], batchSize: number, db: any) => {
  if (item?.deep_discount_skin?.skin_data?.promo_label?.promotion_price !== '') {
    dataDeepDiscountSkin.push([
      item?.itemid,
      item?.deep_discount_skin?.skin_data?.promo_label?.promotion_price,
      item?.deep_discount_skin?.skin_data?.promo_label?.hidden_promotion_price,
      formatDate(item?.deep_discount_skin?.skin_data?.promo_label?.start_time),
      formatDate(item?.deep_discount_skin?.skin_data?.promo_label?.end_time),
      formatDate(item?.ctime),
      formatDate(item?.ctime)
    ])
    if (dataDeepDiscountSkin.length === batchSize) {
      InsertDeepDiscountSkin(db, dataDeepDiscountSkin)
      dataDeepDiscountSkin.length = 0
    }
  }
}

const prepareVideoInfoValues = (item: any, dataVideoInfo: any[], batchSize: number, db: any) => {
  if (typeof item?.video_info_list[0]?.video_id !== 'undefined') {
    dataVideoInfo.push([
      item?.video_info_list[0]?.video_id,
      item?.video_info_list[0]?.thumb_url,
      item?.video_info_list[0]?.duration,
      item?.video_info_list[0]?.version,
      item?.video_info_list[0]?.default_format?.defn,
      item?.video_info_list[0]?.default_format?.profile,
      item?.video_info_list[0]?.default_format?.url,
      item?.video_info_list[0]?.default_format?.width,
      item?.video_info_list[0]?.default_format?.height,
      formatDate(item?.ctime),
      formatDate(item?.ctime)
    ])
    if (dataVideoInfo.length === batchSize) {
      InsertVideoInfoList(db, dataVideoInfo)
      dataVideoInfo.length = 0
    }
  }
}

const prepareVoucherValues = (item: any, dataVoucher: any[], batchSize: number, db: any) => {
  if (typeof item?.voucher_info?.promotion_id !== 'undefined') {
    dataVoucher.push([
      item?.voucher_info?.promotion_id,
      item?.voucher_info?.voucher_code,
      item?.voucher_info?.voucher_code,
      formatDate(item?.ctime),
      formatDate(item?.ctime)
    ])
    if (dataVoucher.length === batchSize) {
      InsertVoucherInfo(db, dataVoucher)
      dataVoucher.length = 0
    }
  }
}

const preparePostValues = (item: any, dataPost: any[], batchSize: number, db: any) => {
  dataPost.push([
    item?.itemid,
    item?.shopid,
    item?.currency,
    item?.stock,
    item?.status,
    item?.sold,
    item?.liked_count,
    item?.voucher_info?.promotion_id,
    item?.video_info_list[0]?.video_id,
    item?.itemid,
    item?.itemid,
    item?.itemid,
    item?.catid,
    item?.cmt_count,
    item?.discount,
    item?.description,
    item?.raw_discount,
    item?.size_chart === null ? null : `https://cf.shopee.vn/file/${item?.size_chart}`,
    item?.shop_name,
    item?.transparent_background_image === '' ? null : `https://cf.shopee.vn/file/${item?.transparent_background_image}`,
    JSON.stringify(
      item?.images.map((item: any) => {
        return `https://cf.shopee.vn/file/${item}`
      })
    ),
    item?.view_count ? item?.view_count : 0,
    item?.name,
    item?.image === '' ? null : `https://cf.shopee.vn/file/${item?.image}`,
    item?.historical_sold,
    +item?.price / 100000,
    +item?.price_min / 100000,
    +item?.price_max / 100000,
    +item?.price_before_discount / 100000,
    +item?.price_min_before_discount / 100000,
    +item?.price_max_before_discount / 100000,
    item?.shop_rating,
    item?.liked ? true : false,
    item?.is_official_shop,
    item?.is_service_by_shopee,
    item?.show_free_shipping,
    item?.deep_discount_skin?.skin_data?.promo_label?.promotion_price !== '',
    typeof item?.video_info_list[0]?.video_id !== 'undefined',
    typeof item?.voucher_info?.promotion_id !== 'undefined',
    typeof item?.attributes?.[0].name !== 'undefined',
    formatDate(item?.ctime),
    formatDate(item?.ctime)
  ])
  if (dataPost.length === batchSize) {
    InsertPost(db, dataPost)
    dataPost.length = 0
  }
}

const Industry = (db: any, data: any) => {
  const sqlQuery = `INSERT IGNORE INTO Industries (catid, parent_catid, level, category_name, images, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertHomeCategories = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO HomeCategories (catid, parent_catid, name, display_name, level, image, unselected_image, selected_image, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertBanner = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Banners (image_url, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertShopMall = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO ShopMalls (shopid, url, image, promo_text, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertSearchSuggestion = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO SearchSuggestions (text, count, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertNotify = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Notifications (userid, seen, image, title, content, time,  createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertBatchList = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO BatchLists (banner_image, title, end, start, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertTopProduct = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO TopProducts (data_type, count, name, images, sort_type, best_price, display_text, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertFlashSale = (db: any, data: any) => {
  const sqlQuery = `INSERT IGNORE INTO FlashSales (itemid, shopid, catid, name, image, stock, historical_sold, price, price_before_discount, discount, shop_rating, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertShop = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Shops (shopid, userid, portrait, username, is_official_shop, shop_location, item_count,name, cover, rating_star, rating_bad, rating_good, rating_normal, follower_count, status, response_time, description, followed, response_rate, country, last_active_time, createdAt, updatedAt)  VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertUser = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Users (userid, shopid, name, username, email, sex, role, avatar, address, phone, birthday, password, createdAt, updatedAt)  VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertComment = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Comments (cmtid, orderid, itemid, rating, userid, shopid, parent_cmtid, comment, rating_star, status, author_username, author_portrait, images, cover, videos, model_name, list_option, is_replied, level, is_shop, like_count, liked, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertTierVariations = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO TierVariations (tierid, name, item_option, images, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertAttributes = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Attributes (attributeid, name, value, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertVoucherInfo = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO VoucherProducts (promotionid, voucher_code, label, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertVideoInfoList = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Videos (videoid, thumb_url, duration, version, defn, profile, url, width, height, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertDeepDiscountSkin = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO DeepDiscountSkins (discountid, promotion_price, hidden_promotion_price, start_time, end_time, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

const InsertPost = (db: any, data: any[]) => {
  const sqlQuery = `INSERT IGNORE INTO Posts (itemid, shopid, currency, stock, status, sold, liked_count, promotionid, videoid, discountid, tierid, attributeid, catid, cmt_count, discount, description, raw_discount, size_chart, shop_name, transparent_background_image, images, view_count, name, image, historical_sold, price, price_min, price_max, price_before_discount, price_min_before_discount, price_max_before_discount, shop_rating, liked, is_official_shop, is_service_by_shopee, show_free_shipping, is_deep_discount_skin, is_video, is_voucher, is_attributes, createdAt, updatedAt) VALUES ?`
  try {
    db.query(sqlQuery, [data])
    console.log(sqlQuery)
  } catch (err: any) {
    console.error('Error executing batch insert:', err.message)
  }
}

export default InsertService
