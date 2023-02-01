const {
  createPharmacy,
  getPharmacy,
  updatePharmacy,
  deletePharmacy,
  getPharmacyById,
  updatePharmacyProfile,
  updatePharmacyProfilePic,
} = require('./pharmacy.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')

const emailValidator = require('email-validator')

function emailValidation(email) {
  if (!email || !emailValidator.validate(email)) {
    return false
  } else {
    return true
  }
}

module.exports = {
  createPharmacy: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const salt = genSaltSync(10)
    body.pPassword = hashSync(body.pPassword, salt)
    createPharmacy(body, (error, results) => {
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
  getPharmacy: (req, res) => {
    getPharmacy(req, (error, results) => {
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
  updatePharmacy: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const salt = genSaltSync(10)
    if(body.pPassword != ''){
      body.pPassword = hashSync(body.pPassword, salt)
      updatePharmacy(body, (error, results) => {
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
    }else{
      getPharmacyById(body.pharmacyId, (error, results) => {
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
        }else{
          body.pPassword = results.pPassword
          updatePharmacy(body, (error, results) => {
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
    
  },
  getPharmacyById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getPharmacyById(Id, (error, results) => {
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
  deletePharmacy: (req, res) => {
    const body = req.body
    const pharmacyId = req.params.id

    deletePharmacy(pharmacyId, (error, results) => {
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

  updatePharmacyProfilePic: (req, res) => {
    const body = req.body
    const createdBy = body.pharmacyId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updatePharmacyProfilePic(body, (error, results) => {
      console.log('results of pharmacy : ', results)
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

  updatePharmacyProfile: (req, res) => {
    const body = req.body
    const id = req.params.id
    const email = body.pEmail
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
    updatePharmacyProfile(body, id, (error, results) => {
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
