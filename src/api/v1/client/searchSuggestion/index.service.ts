import connectDatabase from '~/configs/database'
import { SearchSuggestionResponse } from './index.response'
import { SearchSuggestion } from './index.type'

const SearchSuggestionService = {
  GetAll: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT id, text, count, createdAt, updatedAt FROM SearchSuggestions`
    try {
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: SearchSuggestionResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as SearchSuggestion[]
      }

      const errorResponse: SearchSuggestionResponse = {
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

export default SearchSuggestionService
