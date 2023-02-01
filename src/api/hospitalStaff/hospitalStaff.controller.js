const {
  createHospitalStaff,
  getHospitalStaff,
  updateHospitalStaff,
  deleteHospitalStaff,
  getHospitalStaffById,
  getAllHospitalStaff,
  getHospitalStaffByMobile,
  getHospitalStaffByMobileAndId,
} = require('./hospitalStaff.service')
const { genSaltSync, hashSync } = require('bcrypt')
// const emailValidator = require('email-validator');
const moment = require('moment')

var authToken = require('../../auth/token_validation')

module.exports = {
  createHospitalStaff: (req, res) => {
    const body = req.body
    const mobileNumber = body.sMobile
    const createdBy = authToken.getCurrentUserId(req)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    getHospitalStaffByMobile(mobileNumber, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (results.length > 0) {
        return res.status(200).json({
          success: 0,
          message: 'Duplicate Mobile Number',
          error: error,
        })
      } else {
        const salt = genSaltSync(10)
        body.sPassword = hashSync(body.sPassword, salt)
        createHospitalStaff(body, (error, results) => {
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
      }
    })
  },
  getAllHospitalStaff: (req, res) => {
    getAllHospitalStaff(req, (error, results) => {
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
  getHospitalStaff: (req, res) => {
    getHospitalStaff(req, (error, results) => {
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
  updateHospitalStaff: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    getHospitalStaffByMobileAndId(body, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (results && results.length > 0) {
        return res.status(200).json({
          success: 0,
          message: 'Duplicate Mobile Number found',
        })
      } else {
        updateHospitalStaff(body, (error, results) => {
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
      }
    })
  },
  getHospitalStaffById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getHospitalStaffById(Id, (error, results) => {
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
  deleteHospitalStaff: (req, res) => {
    const body = req.body
    const staffId = req.params.id

    deleteHospitalStaff(staffId, (error, results) => {
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
