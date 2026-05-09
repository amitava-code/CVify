const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
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

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You MUST return a JSON object EXACTLY matching this structure:

{
  "matchScore": number (0-100),
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ],
  "title": string
}

STRICT RULES:
- Do NOT add extra fields
- Do NOT rename keys
- Do NOT skip fields
- Output ONLY valid JSON

- technicalQuestions must contain EXACTLY 5 items
- behavioralQuestions must contain EXACTLY 5 items
- skillGaps must contain AT LEAST 5 items
- preparationPlan must contain AT LEAST 5 items

- DO NOT return empty arrays
- If unsure, generate realistic content anyway

If any array is empty, the response is INVALID

Example:
{
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "Explain event loop in Node.js",
      "intention": "Check async understanding",
      "answer": "The event loop handles async operations..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenge you faced",
      "intention": "Assess problem-solving",
      "answer": "Describe situation, action, result..."
    }
  ],
  "skillGaps": [
    {
      "skill": "System Design",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Data Structures",
      "tasks": ["Solve 5 array problems"]
    }
  ],
  "title": "Full Stack Developer"
}

Now generate based on:

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    })

    const parsed = JSON.parse(response.text)

// validate structure
const validated = interviewReportSchema.parse(parsed)

// strict enforcement 
if (
    validated.technicalQuestions.length !== 5 ||
    validated.behavioralQuestions.length !== 5 ||
    validated.skillGaps.length < 5 ||
    validated.preparationPlan.length < 5
) {
    throw new Error("AI returned invalid structured data")
}

return validated

   




}



module.exports =  generateInterviewReport 