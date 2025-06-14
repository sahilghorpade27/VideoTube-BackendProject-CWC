import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"; 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=> {
    //get user data from frontend 

    const {fullName , email , username , password } = req.body ;
    console.log("email : " , email);


    //validation - not emptry 

    /*if(fullName == ""){
        throw new ApiError(400,"Full Name is required");
    }*/

    if(
        [fulName , email , username , password ].some((field) => 
            field?.trim() === "") 
    ){
        throw new ApiError(400, "All fields are required");
    }

    //check if user exists 

    const existedUser =  User.findOne({
        $or : [{email},{username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or Username exists");
    }

    

    // check for images and  avatar

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

     

    // upload them to cloudinary 

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(! avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    //create user object - create entry in db 

    const user = await User.create({
        fullName,
        avatar : avatar.url ,
        coverImage : coverImage?.url|| "" ,
        email ,
        password ,
        username : username.toLowercase()

    })

    // remove password and refresh token field from response 

    const createdUser = await User.findById(user.email._id).select(
        "-password -refreshToken"
    )

    //check for user creation


    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating the User");
    }  

    
    //return res 
    return res.status(201).json(
        new ApiResponse(200,createdUser , "User registered Successfully")
    )


});

export {registerUser};
