const {
    create,
    getAll,
    getOne,
    update,
    deleteSocieties
}=require('./society.controller')
const {verifyToken} = require('../jwt')
const express = require('express')
const router=express.Router()

router.post('/create',verifyToken,create)
router.get('/getAll',verifyToken,getAll)
router.get('/getOne/:id',verifyToken,getOne)
router.put('/update',verifyToken,update)
router.delete('/delete/:id',verifyToken,deleteSocieties)

module.exports=router