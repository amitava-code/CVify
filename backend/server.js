const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

require('dotenv').config()
const app = require('./src/app')
const connectDB = require("./src/config/db")
const invokeGeminiAi =  require("./src/services/ai.service")

connectDB()
invokeGeminiAi()

app.listen(3000, ()=>{
  console.log("App is listening on port 3000")
})