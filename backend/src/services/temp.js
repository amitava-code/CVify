const resume = `
RAHUL SHARMA
Full Stack Developer | Kolkata, India
rahul.sharma@example.com | github.com/rahul-dev-demo | linkedin.com/in/rahul-dev-demo

SUMMARY
Final-year Computer Science student with hands-on experience building MERN stack
applications. Comfortable with REST API design, JWT authentication, MongoDB and
React. Looking for a junior full stack or backend developer role.

SKILLS
- Languages: JavaScript (ES6+), HTML, CSS, SCSS
- Frontend: React, Preact, React Router, Context API, Axios
- Backend: Node.js, Express.js, REST APIs, JWT, bcrypt, cookie-parser, CORS
- Database: MongoDB, Mongoose
- Tools: Git, GitHub, Postman, VS Code, npm, Vite

PROJECTS
1. Resume Analyzer (MERN)
   - Built a full stack app where users register, log in and upload their resume.
   - Implemented JWT authentication with cookies, token blacklisting on logout
     and protected routes on the frontend.
   - Designed MongoDB schemas with Mongoose and added validation and timestamps.
   - Integrated a generative AI API to produce feedback on resumes.

2. Expense Tracker
   - Created a React app to add, edit and delete expenses with category filters.
   - Used Context API for global state and localStorage for persistence.
   - Built a responsive UI with SCSS.

3. Blog API
   - Developed a REST API with Express and MongoDB supporting CRUD for posts
     and comments.
   - Added input validation and centralized error handling middleware.

EDUCATION
B.Tech in Computer Science and Engineering, Demo Institute of Technology
2022 - 2026 | CGPA: 8.1 / 10

CERTIFICATIONS
- Responsive Web Design (online course)
- Node.js and Express fundamentals (online course)
`;

const jobDescription = `
Job Title: Junior Full Stack Developer (MERN)
Company: Example Tech Solutions
Location: Bangalore, India (Hybrid)
Experience: 0 - 2 years

About the role
We are looking for a Junior Full Stack Developer to join our product team and
help build scalable web applications used by thousands of customers.

Responsibilities
- Build and maintain features using React on the frontend and Node.js/Express
  on the backend.
- Design and consume RESTful APIs.
- Model data and write efficient queries in MongoDB.
- Implement secure authentication and authorization.
- Write clean, reusable and well-tested code.
- Collaborate with designers and other developers in an agile team.

Requirements
- Strong knowledge of JavaScript (ES6+).
- Hands-on experience with React, Node.js, Express and MongoDB.
- Understanding of REST API design and JWT-based authentication.
- Familiarity with Git and GitHub workflows.
- Good problem solving and communication skills.

Good to have
- Experience with TypeScript.
- Knowledge of unit testing (Jest, React Testing Library).
- Basic understanding of Docker and CI/CD.
- Experience deploying apps to cloud platforms (AWS, Render, Vercel).
- Familiarity with system design basics and caching (Redis).
`;

const selfDescription = `
I am a final-year computer science student who enjoys building complete web
applications from the database to the user interface. I learn best by building
projects, and my Resume Analyzer app taught me a lot about authentication,
state management and working with AI APIs. I like debugging problems patiently
and understanding why something works, not just copying a fix. I am still
learning testing, TypeScript and deployment, and I am actively working on those.
I work well in a team, ask questions early, and want a role where I can grow
quickly as a developer.
`;

module.exports = { resume, jobDescription, selfDescription };