const express = require('express')
const router = require('./router')
const bcrypt = require('bcrypt')
const { createServer } = require('http')
const { parse } = require('url')
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('express-favicon');
const next = require('next')
const {MongoClient} = require('mongodb')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const session = require('express-session')
const User = require('./schemas/userSchema')


//const cors = require('cors')
dotenv.config()
const db = require('./db/db')
const dev = process.env.NODE_ENV !== 'development';
const port = process.env.PORT || 3000;
const hostname = 'localhost'
const uri = process.env.DB_URI 

//app.use(express.json())
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
const app = next({ dev })
const handle = app.getRequestHandler()
let isConnected = false
//let currentUser

/*const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}*/

/*const Redis = require('ioredis');
const server = require('http').createServer(app)
const connectRedis = require('connect-redis')
const RedisStore = new connectRedis(session)

const redisClient = new Redis()

redisClient.on('error', (err) => console.log('Could not establish a connection with redis', err));
redisClient.on('connect', () => console.log('Connected to redis successfully'));*/

app.prepare()
.then(() => {
  if(isConnected==false){
    db.connectMongoose(uri)
    isConnected=true
  }


  const server = express()
  //server.use(express.static('public'));
  //server.use(express.static(path.join(__dirname, "js")));
  
  //server.use(cors(corsOptions))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.set('trust proxy', 1) // trust first proxy
  server.use(session({
    name: "user_cookie",
    secret: 'Polar express',
    resave: false,
    
    saveUninitialized: false,
    cookie: { 
      httpOnly: true,
      maxAge: 1000*60*60*24*7 //7days
    }
  }))
  
  server.post('*', async (req, res) => {
      
    const path = req.path
    //console.log(path);
    if(path==='/user/signup'){
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
    }
    else if(path==='/user/login'){
      
      const user = req.body
      let result = await db.loginUser(user, req, res)
      //console.log(result);
      
      req.session.data = {
        ...result
      }
      
      req.session.save()
      
     // console.log(req.session.data);
      const {message, status, redirect} = req.session.data 
      if(result.error){
        //res.statusCode = result.status;
        return res.status(status).send(message)//res.send(result.message) //send(result.message) //status(result.status)
      }
     // console.log("USER", req.session.user, req.session.redirect);
      //console.log("SUCESS", result.redirect);
      return res.status(status).json(redirect) //.json(result.redirect);*/
    }

  })

  server.get('/current', async (req, res) => {
    //console.log(currentUser);
    //console.log("SESSION USER");
    //console.log(req.session);
    
    //console.log(req.session);
    try {
      const {user} = await req.session.data
      
      //console.log(user);
      //console.log(req.session);
      //const path = req.path
      //console.log(db.currentUser);
      //console.log(req.session.data);
      //console.log("USER FOUND", user);
      return res.status(200).json({status: 200, error: true,message: "USER FOUND", user})
    } catch (error) {
      return res.status(404).json({status: 404, redirect:undefined, error: true, 
      message: "CATCH: "+ error.message})
    }
    
    //console.log(path);
    //let message = req.session.message;
    //return handle(req, res)
  })

  server.get('*', (req, res) => {
    
    const path = req.path
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Credentials", "false");
    //console.log(path);
    //let message = req.session.message;
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})





/*async function connectMongo(){

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};*/

//router(app)

//app.listen(3000)