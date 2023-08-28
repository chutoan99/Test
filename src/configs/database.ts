import mysql from 'mysql2/promise'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDatabase = {
  mysql: () => {
    const pool = mysql.createPool({
      host: 'containers-us-west-32.railway.app',
      user: 'root',
      password: 'arfsoG2vUMDCXg7xQDLF',
      database: 'railway',
      port: 6917,
      connectionLimit: 10
    })
    return pool
  },

  mongodb: () => {
    try {
      const connectionString = process.env.MONGODB_CONNECT
      if (!connectionString) {
        throw new Error('MongoDB connection string is missing.')
      }
      const options: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
      mongoose.connect(connectionString, options)
      console.log('Connection to Mongo database successful.')
    } catch (error: any) {
      console.error('Could not connect:', error.message)
    }
  }
}
export default connectDatabase
