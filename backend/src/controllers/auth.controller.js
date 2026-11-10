const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const tokenBlacklistModel = require("../models/blacklist.model")

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


async function loginController(req, res){

  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if(!user){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const token = jwt.sign(
    { id: user._id, username : user.username},
    process.env.JWT_SECRET,
    { expiresIn: "7d"}
  )

  res.cookie("token", token)

  res.status(200).json({
    message:"user logged in successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })


}

async function logoutController(req, res){

  const token = req.cookies.token

  if(token){
    await tokenBlacklistModel.create({ token })

  }

  res.clearCookie("token")

  res.status(200).json({
    message:"User logged out successfully"
  })

}

async function getMeController(req, res){
  
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message:"User details fetched successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  getMeController
}