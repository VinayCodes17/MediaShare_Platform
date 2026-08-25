import mongoose from "mongoose"

const usersschema = new mongoose.Schema({
    username:{
        type: String ,
        required:[true , "username can't be empty" ]
    },
    email:{
        type:string ,
        required:[true , "email can't be empty" ]
    },
    githubid:{
        type:string,
        default:null
    },
    googleid:{
        type:string,
        default:null
    },
    pfp_uri:{
        type:string,
        default:null
    }
},{
    timestamps: true 
})

const userModel = mongoose.model("users",usersschema);

export default userModel ;

