const pool = require('../../config/database')

module.exports = {
  getRegionByCountry: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_region where countryId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getRegion: (req, callBack) => {
    pool.query(
      'SELECT r.* , c.cName FROM chg_region r LEFT JOIN chg_country c ON r.countryId = c.countryId',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
}
