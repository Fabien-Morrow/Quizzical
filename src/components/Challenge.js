import React from "react"
import he from "he"

function Answer(props) {
    let styles = "answer"
    if (props.isChecking) {
        if (props.answer === props.correctAnswer) {
            styles += " true"
        } else {
            styles += props.answer === props.selectedAnswer ? " false" : " free"
        }

    } else {
        styles += props.answer === props.selectedAnswer ? " selected" : " free"
    }

    return (
        <button className={styles} onClick={props.selectAnAnswer}>{he.decode(props.answer)}</button>
    )
}

export default function Challenge(props) {
    const wrappedAnswers = props.answers.map(answer => <Answer
        {...answer}
        selectAnAnswer={() => props.selectAnAnswer(props.question, answer.answer)}
        selectedAnswer={props.selectedAnswer}
        correctAnswer={props.correctAnswer}
        isChecking={props.isChecking}
    />)
    return (
        <div>
            <h2>{he.decode(props.question)}</h2>
            {wrappedAnswers}
            <hr></hr>
        </div>
    )

}