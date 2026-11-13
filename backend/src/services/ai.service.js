const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
  apiKey:process.env.GOOGLE_GENAI_API_KEY
})


async  function invokeGeminiAi(){

  try{

    const response = await ai.models.generateContent({

    model:"gemini-3.5-flash-lite",
    contents: "Hello gemmini ! Explain what is interview",

  })

  console.log(response.text)

  }catch(err){
    console.log(err.message)
  }

  


}

module.exports = invokeGeminiAi