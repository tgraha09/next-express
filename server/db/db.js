const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const User = require('../schemas/userSchema')
let connection
let currentUser
async function connectMongoose(_uri){
    if(connection==undefined){
        mongoose.connect(_uri, function (err){
            if (err) throw err;
            else console.log("Connected to Database");
            
            //let db = mongoose.connection.db; // <-- This is your MongoDB driver instance.
        });
        connection = mongoose.connection
    }
    else{
        
        console.log("Connected");
    }
    
}

//adds user to db
async function addUser(_user, req, res){
    console.log(_user);
    try{
        //salt password 
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(_user.psw, salt)
        //adding it to schema
        const user = new User({email: _user.email, password: hashedPassword}) 
        //check if user is present in db
        const data = await User.find({ email: _user.email}).lean()
        if(data.length == 0){ //free space to add new user
            await user.save().then()
        }
        else if(data.length == 1){ //user exists, cannot save new user
            let doc = data[0]
            //console.log(data.email);
            if(doc.email === _user.email){
                return {status: 409, redirect:"/signup", error: true, 
                message: 'Cannot save credentials, user is already exists.'}
            }
        }
    }
    catch(error){
        //console.log("CATCH");
        return {status: 500,redirect:"/signup", error: true, 
        message: "CATCH: "+ error.message} 
    }
    
    return {status: 201,redirect:"/login", error: false, 
    message: "New user saved"}
}

async function loginUser(_user, req, res){

    try{

        const data = await User.find({ email: _user.email}).lean()
        let doc = data[0]

        if(bcrypt.compareSync(_user.psw, doc.password)){
            currentUser = doc
            return {status: 200, redirect:"/", error: false, 
            message: "Successfully logged in"}
        }
    }
    catch(error){
        //console.log("CATCH");
        return {status: 500,redirect:"/signup", error: true, 
        message: "CATCH: "+ error.message}
    }

}

module.exports = {
    connectMongoose,
    addUser,
    loginUser
}