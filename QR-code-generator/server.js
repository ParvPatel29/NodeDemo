const express = require('express')
const app = express()
const qr = require('qr-image')

app.get('/qr', (req, res) => {
  const url = 'https://goo.gl/maps/3oLKzaLX74ujyvYo6'
  const code = qr.image(url, { type: 'png' })
  res.type('png')
  code.pipe(res)
})

app.listen(3000, () => {
  console.log('QR code generator listening on port 3000!')
})