const express = require("express")
const jwt =require("jsonwebtoken")
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require("./db_connect")
const app =express()

app.use(bodyParser.json());
app.listen(3000,(err)=>{
    if(err){
        console.log("error while listening")
    }
    console.log("Server is listening ")
})

app.post('/login', async (req, res) => {
    try {
        const [rows] = await db.execute(
        'SELECT * FROM user_info WHERE email = ? AND password = ?',
        [req.body.email, req.body.password]
        );
        if (rows.length) {
            // create JWT
            const payload = { email: rows[0].email };
            const secret = 'mysecretkey';
            const token = jwt.sign(payload, secret);
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error while querying the database' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const saltRounds = 10;
        const plainPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        console.log(req.body.email)
        const [result] = await db.execute(
            'INSERT INTO user_info (email, password) VALUES (?, ?)',
            [req.body.email, hashedPassword]
        );
        const [rows] = await db.execute(
            'SELECT * FROM user_info WHERE email = ?',
            [req.body.email]
        );
        console.log(rows)
        if (rows.length) {
            // create JWT
            const payload = { email: rows[0].email };
            const secret = 'mysecretkey';
            const token = jwt.sign(payload, secret);
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        //console.log(err)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'This email already exists' });
        }
        return res.status(500).json({ error: 'Error while querying the database' });
    }
});

