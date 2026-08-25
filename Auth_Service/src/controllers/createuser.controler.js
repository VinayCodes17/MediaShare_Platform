import userModel from "../model/users.schema";

export const checkUser = async (userdata)=>{
    const user = await userModel.findOne({
        email:userdata.email
    })
    return user 
}

export const createUser = async (userdata)=>{

    const username = userdata.username 
    const email = userdata.email
    const githubid = userdata.githubid || null
    const googleid = userdata.googleid  || null
    const pfp_uri = userdata.pfp_uri || null
    const user = await userModel.create({
        username , email , githubid , googleid , pfp_uri
    })

    console.log(user)
    return true 
}

