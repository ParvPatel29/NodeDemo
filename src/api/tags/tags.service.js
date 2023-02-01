const pool = require('../../config/database')

module.exports = {

  createTags: (data, callBack) => {
    console.log('data', data)
    pool.query(
      'INSERT INTO chg_tags(name,created_by,updated_by,created_at,updated_at)VALUES (?,?,?,?,?)',
      [data.name, data.created_by, data.updated_by, data.created_at, data.updated_at],
      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getAllTags: (req, callBack) => {
    pool.query(
      'SELECT name FROM chg_tags',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },


}
