const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res){


  if(!req.file){
    return res.status(400).json({
      message:"Resume PDF is required"
    })
  }


  const parser = new pdfParse.PDFParse({ data: new Uint8Array(req.file.buffer)})
  const resumeContent = await parser.getText() 
  const { selfDescription, jobDescription } = req.body

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription
  })

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi
  })

  res.status(201).json({
    message:"Interview report generated successfully",
    interviewReport
  })

}


module.exports ={ generateInterviewReportController }