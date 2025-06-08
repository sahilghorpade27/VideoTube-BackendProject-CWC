import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
const app = express();


dotenv.config({
    path : "./env"
});

connectDB()
.then(()=>{
    app.on("error", (err)=>{
        console.error("Error in app :",err);
        throw err ;
    })
    app.listen(process.env.port , ()=>{
        console.log(`Server is running on port ${process.env.port}`);
    });
})
.catch((err)=>{
    console.log("MongoDB Connection Failed : ",error) ;
})











// 
/*
(async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (err)=>{
            console.error("Error in app :",err);
            throw err ;
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        
    } catch (error) {
        console.error("ERROR : ",error);
        throw error ;
    }
}) ()

*/