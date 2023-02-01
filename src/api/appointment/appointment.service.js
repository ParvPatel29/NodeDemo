const pool = require('../../config/database')

module.exports = {
  createAppointment: (data, callBack) => {
    pool.query(
      `
        INSERT INTO chg_appointment(userId, doctorId, apTokenId, apDate,apTime,apType, hospitalId, 
            pharmacyId, labId, apSymptoms, apConsultation, apStatus, created_by, updated_by, created_at, updated_at) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.userId,
        data.doctorId,
        data.apTokenId,
        data.apDate,
        data.apTime,
        data.apType,
        data.hospitalId,
        data.pharmacyId,
        data.labId,
        data.apSymptoms,
        data.apConsultation,
        data.apStatus,
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
  updateAppointment: (data, callBack) => {
    pool.query(
      `
        UPDATE chg_appointment SET userId=?, doctorId=?, apTokenId=?, apDate=?, apTime=?, hospitalId=?, 
            pharmacyId=?, labId=?, apSymptoms=?, apConsultation=?, apStatus=?, updated_by=?, updated_at=? where appointmentId=?`,
      [
        data.userId,
        data.doctorId,
        data.apTokenId,
        data.apDate,
        data.apTime,
        data.hospitalId,
        data.pharmacyId,
        data.labId,
        data.apSymptoms,
        data.apConsultation,
        data.apStatus,
        data.updated_by,
        data.updated_at,
        data.appointmentId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
  removeAppointment: (data, callBack) => {
    pool.query(
      `DELETE from chg_appointment where appointmentId = ?`,
      [data],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getAppointmentById: (data, callBack) => {
    pool.query(
      `SELECT a.*,u.userId,u.uFirstName,u.uLastName,u.uAddress,u.uZipCode,u.uMobile,u.uEMail ,u.uPic,d.dFullName,d.dProfilePic,d.dSpecialty,d.dMobile,d.dFacebook,d.dTwitter,d.dInstagram,h.hName ,h.hContact, h.hAddress , h.hPic ,  l.lName , l.lMobile , l.lAddress ,p.pName,p.pAddress,p.pMobile,s.specialtyName ,f.feedbackRate , f.feedbackText  from chg_appointment a LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId LEFT JOIN chg_lab l ON a.labId = l.labId LEFT JOIN chg_pharmacy p ON a.pharmacyId = p.pharmacyId LEFT JOIN chg_feedback f ON a.appointmentId  = f.appointmentId where a.appointmentId = ?`,
      [data],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  getAppointmentByPatientId: (req, callBack) => {
    console.log('request', req.query)
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime,a.apSymptoms,a.apConsultation,a.apStatus,a.feedbackStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName , h.hName , h.hContact , h.hAddress FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.userId = ' +
      req.query.userId +
      '  AND NOT a.apStatus >= 5 ORDER BY a.appointmentId DESC limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE userId = ${req.query.userId} AND NOT apStatus >= 5`
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
  getAppointmentByDoctorId: (req, callBack) => {
    const limit = req.query.perPage

    let prodsQuery = ''

    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit

    const doctorId = req.query.doctorId

    const apDate = req.query.apDate

    let checkLimit = ''

    let checkDate = ''

    if (limit && limit != '' && limit != undefined) {
      checkLimit = ` limit ${limit} OFFSET ${offset}`
    }

    if (apDate && apDate != '' && apDate != undefined) {
      checkDate = ` AND a.apDate = '${apDate}' `
    }

    prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime,a.apSymptoms,a.apConsultation,a.canceldBy,a.apStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a INNER JOIN chg_doctor d ON a.doctorId = d.doctorId INNER JOIN chg_users u ON a.userId = u.userId INNER JOIN chg_specialty s ON d.dSpecialty = s.specialtyId INNER JOIN chg_hospital h ON d.dHospital = h.hospitalId WHERE a.doctorId = ' +
      doctorId +
      ' AND NOT a.apStatus >= 5' +
      checkDate +
      checkLimit

    // query for fetching data with page number and offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE doctorId = ${req.query.doctorId} AND NOT apStatus >= 5`
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
  getAppointment: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit

    const searchQ = '"%' + req.query.search + '%" '

    let filterHosQuery = ` WHERE (a.apDate LIKE ${searchQ}
      OR a.apTime LIKE 
      ${searchQ} 
      OR u.uFirstName LIKE  
      ${searchQ}  
      OR d.dFullName LIKE 
      ${searchQ}
      OR h.hName LIKE 
      ${searchQ})`

    let countByHosQuery = ''

    if (req.query.hospitalId != '') {
      filterHosQuery += ` AND a.hospitalId = ${req.query.hospitalId}`
      countByHosQuery = ` AND a.hospitalId = ${req.query.hospitalId}`
    }
    let appQuery = `SELECT a.appointmentId  , a.apDate ,a.apTime, u.uFirstName, u.uLastName , d.dFullName , h.hName FROM chg_appointment a LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId ${filterHosQuery} limit ${limit} OFFSET ${offset}`

    const total_count = `select COUNT(*) TotalCount from chg_appointment a LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE (a.apDate LIKE ${searchQ} OR a.apTime LIKE ${searchQ} OR u.uFirstName LIKE ${searchQ} OR d.dFullName LIKE ${searchQ} OR h.hName LIKE ${searchQ}) ${countByHosQuery}`

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
      connection.query(appQuery, function (error, results, fields) {
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
  getDoctorIdsByHospitalId: (id, callBack) => {
    pool.query(
      `SELECT doctorId from chg_appointment where hospitalId = ?`,
      [id],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  // updateAppointmentConsultation: (data) => {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       `UPDATE chg_appointment set apConsultation =? , apStatus=? , medicine_status=?, updated_by=?,
  //         updated_at=? where appointmentId =?`,
  //       [
  //         data.apConsultation,
  //         data.apStatus,
  //         data.medicine_status,
  //         data.updated_by,
  //         data.updated_at,
  //         data.appointmentId,
  //       ],
  //       (error, results, fields) => {
  //         if (error) reject(error)
  //         resolve(results)
  //       },
  //     )
  //   })
  // },

  updateAppointmentConsultation: (data, callBack) => {
    pool.query(
      `UPDATE chg_appointment set apConsultation =? ,apStatus=?, updated_by=?, 
        updated_at=? where appointmentId =?`,
      [
        data.apConsultation,
        data.apStatus,
        data.updated_by,
        data.updated_at,
        data.appointmentId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateAppointmentStatus: (data, callBack) => {
    pool.query(
      `UPDATE chg_appointment set apStatus =? , updated_by=?, 
        updated_at=? where appointmentId =?`,
      [data.apStatus, data.updated_by, data.updated_at, data.appointmentId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateMedicineStatus: (data, callBack) => {
    pool.query(
      `UPDATE chg_appointment set medicine_status =? , updated_by=?, 
        updated_at=? where appointmentId =?`,
      [
        data.medicine_status,
        data.updated_by,
        data.updated_at,
        data.appointmentId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  updateFeedbackStatus: (data, callBack) => {
    pool.query(
      `UPDATE chg_appointment set feedbackStatus = ? , updated_by=?, 
        updated_at=? where appointmentId =?`,
      [
        data.feedbackStatus,
        data.updated_by,
        data.updated_at,
        data.appointmentId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  getAppointmentByHospital: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apSymptoms,a.apConsultation,a.apStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.hospitalId = ' +
      req.query.hospitalId +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE hospitalId = ${req.query.hospitalId}`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        console.log('error', error)
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

  getPendingReports: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime,a.apSymptoms,a.apConsultation,a.apStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.hospitalId = ' +
      req.query.hospitalId +
      ' AND a.apStatus = 3 limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE hospitalId = ${req.query.hospitalId} AND apStatus = 3`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        console.log('error', error)
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

  getUploadedgReports: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime, a.apSymptoms,a.apConsultation,a.apStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.hospitalId = ' +
      req.query.hospitalId +
      ' AND a.apStatus = 4 limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE hospitalId = ${req.query.hospitalId} AND apStatus = 4 `
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        console.log('error', error)
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

  getNotAvailableDoctIds: (apTime, callBack) => {
    pool.query(
      `SELECT doctorId from chg_appointment where apTime = ?`,
      [apTime],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  getLastRecordOfAppointment: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_appointment ORDER BY appointmentId DESC LIMIT 1',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getAppointmentCountByHospital: (hospitalId, callBack) => {
    pool.query(
      `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE hospitalId = ?`,
      [hospitalId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  cancelAppointment: (data, callBack) => {
    pool.query(
      `UPDATE chg_appointment set apStatus =? , canceldBy=? , updated_by=?, 
        updated_at=? where appointmentId =?`,
      [
        data.apStatus,
        data.canceldBy,
        data.updated_by,
        data.updated_at,
        data.appointmentId,
      ],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },

  getCancelAppointmentByDoctor: (req, callBack) => {
    const limit = req.query.perPage

    let prodsQuery = ''

    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit

    const doctorId = req.query.doctorId

    const apDate = req.query.apDate

    let checkLimit = ''

    let checkDate = ''

    if (limit && limit != '' && limit != undefined) {
      checkLimit = ` limit ${limit} OFFSET ${offset}`
    }

    if (apDate && apDate != '' && apDate != undefined) {
      checkDate = ` AND a.apDate = '${apDate}' `
    }

    prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime,a.apSymptoms,a.apConsultation,a.canceldBy,a.apStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a INNER JOIN chg_doctor d ON a.doctorId = d.doctorId INNER JOIN chg_users u ON a.userId = u.userId INNER JOIN chg_specialty s ON d.dSpecialty = s.specialtyId INNER JOIN chg_hospital h ON d.dHospital = h.hospitalId WHERE a.doctorId = ' +
      doctorId +
      ' AND a.apStatus >= 6' +
      checkDate +
      checkLimit

    // query for fetching data with page number and offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE doctorId = ${req.query.doctorId} AND apStatus >= 6`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        console.log('error Of Doctor', error)
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

  getCancelAppointmentByPatient: (req, callBack) => {
    console.log('request', req.query)
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime,a.apSymptoms,a.apConsultation,a.canceldBy,a.apStatus,a.feedbackStatus,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName , h.hName , h.hContact , h.hAddress FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.userId = ' +
      req.query.userId +
      '  AND  a.apStatus >= 6 ORDER BY a.appointmentId DESC limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE userId = ${req.query.userId} AND apStatus >= 6`
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

  getPharmacyAppointments: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime,a.apSymptoms,a.apConsultation,a.apStatus,a.medicine_status,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.hospitalId = ' +
      req.query.hospitalId +
      ' AND NOT a.medicine_status	 = 0 AND NOT a.medicine_status = 4 limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE hospitalId = ${req.query.hospitalId} AND NOT medicine_status	 = 0 AND NOT medicine_status = 4`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        console.log('error', error)
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

  getCompletePharmacyAppointments: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const prodsQuery =
      'SELECT a.appointmentId,a.apTokenId,a.apDate,a.apTime, a.apSymptoms,a.apConsultation,a.apStatus,a.medicine_status,d.doctorId,d.dFullName,d.dEmail,d.dMobile,d.dSpecialty,u.userId ,u.uFirstName,u.uLastName,u.uMobile,s.specialtyName ,h.hName,h.hAddress , h.hContact  FROM chg_appointment a LEFT JOIN chg_doctor d ON a.doctorId = d.doctorId LEFT JOIN chg_users u ON a.userId = u.userId LEFT JOIN chg_specialty s ON d.dSpecialty = s.specialtyId LEFT JOIN chg_hospital h ON a.hospitalId = h.hospitalId WHERE a.hospitalId = ' +
      req.query.hospitalId +
      ' AND a.medicine_status	= 4 limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_appointment WHERE hospitalId = ${req.query.hospitalId} AND medicine_status = 4 `
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        console.log('error', error)
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
  getAppointmentCountByMonth: (data, callBack) => {
    pool.query(
      `SELECT MONTH(apDate) month, COUNT(*) count FROM chg_appointment WHERE DATE(apDate) BETWEEN ? AND ? GROUP BY MONTH(apDate);`,
      [data.previousYearDate, data.currentDate],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
}
