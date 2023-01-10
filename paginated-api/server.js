const express = require('express')
const app =express()

users=[
    {id:1,name: 'User 1'},
    {id:2,name: 'User 2'},
    {id:3,name: 'User 3'},
    {id:4,name: 'User 4'},
    {id:5,name: 'User 5'},
    {id:6,name: 'User 6'},
    {id:7,name: 'User 7'},
    {id:8,name: 'User 8'},
    {id:9,name: 'User 9'},
    {id:10,name: 'User 10'},
    {id:11,name: 'User 11'}

]
app.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    

    const si=(page-1)*limit
    const ei=page*limit
    const userResults=users.slice(si,ei)
    result={}
    result.data = userResults
    result.count = users.length
    result.page = page
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.listen(3000)