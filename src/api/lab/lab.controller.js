const {
  createLab,
  getLab,
  updateLab,
  deleteLab,
  getLabByEmail,
  getLabById,
  getLabByMobileAndId,
  getLabByMobile,
  updateLabProfile,
  updateLabProfilePic,
} = require('./lab.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')

const emailValidator = require('email-validator')

var validate = require('../../common/validation_function')

function emailValidation(email) {
  if (!email || !emailValidator.validate(email)) {
    return false
  } else {
    return true
  }
}

module.exports = {
  createLab: (req, res) => {
    const body = req.body
    const email = body.lEmail
    const mobileNumber = body.lMobile
    const altermobileNumber = body.lAltPhone
    if (email != '') {
      if (!emailValidation(email)) {
        return res.status(200).json({
          success: 0,
          message: 'Invalid emailId',
        })
      }
    }
    if (!validate.mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }

    getLabByMobile(mobileNumber, (error, results) => {
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
        const salt = genSaltSync(10)
        body.lPassword = hashSync(body.lPassword, salt)
        const createdBy = authToken.getCurrentUserId(req)
        body.created_by = createdBy
        body.updated_by = createdBy
        body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        createLab(body, (error, result) => {
          if (error) {
            return res.status(200).json({
              success: 0,
              message: 'Database connection error',
              error: error,
            })
          }
          return res.status(200).json({
            success: 1,
            data: result,
          })
        })
      }
    })
  },
  getLab: (req, res) => {
    getLab(req, (error, results) => {
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
  updateLab: (req, res) => {
    const body = req.body
    const id = req.params.id
    console.log('idoflab',id)
    const email = body.lEmail
    const mobileNumber = body.lMobile
    const altermobileNumber = body.lAltPhone
    if (email != '') {
      if (!emailValidation(email)) {
        return res.status(200).json({
          success: 0,
          message: 'Invalid emailId',
        })
      }
    }
    if (!validate.mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }
    //if (!validate.mobileValidation(altermobileNumber)) {
    //  return res.status(200).json({
    //    success: 0,
    //    message: 'Invalid AlterMobile number',
    //  })
    //}
    getLabByMobileAndId(body, (error, results) => {
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
        const createdBy = authToken.getCurrentUserId(req)
        body.updated_by = createdBy
        body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        const salt = genSaltSync(10)
        if (body.lPassword != '') {
          body.lPassword = hashSync(body.lPassword, salt)
          console.log('lPassword',body.lPassword)
          updateLab(body, id, (error, results) => {
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
        } else {
          console.log('idlab',id)
          console.log('bodyoflab',body)
          
          getLabById(body.labId, (error, results) => {
            if (error) {
              return res.status(200).json({
                success: 0,
                message: 'Database connection error',
                error: error,
              })
            }
            if (!results || results.length == 0) {
              return res.status(200).json({
                success: 0,
                message: 'Records not found',
              })
            } else {
              body.lPassword = results.lPassword
              updateLab(body, id, (error, results) => {
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
        }
      }
    })
  },

  updateLabProfilePic: (req, res) => {
    const body = req.body
    const createdBy = body.labId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateLabProfilePic(body, (error, results) => {
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

  updateLabProfile: (req, res) => {
    const body = req.body
    const id = req.params.id
    const email = body.lEmail
    if (email != '') {
      if (!emailValidation(email)) {
        return res.status(200).json({
          success: 0,
          message: 'Invalid emailId',
        })
      }
    }

    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateLabProfile(body, id, (error, results) => {
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

  getLabById: (req, res) => {
    const labId = req.params.id
    getLabById(labId, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      console.log('trere', results)
      if (!results || results.length == 0) {
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
  deleteLab: (req, res) => {
    const body = req.body
    const labId = req.params.id

    deleteLab(labId, (error, results) => {
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
