const {
  createDoctor,
  getDoctor,
  updateDoctor,
  getDoctorByMobile,
  getDoctorById,
  getDoctorByMobileAndId,
  getDoctorByNameOrEmailOrMobile,
  getDoctorByEmailOrMobile,
  deleteDoctor,
  updateDoctorDoc,
  updateDoctorProfile,
  updateDoctorStatus,
  getDoctorByHospitalId,
  getDoctorByNameAndSpe,
  getAllDoctors,
  getHospitalByDoctorId,
  getDoctorListByHospital,
  getAprovedDoctors,
  updateDoctorProfilePic,
} = require('./doctor.service')
const {
  getDoctorIdsByHospitalId,
} = require('../appointment/appointment.service')
const { sign } = require('jsonwebtoken')
const emailValidator = require('email-validator')

const moment = require('moment')

const { genSaltSync, hashSync, compareSync } = require('bcrypt')

var authToken = require('../../auth/token_validation')

// const validate = require('../../common/validation_function')

function emailValidation(email) {
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
  createDoctor: (req, res) => {
    const body = req.body
    const email = body.dEmail
    const mobileNumber = body.dMobile
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
    getDoctorByMobile(mobileNumber, (error, results) => {
      console.log('result of duplicate', results)
      console.log('result of error', error)

      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (results.length > 0) {
        if (results[0].dStatus != 0) {
          return res.json({
            success: 0,
            message: 'Duplicate Mobile Number',
          })
        } else {
          deleteDoctor(results[0].doctorId, (error, results) => {
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
      body.dPassword = hashSync(body.dPassword, salt)
      let createdBy
      req.headers.authorization
        ? (createdBy = authToken.getCurrentUserId(req))
        : (createdBy = 0)
      body.created_by = createdBy
      body.updated_by = createdBy
      body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      createDoctor(body, (error, results) => {
        console.log('errordcdc', error)
        console.log('resultsdcdc', results)
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
    })
  },
  getDoctor: (req, res) => {
    getDoctor(req, (error, results) => {
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
  getAllDoctors: (req, res) => {
    getAllDoctors(req, (error, results) => {
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

  getAprovedDoctors: (req, res) => {
    getAprovedDoctors(req, (error, results) => {
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
  updateDoctor: (req, res) => {
    const body = req.body
    const email = body.dEmail
    const mobileNumber = body.dMobile
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
    getDoctorByMobileAndId(body, (error, results) => {
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

        const salt = genSaltSync(10)
        if(body.dPassword != ''){
          body.dPassword = hashSync(body.dPassword, salt)
          updateDoctor(body, (error, results) => {
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
          getDoctorById(body.doctorId, (error, results) => {
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
              body.dPassword = results.dPassword
              updateDoctor(body, (error, results) => {
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

  updateDoctorProfilePic: (req, res) => {
    const body = req.body
    const createdBy = body.doctorId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateDoctorProfilePic(body, (error, results) => {
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

  updateDoctorProfile: (req, res) => {
    const body = req.body
    const data = authToken.getCurrentUser(req)
    const email = body.dEmail
    const mobileNumber = body.dMobile

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

    getDoctorByMobileAndId(body, (error, results) => {
      console.log('result of duplicate', results)
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
        updateDoctorProfile(body, (error, results) => {
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

  updateDoctorDoc: (req, res) => {
    const body = req.body
    const createdBy = body.doctorId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateDoctorDoc(body, (error, results) => {
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

  updateDoctorStatus: (req, res) => {
    const body = req.body
    const createdBy = body.doctorId
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateDoctorStatus(body, (error, results) => {
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

  // changePassword: (req, res) => {
  //   const body = req.body
  //   const data = authToken.getCurrentUser(req)
  //   const salt = genSaltSync(10)
  //   body.aPassword = hashSync(body.aPassword, salt)
  //   changePassword(body, (error, results) => {
  //     if (error) {
  //       return res.status(200).json({
  //         success: 0,
  //         message: 'Database connection error',
  //         error: error,
  //       })
  //     }
  //     return res.status(200).json({
  //       success: 1,
  //       message: 'Password updated successfully ',
  //       data: results,
  //     })
  //   })
  // },

  searchDoctor: (req, res) => {
    const body = req.body
    if (body.dText) {
      body.dText = '%' + body.dText + '%'
    }
    console.log('doctorSearch', body.dText)
    getDoctorByNameOrEmailOrMobile(body, (error, results) => {
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
  getDoctorById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getDoctorById(Id, (error, results) => {
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

  getHospitalByDoctorId: (req, res) => {
    // const body = req.body
    // console.log('body', body)
    const Id = req.params.id

    getHospitalByDoctorId(Id, (error, results) => {
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

  getDoctorByHospitalId: (req, res) => {
    const body = req.body
    const Id = req.query.id
    getDoctorIdsByHospitalId(Id, (error, results) => {
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
      } else {
        let doctorArray = []
        for (let i = 0; i < results.length; i++) {
          doctorArray.push(results[i].doctorId)
        }
        getDoctorByHospitalId(doctorArray, (error, results) => {
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
      }
    })
  },

  deleteDoctor: (req, res) => {
    const body = req.body
    const doctorId = req.params.id

    deleteDoctor(doctorId, (error, results) => {
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
  doctoreLogin: (req, res) => {
    const body = req.body

    getDoctorByEmailOrMobile(body, (error, results) => {
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
      console.log('body.dPassword :: ', body.dPassword)
      console.log('results.dPassword :: ', results.dPassword)
      const result = compareSync(body.dPassword, results.dPassword)
      if (result) {
        results.dPassword = undefined
        results.uType = 4
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
  getDoctorByNameAndSpe: (req, res) => {
    const params = req.query
    if (params.dFullName) {
      params.dFullName = '%' + params.dFullName + '%'
    }
    getDoctorByNameAndSpe(params, (error, results) => {
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
  getDoctorListByHospital: (req, res) => {
    // const body = req.body
    // console.log('body', body)
    const Id = req.params.id

    getDoctorListByHospital(Id, (error, results) => {
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
}
