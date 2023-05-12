const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    profile: {
        type: String 
    }, 
    messages:[
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true 
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this.id }, '2d02da89583ba0b5b331e48833bc019fc85c0c2458f490c5bd61bf2c6b8b60b56dbc7eed9cf488e53d58227837afe2797c287eb30c16006ebc85ecc6b44dff47'
        )
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}

userSchema.methods.addMessage = async function (name ,email,phone,message) {
    try {   
        this.messages = this.messages.concat({ name,email ,phone,message})
        await this.save();
        return this.messages;
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoose.model("Users", userSchema);  

