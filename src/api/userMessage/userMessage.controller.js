const { response } = require('express')
const {
  createUserMessage,
  getUserMessages,
  sendMail,
  getUserMessagesById,
} = require('./userMessage.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')

module.exports = {
  createUserMessage: (req, res) => {
    const body = req.body
    const createdBy = 0
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    sendMail(body, (error, result) => {
      if (error) {
        console.log('mail-error: ', error)
      } else {
        console.log('mail-result : ', result)
        createUserMessage(body, (error, result) => {
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
  getUserMessages: (req, res) => {
    getUserMessages(req, (error, results) => {
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
  getUserMessagesById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getUserMessagesById(Id, (error, results) => {
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
