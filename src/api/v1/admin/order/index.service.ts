import { Request, Response } from 'express'
const db = require('../../models/index')

const OrderService = {
  GetAll: async (req: Request, res: Response) => {
    try {
      return []
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  },

  GetOne: async (req: Request, res: Response) => {
    {
      try {
        return null
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  },

  Create: async (req: Request, res: Response) => {
    {
      try {
        return null
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  },

  Update: async (req: Request, res: Response) => {
    {
      try {
        return null
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  },

  Delete: async (req: Request, res: Response) => {
    {
      try {
        return true
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  }
}

export default OrderService
