const mongoose = require('mongoose');
const User = require("./User")
const express = require('express');
// const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
var cloudinary = require('cloudinary');
const cors = require('cors');
const cookie = require('cookie-parser')
const authentication = require("./authentication")

const app = express();
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());
app.use(cookie());

cloudinary.config({
    cloud_name: "dvcwh1gaq",
    api_key: "862885473175857",
    api_secret: process.env.API_Secret,
    secure: true
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

const db = `mongodb+srv://sagar:admin000@cluster0.hbxgpqx.mongodb.net/mernstack?retryWrites=true&w=majority`
mongoose.connect(db).then(() => {
    console.log("connected")
}).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), authentication, async (req, res) => {
 
    // console.log(req.file.path); 
    const file = req.file;
    if(!file){
        res.status(422).json({ error: "No file exist" })
        // console.log("null image");
    }
    else{
        const {url} = await cloudinary.uploader.upload(req.file.path);
        const imageupdate =  await User.findOneAndUpdate({_id:req.userID},{$set:{profile:url}},{upsert:true});
        await imageupdate.save();
        res.status(201).json({ image_url : url});
    }
});
// run()
// async function run(){
//     const user = await User.create({name: 'sagar' , email:'sagar@gmail.com' , phone : 879790901, work: 'homeloan'})
//     console.log(user) 
//     const f =  await User.find({name:'sagar'})
//     console.log(f);
// }

// const user = {
//     name: "sagar"
// }

// app.get('/user', (req, res) =>{
//     res.json(user)
//   }) 

// app.post('/register',(req,res) =>{
//     const {name, email, phone , work} = req.body;

//     if(!name || !email || !phone || !work){
//         return res.status(422).json({error: "plz fill the property"});
//     }

//     User.findOne({email : email})
//     .then((response)=>{
//         if(response){
//             return res.status(422).json({error: "email exist"})
//         }
//         const user = new User({name, email, phone, work});
//         user.save().then(()=>{
//             res.status(201).json({message: "user registered"});
//         }).catch((err) => res.status(500).json({error: "failed to register"}))
//     }).catch(err =>{console.log(err);});
//     console.log(req.body);
//     res.json(req.body);
// })

// app.get('/',(req,res)=>{ 
//     res.cookie("test","express");
//     res.send('hello express');
// }) 

app.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the property" });
    }
    try {
        const userexist = await User.findOne({ email: email })
        if (userexist) {
            res.status(422).json({ error: "Email already exist" })
        }
        else if (password != cpassword) {
            res.status(422).json({ error: "password and confirm_password not matching" })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            //pre
            await user.save();
            res.status(201).json({ message: "User registered scuccessfully."});
        }

    } catch (err) {
        console.log(err);
    }
})

app.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }
        const userlogin = await User.findOne({ email: email });
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            const token = await userlogin.generateAuthToken();
            console.log("Jwt token is:", token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Crediantials" });
            } else {
                res.json({ message: "user signIn succuessly" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Crediantials" });
        }

    } catch (err) {
        console.log(err);
    }
})

app.get('/about', authentication, (req, res) => {
    res.send(req.rootUser)
})
app.get('/getdata', authentication, (req, res) => {
    res.send(req.rootUser)
})

app.get('/logout', (req, res) => {
    console.log("logout page")
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('User logout')
})

app.post('/Contect', authentication, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("err on contect")
            return res.status(400).json({ error: "Please fill the data" })
        }
     const userData = await User.findOne({_id:req.userID});
      
     if(userData){
        const userMessage = await userData.addMessage(name,email,phone,message)
        console.log(userMessage);
        // await userData.save();     
        res.status(201).json({message:"message send seccessfully"});
     }
    }catch(err){   
      console.log(err);   
    }  
})

// app.post('/mydata',(req,res)=>{
//     const ans = User.mydata();
//     console.log(ans);
//     res.json({message:"data"})
// })

const PORT = process.env.PORT || 4000
app.listen(PORT)      