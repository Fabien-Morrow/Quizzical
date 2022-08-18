import React from "react"

import styles from "./ChooseNumberQuestions.module.css"

export default function ChooseNumberQuestions(props) {
    return (
        <div className={styles.divChooseNumberQuestions}>
            <label htmlFor="amount">Number of Questions: </label>
            <input
                type="number"
                className={styles.numberQuestions}
                id="amount"
                name="amount"
                min="1"
                max="50"
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )
}