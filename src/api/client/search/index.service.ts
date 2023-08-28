import connectDatabase from '~/configs/database'
import { CreateSearchResponse, SearchResponse } from './index.response'
import { Search } from './index.type'

const SearchService = {
  GetAll: async (userid: string) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    try {
      const sqlQuery = `
        SELECT id, userid, text, createdAt, updatedAt
        FROM Searches 
        WHERE userid = ? 
        ORDER BY createdAt DESC 
        LIMIT 10`

      const [response, _] = await db.query(sqlQuery, [userid])
      const total = Array.isArray(response) ? response.length : 0

      const successResponse: SearchResponse = {
        err: 0,
        msg: 'OK',
        total,
        response: response as Search[]
      }

      const errorResponse: SearchResponse = {
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

  Create: async (payload: any, userid: string) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    try {
      const sqlQuery = `INSERT INTO Searches (userid, text, createdAt, updatedAt) VALUES (?, ?, ?, ?)`

      const [response, _] = await db.query(sqlQuery, [userid, payload.text, new Date(), new Date()])

      const successResponse: CreateSearchResponse = {
        err: 0,
        msg: 'OK'
      }

      const errorResponse: CreateSearchResponse = {
        err: 1,
        msg: 'Error'
      }

      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  }
}

export default SearchService
