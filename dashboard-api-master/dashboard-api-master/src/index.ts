/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
process.env['NODE_CONFIG_DIR'] = __dirname + '/config/'
import config from 'config'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { checkDbConnection } from './util/authenticate'
import route from './routes'
import { JwtPayload } from 'jsonwebtoken'
import morgan from 'morgan'
import { insertArea } from './util/dataFunctions/insertArea'
import { insertSchool } from './util/dataFunctions/insertSchool'
import { insertStudent } from './util/dataFunctions/insertStudent'
import { insertTeacher } from './util/dataFunctions/insertTeacher'
import {
  insertgesCircuitOffice,
  insertgesDistrictOffice,
  insertgesRegionOffice,
} from './util/dataFunctions/insertGesOffice'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from './util/validationError'

const HOSTNAME = config.get('host') as string
const PORT = config.get('port') as number

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.use('/uploads', express.static('uploads'))

// Route entry
app.use('/api/v1', route)

app.get('/addArea', insertArea)

app.get('/addSchool', insertSchool)

app.get('/addStudent', insertStudent)

// app.get('/addTeacher', insertTeacher)

app.get('/addRegionOffice', insertgesRegionOffice)

app.get('/addDistrictOffice', insertgesDistrictOffice)

app.get('/addCiruitOffice', insertgesCircuitOffice)

checkDbConnection()

declare global {
  namespace Express {
    interface Request {
      token?: JwtPayload
      table_name?: String
    }
  }
}

declare module 'http' {
  interface IncomingHttpHeaders {
    'x-access-token'?: string
    authorization?: string
  }
}

// Test API
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    message: 'KATon DashBoard Api Running',
  })
})

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server Started At http://${HOSTNAME}:${PORT}`)
})
