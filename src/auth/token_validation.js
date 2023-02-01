const { verify } = require('jsonwebtoken')

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization')
    if (token) {
      token = token.slice(7)
      verify(token, 'u466105200chgdb2022chgadmin', (error, decoded) => {
        if (error) {
          res.json({
            success: 0,
            message: 'Invalid token',
          })
        } else {
          next()
        }
      })
    } else {
      res.json({
        success: 0,
        message: 'Access denied! Unauthorized user',
      })
    }
  },
  // check current user
}

function getCurrentUser(req) {
  const usertoken = req.headers.authorization
  const token = usertoken.split(' ')
  const decoded = verify(token[1], 'u466105200chgdb2022chgadmin')
  console.log('decoded :: ', decoded.result.adminId)
  return decoded
}

function getCurrentUserId(req) {
  const data = getCurrentUser(req)
  if (data.result.userId) {
    return data.result.userId
  } else if (data.result.adminId) {
    return data.result.adminId
  } else if (data.result.doctorId) {
    return data.result.doctorId
  } else {
    return 0
  }
}

function getCurrentUserPassword(req) {
  const data = getCurrentUser(req)
  if (data.result.userId) {
    return data.result.uPassword
  } else if (data.result.adminId) {
    return data.result.aPassword
  } else if (data.result.doctorId) {
    return data.result.dPassword
  } else {
    return null
  }
}

module.exports.getCurrentUser = getCurrentUser
module.exports.getCurrentUserId = getCurrentUserId
module.exports.getCurrentUserPassword = getCurrentUserPassword
