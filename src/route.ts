import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerClientDocument from '~/configs/swaggerClient.json'
import swaggerAdminDocument from '~/configs/swaggerAdmin.json'

import BannerRoute from './api/v1/client/banner/index.route'
import BatchListRoute from './api/v1/client/batchList/index.route'
import NotificationRoute from './api/v1/client/notify/index.route'
import FlashSaleRoute from './api/v1/client/flashSale/index.route'
import SearchSuggestionRoute from './api/v1/client/searchSuggestion/index.route'
import ShopMallRoute from './api/v1/client/shopMall/index.route'
import TopProductRoute from './api/v1/client/topProduct/index.route'
import ShopRoute from './api/v1/client/shop/index.route'
import SearchRoute from './api/v1/client/search/index.route'
import IndustryRoute from './api/v1/client/industry/index.route'
import LikeRoute from './api/v1/client/like/index.route'
import CategoryTreeRoute from './api/v1/client/categoryTree/index.route'
import RoomRoute from './api/v1/client/room/index.route'
import UserRoute from './api/v1/client/user/index.route'
import InsertRoute from './api/v1/insert/index.route'

const serveSwaggerClient = swaggerUi.serveFiles(swaggerClientDocument)
const serveSwaggerAdmin = swaggerUi.serveFiles(swaggerAdminDocument)

const initRoutes = (app: Express) => {
  //? CLIENT

  app.use('/api/v1/client/banner', BannerRoute)
  app.use('/api/v1/client/batchList', BatchListRoute)
  app.use('/api/v1/client/notification', NotificationRoute)
  app.use('/api/v1/client/flashSale', FlashSaleRoute)
  app.use('/api/v1/client/searchSuggestion', SearchSuggestionRoute)
  app.use('/api/v1/client/shopMall', ShopMallRoute)
  app.use('/api/v1/client/topProduct', TopProductRoute)
  app.use('/api/v1/client/shop', ShopRoute)
  app.use('/api/v1/client/search', SearchRoute)
  app.use('/api/v1/client/industry', IndustryRoute)
  app.use('/api/v1/client/categoryTree', CategoryTreeRoute)
  app.use('/api/v1/client/like', LikeRoute)
  app.use('/api/v1/client/room', RoomRoute)
  app.use('/api/v1/client/user', UserRoute)
  // app.use('/api/v1/client/auth', AuthClientRoute)
  // app.use('/api/v1/client/cart', CartRoute)
  // app.use('/api/v1/client/comment', CommentClientRoute)
  // app.use('/api/v1/client/order', OrderClientRoute)
  // app.use('/api/v1/client/post', PostRoute)

  //? ADMIN
  // app.use('/api/v1/admin/product', ProductRoute)
  // app.use('/api/v1/admin/comment', CommentRoute)
  // app.use('/api/v1/admin/order', OrderRoute)
  // app.use('/api/v1/admin/auth', AuthRoute)
  // app.use('/api/v1/admin/userInfo', UserProfileRoute)
  // app.use('/api/v1/admin/shop', ShopAdminRoute)
  // app.use('/api/v1/admin/roomAdmin', RoomAdminRoute)
  //? INSERT
  app.use('/api/v1/insert', InsertRoute)
  //? CRAWL
  // app.use('/api/v1/crawl', CrawlRoute)
  //? Middleware for /api/v1-docs-admin , /api/v1-docs-client

  app.use('/api/v1/client/docs', serveSwaggerClient, swaggerUi.setup(swaggerClientDocument))
  app.use('/api/v1/admin/docs', serveSwaggerAdmin, swaggerUi.setup(swaggerAdminDocument))

  // * If the route does not match any of the above, fall back to this route
  return app.use('/', (req, res) => {
    res.send('server on...')
  })
}

export default initRoutes
