import connectDatabase from '~/configs/database'

const CreateTable = async () => {
  const pool = connectDatabase.mysql()
  const db = await pool.getConnection()

  const createAttributesTable = `
    CREATE TABLE IF NOT EXISTS Attributes (
      attributeid BIGINT PRIMARY KEY NOT NULL,
      name TEXT,
      value TEXT,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createAttributesTable)

  const createBannersTable = `
    CREATE TABLE IF NOT EXISTS Banners (
      id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
      image_url VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createBannersTable)

  const createBatchListsTable = `
    CREATE TABLE IF NOT EXISTS BatchLists (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      banner_image VARCHAR(255),
      title VARCHAR(255),
      end VARCHAR(255),
      start VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createBatchListsTable)

  const createCartsTable = `
    CREATE TABLE IF NOT EXISTS Carts (
      cartid BIGINT PRIMARY KEY NOT NULL,
      userid VARCHAR(255),
      itemid BIGINT,
      shopid BIGINT,
      amount INTEGER,
      item_option VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createCartsTable)

  const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS Comments (
        cmtid BIGINT PRIMARY KEY NOT NULL,
        parent_cmtid BIGINT,
        userid VARCHAR(255),
        shopid BIGINT,
        orderid BIGINT,
        itemid BIGINT,
        level INT,
        is_shop BOOLEAN,
        rating INT,
        comment VARCHAR(1000),
        rating_star INT,
        status INT,
        author_username VARCHAR(255),
        author_portrait VARCHAR(255),
        images VARCHAR(255),
        cover VARCHAR(255),
        videos VARCHAR(255),
        model_name VARCHAR(255),
        list_option VARCHAR(255),
        is_replied BOOLEAN,
        like_count INT,
        liked BOOLEAN,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        deleteAt DATETIME NULL
    )`
  db.query(createCommentsTable)

  const createDeepDiscountSkinsTable = `
    CREATE TABLE IF NOT EXISTS DeepDiscountSkins (
      discountid BIGINT PRIMARY KEY NOT NULL,
      promotion_price VARCHAR(255),
      hidden_promotion_price VARCHAR(255),
      text VARCHAR(255),
      start_time VARCHAR(255),
      end_time VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createDeepDiscountSkinsTable)

  const createFlashSalesTable = `
    CREATE TABLE IF NOT EXISTS FlashSales (
      itemid BIGINT PRIMARY KEY NOT NULL,
      shopid BIGINT,
      catid BIGINT,
      name VARCHAR(1000),
      image VARCHAR(1000),
      price INTEGER,
      price_before_discount INTEGER,
      stock INTEGER,
      historical_sold INTEGER,
      discount VARCHAR(255),
      shop_rating INTEGER,
      filename VARCHAR(255),
      liked BOOLEAN,
      is_official_shop BOOLEAN,
      is_service_by_shopee BOOLEAN,
      show_free_shipping BOOLEAN,
      start_time DATETIME,
      end_time DATETIME,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createFlashSalesTable)

  const createHomeCategoriesTable = `
    CREATE TABLE IF NOT EXISTS HomeCategories (
      catid BIGINT PRIMARY KEY NOT NULL,
      display_name VARCHAR(255),
      parent_catid INTEGER,
      name VARCHAR(255),
      image VARCHAR(1000),
      unselected_image VARCHAR(255),
      selected_image VARCHAR(255),
      level INTEGER,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createHomeCategoriesTable)

  const createIndustriesTable = `
    CREATE TABLE IF NOT EXISTS Industries (
      catid INTEGER PRIMARY KEY NOT NULL,
      parent_catid INTEGER,
      level INTEGER,
      category_name VARCHAR(255),
      images VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createIndustriesTable)

  const createLikesTable = `
    CREATE TABLE IF NOT EXISTS Likes (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      userid VARCHAR(255),
      itemid BIGINT,
      shopid BIGINT,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createLikesTable)

  const createNotificationsTable = `
    CREATE TABLE IF NOT EXISTS Notifications (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      image VARCHAR(255),
      title VARCHAR(255),
      content VARCHAR(255),
      userid VARCHAR(255),
      seen BOOLEAN,
      time VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createNotificationsTable)

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS Orders (
      orderid VARCHAR(255) PRIMARY KEY NOT NULL,
      userid VARCHAR(255),
      shopid INTEGER,
      shop_name VARCHAR(255),
      type INTEGER,
      state VARCHAR(255),
      total_num_items INTEGER,
      note VARCHAR(255),
      amount VARCHAR(255),
      item_option VARCHAR(255),
      item_groups_id VARCHAR(255),
      final_total INTEGER,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createOrdersTable)

  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS Posts (
      itemid BIGINT PRIMARY KEY NOT NULL,
      shopid BIGINT,
      attributeid BIGINT,
      catid INT,
      tierid BIGINT,
      videoid VARCHAR(255),
      promotionid BIGINT,
      discountid BIGINT,
      currency VARCHAR(255),
      stock INT,
      status INT,
      sold INT,
      liked_count INT,
      cmt_count INT,
      discount VARCHAR(255),
      raw_discount INT,
      size_chart VARCHAR(255),
      shop_name VARCHAR(255),
      description VARCHAR(255),
      transparent_background_image VARCHAR(255),
      images VARCHAR(1000),
      view_count INT,
      name VARCHAR(1000),
      image VARCHAR(1000),
      price INT,
      price_min INT,
      price_max INT,
      historical_sold INT,
      price_before_discount INT,
      price_min_before_discount INT,
      price_max_before_discount INT,
      shop_rating INT,
      filename VARCHAR(255),
      liked BOOLEAN,
      is_official_shop BOOLEAN,
      is_service_by_shopee BOOLEAN,
      show_free_shipping BOOLEAN,
      is_deep_discount_skin BOOLEAN,
      is_video BOOLEAN,
      is_voucher BOOLEAN,
      is_attributes BOOLEAN,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createPostsTable)

  const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS Rooms (
      roomid INTEGER PRIMARY KEY NOT NULL,
      userid VARCHAR(255),
      shopid BIGINT,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createRoomsTable)

  const createSearchesTable = `
    CREATE TABLE IF NOT EXISTS Searches (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      userid VARCHAR(255),
      text VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createSearchesTable)

  const createSearchSuggestionsTable = `
    CREATE TABLE IF NOT EXISTS SearchSuggestions (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      text VARCHAR(255),
      count INTEGER,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createSearchSuggestionsTable)

  const createShopMallsTable = `
    CREATE TABLE IF NOT EXISTS ShopMalls (
      shopid BIGINT PRIMARY KEY NOT NULL,
      url VARCHAR(255),
      image VARCHAR(255),
      promo_text VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createShopMallsTable)

  const createShopsTable = `
    CREATE TABLE IF NOT EXISTS Shops (
      shopid BIGINT PRIMARY KEY NOT NULL,
      userid VARCHAR(255),
      item_count INT,
      name VARCHAR(255),
      cover VARCHAR(255),
      follower_count INT,
      rating_star INT,
      rating_bad INT,
      rating_good INT,
      rating_normal INT,
      status INT,
      shop_location VARCHAR(255),
      username VARCHAR(255),
      portrait VARCHAR(255),
      response_rate INT,
      country VARCHAR(255),
      response_time INT,
      description VARCHAR(255),
      followed BOOLEAN,
      last_active_time BIGINT,
      is_official_shop BOOLEAN,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createShopsTable)

  const createTierVariationsTable = `
    CREATE TABLE IF NOT EXISTS TierVariations (
      tierid BIGINT PRIMARY KEY NOT NULL,
      name VARCHAR(255),
      item_option VARCHAR(255),
      images VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createTierVariationsTable)

  const createTopProductsTable = `
    CREATE TABLE IF NOT EXISTS TopProducts (
        id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        data_type VARCHAR(255),
        count INT,
        name VARCHAR(255),
        images VARCHAR(255),
        sort_type INT,
        best_price INT,
        display_text VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        deleteAt DATETIME NULL
    )`
  db.query(createTopProductsTable)

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS Users (
      userid VARCHAR(255) PRIMARY KEY,
      shopid BIGINT,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      sex INT,
      role VARCHAR(255),
      password VARCHAR(255),
      name VARCHAR(255),
      address VARCHAR(255),
      birthday DATE,
      phone BIGINT,
      avatar VARCHAR(255),
      filename VARCHAR(255),
      not_new_user BOOLEAN,
      refreshToken VARCHAR(255),
      passwordResetToken VARCHAR(255),
      passwordResetExpires VARCHAR(255),
      passwordChangedAt VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createUsersTable)

  const createVideosTable = `
    CREATE TABLE IF NOT EXISTS Videos (
      videoid VARCHAR(255) PRIMARY KEY NOT NULL,
      thumb_url VARCHAR(255),
      duration INT,
      version INT,
      width INT,
      height INT,
      defn VARCHAR(255),
      profile VARCHAR(255),
      url VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      deleteAt DATETIME NULL
    )`
  db.query(createVideosTable)

  const createVoucherProductsTable = `
    CREATE TABLE IF NOT EXISTS VoucherProducts (
        promotionid BIGINT PRIMARY KEY NOT NULL,
        voucher_code VARCHAR(255),
        label VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        deleteAt DATETIME NULL
    )`
  db.query(createVoucherProductsTable)
}

export default CreateTable
