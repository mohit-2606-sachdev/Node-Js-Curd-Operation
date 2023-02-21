const User = require('../Models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.AddUser = async (req, res) => {

    try {
        const name = req.body.name
        const email = req.body.email
        const password_text = req.body.password
        const hashed_password = await bcrypt.hash(password_text, 10)
        const result = new User({
            "name": name,
            "email": email,
            "password": hashed_password
        })
        user.save()
        console.log(result._id)
        const token = jwt.sign({ email: result.email, userId: result._id }, 'secretkey')
        res.status(200).send({ message: "Signup Successfull", token: token })
    }
    catch (error) {
        res.status(500).send("Something went wrong")
    }
}

exports.GetUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const existingUser = await User.findOne({ "email": email })
    if (!existingUser) {
        res.status(401).send({
            "error": "invalid Credentials"
        })
    }

    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch) {
        res.status(401).send({
            "error": "invalid Credentials"
        })
    }
    else {
        jwt.sign({ email: existingUser.email, userId: existingUser._id }, 'secretkey', (err, token) => {
            if (err) {
                res.status(401).send({
                    "error": err
                })
            } else {
                res.status(200).json({
                    token
                })
            }
        })
    }
}