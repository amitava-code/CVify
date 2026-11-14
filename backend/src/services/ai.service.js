const { GoogleGenAI } = require("@google/genai")
const {z} = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')


const ai = new GoogleGenAI({
  apiKey:process.env.GOOGLE_GENAI_API_KEY
})



const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }){

  const prompt =  `You are an expert technical interviewer and career coach.
Analyze the candidate against the job description and generate an interview report.

Resume: ${resume}

Self Description: ${selfDescription}

Job Description: ${jobDescription}

Return ONLY a JSON object with exactly these camelCase fields and no others:
- title: the job title from the job description (string)
- matchScore: integer from 0 to 100 showing how well the candidate matches the job
- technicalQuestions: 6 to 8 items, each with:
    - question (string)
    - intention: what the interviewer wants to find out (string)
    - answer: how to answer it, with key points to cover (string)
- behavioralQuestions: 4 to 5 items, each with question, intention and answer (strings)
- skillGaps: skills the job requires that the candidate lacks, each with:
    - skill (string)
    - severity: exactly "low", "medium" or "high"
- preparationPlan: a 7-day plan, each item with:
    - day: number starting from 1
    - focus: the main topic of the day (string)
    - tasks: 2 to 4 specific tasks (array of strings)

Rules:
- Base everything on this candidate's actual resume and this specific job description.
- Never return empty strings, empty tasks or null values.
- Use the field names exactly as written above. Do not add or rename fields.`



  const response = await ai.models.generateContent({

    model: "gemini-3.5-flash-lite",
    contents: prompt,

    config: {
      responseMimeType:"application/json",
      responseJSONSchema: zodToJsonSchema(interviewReportSchema)

    }
  })


  // console.log(JSON.parse(respone.text))

  // console.log( interviewReportSchema.parse(JSON.parse(respone.text)))

  return JSON.parse(response.text)


}




module.exports = generateInterviewReport