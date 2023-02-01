const {
  createCall,
  getCredintial,
  getCallData,
  acceptCall,
  declineCall,
} = require('./videoCall.service')

const uuid = require('uuid')

const { RtcTokenBuilder, RtcRole } = require('agora-access-token')

module.exports = {
  createCall: (req, res) => {
    const body = req.body
    console.log('body', body)
    body.channel_name = uuid.v1()
    body.token = RtcTokenBuilder.buildTokenWithUid(
      process.env.APP_ID,
      process.env.APP_CERTIFICATE,
      body.channel_name,
      0,
      RtcRole.PUBLISHER,
    )
    createCall(body, (error, result) => {
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

  getCredintial: (req, res) => {
    const body = req.body
    getCredintial(body, (error, result) => {
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

  getCallData: (req, res) => {
    const body = req.body
    getCallData(body, (error, results) => {
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
  acceptCall: (req, res) => {
    const body = req.body
    acceptCall(body, (error, results) => {
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
  declineCall: (req, res) => {
    const userId = req.body.userId

    declineCall(userId, (error, results) => {
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
