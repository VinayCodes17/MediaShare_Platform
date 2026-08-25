// git auth routes 


import { Router } from "express"
import axios from "axios"

const router = Router()

router.get('/', (req, res) => {
    const githubAuthURL =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
        `&scope=user:email`;

    res.redirect(githubAuthURL);

})

router.get('/callback', async (req, res) => {

    const { code } = req.query;

    console.log(code);

    if (!code) {
        res.status(400).json({
            message: "authorization code missing "
        })
    }

    try {

        const response = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GITHUB_CALLBACK_URL
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );

        console.log(accessToken)

        const userResponse = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        console.log(userResponse.data);

        const currentScopes = response.headers['x-oauth-scopes']
        const acceptedScopes = response.headers['x-accepted-oauth-scopes']

        console.log(currentScopes, acceptedScopes)

        const accessToken = response.data.access_token;


    } catch (error) {
        console.error(error.message)
    }
})

