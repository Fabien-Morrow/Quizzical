import React from "react"
import he from "he"

import Answer from "./Answer/Answer"

import styles from "./Challenge.module.css"

export default function Challenge(props) {
    const wrappedAnswers = props.arrayAnswers.map(objectAnswer => <Answer
        {...objectAnswer}
        selectAnAnswer={() => props.selectAnAnswer(props.question, objectAnswer.answer)}
        selectedAnswer={props.selectedAnswer}
        correctAnswer={props.correctAnswer}
        isChecking={props.isChecking}
    />)

    return (
        <div>
            <h2 className={styles.h2}>{he.decode(props.question)}</h2>
            {wrappedAnswers}
            <hr className={styles.hr}></hr>
        </div>
    )

}