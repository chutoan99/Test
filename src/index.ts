import express from 'express'
import http from 'http'

import connectDatabase from './configs/database'
import CreateTable from './configs/table'
import configSocketIO from './configs/socketio'
import startServer from './server'
import configExpress from './express'
import initRoutes from './route'

const app = express()
const server = http.createServer(app)

// Database connections
connectDatabase.mongodb()
connectDatabase.mysql()
CreateTable()
// config
initRoutes(app)
configSocketIO(server)
configExpress(app)
// start server
startServer(server)
