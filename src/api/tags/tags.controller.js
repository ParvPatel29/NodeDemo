const { response } = require('express')
const {
  createTags,
  getAllTags,
} = require('./tags.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')

module.exports = {
  createTags: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    console.log('bodyoftag', body)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    createTags(body, (error, result) => {
      console.log('bodyoftag', body);
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
  },
  getAllTags: (req, res) => {
    getAllTags(req, (error, results) => {
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
