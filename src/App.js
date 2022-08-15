import React from "react"

import Welcome from "./components/Welcome"
import Quizz from "./components/Quizz"

// https://opentdb.com/api.php?amount=5&category=19

export default function App() {

    const [isWelcomed, setIsWelcomed] = React.useState(true)

    function startChallenges() {
        setIsWelcomed(false)


    }

    return (
        <div className="quizzical-container">
            {isWelcomed
                ?
                <Welcome start={() => setIsWelcomed(false)} />
                :
                <Quizz />
            }
        </div>
    )

}