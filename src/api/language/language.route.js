const {
  createLanguage,
  getLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById,
  getAllLanguage,
} = require('./language.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createLanguage', checkToken, createLanguage)
router.get('/getLanguage', checkToken, getLanguage)
router.get('/getAllLanguage', getAllLanguage)
router.get('/getLanguageById/:id', checkToken, getLanguageById)
router.patch('/updateLanguage', checkToken, updateLanguage)
router.delete('/deleteLanguage/:id', checkToken, deleteLanguage)

module.exports = router
