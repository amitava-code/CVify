const express = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const  upload = require("../middleware/file.middleware")
const interviewController  = require('../controllers/interview.controller')


const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self 
 * description , resume pdf and job description
 * @access private
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController )


/**
 * @route GET /api/interview/report/interviewId
 * @description get interview report by interviewid
 * @access private
 */
interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportById)


/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReport)




module.exports = interviewRouter