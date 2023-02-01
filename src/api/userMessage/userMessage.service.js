const pool = require('../../config/database')
var nodeMailer = require('nodemailer')

module.exports = {
  createUserMessage: (data, callBack) => {
    pool.query(
      'INSERT INTO chg_user_messages(userName,userMobile,email,subject,text,created_by,updated_by,created_at,updated_at)VALUES(?,?,?,?,?,?,?,?,?)',
      [
        data.userName,
        data.userMobile,
        data.email,
        data.subject,
        data.text,
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

  sendMail: (req, callBack) => {
    const userName = req.userName
    const userMobile = req.userMobile
    const userEmail = req.email
    const subject = req.subject
    const text = req.text
    var transport = nodeMailer.createTransport({
      host: 'smtp-mail.outlook.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: 'harshwadhwani718@gmail.com',
        pass: 'Harsh@0718',
      },
    })

    var mailOption = {
      from: 'harshwadhwani718@gmail.com',
      to: ' info@ecomhealthdev.com',
      subject: subject,
      text: text,
      html: `<b>From:</b> ${userName} <br /> 
      <b>Email:</b> ${userEmail} <br /> 
      <b>Number:</b> ${userMobile} <br /> 
      <b>Subject:</b> ${subject} <br /> 
      <b>Message:</b> ${text} `,
    }
    transport.sendMail(mailOption, function (error, info) {
      if (error) {
        callBack(error)
      } else {
        return callBack(null, info)
      }
    })
  },

  //   getAllSpeciality: (req, callBack) => {
  //     pool.query(
  //       'SELECT * FROM chg_specialty',

  //       (error, result, fields) => {
  //         if (error) callBack(error)
  //         return callBack(null, result)
  //       },
  //     )
  //   },

  getUserMessages: (req, callBack) => {
    const limit = req.query.perPage
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset
    const searchQ = '"%' + req.query.search + '%" '

    const prodsQuery =
      // 'select * from chg_specialty limit ' + limit + ' OFFSET ' + offset

      'select * from chg_user_messages WHERE userName LIKE' + searchQ +
      ' OR email LIKE '
      + searchQ +
      ' OR userMobile LIKE '
      + searchQ +
      ' OR subject LIKE '
      + searchQ +
      ' OR text LIKE '
      + searchQ +
      ' limit ' +
      limit +
      ' OFFSET ' +
      offset

    const total_count = `SELECT COUNT(*) AS total_count FROM chg_user_messages WHERE userName LIKE ${searchQ} ;`
    let count = ''
    pool.getConnection(function (err, connection) {
      connection.query(total_count, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        if (error) throw error
        if (results.length > 0) {
          count = results[0].total_count
        }
      })
    })

    pool.getConnection(function (err, connection) {
      connection.query(prodsQuery, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release()
        if (error) throw error
        // create payload
        var jsonResult = {
          total_count: count,
          page_number: page,
          result: results,
        }

        return callBack(null, jsonResult)
      })
    })
  },
  getUserMessagesById: (data, callBack) => {
    pool.query(
      `SELECT * FROM chg_user_messages where messageId = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      },
    )
  },
}
