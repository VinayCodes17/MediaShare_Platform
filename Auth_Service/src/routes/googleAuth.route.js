// google  auth routes

import { Router } from "express";

const router = Router()

router.get('/',(req,res)=>{

    const googleAuthURL =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        `?client_id=${process.env.GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent("openid email profile")}`;

    res.redirect(googleAuthURL);
    
})

router.get('/callback',async (req,res)=>{
    try {

        const {code} = req.query ;
        if(!code) {
            return res.status(400).json({
                message: "Authorization Code Missing"
            })
        }

        console.log("google authorization code : " , code );

         const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const {access_token , id_token } = tokenResponse.data ;

        console.log("Google Access Token:", access_token);
        console.log("Google ID Token:", id_token);
        
    } catch (error) {
        console.error(error.message)

        res.status(500).json({
            message:"google authentication fail"
        })
    }

})

export default router