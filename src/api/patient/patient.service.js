const pool = require('../../config/database')

module.exports = {
  createPatient: (data, callBack) => {
    console.log('pool', pool)
    pool.query(
      `INSERT INTO chg_users(uFirstName, uLastName, uEmail, uPassword,uCountryCode, uMobile, uCountry, uRegion, uAddress, 
        uZipCode,uDOB, uPic, uNationalIdType, uNationalId, uInsuranceNo, uInsuranceDoc, uStatus, created_by, updated_by, 
            created_at, updated_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.uFirstName,
        data.uLastName,
        data.uEmail,
        data.uPassword,
        data.uCountryCode,
        data.uMobile,
        data.uCountry,
        data.uRegion,
        data.uAddress,
        data.uZipCode,
        data.uDOB,
        data.uPic,
        data.uNationalIdType,
        data.uNationalId,
        data.uInsuranceNo,
        data.uInsuranceDoc,
        data.uStatus,
        data.created_by,
        data.updated_by,
        data.created_at,
        data.updated_at,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
  getPatient: (req, callBack) => {
    // limit as 20
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    let prodsQuery = ''
    let countQuery = ''
    let hospitalID = req.query.hospitalId

    if (hospitalID != '' && hospitalID != undefined) {
      let filterHosQuery = ` WHERE (
        u.uFirstName LIKE ${searchQ}
        OR u.uEmail LIKE 
        ${searchQ}
        OR u.uLastName LIKE
        ${searchQ}
        OR u.uMobile LIKE  
        ${searchQ}  
        OR u.uRegion LIKE 
        ${searchQ}) AND
        a.hospitalId = ${hospitalID}`

      prodsQuery = `SELECT u.uFirstName,u.uLastName,u.uEmail,u.uMobile,u.uStatus,u.userId FROM chg_appointment a LEFT JOIN chg_users u ON a.userId = u.userId ${filterHosQuery} limit ${limit} OFFSET ${offset}`

      countQuery = `SELECT COUNT(*) AS total_count FROM chg_appointment a LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId LEFT JOIN chg_users u ON a.userId = u.userId WHERE h.hospitalId = ${hospitalID}`
    } else {
      prodsQuery =
        // 'select * from chg_users limit ' + limit + ' OFFSET ' + offset

        'select * from chg_users WHERE uFirstName LIKE ' +
        searchQ +
        ' OR uEmail LIKE ' +
        searchQ +
        ' OR uMobile LIKE ' +
        searchQ +
        ' OR uRegion LIKE ' +
        searchQ +
        ' limit ' +
        limit +
        ' OFFSET ' +
        offset

      countQuery = `SELECT COUNT(*) AS total_count FROM chg_users WHERE uFirstName LIKE ${searchQ} OR uEmail LIKE ${searchQ} OR uMobile LIKE ${searchQ} OR uRegion LIKE ${searchQ}`
    }

    //const total_count = `SELECT COUNT(*) AS total_count FROM chg_users WHERE uFirstName LIKE ${searchQ} OR uEmail LIKE ${searchQ} OR uMobile LIKE ${searchQ} OR uRegion LIKE ${searchQ}`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(countQuery, function (error, results, fields) {
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
  updatePatient: (data, callBack) => {
    console.log('upassword',data.uPassword)
    pool.query(
      `UPDATE chg_users set uFirstName=?, uLastName=?, uEmail=?,uPassword=?, uCountryCode=?,uMobile=?, uCountry=?,uZipCode=?, uRegion=?, uAddress=?, 
        uDOB=?, uPic=?, uNationalIdType=?, uNationalId=?, uInsuranceNo=?, uInsuranceDoc=?, uStatus=?, updated_by=?, 
        updated_at=? where userId=?`,
      [
        data.uFirstName,
        data.uLastName,
        data.uEmail,
        data.uPassword,
        data.uCountryCode,
        data.uMobile,
        data.uCountry,
        data.uZipCode,
        data.uRegion,
        data.uAddress,
        data.uDOB,
        data.uPic,
        data.uNationalIdType,
        data.uNationalId,
        data.uInsuranceNo,
        data.uInsuranceDoc,
        data.uStatus,
        data.updated_by,
        data.updated_at,
        data.userId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updatePatientDoc: (data, callBack) => {
    pool.query(
      `UPDATE chg_users set uNationalIdType=?, uNationalId=?, uInsuranceNo=?, uInsuranceDoc=?, updated_by=?, 
        updated_at=? where userId=?`,
      [
        data.uNationalIdType,
        data.uNationalId,
        data.uInsuranceNo,
        data.uInsuranceDoc,
        data.updated_by,
        data.updated_at,
        data.userId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updatePatientProfile: (data, callBack) => {
    pool.query(
      `UPDATE chg_users set uFirstName=?, uLastName=?, uEmail=?, uMobile=?,uCountryCode=?,uDOB=?, uZipCode=?,uCountry=?,uRegion=?,uPic=?, updated_by=?, 
        updated_at=? where userId=?`,
      [
        data.uFirstName,
        data.uLastName,
        data.uEmail,
        data.uMobile,
        data.uCountryCode,
        data.uDOB,
        data.uZipCode,
        data.uCountry,
        data.uRegion,
        data.uPic,
        data.updated_by,
        data.updated_at,
        data.userId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updatePatientStatus: (data, callBack) => {
    pool.query(
      `UPDATE chg_users set uStatus =? , updated_by=?, 
        updated_at=? where userId=?`,
      [data.uStatus, data.updated_by, data.updated_at, data.userId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updatePatientProfilePic: (data, callBack) => {
    pool.query(
      `UPDATE chg_users set uPic =? , updated_by=?, 
        updated_at=? where userId=?`,
      [data.uPic, data.updated_by, data.updated_at, data.userId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  changePassword: (data, callBack) => {
    pool.query(
      `UPDATE chg_users set uPassword=? where userId=?`,
      [data.uPassword, data.userId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  getPatientByEmailOrMobile: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_users WHERE uMobile = ? OR  uEmail = ?`,
      [data.userName, data.userName],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  getPatientByMobileOrName: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    let uMobile = req.query.uMobile
    let uFirstName = req.query.uFirstName
    let uLastName = req.query.uLastName

    if (uMobile != '' && uMobile != undefined) {
      uMobile = '"%' + req.query.uMobile + '%" '
    } else {
      uMobile = "''"
    }
    if (uFirstName != '' && uFirstName != undefined) {
      uFirstName = '"%' + req.query.uFirstName + '%" '
    } else {
      uFirstName = "''"
    }
    if (uLastName != '' && uLastName != undefined) {
      uLastName = '"%' + req.query.uLastName + '%" '
    } else {
      uLastName = "''"
    }

    let prodsQuery = `SELECT * FROM chg_users WHERE uMobile LIKE ${uMobile} OR uFirstName LIKE ${uFirstName} OR uLastName LIKE ${uLastName} LIMIT ${limit} OFFSET ${offset}`

    let countQuery = `SELECT COUNT(*) AS total_count FROM chg_users WHERE uMobile LIKE ${uMobile} OR ${uFirstName} LIKE '' OR ${uLastName} LIKE ''`

    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(countQuery, function (error, results, fields) {
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

  getPatientByFirstNameOrLastNameOrEmailOrMobile: (data, callBack) => {
    pool.query(
      `SELECT uFirstName, uLastName, uEmail, uPassword, uMobile, uCountry, uRegion, uAddress, 
        uDOB, uPic, uNationalIdType, uNationalId, uInsuranceNo, uInsuranceDoc, uStatus FROM chg_users where uFirstName LIKE ? or uLastName LIKE ? or uEmail LIKE ? or uMobile LIKE ?`,
      [data.uText, data.uText, data.uText, data.uText],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
  deletePatient: (data, callBack) => {
    pool.query(
      `DELETE from chg_users where userId = ?`,
      [data],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getPatientByEmail: (email, callBack) => {
    pool.query(
      `SELECT userId, uFirstName, uLastName, uEmail, uPassword, uMobile, uCountry, uRegion, uAddress, 
            uDOB, uPic, uNationalIdType, uNationalId, uInsuranceNo, uInsuranceDoc, uStatus FROM chg_users where uEmail = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      },
    )
  },
  getPatientByMobilelAndId: (data, callBack) => {
    pool.query(
      `SELECT uFirstName, uLastName, uEmail, uPassword, uMobile, uCountry, uRegion, uAddress,
            uDOB, uPic, uNationalIdType, uNationalId, uInsuranceNo, uInsuranceDoc, uStatus FROM chg_users where uMobile = ? AND NOT userId = ?`,
      [data.uMobile, data.userId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getPatientById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_users where userId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      },
    )
  },
  getPatientByMobile: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_users where uMobile = ?`,
      [data],
      (error, results, fields) => {
        console.log('Patient error: ', error)
        console.log('Patient results: ', results)
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getPatientCountByMonth: (data, callBack) => {
    pool.query(
      `SELECT MONTH(created_at) month, COUNT(*) count FROM chg_users WHERE DATE(created_at) BETWEEN ? AND ? GROUP BY MONTH(created_at)`
      ,[data.previousYearDate,data.currentDate],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
}
