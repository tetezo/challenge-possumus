import React, { useEffect, useState } from 'react'


interface TriviaScreenProps {
    category: string,
    difficulty: string,
    onFinish: (score: number) => void,
}

interface Question {
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

const TriviaScreen: React.FC<TriviaScreenProps> = ({ category, difficulty, onFinish }) => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showCorrect, setShowCorrect] = useState<boolean>(false)

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
        .then(response => response.json())
        .then(data => {
            if (data.results && Array.isArray(data.results)) {
                setQuestions(data.results)
            } else {
                console.error('error en los datos', data)
            }
        })
        .catch(error => {
            console.error('error en la solicitud', error)
        })
    }, [category, difficulty])

    const handleAnswer = (answer: string) => {
        const currentQuestion = questions[currentQuestionIndex]
        if (!currentQuestion) return

    const correctAnswer = currentQuestion.correct_answer
        setSelectedAnswer(answer)
        setShowCorrect(true)

        if (answer === correctAnswer) {
            setScore(score + 20)
        }

        setTimeout(() => {
            setShowCorrect(false)
            setSelectedAnswer(null)
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else {
                onFinish(score)
            }
        }, 1000)
    }

    if (questions.length === 0) {
        return <div>Cargando preguntas...</div>
    }

    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) {
        return <div>Error: pregunta actual no disponible.</div>
    }

    const answers = currentQuestion.incorrect_answers && Array.isArray(currentQuestion.incorrect_answers)
        ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort()
        : [currentQuestion.correct_answer]

  return (
    <div className='container col-4'>
        <h2 className='subtitle'>{currentQuestion.question}</h2>
        <div className='list-group'>
            {answers.map((answer, index) => (
                <button
                    key={index}
                    className={`options
                                ${showCorrect && answer === currentQuestion.correct_answer ? 'correct' : ''}
                                ${showCorrect && answer === selectedAnswer && answer !== currentQuestion.correct_answer ? 'incorrect' : ''}
                                `}
                    onClick={() => handleAnswer(answer)}
                    disabled={showCorrect}
                >
                    {answer}
                </button>
            ))}
        </div>
      
    </div>
  )
}

export default TriviaScreen
