const bcrypt = require('bcrypt')
const db = require('./db/db')

const router = async (server) =>{
    server.post('/user/signup', async (req, res) => {
      
        const user = req.body
        let result = await db.addUser(user, req, res)
        //console.log(result.message);
        req.session.message = result.message
        if(result.error){
        //res.statusCode = result.status;
        return res.status(result.status).send(result.message)//res.send(result.message) //send(result.message) //status(result.status)
        }
        //console.log("SUCESS", result.redirect);
        return res.status(result.status).json(result.redirect) //.json(result.redirect);

    })

    server.post('/user/login', async (req, res) => {
        const user = req.body
        let result = await db.loginUser(user, req, res)
        
        req.session.data = {
            ...result
        }
        req.session.save()
        const {message, status, redirect} = req.session.data 
        if(result.error){
            
            return res.status(status).send(message)//res.send(result.message) //send(result.message) //status(result.status)
        }
        
        return res.status(status).json(redirect) //.json(result.redirect);*/
    
    })

    server.get('/current', async (req, res) => {
    
        try {
            const {user} = await req.session.data
            
            return res.status(200).json({status: 200, error: false, message: "USER FOUND", user})
        } catch (error) {
            return res.status(404).json({status: 404, redirect:undefined, error: true, 
            message: "CATCH: "+ error.message})
        }
    
    })

    server.get('/user/signout', async (req, res) => {
    
        let result = await db.signOutUser()
        req.session.data = {
            ...result
        }
        req.session.save()
        //console.log(result);
        return res.status(200).json(result) //result.redirect
        //console.log(result);
    })
    
}

module.exports = router; 