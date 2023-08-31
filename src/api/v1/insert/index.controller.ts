import InsertService from './index.service'

const InsertControllers = {
  Industries: (req: any, res: any) => {
    InsertService.formatIndustries()
    return { status: 200, message: 'Industries processed successfully.' }
  },

  App: (req: any, res: any) => {
    InsertService.formatHomeCategory()
    InsertService.formatSearchSuggestion()
    InsertService.formatInsertNotify()
    InsertService.formatBanner()
    InsertService.formatShopMall()
    InsertService.formatBatchList()
    InsertService.formatTopProduct()
    InsertService.formatFlashSale()
    return { status: 200, message: 'app processed successfully.' }
  },

  //?  from 1 - 714
  ShopAndUser: async (req: any, res: any) => {
    const { start, end } = req.params
    InsertService.formatShopAndUser(+start, +end)
    return { status: 200, message: 'Shops and Users processed successfully.' }
  },

  //?  from 0 - 1939
  Comment: async (req: any, res: any) => {
    const { start, end } = req.params
    InsertService.formatComment(+start, +end)
    return { status: 200, message: 'comment processed successfully.' }
  },

  Insert: async (req: any, res: any) => {
    InsertService.formatInsert()
    return { status: 200, message: 'insert processed successfully.' }
  },

  //?  from 0 - 1314
  Post: async (req: any, res: any) => {
    const { start, end } = req.params
    InsertService.formatPost(+start, +end)
    return { status: 200, message: 'post processed successfully.' }
  }
}
export default InsertControllers
