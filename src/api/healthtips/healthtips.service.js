const pool = require('../../config/database')
const moment = require('moment')

module.exports = {
  createHealthTips: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_healthtips(htTitle,htDesc,htDate,htPic,htTags,htStatus,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?,?,?,?,?,?)',
      [
        data.htTitle,
        data.htDesc,
        data.htDate,
        data.htPic,
        data.htTags,
        data.htStatus,
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
  getHealthTips: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_healthtips limit ' + limit + ' OFFSET ' + offset
      'select * from chg_healthtips WHERE htTitle LIKE ' +
      searchQ +
      ' OR htDesc LIKE ' +
      searchQ +
      ' OR htDate LIKE ' +
      searchQ +
      ' OR htTags LIKE ' +
      searchQ +
      ' ORDER BY htDate DESC limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_healthtips WHERE htTitle LIKE ${searchQ} OR htDesc LIKE ${searchQ} OR htDate LIKE ${searchQ} OR htTags LIKE ${searchQ};`
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
  updateHealthTips: (data, callBack) => {
    console.log('reqBody', data.htTitle)
    pool.query(
      `UPDATE chg_healthtips SET htTitle=?,htDesc=?,htDate=?,htPic=?,htTags=?,htStatus=?,updated_by=?,updated_at=? WHERE healthTipId = ?`,
      [
        data.htTitle,
        data.htDesc,
        data.htDate,
        data.htPic,
        data.htTags,
        data.htStatus,
        data.updated_by,
        data.updated_at,
        data.healthTipId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  deleteHealthTips: (healthTipId, callBack) => {
    pool.query(
      `DELETE from chg_healthtips where healthTipId = ?`,
      [healthTipId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getHealthTipsById: (healthTipId, callBack) => {
    pool.query(
      `SELECT * from chg_healthtips where healthTipId = ?`,
      [healthTipId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  getHealthtipsTags: (data, callBack) => {
    pool.query(
      `SELECT htTags FROM chg_healthtips`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getNextHealthTipId: (currentId, callBack) => {
    pool.query(
      `SELECT healthTipId FROM chg_healthtips WHERE healthTipId > ? ORDER BY healthTipId LIMIT 1`,
      [currentId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getPrevHealthTipId: (currentId, callBack) => {
    pool.query(
      `SELECT healthTipId FROM chg_healthtips WHERE healthTipId < ? ORDER BY healthTipId DESC LIMIT 1`,
      [currentId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
}
