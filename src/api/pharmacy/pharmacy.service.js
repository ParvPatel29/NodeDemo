const pool = require('../../config/database')
const moment = require('moment')
module.exports = {
  createPharmacy: (data, callBack) => {
    pool.query(
      `INSERT INTO chg_pharmacy(pName, pOwnerName, pMobile,pMobileCode, pAltPhone,pAltPhoneCode, pEmail, pDesc,pHospital, pCountry, 
        pRegion, pAddress,pPic, pSince, pPassword, pStatus,created_by,updated_by,created_at,updated_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.pName,
        data.pOwnerName,
        data.pMobile,
        data.pMobileCode,
        data.pAltPhone,
        data.pAltPhoneCode,
        data.pEmail,
        data.pDesc,
        data.pHospital,

        data.pCountry,
        data.pRegion,
        data.pAddress,
        data.pPic,
        data.pSince,
        data.pPassword,
        data.pStatus,
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
  getPharmacy: (req, callBack) => {
    console.log('req', req.query)
    //pool.query(`SELECT * FROM chg_users`,
    //(error, results, fields) => {
    //    if (error) callBack(error);
    //    return callBack(null, results);
    //});
    // limit as 20
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    let filterHosQuery = ` WHERE 
      (pName LIKE ${searchQ}
      OR pOwnerName LIKE 
      ${searchQ} 
      OR pMobile LIKE  
      ${searchQ} 
      OR pEmail LIKE  
      ${searchQ} 
      OR pDesc LIKE  
      ${searchQ} 
      OR pCountry LIKE  
      ${searchQ} 
      OR pStatus LIKE 
      ${searchQ})`

    let countByHosQuery = ''

    if (req.query.hospitalId != '') {
      filterHosQuery += ` AND pHospital = ${req.query.hospitalId}`
      countByHosQuery = ` AND pHospital = ${req.query.hospitalId}`
    }

    const prodsQuery =
      // 'select * from chg_pharmacy limit ' + limit + ' OFFSET ' + offset

      `select * from chg_pharmacy ${filterHosQuery}` +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_pharmacy WHERE (pOwnerName LIKE ${searchQ} OR pMobile LIKE ${searchQ} OR pEmail LIKE ${searchQ} OR pDesc LIKE ${searchQ} OR pCountry LIKE ${searchQ} OR pStatus LIKE ${searchQ} OR pName LIKE ${searchQ}) ${countByHosQuery}`
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
  updatePharmacy: (data, callBack) => {
    pool.query(
      `UPDATE chg_pharmacy set pName=?, pOwnerName=?, pMobile=?,  pMobileCode=?,pAltPhone=?,pAltPhoneCode=?, pEmail=?,pPassword=?, pDesc=?, pHospital=?,pCountry=?,
        pRegion=?, pAddress=?, pSince=?,pPic =?, pStatus=?,updated_by=?,updated_at=?where pharmacyId=?`,
      [
        data.pName,
        data.pOwnerName,
        data.pMobile,
        data.pMobileCode,
        data.pAltPhone,
        data.pAltPhoneCode,
        data.pEmail,
        data.pPassword,
        data.pDesc,
        data.pHospital,
        data.pCountry,
        data.pRegion,
        data.pAddress,
        data.pSince,
        data.pPic,
        // data.pPassword,
        data.pStatus,
        data.updated_by,
        data.updated_at,
        data.pharmacyId,
      ],
      (error, results, fields) => {
        console.log('errofpharma:', error)
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
  getPharmacyById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_pharmacy where pharmacyId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  deletePharmacy: (pharmacyId, callBack) => {
    pool.query(
      `DELETE from chg_pharmacy where pharmacyId = ?`,
      [pharmacyId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getPharmacyByMobile: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_pharmacy where pMobile = ?`,
      [data],
      (error, results, fields) => {
        console.log('results of pp: ', results)
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  updatePharmacyProfile: (data, id, callBack) => {
    pool.query(
      `UPDATE chg_pharmacy set pName=?,pOwnerName=?,pMobile=?,pAltPhone=?,pEmail=?,pDesc = ?,pCountry=?,pRegion=?,pAddress=?,pPic=?,pSince=?,updated_by=?,updated_at=? where pharmacyId=?`,
      [
        data.pName,
        data.pOwnerName,
        data.pMobile,
        data.pAltPhone,
        data.pEmail,
        data.pDesc,
        data.pCountry,
        data.pRegion,
        data.pAddress,
        data.pPic,
        data.pSince,
        data.updated_by,
        data.updated_at,
        data.pharmacyId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  updatePharmacyProfilePic: (data, callBack) => {
    pool.query(
      `UPDATE chg_pharmacy set pPic = ? , updated_by=?, 
        updated_at=? where pharmacyId=?`,
      [data.pPic, data.updated_by, data.updated_at, data.pharmacyId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
}
