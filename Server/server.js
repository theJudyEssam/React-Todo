import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import AuthRouter from "./routes/registeration.js"
import CRouter from "./routes/crud.js"


const app = express()
app.use(
    cors({
      origin: 'http://localhost:5173', 
      credentials: true, 
    })
  );
dotenv.config()


app.use("/", AuthRouter);
app.use("/:username", AuthRouter);
app.use("/", CRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})




