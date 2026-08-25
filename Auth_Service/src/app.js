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


app.use('/auth/google',googleAuthRouter)

app.use('/auth/github',githubAuthRouter)

export default app 