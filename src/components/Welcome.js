import React from "react"

export default function Welcome(props) {
    return (
        <div>
            <h1>Quizzical...</h1>
            <h3>... generates Quizz upon your desires</h3>
            <button onClick={props.start}>Start Quizz</button>
        </div>
    )
}