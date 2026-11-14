const mongoose = require("mongoose")

/**
 * - job description schema
 * - resume text
 * - self description
 * 
 * - Technical Questions :
 *         [{
 *               question: "",
 *               intention: "",
 *               answer: ""
 *         }]
 * - Behavioral Questions :[]
 * - Skills gap :[]
 * - preperation plan :[[]]
 */

const technicalQuestionSchema = new mongoose.Schema({
  question:{
    type: String,
    required: [true, "Technical question is required"]
  },
  intention:{
    type:String,
    required:[true,"Intention is required"]
  },
  answer:{
    type:String,
    required:[true, "Answer is required"]
  }
},{
  _id:false
})


const behavioralQuestionSchema = new mongoose.Schema({
  question:{
    type:String,
    required:[true, "Behavioral question is required"]
  },
  intention:{
    type:String,
    required:[true, "Intention is required"]
  },
  answer:{
    type:String,
    required:[true, "Answer is required"]
  }
},{
  _id:false
})

const skillGapsSchema = new mongoose.Schema({
  skill:{
    type:String,
    required:[true, "Skill is required"]
  },
  severity:{
    type:String,
    enum:["low", "medium", "high"],
    required:[true, "Severity is required"]
  }

},{
  _id: false
})


const  preparationPlanSchema = new mongoose.Schema({

  day:{
    type:Number,
    required:[true, "Day is required"]
  },
  focus:{
    type:String,
    required:[true, "Focus is required"]
  },
  tasks:[{
    type:String,
    required:[true, "Task is required"]
  }]

})


const interviewReportSchema = new mongoose.Schema({

  title:{

    type:String

  },

  jobDescription: {
    type:String,
    required:[true, "job description is required"]
  },
  resume:{
    type:String,
  },
  selfDescription:{
    type:String
  },
  matchScore:{
    type:Number,
    min:0,
    max:100
  },
  technicalQuestions:[ technicalQuestionSchema ],
  behavioralQuestions: [ behavioralQuestionSchema ],
  skillGaps: [ skillGapsSchema ],
  preparationPlan: [ preparationPlanSchema],

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  }

},{
  timestamps: true
})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel