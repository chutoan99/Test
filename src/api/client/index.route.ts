import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerClientDocument from '~/configs/swaggerClient.json'
import swaggerAdminDocument from '~/configs/swaggerAdmin.json'
import BannerRoute from './banner/index.route'
import BatchListRoute from './batchList/index.route'
import NotificationRoute from './notify/index.route'
import FlashSaleRoute from './flashSale/index.route'
import SearchSuggestionRoute from './searchSuggestion/index.route'
import ShopMallRoute from './shopMall/index.route'
import TopProductRoute from './topProduct/index.route'
import ShopRoute from './shop/index.route'
import SearchRoute from './search/index.route'
import IndustryRoute from './industry/index.route'
import LikeRoute from './like/index.route'
import CategoryTreeRoute from './categoryTree/index.route'
import RoomRoute from './room/index.route'
import UserRoute from './user/index.route'
const serveSwaggerClient = swaggerUi.serveFiles(swaggerClientDocument)
const serveSwaggerAdmin = swaggerUi.serveFiles(swaggerAdminDocument)

const initRoutes = (app: Express) => {
  //? CLIENT
  app.use('/api/client/banner', BannerRoute)
  app.use('/api/client/batchList', BatchListRoute)
  app.use('/api/client/notification', NotificationRoute)
  app.use('/api/client/flashSale', FlashSaleRoute)
  app.use('/api/client/searchSuggestion', SearchSuggestionRoute)
  app.use('/api/client/shopMall', ShopMallRoute)
  app.use('/api/client/topProduct', TopProductRoute)
  app.use('/api/client/shop', ShopRoute)
  app.use('/api/client/search', SearchRoute)
  app.use('/api/client/industry', IndustryRoute)
  app.use('/api/client/categoryTree', CategoryTreeRoute)
  app.use('/api/client/like', LikeRoute)
  app.use('/api/client/room', RoomRoute)
  app.use('/api/client/user', UserRoute)
  // app.use('/api/client/auth', AuthClientRoute)
  // app.use('/api/client/cart', CartRoute)
  // app.use('/api/client/comment', CommentClientRoute)
  // app.use('/api/client/order', OrderClientRoute)
  // app.use('/api/client/post', PostRoute)

  //? ADMIN
  // app.use('/api/admin/product', ProductRoute)
  // app.use('/api/admin/comment', CommentRoute)
  // app.use('/api/admin/order', OrderRoute)
  // app.use('/api/admin/auth', AuthRoute)
  // app.use('/api/admin/userInfo', UserProfileRoute)
  // app.use('/api/admin/shop', ShopAdminRoute)
  // app.use('/api/admin/roomAdmin', RoomAdminRoute)
  //? INSERT
  // app.use('/api/insert', InsertRoute)
  //? CRAWL
  // app.use('/api/crawl', CrawlRoute)
  //? Middleware for /api-docs-admin , /api-docs-client

  app.use('/api/client/docs', serveSwaggerClient, swaggerUi.setup(swaggerClientDocument))
  app.use('/api/admin/docs', serveSwaggerAdmin, swaggerUi.setup(swaggerAdminDocument))

  // * If the route does not match any of the above, fall back to this route
  return app.use('/', (req, res) => {
    res.send('server on...')
  })
}

export default initRoutes
