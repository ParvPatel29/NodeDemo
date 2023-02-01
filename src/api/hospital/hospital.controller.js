const {
  createHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  getHospitalById,
  getAllHospitals,
  getHospitalByMobile,
  getHospitalByMobileAndId,
  getLabAndPharmacyByHospitalId,
  getHospitalStaffByMobile,
} = require('./hospital.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

// const emailValidator = require('email-validator');
const moment = require('moment')

var authToken = require('../../auth/token_validation')

module.exports = {
  createHospital: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    getHospitalByMobile(body.hContact, (error, results) => {
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
          message: 'Duplicate Mobile Numeber found',
        })
      } else {
        const salt = genSaltSync(10)
        body.hPassword = hashSync(body.hPassword, salt)
        createHospital(body, (error, results) => {
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
  getAllHospitals: (req, res) => {
    getAllHospitals(req, (error, results) => {
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
  getHospital: (req, res) => {
    getHospital(req, (error, results) => {
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
  updateHospital: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    getHospitalByMobileAndId(body, (error, results) => {
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
          message: 'Duplicate emailId found',
        })
      } else {
        updateHospital(body, (error, results) => {
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
  getHospitalById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getHospitalById(Id, (error, results) => {
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
  deleteHospital: (req, res) => {
    const body = req.body
    const hospitalId = req.params.id

    deleteHospital(hospitalId, (error, results) => {
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

  getLabAndPharmacyByHospitalId: (req, res) => {
    const body = req.body
    const hospitalId = req.params.id

    getLabAndPharmacyByHospitalId(hospitalId, (error, results) => {
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

  hospitalLogin: (req, res) => {
    const body = req.body
    getHospitalByMobile(body.hMobile, (error, results) => {
      console.log('data of hospital: ', results)
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (!results.length > 0) {
        getHospitalStaffByMobile(body.hMobile, (error, staffResult) => {
          console.log('data of hospital Staff: ', staffResult)

          if (error) {
            return res.status(200).json({
              success: 0,
              message: 'Database connection error',
              error: error,
            })
          }
          if (!staffResult.length > 0) {
            return res.json({
              success: 0,
              message: 'Invalid Mobile Staff or password',
            })
          }
          const result = compareSync(body.hPassword, staffResult[0].sPassword)
          if (result) {
            staffResult[0].hPassword = undefined
            staffResult[0].userType = 'staff'
            const jsontoken = sign(
              { result: staffResult[0] },
              'u466105200chgdb2022chgadmin',
              {
                expiresIn: '365d',
              },
            )
            return res.json({
              success: 1,
              message: 'login successfully',
              token: jsontoken,
            })
          } else {
            return res.json({
              success: 0,
              message: 'Invalid Mobile or password',
            })
          }
        })
      } else {
        const result = compareSync(body.hPassword, results[0].hPassword)
        if (result) {
          results[0].hPassword = undefined
          results[0].userType = 'hospital'

          const jsontoken = sign(
            { result: results[0] },
            'u466105200chgdb2022chgadmin',
            {
              expiresIn: '365d',
            },
          )
          return res.json({
            success: 1,
            message: 'login successfully',
            token: jsontoken,
          })
        } else {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }
      }
    })
  },
}
