const pool = require('../../config/database')

module.exports = {
  createLanguage: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_language(name,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?)',
      [
        data.name,
        data.created_by,
        data.updated_by,
        data.created_at,
        data.updated_at,
      ],
      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getAllLanguage: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_language',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getLanguage: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      'select * from chg_language WHERE name LIKE ' +
      searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_language WHERE name LIKE ${searchQ} ;`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        if (error) throw error
        if (results.length > 0) {
          count = results[0].total_count
        }
      })
    })

    pool.getConnection(function (err, connection) {
      connection.query(prodsQuery, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        if (error) throw error
        // create payload
        var jsonResult = {
          total_count: count,
          page_number: page,
          result: results,
        }

        return callBack(null, jsonResult)
      })
    })
  },
  updateLanguage: (data, callBack) => {
    pool.query(
      `UPDATE chg_language set name=?,updated_by=?,updated_at=? where id=?`,
      [data.name, data.updated_by, data.updated_at, data.id],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getLanguageById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_language where id = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  deleteLanguage: (id, callBack) => {
    pool.query(
      `DELETE from chg_language where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
}
