const pool = require('../../config/database')

module.exports = {
  createCall: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_video_call(userId,doctorId,channel_name,token)VALUES(?,?,?,?)',
      [data.userId, data.doctorId, data.channel_name, data.token],
      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
  getCredintial: (data, callBack) => {
    pool.query(
      'SELECT * FROM chg_video_call WHERE doctorId = ? AND userId = ?',
      [data.doctorId, data.userId],
      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
  getCallData: (data, callBack) => {
    pool.query(
      'SELECT * FROM chg_video_call WHERE userId=?',
      [data.userId],
      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },
  acceptCall: (data, callBack) => {
    pool.query(
      `UPDATE chg_video_call set inCall=? where userId=?`,
      [data.inCall, data.userId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
  declineCall: (userId, callBack) => {
    pool.query(
      `DELETE from chg_video_call where userId = ?`,
      [userId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
}
