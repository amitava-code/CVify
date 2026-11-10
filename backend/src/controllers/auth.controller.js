const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

async function registerController(req, res){

  const { username, email, password } = req.body

  if(!username || !email || !password){
    return res.status(400).json({
      message:"Please provide username, email and password "
    })
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }]
  })

  if(isUserAlreadyExists){
    return res.status(400).json({
      message:"Account already exists with this email-address or username "
    })
  }


  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username,
    email,
    password: hash
  })

  const token = jwt.sign(
    { id: user._id, username : user.username},
    process.env.JWT_SECRET,
    { expiresIn: "7d"}
  )

  res.cookie("token", token)

  res.status(201).json({
    message:"user registered successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email

    }
  })


}

module.exports = {
  registerController
}