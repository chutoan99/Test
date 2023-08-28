import connectDatabase from '~/configs/database'
import { formatCategory } from '~/utils/formatCategory'
import { CategoryParentResponse, CategoryResponse } from './index.response'
import { Category } from './index.type';

const CategoriesTreeService = {
  GetAllCategoriesTree: async (level: number) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery =  `SELECT catid, parent_catid, name, display_name, image, unselected_image, selected_image, level, createdAt, updatedAt FROM HomeCategories WHERE level = ?`
    try {
      const [response, _]: [any, any] = await db.query(sqlQuery, [level]) 
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: CategoryResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: formatCategory(response) as [Category[]]
      }
      const errorResponse: CategoryResponse = {
        err: 1,
        msg: 'Error',
        response: null
      }
      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  },

  GetAllCategoriesParent: async (catid: number) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery =  `SELECT catid, parent_catid, name, display_name, image, unselected_image, selected_image, level, createdAt, updatedAt FROM HomeCategories WHERE parent_catid = ?`
    try {
      const [response, _]: [any, any] = await db.query(sqlQuery, [catid]) 
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: CategoryParentResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: (response) as Category[]
      }
      const errorResponse: CategoryParentResponse = {
        err: 1,
        msg: 'Error',
        response: null
      }
      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  }
}
export default CategoriesTreeService
