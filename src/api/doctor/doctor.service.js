const pool = require('../../config/database')

module.exports = {
  createDoctor: (data, callBack) => {
    console.log('data', data)
    pool.query(
      `INSERT INTO chg_doctor(dFullName,dDescription, dEmail,dCountryCode, dMobile,dAltPhoneCountryCode, dAltPhone, dSpecialty, dHospital, dDOB, dPassword, 
        dProfilePic,dLanguage, dCountry, dRegion,dIdProofType, dIDproof, dFacebook, dTwitter, dInstagram, dStatus,dDegreeCertificateNumber, dDegreeCertificate, created_by, updated_by, 
        created_at, updated_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.dFullName,
        data.dDescription,
        data.dEmail,
        data.dCountryCode,
        data.dMobile,
        data.dAltPhoneCountryCode,
        data.dAltPhone,
        data.dSpecialty,
        data.dHospital,
        data.dDOB,
        data.dPassword,
        data.dProfilePic,
        data.dLanguage,
        data.dCountry,
        data.dRegion,
        data.dIdProofType,
        data.dIDproof,
        data.dFacebook,
        data.dTwitter,
        data.dInstagram,
        data.dStatus,
        data.dDegreeCertificateNumber,
        data.dDegreeCertificate,
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
  getDoctor: (req, callBack) => {
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

    let filterHosQuery = ` WHERE (d.dFullName LIKE ${searchQ}
    OR d.dEmail LIKE 
    ${searchQ} 
    OR d.dMobile LIKE  
    ${searchQ}  
    OR s.specialtyName LIKE 
    ${searchQ})`

    let countByHosQuery = ''

    if (req.query.hospitalId && req.query.hospitalId != '') {
      filterHosQuery += `AND d.dHospital = ${req.query.hospitalId}`
      countByHosQuery = `AND dHospital = ${req.query.hospitalId}`
    }

    const prodsQuery = `select d.doctorId , d.dFullName ,d.dDescription,d.dEmail , d.dRegion , d.dStatus , d.dCountry ,  d.dMobile , d.dSpecialty , d.dHospital , d.dProfilePic  , s.specialtyName , s.specialtyId  ,h.hName from chg_doctor d LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON d.dHospital = h.hospitalId ${filterHosQuery} limit ${limit} OFFSET ${offset}`

    const total_count = `select COUNT(*) TotalCount from chg_doctor d LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON d.dHospital = h.hospitalId WHERE (d.dFullName LIKE ${searchQ} OR d.dEmail LIKE ${searchQ} OR d.dMobile LIKE ${searchQ} OR s.specialtyName LIKE ${searchQ} OR h.hName LIKE ${searchQ}) ${countByHosQuery}`
    let count = 0
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        if (error) throw error
        if (results.length > 0) {
          count = results[0].TotalCount
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
          total_count: Number(count),
          page_number: page,
          result: results,
        }

        return callBack(null, jsonResult)
      })
    })
  },

  getAprovedDoctors: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    let filterHosQuery = ` WHERE (d.dFullName LIKE ${searchQ}
    OR d.dEmail LIKE 
    ${searchQ} 
    OR d.dMobile LIKE  
    ${searchQ}  
    OR s.specialtyName LIKE 
    ${searchQ}) AND d.dStatus = '2'`

    const prodsQuery = `select d.doctorId , d.dFullName ,d.dDescription,d.dEmail , d.dRegion , d.dStatus , d.dCountry ,  d.dMobile , d.dSpecialty , d.dHospital , d.dProfilePic  , s.specialtyName , s.specialtyId  ,h.hName from chg_doctor d LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON d.dHospital = h.hospitalId ${filterHosQuery} limit ${limit} OFFSET ${offset}`

    const total_count = `select COUNT(*) TotalCount from chg_doctor d LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON d.dHospital = h.hospitalId WHERE (d.dFullName LIKE ${searchQ} OR d.dEmail LIKE ${searchQ} OR d.dMobile LIKE ${searchQ} OR s.specialtyName LIKE ${searchQ} )AND d.dStatus = 2`
    let count = 0
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        if (error) throw error
        if (results.length > 0) {
          count = results[0].TotalCount
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
          total_count: Number(count),
          page_number: page,
          result: results,
        }

        return callBack(null, jsonResult)
      })
    })
  },

  getAllDoctors: (req, callBack) => {
    pool.query(
      'SELECT d.doctorId ,d.dFullName , d.dDescription ,  d.dEmail,d.dMobile,d.dAltPhone,d.dDOB,d.dProfilePic,d.dFacebook,d.dTwitter,d.dInstagram , s.specialtyName FROM chg_doctor d INNER JOIN chg_specialty s ON d.dSpecialty = s.specialtyId WHERE d.dStatus = 2',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  updateDoctor: (data, callBack) => {
    pool.query(
      `UPDATE chg_doctor set dFullName=?, dDescription = ? ,  dEmail=?,dPassword=?, dCountryCode = ?, dMobile=?,dAltPhoneCountryCode=?, dAltPhone=?, dSpecialty=?,dLanguage=?,dHospital=?, dDOB=?, dProfilePic=?, dCountry=?, dRegion=?, dIdProofType = ?,
      dIDproof=?, dFacebook=?, dTwitter=?, dInstagram=?, dStatus=?,dDegreeCertificateNumber=?,dDegreeCertificate= ?, updated_by = ?,updated_at = ? where doctorId=?`,
      [
        data.dFullName,
        data.dDescription,
        data.dEmail,
        data.dPassword,
        data.dCountryCode,
        data.dMobile,
        data.dAltPhoneCountryCode,
        data.dAltPhone,
        data.dSpecialty,
        data.dLanguage,
        data.dHospital,
        data.dDOB,
        data.dProfilePic,
        data.dCountry,
        data.dRegion,
        data.dIdProofType,
        data.dIDproof,
        data.dFacebook,
        data.dTwitter,
        data.dInstagram,
        data.dStatus,
        data.dDegreeCertificateNumber,
        data.dDegreeCertificate,
        data.updated_by,
        data.updated_at,
        data.doctorId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  updateDoctorDoc: (data, callBack) => {
    pool.query(
      `UPDATE chg_doctor set dIdProofType=?, dIDproof=?, dDegreeCertificateNumber=?, dDegreeCertificate=?, updated_by=?, 
        updated_at=? where doctorId=?`,
      [
        data.dIdProofType,
        data.dIDproof,
        data.dDegreeCertificateNumber,
        data.dDegreeCertificate,
        data.updated_by,
        data.updated_at,
        data.doctorId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateDoctorProfile: (data, callBack) => {
    pool.query(
      `UPDATE chg_doctor set dFullName=?, dDescription=? ,  dEmail=?, dMobile=?,dCountryCode=?, dAltPhone=?, dSpecialty=?,dHospital=?, dDOB=?,dFacebook=?,dTwitter=?,dInstagram=?,dProfilePic=?,dLanguage=?, dCountry=?, dRegion=?, updated_by=?, 
        updated_at=? where doctorId=?`,
      [
        data.dFullName,
        data.dDescription,
        data.dEmail,
        data.dMobile,
        data.dCountryCode,
        data.dAltPhone,
        data.dSpecialty,
        data.dHospital,
        data.dDOB,
        data.dFacebook,
        data.dTwitter,
        data.dInstagram,
        data.dProfilePic,
        data.dLanguage,
        data.dCountry,
        data.dRegion,
        data.updated_by,
        data.updated_at,
        data.doctorId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateDoctorProfilePic: (data, callBack) => {
    pool.query(
      `UPDATE chg_doctor set dProfilePic = ? , updated_by=?, 
        updated_at=? where doctorId=?`,
      [data.dProfilePic, data.updated_by, data.updated_at, data.doctorId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateDoctorStatus: (data, callBack) => {
    pool.query(
      `UPDATE chg_doctor set dStatus =? , updated_by=?, 
        updated_at=? where doctorId=?`,
      [data.dStatus, data.updated_by, data.updated_at, data.doctorId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  deleteDoctor: (doctorId, callBack) => {
    pool.query(
      `DELETE from chg_doctor where doctorId = ?`,
      [doctorId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  changeDoctorPassword: (data, callBack) => {
    pool.query(
      `UPDATE chg_doctor set dPassword=? where doctorId=?`,
      [data.dPassword, data.doctorId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  getDoctorByNameOrEmailOrMobile: (data, callBack) => {
    pool.query(
      `SELECT dFullName, dEmail, dMobile, dAltPhone, dSpecialty, dDOB, dPassword, 
      dProfilePic, dIDproof, dFacebook, dTwitter, dInstagram, dStatus, dDegreeCertificate FROM chg_doctor where dFullName LIKE ? or dEmail LIKE ? or dMobile LIKE ?`,
      [data.dText, data.dText, data.dText, data.dText],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  getDoctorByEmailOrMobile: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_doctor WHERE dMobile = ? OR  dEmail = ?`,
      [data.userName, data.userName],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },

  getDoctorByEmail: (email, callBack) => {
    pool.query(
      `SELECT doctorId, dFullName, dEmail, dMobile, dAltPhone, dSpecialty, dDOB, dPassword, dProfilePic, 
      dIDproof, dFacebook, dTwitter, dInstagram, dStatus, dDegreeCertificate FROM chg_doctor where dEmail = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      },
    )
  },

  getDoctorByMobileAndId: (data, callBack) => {
    pool.query(
      `SELECT doctorId, dFullName, dEmail, dMobile, dAltPhone, dSpecialty, dDOB, dPassword, dProfilePic, 
      dIDproof, dFacebook, dTwitter, dInstagram, dStatus, dDegreeCertificate FROM chg_doctor where dMobile = ? AND NOT doctorId = ?`,
      [data.dMobile, data.doctorId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getDoctorById: (data, callBack) => {
    pool.query(
      `SELECT d.* , s.specialtyName ,h.hospitalId,h.hAddress, h.hName,h.hFacebook , h.hContact,l.labId,p.pharmacyId FROM chg_doctor d LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON d.dHospital = h.hospitalId LEFT JOIN chg_lab l ON  d.dHospital=	lHospital LEFT JOIN chg_pharmacy p ON  d.dHospital=	p.pHospital  where doctorId = ?`,
      [data],
      (error, results, fields) => {
        console.log('resultsdddd', results)
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      },
    )
  },

  getDoctorByHospitalId: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_doctor where doctorId IN (?)`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getHospitalByDoctorId: (data, callBack) => {
    console.log('data', data)
    pool.query(
      `SELECT d.doctorId , h.* , l.labId,p.pharmacyId FROM chg_doctor d LEFT JOIN chg_hospital h  ON d.dHospital = h.hospitalId  LEFT JOIN chg_lab l ON d.dHospital = lHospital LEFT JOIN chg_pharmacy p ON d.dHospital = p.pHospital where doctorId = ?`,
      // `SELECT * FROM chg_doctor where doctorId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  getDoctorByNameAndSpe: (data, callBack) => {
    console.log('data', data)
    let hospitalId = Number(data.dHospital)
    pool.query(
      `SELECT d.* , s.specialtyName FROM chg_doctor d LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId where (d.dFullName Like ? OR d.dSpecialty = ? OR d.dHospital = ?) AND d.dStatus = 2`,
      [data.dFullName, data.dSpecialty, hospitalId],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getDoctorByMobile: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_doctor where dMobile = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getDoctorListByHospital: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_doctor where dHospital = ?`,
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
