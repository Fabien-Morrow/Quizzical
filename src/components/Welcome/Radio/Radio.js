import React from "react"

import styles from "./Radio.module.css"

export default function Radio(props) {
    return (
        <div>
            <input
                type="radio"
                className={styles.radio}
                id={props.value}
                name="difficulty"
                value={props.value}
                checked={props.difficulty === props.value}
                onChange={props.onChange}
            />
            <label htmlFor={props.value}>{props.value}</label>
        </div>
    )
}