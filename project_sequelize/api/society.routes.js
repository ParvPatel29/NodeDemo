const {
    create,
    getAll,
    getOne,
    update,
    deleteSocieties
}=require('./society.controller')

const express = require('express')
const router=express.Router()

router.post('/create',create)
router.get('/getAll',getAll)
router.get('/getOne/:id',getOne)
router.put('/update',update)
router.delete('/delete/:id',deleteSocieties)

module.exports=router