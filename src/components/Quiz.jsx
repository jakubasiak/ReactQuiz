import React, { useCallback, useState } from 'react'
import QUESTIONS from '../questions'
import quizCompleted from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prev => [...prev, selectedAnswer]);
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [ handleSelectAnswer ]);
    
    if(quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleted} alt="quiz completed image" />
                <h2>Quiz completed</h2>
            </div>
        )
    }
    
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer 
                key={activeQuestionIndex} 
                timeout={10000} 
                onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
