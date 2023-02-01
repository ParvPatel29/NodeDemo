import config from 'config'
/* eslint-disable prefer-const */
import { Options, Sequelize } from 'sequelize'

import { initModels } from './model/init-models'

const options: any = config.get('db')
let dbClient: Sequelize

// Data-Base Connection
const connectionOptions: Options = {
  dialect: options.dialect,
  host: options.host,
  database: options.database,
  username: options.username,
  password: options.password,
  logging: (message) => console.log(message),
}

if (process.env.NODE_ENV === 'production') {
  connectionOptions.logging = false
}

dbClient = new Sequelize(connectionOptions)

// init All Models
initModels(dbClient)

// sync DB-Table's
if (options.syncTables) {
  try {
    dbClient.sync({
      [options.syncMode]: true,
    })
  } catch (error) {
    process.exit(1)
  }
}

export default dbClient
