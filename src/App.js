import React from "react"

import Welcome from "./components/Welcome"
import Quizz from "./components/Quizz"

// https://opentdb.com/api.php?amount=5&category=19

export default function App() {
    const [choosenChallenge, setchoosenChallenge] = React.useState({
        category: "",
        difficulty: "",
        amount: "10",
    })
    const [isWelcomed, setIsWelcomed] = React.useState(true)

    React.useEffect(() => console.log(choosenChallenge), [choosenChallenge])

    function selectChallengeOption(event) {
        const { name, value, type } = event.target
        setchoosenChallenge(prev => {
            return { ...prev, [name]: type === "checkbox" ? "checked" : value }
        })
    }

    function startQuizz() {
        setIsWelcomed(false)
    }

    return (
        <div className="quizzical-container">
            {isWelcomed
                ?
                <Welcome start={() => setIsWelcomed(false)} choosenChallenge={choosenChallenge} selectChallengeOption={selectChallengeOption} />
                :
                <Quizz {...choosenChallenge} stop={() => setIsWelcomed(true)} />
            }
        </div>
    )

}