import { disconnect } from "mongoose"
import dotenv from 'dotenv'
import app from "./src/app.js"

import connectdb from "./src/database/Auth.databse.js"

dotenv.config({path:'./.env'})

const port = process.env.PORT || 8000

const startServer = async ()=>{
    try {

         await connectdb();
         console.log("auth db connected")

         app.listen(port) ;
        
    } catch (error) {
        console.log("DB connection failed")
        process.exit(1)    
    }
}

startServer() ;