const express = require('express')
const app = express()
const qr = require('qr-image')

app.get('/qr', (req, res) => {
  const code = qr.image('Some text', { type: 'png' })
  res.type('png')
  code.pipe(res)
})

app.listen(3000, () => {
  console.log('QR code generator listening on port 3000!')
})