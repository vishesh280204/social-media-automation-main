import mongoose, { Schema } from "mongoose";

export const accountSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    platform:{
        type:String,  
        enum:["twitter","facebook","linkedin","instagram","facebook_page","linkedin_page","instagram_business"],
        required:true,
    },
    handle:{
        type:String,
        required:true
    },
    zernioAccountId:{
        type:String
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    },
    tokenExpiresAt:{
        type:Date
    },
    status:{
        type:String,
        enum:["connected","disconnected"],
        default:"connected"
    },
    avatarUrl:{
        type:String
    }

        

},{timestamps:true})

export const Account=mongoose.model("Account",accountSchema)