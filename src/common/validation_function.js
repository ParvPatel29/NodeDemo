const emailValidator = require('email-validator')
function emailValidation(email) {
  if (!email || !emailValidator.validate(email)) {
    return false
  } else {
    return true
  }
}

function mobileValidation(mobileNumber) {
  const reg = new RegExp('^[0-9]{10}$')
  if (!mobileNumber || !mobileNumber.match(reg)) {
    return false
  } else {
    return true
  }
}

module.exports.emailValidation = emailValidation
module.exports.mobileValidation = mobileValidation
