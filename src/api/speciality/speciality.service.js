const pool = require('../../config/database')

module.exports = {
  createSpeciality: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_specialty(specialtyName,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?)',
      [
        data.specialtyName,
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

  getAllSpeciality: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_specialty',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getSpeciality: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      'select * from chg_specialty WHERE specialtyName LIKE ' +
      searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_specialty WHERE specialtyName LIKE ${searchQ} ;`
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
  updateSpeciality: (data, callBack) => {
    pool.query(
      `UPDATE chg_specialty set specialtyName=?,updated_by=?,updated_at=?where specialtyId=?`,
      [data.specialtyName, data.updated_by, data.updated_at, data.specialtyId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getSpecialityById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_specialty where specialtyId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  deleteSpeciality: (specialtyId, callBack) => {
    pool.query(
      `DELETE from chg_specialty where specialtyId = ?`,
      [specialtyId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
}
