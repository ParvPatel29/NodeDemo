const pool = require('../../config/database')

module.exports = {
  createAdmin: (data, callBack) => {
    pool.query(
      `INSERT INTO chg_admin(adminId, aName, aEmail, aRole, aPassword, aStatus)
        VALUES(?,?,?,?,?,?)`,
      [
        data.adminId,
        data.aName,
        data.aEmail,
        data.aRole,
        data.aPassword,
        data.aStatus,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
  getAdminByEmail: (email, callBack) => {
    pool.query(
      `SELECT adminId, aName, aEmail, aRole, aPassword, aStatus from chg_admin where aEmail = ?`,
      [email],
      (error, results, fields) => {
        console.log('result', results)
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      },
    )
  },
}
