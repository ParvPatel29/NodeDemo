const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
const {user} = require('./db_connect')
const route =require('./api/society.routes')

app.listen(3000,()=>{
    console.log("App is listening on 3000")
})

app.use(express.json())
app.use('/api',route)




app.post('/signup',(req, res)=>{
 user.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
 })
 .then(user=>{
   res.json(user)
 })
 .catch(err=>{
    res.status(400).json(err)
 })
})
app.post('/login',(req,res)=>{
    user.findOne({where:{email:req.body.email}}).then(user=>{
                if(!user){
                    return res.status(400).json({ error: 'User not found' });
        }
        if (user.password !== req.body.password) {
        return res.status(400).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user.id }, 'secret_key');
      res.json({ token });
    })
    .catch(error => {
      res.status(400).json({ error: 'Login failed' });
    })
})