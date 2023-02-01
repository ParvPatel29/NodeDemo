const pool = require('../../config/database')

module.exports = {
  createFeedback: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_feedback(appointmentId,userId,doctorId,hospitalId,feedbackRate,dRate,labId,lRate,pharmacyId,pRate,feedbackText,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        data.appointmentId,
        data.userId,
        data.doctorId,
        data.hospitalId,
        data.feedbackRate,
        data.dRate,
        data.labId,
        data.lRate,
        data.pharmacyId,
        data.pRate,
        data.feedbackText,
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
  getFeedback: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      'select f.feedbackText,f.feedbackId,f.feedbackRate,u.uFirstName,u.uLastName,u.uPic,d.dFullName,a.apTokenId,h.hName from chg_feedback f LEFT JOIN chg_users u ON f.userId = u.userId LEFT JOIN chg_doctor d ON f.doctorId = d.doctorId LEFT JOIN chg_appointment a ON f.appointmentId = a.appointmentId LEFT JOIN chg_hospital h ON f.hospitalId = h.hospitalId WHERE a.apTokenId LIKE ' +
      searchQ +
      ' OR u.uFirstName LIKE ' +
      searchQ +
      ' OR u.uLastName LIKE ' +
      searchQ +
      ' OR d.dFullName LIKE ' +
      searchQ +
      ' OR a.apTokenId LIKE ' +
      searchQ +
      ' OR h.hName LIKE ' +
      searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_feedback WHERE userId LIKE ${searchQ} OR doctorId LIKE ${searchQ} OR dRate LIKE ${searchQ} OR labId LIKE ${searchQ} OR lRate LIKE ${searchQ} OR pharmacyId LIKE ${searchQ} OR pRate LIKE ${searchQ} OR feedbackText LIKE ${searchQ} OR appointmentId LIKE ${searchQ};`
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

  getFeedbackById: (data, callBack) => {
    pool.query(
      `select f.feedbackText,f.feedbackId,f.feedbackRate,u.uFirstName,u.uLastName,d.dFullName,a.apTokenId,h.hName from chg_feedback f LEFT JOIN chg_users u ON f.userId = u.userId LEFT JOIN chg_doctor d ON f.doctorId = d.doctorId LEFT JOIN chg_appointment a ON f.appointmentId = a.appointmentId LEFT JOIN chg_hospital h ON f.hospitalId = h.hospitalId where f.feedbackId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  deleteFeedback: (feedbackId, callBack) => {
    pool.query(
      `DELETE from chg_feedback where feedbackId = ?`,
      [feedbackId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
}
