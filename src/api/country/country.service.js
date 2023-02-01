const pool = require('../../config/database')

module.exports = {
  getCounrty: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_country',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
}
