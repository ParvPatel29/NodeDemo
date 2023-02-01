const pool = require('../../config/database')
module.exports = {
  createHospital: (data, callBack) => {
    pool.query(
      `INSERT INTO chg_hospital(hName, hDesc, hCountry, hRegion, hAddress, hContact,hPassword,hContactCode, hPic, hFacebook, 
            hStatus,created_by,updated_by,created_at,updated_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.hName,
        data.hDesc,
        data.hCountry,
        data.hRegion,
        data.hAddress,
        data.hContact,
        data.hPassword,
        data.hContactCode,
        data.hPic,
        data.hFacebook,
        data.hStatus,
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
  getHospital: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    let filterHosQuery = ` WHERE (hName LIKE ${searchQ}
      OR hDesc LIKE 
      ${searchQ} 
      OR hCountry LIKE  
      ${searchQ}
      OR hContact LIKE  
      ${searchQ}
      OR hContact LIKE  
      ${searchQ}    
      OR hStatus LIKE 
      ${searchQ})`

    let countByHosQuery = ''

    if (req.query.hospitalId != '') {
      filterHosQuery += `AND hospitalId = ${req.query.hospitalId}`
      countByHosQuery = `AND hospitalId = ${req.query.hospitalId}`
    }

    const prodsQuery =
      `select * from chg_hospital ${filterHosQuery}` +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset
    console.log('countofhospital', countByHosQuery)

    const total_count = `SELECT COUNT(*) AS total_count from chg_hospital WHERE (hName LIKE ${searchQ} OR hDesc LIKE ${searchQ} OR hCountry LIKE ${searchQ} OR hRegion LIKE ${searchQ} OR hContact LIKE ${searchQ} OR hStatus LIKE ${searchQ}) ${countByHosQuery}`

    let count = ''
    console.log('count', total_count)
    console.log('countquery', total_count)
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
  getAllHospitals: (req, callBack) => {
    pool.query(
      'SELECT h.*,l.labId,p.pharmacyId FROM chg_hospital h LEFT JOIN chg_lab l ON h.hospitalId = l.lHospital LEFT JOIN chg_pharmacy p ON h.hospitalId=p.pHospital ',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
  updateHospital: (data, callBack) => {
    pool.query(
      `UPDATE chg_hospital set hName=?, hDesc=?, hCountry=?, hRegion=?, hAddress=?, hContact=?,hContactCode=?, hPic=?, hFacebook=?, 
        hStatus=?,updated_by=?,updated_at=? where hospitalId=?`,
      [
        data.hName,
        data.hDesc,
        data.hCountry,
        data.hRegion,
        data.hAddress,
        data.hContact,
        data.hContactCode,
        data.hPic,
        data.hFacebook,
        data.hStatus,
        data.updated_by,
        data.updated_at,
        data.hospitalId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  deleteHospital: (hospitalId, callBack) => {
    pool.query(
      `DELETE from chg_hospital where hospitalId = ?`,
      [hospitalId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getHospitalById: (data, callBack) => {
    pool.query(
      `SELECT h.* , c.cName , r.rName,l.labId,p.pharmacyId FROM chg_hospital h LEFT JOIN chg_country c ON h.hCountry = c.countryId LEFT JOIN chg_region r ON h.hRegion = r.regionId LEFT JOIN chg_lab l ON h.hospitalId = l.lHospital LEFT JOIN chg_pharmacy p ON h.hospitalId = p.pHospital where hospitalId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getHospitalByMobile: (mobileNumber, callBack) => {
    pool.query(
      `SELECT hospitalId,hName,hDesc,hCountry,hRegion,hAddress,hContact,hPic,hPassword from chg_hospital where hContact = ?`,
      [mobileNumber],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getHospitalByMobileAndId: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_hospital where hContact =? AND NOT hospitalId  = ?`,
      [data.hContact, data.hospitalId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getLabAndPharmacyByHospitalId: (data, callBack) => {
    pool.query(
      `SELECT h.hospitalId,l.labId,p.pharmacyId, FROM chg_hospital h LEFT JOIN chg_lab l ON h.hospitalId=l.lHospital LEFT JOIN chg_pharmacy p ON h.hospitalId=p.pHospital  where h.hospitalId =?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getHospitalStaffByMobile: (mobileNumber, callBack) => {
    pool.query(
      `SELECT * from chg_hospital_staff where sMobile = ?`,
      [mobileNumber],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
}
