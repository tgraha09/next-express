const express = require('express')
const router = require('./router')
const { createServer } = require('http')
const { parse } = require('url')
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('express-favicon');
const next = require('next')
const {MongoClient} = require('mongodb')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const User = require('./schemas/userSchema')
dotenv.config()

const dev = process.env.NODE_ENV !== 'development';
const port = process.env.PORT || 3000;
const hostname = 'localhost'
const uri = process.env.DB_URI //|| "mongodb+srv://tfire09:Facetime217!@cluster0.qga9p.mongodb.net/test";
//app.use(express.json())
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare()
.then(() => {
  const server = express()
  //server.use(express.static('public'));
  //server.use(express.static(path.join(__dirname, "js")));
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  //connectMongoose()
  //connectMongo()
  //router(server, handle)
 /* server.get('/', (req, res) => {
    console.log(req.path);
    
    ///_next/webpack-hmr
    return handle(req, res)
  })

  
  server.get('/signup', (req, res) => {
    console.log(req.path);
    
    ///_next/webpack-hmr
    return handle(req, res)
  })*/
server.post('*', async (req, res) => {
    const user = req.body
    console.log(user);
    await addUser(user)
    //console.log(req.path);

   // return handle(req, res)
   //return res.redirect('/login')
})
 server.get('*', (req, res) => {
    //const path = req.path
    //console.log(path);
    /*if(path == '/'){
        console.log(path);
        return handle(req, res)
    }
    else if(path == '/signup'){
        console.log(path);
        return handle(req, res)
    }*/
    //console.log(req.path);

   return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

async function addUser(_user){
    
    mongoose.connect(uri)

    const user = new User({email: _user.email, password: _user.psw})

    await user.save().then(()=> console.log("User Saved!!!!"))
}

async function connectMongoose(){
    
    mongoose.connect(uri)

    const user = new User({email: "test@gmail.com", password: "password"})

    await user.save().then(()=> console.log("User Saved"))
}

async function connectMongo(){

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
};

//router(app)

//app.listen(3000)