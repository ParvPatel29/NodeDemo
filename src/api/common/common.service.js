const pool = require('../../config/database')

module.exports = {
  saveOtp: (data, callBack) => {
    pool.query(
      `INSERT INTO chg_user_otp (usertype, otp, mobilenumber, userid) VALUES(?,?,?,?)`,
      [data.userType, data.otp, data.mobilenumber, data.Id],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  updateOtp: (data, callBack) => {
    pool.query(
      `UPDATE chg_user_otp SET otp = ? WHERE usertype = ? and mobilenumber = ? and userid = ?`,
      [data.otp, data.userType, data.mobilenumber, data.Id],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  deleteOtp: (otpId, callBack) => {
    pool.query(
      `DELETE from chg_user_otp where id  = ?`,
      [otpId],
      (error, results, fields) => {
        console.log('otpResult', results)
        if (error) callBack(error)
        return callBack(null, results)
      },
    )
  },
  getOtpByUserIdAndType: (userType, userId, callBack) => {
    pool.query(
      `SELECT * FROM chg_user_otp WHERE userid = ? and usertype = ? ORDER BY id DESC LIMIT 1`,
      [userId, userType],
      (error, results, fields) => {
        console.log('otp error', error)
        console.log('otp results', results)
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      },
    )
  },
  getLanguages: (req, callBack) => {
    pool.query(
      'SELECT * FROM chg_language',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
  getTotalRecordsCount: (req, callBack) => {
    pool.query(
      'SELECT  (SELECT COUNT(*) FROM chg_doctor) AS doctorCount,(SELECT COUNT(*)FROM   chg_users) AS patientCount,(SELECT COUNT(*)FROM chg_appointment) AS appointmentCount,(SELECT COUNT(*)FROM chg_labreport) AS labReportCount FROM dual',

      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
}
