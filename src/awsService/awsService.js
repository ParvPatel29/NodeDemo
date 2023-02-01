const AWS = require('aws-sdk')
const KEY_ID = 'AKIAUAJ27TEVMPD4U5UE'
const SECRET_KEY = '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'

const s3 = new AWS.S3({
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
})

module.exports.s3 = s3
