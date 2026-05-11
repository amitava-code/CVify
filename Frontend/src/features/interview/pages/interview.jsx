import React, { useState } from 'react'
import "../style/interview.scss"
import { useParams } from 'react-router'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
]

/* ✅ FIXED QuestionCard (WITH CORRECT CLASSNAMES) */



const QuestionCard = ({ item, index, openIndex, setOpenIndex }) => {
    const isOpen = openIndex === index

    return (
        <div className={`q-card ${isOpen ? 'open' : ''}`}>

            {/* HEADER */}
            <div
                className="q-card__header"
                onClick={() => setOpenIndex(isOpen ? null : index)}
            >
                <span className="q-card__index">
                    Q{String(index + 1).padStart(2, "0")}
                </span>

                <span className="q-card__question">
                    {item.question}
                </span>

                <span className={`q-card__chevron ${isOpen ? 'q-card__chevron--open' : ''}`}>
                    ▾
                </span>
            </div>

            {/* BODY */}
            {isOpen && (
                <div className="q-card__body">
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--intention">Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--answer">Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>

        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const [openIndex, setOpenIndex] = useState(null)
    const { interviewId } = useParams()

    const report = {
        matchScore: 78,

        technicalQuestions: [
            {
                question: 'What is React?',
                intention: 'Check basic understanding',
                answer: 'React is a JavaScript library for building UI using components.'
            },
            {
                question: 'What are Hooks?',
                intention: 'Modern React knowledge',
                answer: 'Hooks allow you to use state and lifecycle in functional components.'
            },
            {
                question: 'What is useState?',
                intention: 'State handling',
                answer: 'A hook to manage local state inside a component.'
            },
            {
                question: 'What is Virtual DOM?',
                intention: 'Performance concept',
                answer: 'A lightweight copy of DOM used to optimize UI updates.'
            }
        ],

        behavioralQuestions: [
            {
                question: 'Tell me about yourself',
                intention: 'Communication skills',
                answer: 'Give a concise summary of your background and skills.'
            },
            {
                question: 'Why do you want this job?',
                intention: 'Motivation check',
                answer: 'Align your goals with the company and role.'
            },
            {
                question: 'Describe a challenge you faced',
                intention: 'Problem solving',
                answer: 'Use STAR method to explain situation and outcome.'
            },
            {
                question: 'What are your strengths?',
                intention: 'Self awareness',
                answer: 'Mention strengths with examples.'
            }
        ],

        preparationPlan: [
            {
                day: 1,
                focus: 'React Basics',
                tasks: ['JSX', 'Components', 'Props']
            },
            {
                day: 2,
                focus: 'Hooks',
                tasks: ['useState', 'useEffect']
            }
        ],

        skillGaps: [
            { skill: 'DSA', severity: 'high' },
            { skill: 'System Design', severity: 'mid' }
        ],
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
        report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* LEFT NAV */}
                <nav className='interview-nav'>
                    <div>
                        <p className='interview-nav__label'>Sections</p>

                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => {
                                    setActiveNav(item.id)
                                    setOpenIndex(null)
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className='interview-divider' />

                {/* CONTENT */}
                <main className='interview-content'>

                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>
                                    {report.technicalQuestions.length}
                                </span>
                            </div>

                            <div className="questions-list">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard
                                        key={i}
                                        item={q}
                                        index={i}
                                        openIndex={openIndex}
                                        setOpenIndex={setOpenIndex}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>
                                    {report.behavioralQuestions.length}
                                </span>
                            </div>

                            <div className="questions-list">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard
                                        key={i}
                                        item={q}
                                        index={i}
                                        openIndex={openIndex}
                                        setOpenIndex={setOpenIndex}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>
                                    {report.preparationPlan.length}
                                </span>
                            </div>

                            <div className='roadmap-list'>
                                {report.preparationPlan.map(day => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}

                </main>

                <div className='interview-divider' />

                {/* SIDEBAR */}
                <aside className='interview-sidebar'>

                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>

                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>

                        <p className='match-score__sub'>Strong match</p>
                    </div>

                    <div className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>

                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`skill-tag skill-tag--${gap.severity}`}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default Interview