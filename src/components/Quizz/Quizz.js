import React from "react"
import { Ellipsis } from 'react-awesome-spinners'
import { nanoid } from "nanoid"

import Challenge from "./Challenge/Challenge"
import { ButtonCheck, ButtonGenerateAnotherQuizz, ButtonBack } from "./Buttons/Buttons"
import styles from "./Quizz.module.css"

function CountScore(props) {
    const score = props.quizz.map(challenge => challenge.selectedAnswer === challenge.correctAnswer ? 1 : 0).reduce((a, b) => a + b, 0)
    return <span className={styles.spanScore}>You scored {score}/{props.quizz.length}</span>
}

export default function Quizz(props) {
    // stores the current quizz
    const [quizz, setQuizz] = React.useState([])

    // set to true if user clicks "check answers", false if isBuildingQuizz=true
    const [isChecking, setIsChecking] = React.useState(false)

    // set to true if a quizz is being built, false when the quizz is ready
    const [isBuildingQuizz, setIsBuildingQuizz] = React.useState(true)

    // retrieve, build and set quizz state array with the quizz objects
    React.useEffect(() => {
        if (isBuildingQuizz) {
            function buildQuizz(data) {
                const newQuizz = data.map(primitiveChallenge => {
                    let arrayAnswers = primitiveChallenge.incorrect_answers
                    // arrayAnswers will contains all the answers, including the right one
                    // arrayAnswers is shuffled using sort()
                    arrayAnswers.push(primitiveChallenge.correct_answer)
                    arrayAnswers = arrayAnswers.sort()
                    arrayAnswers = arrayAnswers.map(answer => {
                        return ({
                            answer: answer,
                            key: nanoid()
                        })
                    })
                    return ({
                        question: primitiveChallenge.question,
                        correctAnswer: primitiveChallenge.correct_answer,
                        arrayAnswers: arrayAnswers,
                        key: nanoid(),
                        selectedAnswer: null
                    })
                })
                return newQuizz
            }

            setIsChecking(false)
            const url = `https://opentdb.com/api.php?amount=${props.amount}&category=${props.category}&difficulty=${props.difficulty}`
            fetch(url)
                .then(response => response.json())
                .then(body => {
                    setQuizz(buildQuizz(body.results))
                })
                .then(() => setIsBuildingQuizz(false))
        }
    }, [isBuildingQuizz, props])

    function selectAnAnswer(challengeQuestion, answer) {
        if (!isChecking) {
            const updatedQuizz = quizz.map(challenge => {
                const updatedChallenge = {
                    ...challenge,
                    selectedAnswer: challengeQuestion === challenge.question ? answer : challenge.selectedAnswer
                }
                return updatedChallenge
            })
            setQuizz(updatedQuizz)
        }
    }

    const wrappedQuizz = quizz.map(challenge => <Challenge {...challenge} selectAnAnswer={selectAnAnswer} isChecking={isChecking} />)

    return (
        <div>
            {!isBuildingQuizz && wrappedQuizz}
            {isBuildingQuizz && <div className={styles.divLoadingContainer}><Ellipsis /></div>}
            <div className={styles.divButtonContainer}>
                {isChecking && <CountScore quizz={quizz} />}
                {isChecking
                    ?
                    <ButtonGenerateAnotherQuizz
                        onClick={() => setIsBuildingQuizz(true)}
                    />
                    :
                    <ButtonCheck
                        onClick={() => setIsChecking(true)}
                    />
                }
                <ButtonBack
                    onClick={() => props.goBack()}
                />
            </div>
        </div>
    )
}