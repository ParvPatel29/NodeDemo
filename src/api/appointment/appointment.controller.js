const {
  createAppointment,
  updateAppointment,
  removeAppointment,
  getAppointment,
  getAppointmentById,
  getAppointmentByPatientId,
  getAppointmentByHospital,
  getAppointmentByDoctorId,
  updateAppointmentConsultation,
  updateAppointmentStatus,
  updateMedicineStatus,
  getNotAvailableDoctIds,
  getLastRecordOfAppointment,
  updateFeedbackStatus,
  getAppointmentCountByHospital,
  getPendingReports,
  getPharmacyAppointments,
  getUploadedgReports,
  cancelAppointment,
  getCancelAppointmentByDoctor,
  getCancelAppointmentByPatient,
  getCompletePharmacyAppointments,
  getAppointmentCountByMonth,
} = require('./appointment.service')
var authToken = require('../../auth/token_validation')
const moment = require('moment')

module.exports = {
  createAppointment: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    let date = new Date(body.apDate).getDate()
    var val = Math.floor(1000 + Math.random() * 9000)

    body.apTokenId = date < 10 ? `0${date}${val}` : `${date}${val}`
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    createAppointment(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  updateAppointment: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateAppointment(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  removeAppointment: (req, res) => {
    const appointmentId = req.params.appointmentId
    removeAppointment(appointmentId, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getAppointment: (req, res) => {
    const body = req.body
    getAppointment(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getAppointmentById: (req, res) => {
    const appointmentId = req.params.appointmentId
    getAppointmentById(appointmentId, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getAppointmentByPatientId: (req, res) => {
    //const req = req.params
    getAppointmentByPatientId(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getAppointmentByDoctorId: (req, res) => {
    getAppointmentByDoctorId(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getAppointmentByHospital: (req, res) => {
    getAppointmentByHospital(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getPendingReports: (req, res) => {
    getPendingReports(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getPharmacyAppointments: (req, res) => {
    getPharmacyAppointments(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getUploadedgReports: (req, res) => {
    getUploadedgReports(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getAppointmentCountByHospital: (req, res) => {
    const hospitalId = req.params.hospitalId
    getAppointmentCountByHospital(hospitalId, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  updateAppointmentStatus: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateAppointmentStatus(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  updateMedicineStatus: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateMedicineStatus(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  updateFeedbackStatus: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateFeedbackStatus(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  updateAppointmentConsultation: (req, res) => {
    const body = req.body
    const createdBy = body.doctorId
    // body.apStatus = 2
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateAppointmentConsultation(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getNotAvailableDoctIds: (req, res) => {
    const body = req.body.apTime
    console.log('apTime', body)
    getNotAvailableDoctIds(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (!results) {
        return res.status(200).json({
          success: 0,
          message: 'Records not found',
        })
      }
      return res.json({
        success: 1,
        data: results,
      })
    })
  },

  getLastRecordOfAppointment: (req, res) => {
    getLastRecordOfAppointment(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (!results) {
        return res.status(200).json({
          success: 0,
          message: 'Records not found',
        })
      }
      return res.json({
        success: 1,
        data: results[0].apTokenId,
      })
    })
  },

  cancelAppointment: (req, res) => {
    const body = req.body
    const userType = body.canceldBy
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.canceldBy = userType == 3 ? 1 : 0
    cancelAppointment(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getCancelAppointmentByDoctor: (req, res) => {
    getCancelAppointmentByDoctor(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getCancelAppointmentByPatient: (req, res) => {
    getCancelAppointmentByPatient(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getCompletePharmacyAppointments: (req, res) => {
    getCompletePharmacyAppointments(req, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getAppointmentCountByMonth: (req, res) => {
    let currentDate = moment(Date.now()).format('YYYY-MM-DD')
    let previousYearDate = new Date()
    previousYearDate = previousYearDate.setFullYear(previousYearDate.getFullYear() - 1)
    previousYearDate = moment(previousYearDate).format('YYYY-MM-DD')
    
    let body = {
      currentDate : currentDate,
      previousYearDate : previousYearDate
    }
    getAppointmentCountByMonth(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
}
