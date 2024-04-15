import React, { useCallback, useState } from 'react'
import QUESTIONS from '../questions'
import quizCompleted from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Question from './Question'

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers(prev => [...prev, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);

        }, 1000);

    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleted} alt="quiz completed image" />
                <h2>Quiz completed</h2>
            </div>
        )
    }
   
    return (
        <div id="quiz">
            <Question 
            questionText={QUESTIONS[activeQuestionIndex].text} 
            answers={QUESTIONS[activeQuestionIndex].answers}
            onSelectAnswer={handleSelectAnswer}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            answerState={answerState}
            onSkipAnswer={handleSkipAnswer}
            key={activeQuestionIndex}
            />
            {/* <div id="question" key={activeQuestionIndex}>
                <QuestionTimer
                    timeout={10000}
                    onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers 
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                 />
            </div> */}
        </div>
    )
}
