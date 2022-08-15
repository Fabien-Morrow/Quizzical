import React from "react"

import Challenge from "./Challenge"
import { nanoid } from "nanoid"

export default function Quizz() {
    const [challenges, setChallenges] = React.useState([])
    const [isChecking, setIsChecking] = React.useState(false)

    // retrieve, build and set challenges state array with the challenges objects
    React.useEffect(() => {
        console.log("gogogo useeffect")
        function buildChallenges(data) {
            const newChallenges = data.map(element => {
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
            return newChallenges
        }

        fetch("https://opentdb.com/api.php?amount=5&category=19")
            .then(response => response.json())
            .then(body => {
                console.log(body.results)
                setChallenges(buildChallenges(body.results))
            })
    }, [])

    function selectAnAnswer(challengeQuestion, answer) {
        if (!isChecking) {
            const newChallenges = challenges.map(challenge => {
                const newChallenge = {
                    ...challenge,
                    selectedAnswer: challengeQuestion === challenge.question ? answer : challenge.selectedAnswer
                }
                return newChallenge
            })
            setChallenges(newChallenges)
        }
    }

    function CountScore() {
        const score = challenges.map(challenge => challenge.selectedAnswer === challenge.correctAnswer ? 1 : 0).reduce((a, b) => a + b, 0)
        return <span className="score">You scored {score}/5</span>
    }

    const wrappedChallenges = challenges.map(challenge => <Challenge {...challenge} selectAnAnswer={selectAnAnswer} isChecking={isChecking} />)
    console.log(wrappedChallenges)
    return (
        <div>
            {challenges && wrappedChallenges}
            {/* {challenges
                ?
                { wrappedChallenges }
                :
                <div>("loading")</div>
            } */}
            <div className="button-container">
                {isChecking && <CountScore />}
                <button className="button-check-answers" onClick={() => setIsChecking(true)}>{isChecking ? "Another Quizz !" : "Check answers"}</button>
            </div>
        </div>
    )

}