const pool = require('../../config/database')

module.exports = {
  createLabReport: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_labreport(appointmentId,reportId,reportPic,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?,?,?)',
      [
        data.appointmentId,
        data.reportId,
        data.reportPic,
        data.created_by,
        data.updated_by,
        data.created_at,
        data.updated_at,
      ],
      (error, results, fields) => {
        console.log('LPerror', error)
        console.log('Lresults', results)
        if (error) throw error

        return callBack(null, results)
      },
    )
  },
  getLabReport: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      'select r.*,l.* ,u.uFirstName,u.uLastName from chg_labreport l LEFT JOIN chg_appointment a ON l.appointmentId = a.appointmentId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_reports_name r ON l.reportId = r.reportId WHERE a.appointmentId LIKE ' +
      searchQ +
      ' OR l.reportId LIKE ' +
      searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_labreport WHERE appointmentId LIKE ${searchQ} OR reportId LIKE ${searchQ} ;`
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
  updateLabReport: (data, callBack) => {
    pool.query(
      `UPDATE chg_labreport set appointmentId=?,reportId=?,reportPic=?,updated_by=?,updated_at=?where labReportId =?`,
      [
        data.appointmentId,
        data.reportId,
        data.reportPic,
        data.updated_by,
        data.updated_at,
        data.labReportId,
      ],
      (error, results, fields) => {
        if (error) return callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  updateLabReportPic: (data, callBack) => {
    pool.query(
      `UPDATE chg_labreport set reportPic=?,updated_by=?,updated_at=? where labReportId =?`,
      [data.reportPic, data.updated_by, data.updated_at, data.labReportId],
      (error, results, fields) => {
        if (error) return callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  deleteLabReportPic: (data, callBack) => {
    pool.query(
      `UPDATE chg_labreport set reportPic=?,updated_by=?,updated_at=? where labReportId =?`,
      [data.reportPic, data.updated_by, data.updated_at, data.labReportId],
      (error, results, fields) => {
        if (error) return callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  getLabReportById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_labreport where labReportId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getLabReportByAppointment: (data, callBack) => {
    pool.query(
      `SELECT l.* , r.rName FROM chg_labreport l LEFT JOIN chg_reports_name r ON l.reportId = r.reportId where appointmentId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  deleteLabReport: (labReportId, callBack) => {
    pool.query(
      `DELETE from chg_labreport where labReportId = ?`,
      [labReportId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  AddLabReport: (data, callBack) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO chg_labreport(appointmentId,reportId,reportPic,created_by,updated_by,created_at,updated_at)VALUES ?',
        [data],
        (error, results, fields) => {
          console.log('Labresults', error)
          console.log('Labresults', results)
          if (error) reject(error)
          resolve(results)
        },
      )
    })
  },
}
