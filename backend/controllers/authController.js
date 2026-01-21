const catchAsync = require("./../utils/catchAsync")
const User = require("./../models/userModel");
const appError = require("../utils/appError");
const jwt = require("jsonwebtoken")
const util = require("util");

const Email = require("./../utils/email");

// signing token to sent to user after signup and login
const signToken = id=>{
    return jwt.sign({_id:id}, process.env.JWT_SECRET, {expiresIn:"1h"})
}


const verifyToken = (token)=>{

}



exports.signup = catchAsync(async(req, res, next)=>{
    const {name, email, password, passwordConfirm, authProvider} = req.body;
    

    // Check if the user with given email already exists
    const user = await User.findOne({email:email});
    if(user){
        return next(new appError(402, "User already exists. Please login."))
    }

    // creating new user
    const newUser = await User.create({name, email, password, passwordConfirm, authProvider});
    console.log(newUser);
    if(!newUser){
        return next(new appError(404, "Something went wrong. Could not sign up."))
    }
    const token = signToken(newUser._id);
    
    // sending email

    const emailObj = new Email({partnerName:newUser.name, to:"rajan@gmail.com"});
    
    // attaching cookie with response

    if(process.env.ENV === 'development'){
        console.log("Now in development mode")
        res.cookie('jwt', token, {
        expires: new Date(Date.now() + 60*60*1000),
        secure:true,   // if it is set to false then the cookies are blocked by browser and will not be attached with any http request from browser side.
        httpOnly:true,
        sameSite:'None',
        //domain:".petlinc.in"
    })
    }
    if(process.env.ENV === 'production'){
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 60*60*1000),
        secure:true,
        
        httpOnly:true,
        sameSite:"none",
        domain:".petlinc.in"
    })
}
    res.status(200).json({
        status:"success",
        data:{
            name:newUser.name,
            email:newUser.email
        },
        
    })
})



// login handler
exports.login = catchAsync(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new appError(404, "Please provide with email and password."));
    }

    const user = await User.findOne({email:email});
    
    if(!user){
        return next(new appError(404, "User does not exists with the given email id"));
    }
    
    // checking if the recieved password is correct for the recieved email address.
    const correct = await user.checkPassword(password, user.password);
    
    if(!correct){
        return next(new appError(404, "Please provide correct email and password!"));
    }
    const token = signToken(user._id);
    
    //creating cookies
    if(process.env.ENV === 'development'){
         console.log("Now in development mode")
        res.cookie('jwt', token, {
        expires: new Date(Date.now() + 60*60*1000),
        secure:true,   // if it is set to false then the cookies are blocked by browser and will not be attached with any http request from browser side.
        httpOnly:true,
        sameSite:'None',
        //domain:".petlinc.in"
    })
    }
    if(process.env.ENV === 'production'){
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 60*60*1000),
        secure:true,   // if it is set to false then the cookies are blocked by browser and will not be attached with any http request from browser side.
        httpOnly:true,
        sameSite:'None',
        domain:".petlinc.in"
    })
}

    

    res.status(200).json({
        status: "success",
        user:{
            name:user.name,
            email:user.email,
            role:user.role
        }
    })
})



// google login


// protecting route

exports.protect = catchAsync(async(req, res, next)=>{
    const token  =req.cookies.jwt;
    if(!token){
        return next(new appError(401, "You are not logged in! Please login."))
    }
    
    // verifying the recieved token
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
   
    // checking if the user still exists for the id in token
    const user = await User.findById({_id:decoded._id});
    if(!user){
        return next(new appError(404, "The user belonging to the token does not exists"))
    }
    
    // checking if the password was changed after the token was generated. 
    // ************* implement it later *********************
    
    req.user = user;
    next();
})


// logging out user

exports.logout = catchAsync(async(req, res, next)=>{
    if(process.env.ENV === 'development'){
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite:"None"
        })
    }

    if(process.env.ENV === 'production'){
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite:"None",
        path:'/',
        domain:".petlinc.in"
    });
}
    res.status(200).json({
        status:"success",
        message:"Logged out successfully."
    })
})
exports.getAllUsers = catchAsync(async(req, res, next)=>{
    const users = await User.find();
    
    
    res.status(200).json({
        status:"success",
        data:users
    })
})




// google Oauth implementations

// implimenting role based access

exports.restrictTo= (...roles)=>{
    return catchAsync(async(req, res, next)=>{
        const role = req.user.role;
        if(!roles.includes(role)){
            return next(new appError(404, "You are not authorized."));
        }
        next();
    }
)}