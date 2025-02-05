import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {pool}from "../middleware/db.js"
import bodyParser from "body-parser"

const AuthRouter = express.Router()
dotenv.config()


AuthRouter.use(cookieParser())
AuthRouter.use(bodyParser.json())
AuthRouter.use(bodyParser.urlencoded({ extended: true }))


AuthRouter.post('/register', async (req, res) => {
    const fullname = req.body.fullname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    console.log("Recieving data from the client")

    try{
        const existingUser = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        const existingEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]) 

        if (existingUser.rows.length > 0) {
            return res.status(409).send("Username already taken");
        }

        if (existingEmail.rows.length > 0) {
            return res.status(409).send("Email already registered");
        }


        
        bcrypt.hash(password, 10, async(err, hash) => {
            if(err){
                console.log(err)
            }
            else{
                const user = await pool.query("INSERT INTO users (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [fullname, username, email, hash])
                console.log(user.rows[0])

                const token = jwt.sign({data:username}, process.env.SECRET, {expiresIn: '1h'})

                res.cookie('token', token, {httpOnly: true, sameSite: 'None', maxAge: 3600000})

                res.status(200).json({
                    status: "success",
                    token
                })
            }
        })


    }
    catch(Err){
        console.log(Err)
        res.status(500).send("Internal Server Error")
    }

})


AuthRouter.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password


    console.log("recieved data from client")

    try{
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username])

        if(user.rows.length === 0){
            return res.status(401).send("User does not exist")
        }

        bcrypt.compare(password, user.rows[0].password, (err, result) => {
            if(err){
                console.log(err)
            }
            if(result){
                const token = jwt.sign({data:username}, process.env.SECRET, {expiresIn: '1h'})

                res.cookie('token', token, {httpOnly: true, sameSite: 'None', maxAge: 3600000})

                res.status(200).json({
                    status: "success",
                    token,
                    username: user.rows[0].username 
                });
            }
            else{
                res.status(401).send("Invalid credentials")
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }

 
})


AuthRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.status(200).send("Logged out")
})


AuthRouter.get('/verify', (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET)

      
    
        res.status(200).json({ user: decoded.data });
    }
    catch(err){
        console.log(err)
        return res.status(403).json({message: "Forbinned"})
    }

})


export default AuthRouter
