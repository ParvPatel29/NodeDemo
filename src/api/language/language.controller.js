const { response } = require('express')
const {
  createLanguage,
  getLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById,
  getAllLanguage,
} = require('./language.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')

module.exports = {
  createLanguage: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    createLanguage(body, (error, result) => {
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
  getAllLanguage: (req, res) => {
    getAllLanguage(req, (error, results) => {
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
  getLanguage: (req, res) => {
    getLanguage(req, (error, results) => {
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
  getLanguageById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getLanguageById(Id, (error, results) => {
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
  updateLanguage: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateLanguage(body, (error, results) => {
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
  deleteLanguage: (req, res) => {
    const id = req.params.id

    deleteLanguage(id, (error, results) => {
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
