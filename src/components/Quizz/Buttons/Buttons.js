import React from "react"

import styles from "./Buttons.module.css"

export function ButtonCheck(props) {
    return (
        <button
            className={styles.buttonQuizz}
            onClick={props.onClick}
        >
            Check answers
        </button>)
}

export function ButtonGenerateAnotherQuizz(props) {
    return (
        <button
            className={styles.buttonQuizz}
            onClick={props.onClick}
        >
            Another Quizz !
        </button>)
}

export function ButtonBack(props) {
    return (
        <button
            className={styles.buttonQuizz}
            onClick={props.onClick}
        >
            Back
        </button>)
}