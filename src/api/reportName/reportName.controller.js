const { response } = require('express')
const {
  createReportName,
  getReportName,
  updateReportName,
  deleteReportName,
  getReportNameById,
  getAllReportName,
} = require('./reportName.service')

const moment = require('moment')

var authToken = require('../../auth/token_validation')

module.exports = {
  createReportName: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.created_by = createdBy
    body.updated_by = createdBy
    body.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    createReportName(body, (error, result) => {
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
  getAllReportName: (req, res) => {
    getAllReportName(req, (error, results) => {
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
  getReportName: (req, res) => {
    getReportName(req, (error, results) => {
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
  getReportNameById: (req, res) => {
    const body = req.body
    const Id = req.params.id

    getReportNameById(Id, (error, results) => {
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
  updateReportName: (req, res) => {
    const body = req.body
    const createdBy = authToken.getCurrentUserId(req)
    body.updated_by = createdBy
    body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    updateReportName(body, (error, results) => {
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
  deleteReportName: (req, res) => {
    const body = req.body
    const reportId = req.params.id

    deleteReportName(reportId, (error, results) => {
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
