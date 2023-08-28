import { formatCategory } from '~/utils/formatCategory'

const db = require('../../models/index')

const CategoriesTreeService = {
  GetAllCategoriesTree: async (level: any) => {
    try {
      const response = await db.HomeCategory.findAll({ where: { level: level } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all  Categories tree',
        total: response.length,
        response: formatCategory(response)
      }
    } catch (error) {
      throw new Error('Failed to get all  Categories tree')
    }
  },

  GetAllCategoriesParent: async (catid: any) => {
    try {
      const response = await db.HomeCategory.findAll({ where: { parent_catid: catid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get all  Categories tree',
        total: response.length,
        response
      }
    } catch (error) {
      throw new Error('Failed to get all  Categories tree')
    }
  }
}
export default CategoriesTreeService
