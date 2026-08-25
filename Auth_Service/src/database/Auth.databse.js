// Auth database connection

import mongoose from "mongoose";

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    
}

export default connectdb;