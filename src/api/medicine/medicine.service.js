const pool = require('../../config/database')

module.exports = {
  // AddMedicine: (data, callBack) => {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       'INSERT INTO chg_medicine(mName,mMorning,mAfternoon, mEvening,appointmentId, created_by,updated_by,created_at,updated_at)VALUES ?',
  //       [data],
  //       (error, results, fields) => {
  //         console.log('MedResult', results)
  //         console.log('MedError', results)

  //         if (error) reject(error)
  //         resolve(results)
  //       },
  //     )
  //   })
  // },
  AddMedicine: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_medicine(mName,mMorning,mAfternoon,mEvening,appointmentId,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?,?,?,?,?)',
      [
        data.mName,
        data.mMorning,
        data.mAfternoon,
        data.mEvening,
        data.appointmentId,
        data.created_by,
        data.updated_by,
        data.created_at,
        data.updated_at,
      ],
      (error, result, fields) => {
        if (error) callBack(error)
        return callBack(null, result)
      },
    )
  },

  getMedicineByAppointment: (data, callBack) => {
    pool.query(
      `SELECT * from chg_medicine where appointmentId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },

  deleteMedicine: (medicineId, callBack) => {
    pool.query(
      `DELETE from chg_medicine where medicineId = ?`,
      [medicineId],
      (error, results, fields) => {
        if (error) callBack(error)
        return callBack(null, results[0])
      },
    )
  },
}
