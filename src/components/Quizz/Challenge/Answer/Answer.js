import he from "he"

import styles from "./Answer.module.css"

export default function Answer(props) {
    let className = ""
    if (props.isChecking) {
        if (props.answer === props.correctAnswer) {
            className = styles.true
        } else {
            className = props.answer === props.selectedAnswer ? styles.false : styles.free
        }

    } else {
        className = props.answer === props.selectedAnswer ? styles.selected : styles.free
    }

    return (
        <button className={className} onClick={props.selectAnAnswer}>{he.decode(props.answer)}</button>
    )
}