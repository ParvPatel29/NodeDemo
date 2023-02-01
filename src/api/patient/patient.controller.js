const {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  getPatientByEmail,
  getPatientById,
  getPatientByMobilelAndId,
  updatePatientProfile,
  getPatientByMobile,
  getPatientByFirstNameOrLastNameOrEmailOrMobile,
  changePassword,
  updatePatientStatus,
  updatePatientDoc,
  getPatientByMobileOrName,
  updatePatientProfilePic,
  getPatientCountByMonth,
} = require('./patient.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const moment = require('moment')
const { sign } = require('jsonwebtoken')
var authToken = require('../../auth/token_validation')
const emailValidator = require('email-validator')

function emailValidation(email) {
  console.log('emailV', email)
  if (!email || !emailValidator.validate(email)) {
    return false
  } else {
    return true
  }
}

function mobileValidation(mobileNumber) {
  const reg = new RegExp('^[0-9]{10}$')
  console.log('mobileNumber', mobileNumber)
  if (!mobileNumber || !mobileNumber.match(reg)) {
    return false
  } else {
    return true
  }
}
module.exports = {
  createPatient: (req, res) => {
    const body = req.body
    const email = body.uEmail
    const mobileNumber = body.uMobile
    if (email != '') {
      if (!emailValidation(email)) {
        return res.status(200).json({
          success: 0,
          message: 'Invalid emailId',
        })
      }
    }

    if (!mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }
    getPatientByMobile(mobileNumber, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      console.log('result of pp', results)
      if (results.length > 0) {
        if (results[0].uStatus != 0) {
          return res.json({
            success: 0,
            message: 'Duplicate Mobile Number',
          })
        } else {
          deletePatient(results[0].userId, (error, results) => {
            if (error) {
              return res.status(200).json({
                success: 0,
                message: 'Database connection error',
                error: error,
              })
            }
          })
        }
      }
      const salt = genSaltSync(10)
      body.uPassword = hashSync(body.uPassword, salt)

      let createdBy
      req.headers.authorization
        ? (createdBy = authToken.getCurrentUserId(req))
        : (createdBy = 0)
      body.created_by = createdBy
      body.updated_by = createdBy
      body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      createPatient(body, (error, results) => {
        if (error) {
          console.log('error', error)
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
    })
  },
  searchPatient: (req, res) => {
    const body = req.body
    if (body.uText) {
      body.uText = '%' + body.uText + '%'
    }
    getPatientByFirstNameOrLastNameOrEmailOrMobile(body, (error, results) => {
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
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },

  getPatient: (req, res) => {
    getPatient(req, (error, results) => {
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
  getPatientById: (req, res) => {
    const body = req.body
    const userId = req.params.id

    getPatientById(userId, (error, results) => {
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
  updatePatient: (req, res) => {
    console.log('main_body: ',req.body)
    const body = req.body
    const email = body.uEmail
    const mobileNumber = body.uMobile
    var tempPass;
    if (email != '') {
      if (!emailValidation(email)) {
        return res.status(200).json({
          success: 0,
          message: 'Invalid emailId',
        })
      }
    }
    if (!mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }
    getPatientByMobilelAndId(body,async (error, results) => {
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
        const createdBy = authToken.getCurrentUserId(req)
        body.updated_by = createdBy
        body.updated_by = createdBy
       
        const salt = genSaltSync(10)
        
        if(body.uPassword != ''){
          body.uPassword = hashSync(body.uPassword, salt)
          updatePatient(body, (error, results) => {
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
          console.log('yes null : ',body.uPassword)
           getPatientById(body.userId, (error, results) => {
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
              body.uPassword = results.uPassword
              updatePatient(body, (error, results) => {
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
            console.log('resultof',results)
          })
        }
        console.log('tempPass',tempPass)
      }
    })
  },

  updatePatientProfile: (req, res) => {
    const body = req.body
    const data = authToken.getCurrentUser(req)
    // const salt = genSaltSync(10)
    // const result = compareSync(body.aPassword, data.aPassword)
    // if (result) {
    //   body.aPassword = hashSync(body.newPassword, salt)
    //   body.userId = data.userId
    //   changePassword(body, (error, results) => {
    //     if (error) {
    //       return res.status(200).json({
    //         success: 0,
    //         message: 'Database connection error',
    //       })
    //     }
    //     return res.status(200).json({
    //       success: 1,
    //       message: 'Password updated successfully ',
    //     })
    //   })
    // } else {
    //   return res.json({
    //     success: 0,
    //     message: 'Invalid email or password',
    //   })
    // }
    const email = body.uEmail
    const mobileNumber = body.uMobile
    if (email != '') {
      if (!emailValidation(email)) {
        return res.status(200).json({
          success: 0,
          message: 'Invalid emailId',
        })
      }
    }
    if (!mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }
    getPatientByMobilelAndId(body, (error, results) => {
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
        const createdBy = authToken.getCurrentUserId(req)
        body.updated_by = createdBy
        body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        console.log('body', body)
        updatePatientProfile(body, (error, results) => {
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

  updatePatientDoc: (req, res) => {
    const body = req.body
    const createdBy = body.userId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updatePatientDoc(body, (error, results) => {
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

  updatePatientStatus: (req, res) => {
    const body = req.body
    const createdBy = body.userId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updatePatientStatus(body, (error, results) => {
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

  updatePatientProfilePic: (req, res) => {
    const body = req.body
    const createdBy = body.userId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updatePatientProfilePic(body, (error, results) => {
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

  searchPatient: (req, res) => {
    const body = req.body
    if (body.uText) {
      body.uText = '%' + body.uText + '%'
    }
    getPatientByFirstNameOrLastNameOrEmailOrMobile(body, (error, results) => {
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
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  deletePatient: (req, res) => {
    const body = req.body
    const userId = req.params.id
    console.log('userId :: ', userId)
    deletePatient(userId, (error, results) => {
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
  patientLogin: (req, res) => {
    const body = req.body
    getPatientByEmail(body.uEmail, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Invalid email or password',
        })
      }
      const result = compareSync(body.uPassword, results.uPassword)
      if (result) {
        results.uPassword = undefined
        results.uType = 3
        const jsontoken = sign(
          { result: results },
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
          message: 'Invalid email or password',
        })
      }
    })
  },
  getPatientByMobileOrName: (req, res) => {
    getPatientByMobileOrName(req, (error, results) => {
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
  getPatientCountByMonth: (req, res) => {
    let currentDate = moment(Date.now()).format('YYYY-MM-DD')
    let previousYearDate = new Date()
    previousYearDate = previousYearDate.setFullYear(previousYearDate.getFullYear() - 1)
    previousYearDate = moment(previousYearDate).format('YYYY-MM-DD')
    
    let body = {
      currentDate : currentDate,
      previousYearDate : previousYearDate
    }
    getPatientCountByMonth(body, (error, results) => {
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
