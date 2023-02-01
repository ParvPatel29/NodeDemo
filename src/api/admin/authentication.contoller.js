const { createAdmin, getAdminByEmail } = require('./authentication.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
  createAdmin: (req, res) => {
    const body = req.body
    const salt = genSaltSync(10)
    body.aPassword = hashSync(body.aPassword, salt)
    createAdmin(body, (error, results) => {
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
  getAdminByEmail: (req, res) => {
    getAdminByEmail(req.aEmail, (error, results) => {
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
  adminLogin: (req, res) => {
    const body = req.body
    getAdminByEmail(body.aEmail, (error, results) => {
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
      const result = compareSync(body.aPassword, results.aPassword)
      if (result) {
        results.aPassword = undefined
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
}
