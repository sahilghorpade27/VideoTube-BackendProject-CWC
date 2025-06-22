import mongoose from "mongoose";
import { Schema } from "mongoose";



const subscripionSchema = new Schema({
    subscriber :{
        type : Schema.Types.ObjectId ,
        ref : "User"
    },
    channel : {
        type : Schema.Types.ObjectId ,
        ref : "User"
    }
         
}, {timestamps : truet});

export const Subscription = mongoose.model("Subscription",subscripionSchema);