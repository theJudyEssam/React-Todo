import express from "express"
import dotenv from "dotenv"
import {pool}from "../middleware/db.js"
import bodyParser from "body-parser"


const CRouter = express.Router()
AuthRouter.use(bodyParser.json())
AuthRouter.use(bodyParser.urlencoded({ extended: true }))



CRouter.post("/add", async (req, res)=>{
    const todo = req.body.todo;
    const username = req.body.username;


    try{
        const query = await pool.query("INSERT into todos (todo, username) VALUES ($1, $2) ", [todo, username])
        res.status(200).send("Todo added")
    }
    catch(err){
        res.status(500).send("Error")
    }
})

CRouter.get("/get/:username", async (req, res)=>{
    const username = req.params.username;

    try{
        const query = await pool.query("SELECT * FROM todos WHERE username = $1", [username])
        res.status(200).json(query.rows)
    }
    catch(err){
        res.status(500).send("Error")
    }
})

CRouter.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;  //id will represent the id of the todo

    try{
        const query = await pool.query("DELETE FROM todos WHERE id = $1", [id])
        res.status(200).send("Todo deleted")
    }
    catch(err){
        res.status(500).send("Error")
    }
})

CRouter.put("/update/:id", async (req, res)=>{
    const id = req.params.id;
    const todo = req.body.todo;

    try{
        const query = await pool.query("UPDATE todos SET todo = $1 WHERE id = $2", [todo, id])
        res.status(200).send("Todo updated")
    }
    catch(err){
        res.status(500).send("Error")
    }
})


export default CRouter;