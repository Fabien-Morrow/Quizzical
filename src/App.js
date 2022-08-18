import React from "react"

import Welcome from "./components/Welcome"
import Quizz from "./components/Quizz"

export default function App() {
    const [choosenQuizz, setChoosenQuizz] = React.useState({
        category: "",
        difficulty: "",
        amount: "10",
    })
    const [isWelcomed, setIsWelcomed] = React.useState(true)

    React.useEffect(() => console.log(choosenQuizz), [choosenQuizz])

    function selectChallengeOption(event) {
        if (event.target) {
            const { name, value, type } = event.target
            setChoosenQuizz(prev => {
                return { ...prev, [name]: type === "checkbox" ? "checked" : value }
            })
        } else {
            // console.log("selected : ", event)
            setChoosenQuizz(prev => {
                return { ...prev, category: event.value }
            })

        }
    }

    function startQuizz() {
        setIsWelcomed(false)
    }

    return (
        <div className="quizzical-container">
            {isWelcomed
                ?
                <Welcome start={() => setIsWelcomed(false)} choosenQuizz={choosenQuizz} selectChallengeOption={selectChallengeOption} />
                :
                <Quizz {...choosenQuizz} stop={() => setIsWelcomed(true)} />
            }
        </div>
    )

}