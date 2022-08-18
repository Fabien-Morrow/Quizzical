import React from "react"

import { Ellipsis } from 'react-awesome-spinners'
import { nanoid } from "nanoid"

import Challenge from "./Challenge"


function CountScore(props) {
    const score = props.quizz.map(challenge => challenge.selectedAnswer === challenge.correctAnswer ? 1 : 0).reduce((a, b) => a + b, 0)
    return <span className="score">You scored {score}/{props.quizz.length}</span>
}

export default function Quizz(props) {
    const [quizz, setQuizz] = React.useState([])
    const [isChecking, setIsChecking] = React.useState(false)
    const [isLoadingQuizz, setIsLoadingQuizz] = React.useState(true)

    // retrieve, build and set quizz state array with the quizz objects
    React.useEffect(() => {
        if (isLoadingQuizz) {
            setIsChecking(false)
            function buildQuizz(data) {
                const newQuizz = data.map(primitiveChallenge => {
                    let answers = primitiveChallenge.incorrect_answers
                    answers.push(primitiveChallenge.correct_answer)
                    answers = answers.sort()
                    answers = answers.map(answer => {
                        return ({
                            answer: answer,
                            key: nanoid()
                        })
                    })
                    return ({
                        question: primitiveChallenge.question,
                        correctAnswer: primitiveChallenge.correct_answer,
                        answers: answers,
                        key: nanoid(),
                        selectedAnswer: null
                    })
                })
                return newQuizz
            }
            const url = `https://opentdb.com/api.php?amount=${props.amount}&category=${props.category}&difficulty=${props.difficulty}`
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(body => {
                    setQuizz(buildQuizz(body.results))
                })
                .then(() => setIsLoadingQuizz(false))
        }
    }, [isLoadingQuizz])

    function selectAnAnswer(challengeQuestion, answer) {
        if (!isChecking) {
            const newQuizz = quizz.map(challenge => {
                const newChallenge = {
                    ...challenge,
                    selectedAnswer: challengeQuestion === challenge.question ? answer : challenge.selectedAnswer
                }
                return newChallenge
            })
            setQuizz(newQuizz)
        }
    }

    const wrappedQuizz = quizz.map(challenge => <Challenge {...challenge} selectAnAnswer={selectAnAnswer} isChecking={isChecking} />)
    console.log(wrappedQuizz)

    return (
        <div>
            {!isLoadingQuizz && wrappedQuizz}
            {isLoadingQuizz && <div className="loadingContainer"><Ellipsis /></div>}
            <div className="button-container">
                {isChecking && <CountScore quizz={quizz} />}
                <button className="button" onClick={isChecking ? () => setIsLoadingQuizz(true) : () => setIsChecking(true)}>{isChecking ? "Another Quizz !" : "Check answers"}</button>
                <button className="button" onClick={() => props.stop()}>Back</button>
            </div>
        </div>
    )

}