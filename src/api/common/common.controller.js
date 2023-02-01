const {
  saveOtp,
  getOtpByUserIdAndType,
  updateOtp,
  deleteOtp,
  getLanguages,
  getTotalRecordsCount,
} = require('./common.service')
const {
  getPatientById,
  changePassword,
  getPatientByEmailOrMobile,
  getPatientByMobile,
} = require('../patient/patient.service')

const {
  getDoctorById,
  changeDoctorPassword,
  getDoctorByEmailOrMobile,
  getDoctorByMobile,
} = require('../doctor/doctor.service')

const {
  updateAppointmentConsultation,
  updateAppointmentStatus,
} = require('../appointment/appointment.service')

const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const moment = require('moment')
const { sign } = require('jsonwebtoken')
const fs = require('fs')
const { s3 } = require('../../awsService/awsService')
var authToken = require('../../auth/token_validation')
const { log } = require('console')
const {
  createLabReport,
  AddLabReport,
} = require('../labreports/labreport.service')
const { createMedicine, AddMedicine } = require('../medicine/medicine.service')
const { getLabByMobile } = require('../lab/lab.service')
const { getPharmacyByMobile } = require('../pharmacy/pharmacy.service')

function mobileValidation(mobileNumber) {
  const reg = new RegExp('^[0-9]{10}$')
  console.log('mobileNumber', mobileNumber)
  if (!mobileNumber || !mobileNumber.match(reg)) {
    return false
  } 
  // else if (mobileNumber.charAt(0) == 0) {
  //   return false
  // } 
  else {
    return true
  }
}
module.exports = {
  generateOtp: (req, res) => {
    const body = req.body
    const userType = body.userType
    const userId = body.Id
    const randomNumber = Math.floor(100000 + Math.random() * 900000)

    if (userType === 1) {
    } else if (userType === 3) {
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
            message: 'User Records not found',
          })
        }
        body.otp = Math.round(randomNumber)
        body.mobilenumber = results.uMobile
        // getOtpByUserIdAndType(userType, userId, (error, results) => {
        //   if (error) {
        //     return res.status(200).json({
        //       success: 0,
        //       message: 'Database connection error',
        //       error: error,
        //     })
        //   }

        saveOtp(body, (error, results) => {
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
              message: 'Error during insert otp',
            })
          }
          return res.json({
            success: 1,
            data: [{ OTP: body.otp }],
          })
        })
        //  else {
        //   updateOtp(body, (error, results) => {
        //     if (error) {
        //       return res.status(200).json({
        //         success: 0,
        //         message: 'Database connection error',
        //         error: error,
        //       })
        //     }
        //     if (!results) {
        //       return res.status(200).json({
        //         success: 0,
        //         message: 'Error during insert otp',
        //       })
        //     }
        //     return res.json({
        //       success: 1,
        //       data: [{ OTP: body.otp }],
        //     })
        //   })
        // }
        // })
      })
    } else if (userType === 4) {
      getDoctorById(userId, (error, results) => {
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
            message: 'User Records not found',
          })
        }
        body.otp = Math.round(randomNumber)
        body.mobilenumber = results.dMobile
        getOtpByUserIdAndType(userType, userId, (error, results) => {
          if (error) {
            return res.status(200).json({
              success: 0,
              message: 'Database connection error',
              error: error,
            })
          }
          if (!results) {
            saveOtp(body, (error, results) => {
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
                  message: 'Error during insert otp',
                })
              }
              return res.json({
                success: 1,
                data: [{ OTP: body.otp }],
              })
            })
          } else {
            updateOtp(body, (error, results) => {
              if (error) {
                return res.status(200).json({
                  success: 0,
                  message: 'Database connection error',
                  error: error,
                })
              }
              console.log('results update', results)
              if (!results) {
                return res.status(200).json({
                  success: 0,
                  message: 'Error during insert otp',
                })
              }
              return res.json({
                success: 1,
                data: [{ OTP: body.otp }],
              })
            })
          }
        })
      })
    } else if (userType === 2) {
    } else {
      return res.status(200).json({
        success: 0,
        message: 'Usertype is not valid',
      })
    }
  },
  verifyOtp: (req, res) => {
    const body = req.body
    const userType = body.userType
    const userOtp = body.otp
    const userId = body.Id
    getOtpByUserIdAndType(userType, userId, (error, results) => {
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
          message: 'OTP not present',
        })
      } else {
        if (userOtp == results.otp) {
          deleteOtp(results.id, (error, results) => {
            if (error) {
              return res.status(200).json({
                success: 0,
                message: 'Database connection error',
                error: error,
              })
            }
            return res.status(200).json({
              success: 1,
              message: 'otp Verified SuccessFully',
            })
          })
        } else {
          return res.status(200).json({
            success: 0,
            message: 'Invalid OTP',
          })
        }
      }
    })
  },
  resetPassword: (req, res) => {
    const body = req.body
    const userType = body.userType
    const userId = body.id
    console.log('userType ', userType)
    if (userType === 1) {
    } else if (userType === 2) {
    } else if (userType === 3) {
      const userPassword = body.uPassword
      const userNewPassword = body.uNewPassword
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
            message: 'User Records not found',
          })
        }
        const result = compareSync(userPassword, results.uPassword)
        if (result) {
          const salt = genSaltSync(10)
          results.uPassword = hashSync(userNewPassword, salt)
          console.log('results', results)
          changePassword(results, (error, results) => {
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
                message: 'User Records not found',
              })
            } else {
              return res.json({
                success: 1,
                message: 'Paasword changed successfully',
              })
            }
          })
        } else {
          return res.status(200).json({
            success: 0,
            message: 'Incorrect current password',
          })
        }
      })
    } else if (userType === 4) {
      const userPassword = body.uPassword
      const userNewPassword = body.uNewPassword
      getDoctorById(userId, (error, results) => {
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
            message: 'User Records not found',
          })
        }
        const result = compareSync(userPassword, results.dPassword)
        if (result) {
          const salt = genSaltSync(10)
          results.dPassword = hashSync(userNewPassword, salt)
          changeDoctorPassword(results, (error, results) => {
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
                message: 'User Records not found',
              })
            } else {
              return res.json({
                success: 1,
                message: 'Paasword changed successfully',
              })
            }
          })
        } else {
          return res.status(200).json({
            success: 0,
            message: 'Incorrect current password',
          })
        }
      })
    } else {
      return res.status(200).json({
        success: 0,
        message: 'Usertype is not valid',
      })
    }
  },
  commonLogin: (req, res) => {
    const body = req.body
    const mobileNumber = body.mobileNumber
    const userType = body.userType
    if (!mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }

    if (userType === 1) {
    } else if (userType === 2) {
    } else if (userType == 3) {
      getPatientByMobile(mobileNumber, (error, results) => {
        console.log('PatientLogin : ', error)
        if (error) {
          return res.status(200).json({
            success: 0,
            message: 'Database connection error',
            error: error,
          })
        }
        if (!results.length > 0) {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }
        console.log('PatientLogin : ', results)
        const u_result = compareSync(body.password, results[0].uPassword)

        if (u_result) {
          if (results[0].uStatus == 0) {
            return res.json({
              success: 0,
              message: 'You Are Not Verified',
            })
          }
          if (results[0].uStatus == 3) {
            return res.json({
              success: 0,
              message: 'Temporary Account In Active Please Contact to Admin',
            })
          }
          results[0].uPassword = undefined
          results[0].uType = 3
          const jsontoken = sign(
            { result: results[0] },
            'u466105200chgdb2022chgadmin',
            {
              expiresIn: '365d',
            },
          )
          return res.json({
            success: 1,
            message: 'Patient login successfully',
            token: jsontoken,
          })
        } else {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }
      })
    } else if (userType == 4) {
      getDoctorByMobile(mobileNumber, (error, results) => {
        if (error) {
          console.log('doctorLogin: ', error)
          return res.status(200).json({
            success: 0,
            message: 'Database connection error',
            error: error,
          })
        }

        if (!results.length > 0) {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }

        const result = compareSync(body.password, results[0].dPassword)
        if (result) {
          if (results[0].dStatus == 0 || results[0].dStatus == 1) {
            return res.json({
              success: 0,
              message: 'You Are Not Verified',
            })
          }
          if (results[0].dStatus == 3) {
            return res.json({
              success: 0,
              message: 'Temporary Account In Active Please Contact to Admin',
            })
          }
          results[0].dPassword = undefined
          results[0].uType = 4
          const jsontoken = sign(
            { result: results[0] },
            'u466105200chgdb2022chgadmin',
            {
              expiresIn: '365d',
            },
          )
          return res.json({
            success: 1,
            message: 'Doctor login successfully',
            token: jsontoken,
          })
        } else {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }
      })
    } else if (userType == 5) {
      getLabByMobile(mobileNumber, (error, results) => {
        if (error) {
          return res.status(200).json({
            success: 0,
            message: 'Database connection error',
            error: error,
          })
        }

        if (!results.length > 0) {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }

        const result = compareSync(body.password, results[0].lPassword)
        if (result) {
          if (results[0].lStatus == 0) {
            return res.json({
              success: 0,
              message: 'You Are Not Verified',
            })
          }

          results[0].lPassword = undefined
          results[0].uType = 5
          const jsontoken = sign(
            { result: results[0] },
            'u466105200chgdb2022chgadmin',
            {
              expiresIn: '365d',
            },
          )
          return res.json({
            success: 1,
            message: 'Lab login successfully',
            token: jsontoken,
          })
        } else {
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }
      })
    } else if (userType == 6) {
      getPharmacyByMobile(mobileNumber, (error, results) => {
        console.log('pharam:', results)
        if (error) {
          return res.status(200).json({
            success: 0,
            message: 'Database connection error',
            error: error,
          })
        }

        if (!results.length > 0) {
          console.log('length', results.length)
          return res.json({
            success: 0,
            message: 'Invalid Mobile or password',
          })
        }

        const result = compareSync(body.password, results[0].pPassword)
        if (result) {
          if (results[0].pStatus == 0) {
            return res.json({
              success: 0,
              message: 'You Are Not Verified',
            })
          }

          results[0].pPassword = undefined
          results[0].uType = 6
          console.log('final Data', results[0])
          const jsontoken = sign(
            { result: results[0] },
            'u466105200chgdb2022chgadmin',
            {
              expiresIn: '365d',
            },
          )
          return res.json({
            success: 1,
            message: 'Pharmacy login successfully',
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
      return res.status(200).json({
        success: 0,
        message: 'Usertype is not valid',
      })
    }
  },

  getUserByMobile(req, res) {
    const body = req.body
    const mobileNumber = body.mobile
    if (!mobileValidation(mobileNumber)) {
      return res.status(200).json({
        success: 0,
        message: 'Invalid mobile number',
      })
    }
    getDoctorByMobile(mobileNumber, (error, results) => {
      if (error) {
        return res.status(200).json({
          success: 0,
          message: 'Database connection error',
          error: error,
        })
      }
      if (results.length > 0) {
        results[0].uType = 4
        return res.json({
          success: 1,
          data: results,
        })
      } else {
        getPatientByMobile(mobileNumber, (error, results) => {
          if (error) {
            return res.status(200).json({
              success: 0,
              message: 'Database connection error',
              error: error,
            })
          }

          if (results.length > 0) {
            results[0].uType = 3
            return res.json({
              success: 1,
              data: results,
            })
          } else {
            return res.status(200).json({
              success: 0,
              message: 'Records not found',
            })
          }
        })
      }
    })
  },

  forgotPassword: (req, res) => {
    const body = req.body
    const userType = body.userType
    const userId = body.id
    if (userType == 1) {
    } else if (userType == 2) {
    } else if (userType == 3) {
      // const userPassword = body.uPassword
      const userNewPassword = body.uNewPassword
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
            message: 'User Records not found',
          })
        }
        // const result = compareSync(userPassword, results.uPassword)
        // if (result) {
        const salt = genSaltSync(10)
        results.uPassword = hashSync(userNewPassword, salt)
        console.log('results', results)
        changePassword(results, (error, results) => {
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
              message: 'User Records not found',
            })
          } else {
            return res.json({
              success: 1,
              message: 'Paasword changed successfully',
            })
          }
        })
        // } else {
        //   return res.status(200).json({
        //     success: 0,
        //     message: 'Incorrect current password',
        //   })
        // }
      })
    } else if (userType == 4) {
      // const userPassword = body.uPassword
      const userNewPassword = body.uNewPassword
      getDoctorById(userId, (error, results) => {
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
            message: 'User Records not found',
          })
        }
        // const result = compareSync(userPassword, results.dPassword)
        // if (result) {
        const salt = genSaltSync(10)
        results.dPassword = hashSync(userNewPassword, salt)
        changeDoctorPassword(results, (error, results) => {
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
              message: 'User Records not found',
            })
          } else {
            return res.json({
              success: 1,
              message: 'Paasword changed successfully',
            })
          }
        })
        // } else {
        //   return res.status(200).json({
        //     success: 0,
        //     message: 'Incorrect current password',
        //   })
        // }
      })
    } else {
      return res.status(200).json({
        success: 0,
        message: 'Usertype is not valid',
      })
    }
  },
  uploadFiles(files, response) {
    const dir = files.body.directory
    const BUCKET_NAME = 'ecomhealthdev-data'
    const params = {
      Bucket: BUCKET_NAME,
      Key: dir + new Date().getTime() + files.file.originalname,
      Body: files.file.buffer,
      ContentType: files.file.mimetype,
    }
    s3.upload(params, (error, data) => {
      if (error) {
        return response.json({
          success: 0,
          message: 'Failed to upload file',
          error: error,
        })
      } else {
        return response.status(200).json({
          success: 1,
          data: data.Location,
        })
      }
    })
  },

  updateAppointmentByDoctor: async (req, res) => {
    const body = req.body
    const doctorId = body.doctorId
    const report = body.report
    const medicine = body.medicine

    // console.log('bodyData', body)

    body.created_by = doctorId
    body.updated_by = doctorId
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    // updateAppointmentConsultation(body, (error, results) => {
    //   if (error) {
    //     return res.status(200).json({
    //       success: 0,
    //       message: 'Database connection error',
    //       error: error,
    //     })
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: results,
    //   })
    // })
    let labData = []
    let medicineData = []

    if (report && report.length > 0) {
      let dataOfReport = report.reduce((o, a) => {
        let ini = []
        ini.push(a.appointmentId)
        ini.push(a.reportId)
        ini.push(a.reportPic)
        ini.push(doctorId)
        ini.push(doctorId)
        ini.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
        ini.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
        o.push(ini)
        return o
      }, [])
      labData = await AddLabReport(dataOfReport)
    }

    if (medicine && medicine.length > 0) {
      let dataOfMedicine = medicine.reduce((o, a) => {
        let ini = []
        ini.push(a.mName)
        ini.push(a.mMorning)
        ini.push(a.mAfternoon)
        ini.push(a.mEvening)
        ini.push(a.appointmentId)
        ini.push(doctorId)
        ini.push(doctorId)
        ini.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
        ini.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
        o.push(ini)
        return o
      }, [])
      medicineData = await AddMedicine(dataOfMedicine)
    }

    let updateAppointment = await updateAppointmentConsultation(body)

    return res.status(200).json({
      success: 1,
      Appointmentdata: updateAppointment,
      Labdata: labData,
      MedData: medicineData,
    })

    // AddLabReport(dataOfReport, (error, result) => {
    //   if (error) {
    //     return res.status(200).json({
    //       success: 0,
    //       message: 'Database connection error',
    //       error: error,
    //     })
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: result,
    //   })
    // })

    // AddMedicine(dataOfMedicine, (error, result) => {
    //   if (error) {
    //     return res.status(200).json({
    //       success: 0,
    //       message: 'Database connection error',
    //       error: error,
    //     })
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: result,
    //   })
    // })

    // report.map((data) => {
    //   data.created_by = doctorId
    //   data.updated_by = doctorId
    //   data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    //   data.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    //   createLabReport(data, (error, result) => {
    //     if (error) {
    //       return res.status(200).json({
    //         success: 0,
    //         message: 'Database connection error',
    //         error: error,
    //       })
    //     }
    //     return res.status(200).json({
    //       success: 1,
    //       data: result,
    //     })
    //   })
    // })

    // let values = report.reduce((o, a) => {
    //   let ini = []
    //   ini.push(a.reportId)
    //   ini.push(a.reportPic)
    //   ini.push(a.appointmentId)
    //   o.push(ini)
    //   return o
    // }, [])

    // console.log('values1', values)

    // AddLabReport(report, (error, result) => {
    //   if (error) {
    //     return res.status(200).json({
    //       success: 0,
    //       message: 'Database connection error',
    //       error: error,
    //     })
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: result,
    //   })
    // })

    // let reportsArray = report.map((data) => {
    //   return new Promise((resolve, reject) => {
    //     data.created_by = doctorId
    //     data.updated_by = doctorId
    //     data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    //     data.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    //     createLabReport(data, (error, result) => {
    //       if (error) {
    //         reject(error)
    //       }
    //       resolve(result)
    //     })
    //   })
    // })

    // Promise.all(reportsArray)
    //   .then(function (results) {
    //     console.log('Report RES', results)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })

    // let medicineArray = medicine.map((data) => {
    //   return new Promise((resolve, reject) => {
    //     data.created_by = doctorId
    //     data.updated_by = doctorId
    //     data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    //     data.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    //     createMedicine(data, (error, result) => {
    //       if (error) {
    //         reject(error)
    //       }
    //       resolve(result)
    //     })
    //   })
    // })

    // Promise.all(medicineArray)
    //   .then(function (results) {
    //     console.log(results)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  },

  getLanguages: (req, res) => {
    getLanguages(req, (error, results) => {
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
  getTotalRecordsCount: (req, res) => {
    getTotalRecordsCount(req, (error, results) => {
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
