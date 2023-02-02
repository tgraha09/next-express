const bcrypt = require('bcrypt')

const posts = [
    {
        username: 'Taurian',
        title: 'Post 1'
    },
    {
        username: 'Ian',
        title: 'Post 2'
    },
    {
        username: 'Pam',
        title: 'Post 3'
    },
    {
        username: 'Tarik',
        title: 'Post 4'
    }
]

const users = []

const router = (app) =>{
    app.get('/posts', (req,res)=>{
        res.json(posts)
    })
    app.get('/users', (req,res)=>{
        res.json(users)
    })
    app.post('/users', async (req,res)=>{
        //hashes password from user post
        try{
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            
            const user = {username: req.body.username, 
                password: hashedPassword}
            users.push(user)
            res.status(201).send() 
        }
        catch{
            res.status(500).send()
        }
                    
    })
    app.post('/users/login', async (req,res)=>{
        
        const user = users.find(user=>user.username = req.body.username)
        if(user==null){
            return res.status(400).send('Cannot find user')
        }
        try{
            if(await bcrypt.compare(req.body.password, user.password)){
                res.send('Success')
            } else{
                res.send('Not Allowed')
            }
        }catch{
            res.status(500).send()
        }        
    })
    app.get('/login', (req,res)=>{
        //Authenticate User
    })
}

module.exports = router;