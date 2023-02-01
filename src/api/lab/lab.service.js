const pool = require('../../config/database')

module.exports = {
  createLab: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_lab(lName,lOwnerName,lMobile,lMobileCode,lAltPhone,lAltPhoneCode,lEmail,lPassword,lHospital,lCountry,lRegion,lAddress,lSince,lPic,lDesc,lStatus,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        data.lName,
        data.lOwnerName,
        data.lMobile,
        data.lMobileCode,
        data.lAltPhone,
        data.lAltPhoneCode,
        data.lEmail,
        data.lPassword,
        data.lHospital,
        data.lCountry,
        data.lRegion,
        data.lAddress,
        data.lSince,
        data.lPic,
        data.lDesc,
        data.lStatus,
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
  getLab: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    let filterHosQuery = ` WHERE 
      (lOwnerName LIKE ${searchQ}
      OR lMobile LIKE 
      ${searchQ} 
      OR lEmail LIKE  
      ${searchQ} 
      OR lName LIKE  
      ${searchQ} 
      OR lDesc LIKE  
      ${searchQ} 
      OR lStatus LIKE  
      ${searchQ} 
      OR lAddress LIKE 
      ${searchQ})`

    let countByHosQuery = ''

    if (req.query.hospitalId != '') {
      filterHosQuery += ` AND lHospital = ${req.query.hospitalId}`
      countByHosQuery = ` AND lHospital = ${req.query.hospitalId}`
    }

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      `select * from chg_lab ${filterHosQuery}` +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_lab WHERE (lName LIKE ${searchQ} OR lOwnerName LIKE ${searchQ} OR lMobile LIKE ${searchQ} OR lEmail LIKE ${searchQ} OR lAddress LIKE ${searchQ} OR lDesc LIKE ${searchQ} OR lStatus LIKE ${searchQ}) ${countByHosQuery}`
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
  updateLab: (data, id, callBack) => {
    pool.query(
      `UPDATE chg_lab set lName=?,lOwnerName=?,lMobile=?,lMobileCode=?,lAltPhone=?,lAltPhoneCode=?,lEmail=?,lPassword=?,lHospital=?,lCountry=?,lRegion=?,lAddress=?,lSince=?,lPic=?,lDesc=?,lStatus=?,updated_by=?,updated_at=? where labId=?`,
      [
        data.lName,
        data.lOwnerName,
        data.lMobile,
        data.lMobileCode,
        data.lAltPhone,
        data.lAltPhoneCode,
        data.lEmail,
        data.lPassword,
        data.lHospital,
        data.lCountry,
        data.lRegion,
        data.lAddress,
        data.lSince,
        data.lPic,
        data.lDesc,
        data.lStatus,
        data.updated_by,
        data.updated_at,
        data.labId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  updateLabProfilePic: (data, callBack) => {
    pool.query(
      `UPDATE chg_lab set lPic = ? , updated_by=?, 
        updated_at=? where labId=?`,
      [data.lPic, data.updated_by, data.updated_at, data.labId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateLabProfile: (data, id, callBack) => {
    pool.query(
      `UPDATE chg_lab set lName=?,lOwnerName=?,lMobile=?,lMobileCode=?,lAltPhone=?,lAltPhoneCode=?,lEmail=?,lCountry=?,lRegion=?,lAddress=?,lSince=?,lPic=?,lDesc=?,updated_by=?,updated_at=? where labId=?`,
      [
        data.lName,
        data.lOwnerName,
        data.lMobile,
        data.lMobileCode,
        data.lAltPhone,
        data.lAltPhoneCode,
        data.lEmail,
        data.lCountry,
        data.lRegion,
        data.lAddress,
        data.lSince,
        data.lPic,
        data.lDesc,
        data.updated_by,
        data.updated_at,
        data.labId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  deleteLab: (labId, callBack) => {
    pool.query(
      `DELETE from chg_lab where labId = ?`,
      [labId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  getLabByEmail: (email, callBack) => {
    pool.query(
      `SELECT labId, lName, lOwnerName, lMobile, lAltPhone, lEmail, lCountry, lRegion, lAddress, 
      lSince, lPic, lDesc, lStatus FROM chg_lab where lEmail = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getLabByMobileAndId: (data, callBack) => {
    pool.query(
      `SELECT labId, lName, lOwnerName, lMobile, lAltPhone, lEmail, lCountry, lRegion, lAddress, lSince, lPic, lDesc, lStatus FROM chg_lab where lMobile =? AND NOT labId = ?`,
      [data.lMobile, data.labId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getLabById: (labId, callBack) => {
    pool.query(
      `SELECT labId, lName, lOwnerName, lMobile,lMobileCode, lAltPhone, lAltPhoneCode,lEmail, lCountry,lHospital, lRegion, lAddress, lSince, lPic, lDesc, lStatus FROM chg_lab where labId = ?`,
      [labId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getLabByMobile: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_lab where lMobile = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
}
