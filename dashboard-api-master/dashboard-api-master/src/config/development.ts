// Devlopment Config
export = {
  host: process.env.API_HOSTNAME,
  port: process.env.API_PORT,
  token: {
    secretKey: process.env.SECRET_KEY,
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
    updateProfileKey: process.env.SK_FOR_PROFILE_UPDATE,
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      min: 20,
      max: 30,
      idle: 30000,
      acquire: 300000,
      idleTimeoutMillis: 300000,
    },
    syncTables: [true, 'true'].includes(process.env.SYNC_TABLES as string),
    syncMode: process.env.SYNC_MODE as string,
  },
}
