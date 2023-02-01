const pool = require('../../config/database')
module.exports = {
  createHospitalStaff: (data, callBack) => {
    pool.query(
      `INSERT INTO chg_hospital_staff(sName, hospitalId, sCountry, sRegion, sMobile,sPassword,sCountryCode, sPic, sRole, 
            sStatus,created_by,updated_by,created_at,updated_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.sName,
        data.hospitalId,
        data.sCountry,
        data.sRegion,
        data.sMobile,
        data.sPassword,
        data.sCountryCode,
        data.sPic,
        data.sRole,
        data.sStatus,
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
  getHospitalStaff: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      'select * from chg_hospital_staff WHERE sName LIKE ' +
      searchQ +
      ' OR sCountry LIKE ' +
      searchQ +
      ' OR sRegion LIKE ' +
      searchQ +
      ' OR sMobile LIKE ' +
      searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset
    console.log('prodsQuery', prodsQuery)
    const total_count = `SELECT COUNT(*) AS total_count from chg_hospital_staff WHERE sName LIKE ${searchQ} OR sCountry LIKE ${searchQ} OR sRegion LIKE ${searchQ}  OR sMobile LIKE ${searchQ}`
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
  getAllHospitalStaff: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_hospital_staff',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
  updateHospitalStaff: (data, callBack) => {
    pool.query(
      `UPDATE chg_hospital_staff set sName=?, hospitalId=?, sCountry=?, sRegion=?, sCountryCode=?, sMobile=?, sPic=?, sRole=?, 
        sStatus=?,updated_by=?,updated_at=? where staffId =?`,
      [
        data.sName,
        data.hospitalId,
        data.sCountry,
        data.sRegion,
        data.sCountryCode,
        data.sMobile,
        data.sPic,
        data.sRole,
        data.sStatus,
        data.updated_by,
        data.updated_at,
        data.staffId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  deleteHospitalStaff: (staffId, callBack) => {
    pool.query(
      `DELETE from chg_hospital_staff where staffId = ?`,
      [staffId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getHospitalStaffById: (data, callBack) => {
    pool.query(
      `SELECT s.* , c.cName , r.rName FROM chg_hospital_staff s LEFT JOIN chg_country c ON s.sCountry = c.countryId LEFT JOIN chg_region r ON s.sRegion = r.regionId where staffId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getHospitalStaffByMobile: (data, callBack) => {
    pool.query(
      `SELECT * from chg_hospital_staff where sMobile = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getHospitalStaffByMobileAndId: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_hospital_staff where sMobile = ? AND NOT staffId = ?`,
      [data.sMobile, data.staffId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
}
