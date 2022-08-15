import React from "react"

import Challenge from "./Challenge"
import { nanoid } from "nanoid"

export default function Quizz() {
    const [quizz, setQuizz] = React.useState([])
    const [isChecking, setIsChecking] = React.useState(false)
    const [isLoadingQuizz, setIsLoadingQuizz] = React.useState(true)

    // retrieve, build and set quizz state array with the quizz objects
    React.useEffect(() => {
        if (isLoadingQuizz) {
            setIsChecking(false)
            function buildQuizz(data) {
                const newQuizz = data.map(element => {
                    let answers = element.incorrect_answers
                    answers.push(element.correct_answer)
                    answers = answers.map(answer => {
                        return ({
                            answer: answer,
                            key: nanoid()
                        })
                    })
                    return ({
                        question: element.question,
                        correctAnswer: element.correct_answer,
                        answers: answers,
                        key: nanoid(),
                        selectedAnswer: null
                    })
                })
                return newQuizz
            }

            fetch("https://opentdb.com/api.php?amount=5&category=19")
                .then(response => response.json())
                .then(body => {
                    setQuizz(buildQuizz(body.results))
                })
            setIsLoadingQuizz(false)
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

    function CountScore() {
        const score = quizz.map(challenge => challenge.selectedAnswer === challenge.correctAnswer ? 1 : 0).reduce((a, b) => a + b, 0)
        return <span className="score">You scored {score}/5</span>
    }

    const wrappedQuizz = quizz.map(challenge => <Challenge {...challenge} selectAnAnswer={selectAnAnswer} isChecking={isChecking} />)
    console.log(wrappedQuizz)

    return (
        <div>
            {!isLoadingQuizz && wrappedQuizz}
            {isLoadingQuizz && <div>"loading"</div>}
            <div className="button-container">
                {isChecking && <CountScore />}
                <button className="button-check-answers" onClick={isChecking ? () => setIsLoadingQuizz(true) : () => setIsChecking(true)}>{isChecking ? "Another Quizz !" : "Check answers"}</button>
            </div>
        </div>
    )

}