const pool = require('../../config/database')

module.exports = {
  createReportName: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_reports_name(rName,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?)',
      [
        data.rName,
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

  getAllReportName: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_reports_name',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getReportName: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      'select * from chg_reports_name WHERE rName LIKE ' +
      searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_reports_name WHERE rName LIKE ${searchQ} ;`
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
  updateReportName: (data, callBack) => {
    pool.query(
      `UPDATE chg_reports_name set rName=?,updated_by=?,updated_at=?where reportId=?`,
      [data.rName, data.updated_by, data.updated_at, data.reportId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getReportNameById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_reports_name where reportId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  deleteReportName: (reportId, callBack) => {
    pool.query(
      `DELETE from chg_reports_name where reportId = ?`,
      [reportId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
}