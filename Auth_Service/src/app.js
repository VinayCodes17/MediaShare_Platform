import morgan from "morgan";
import express from "express"

const app = express();

//importing routers
import googleAuthRouter from './routes/googleAuth.route.js' 

//middlewares
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.json({
        message:"auth entry point"
    })
})

// app.get('/auth/login',normalAuth)
app.get('/auth/google',googleAuthRouter)
// app.get('/auth/github',githubAuth)

export default app 