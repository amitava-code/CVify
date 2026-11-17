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

async function getInterviewReportById(req,res){

  const { interviewId } = req.params

  const interviewReport = await interviewReportModel.findOne({
    _id:interviewId,
    user: req.user.id
  })

  if(!interviewReport){
    return res.status(404).json({
      message:"Interview report not found"
    })
  }

  res.status(200).json({
    message:"Interview report fetched successfully",
    interviewReport
  })

}

/**
 * @description Controller to get all interview reports of logged in user
 */
async function getAllInterviewReport(req,res){

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })

}



module.exports ={ generateInterviewReportController, getInterviewReportById, getAllInterviewReport }