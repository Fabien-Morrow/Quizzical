import React from "react"

import Welcome from "./components/Welcome/Welcome"
import Quizz from "./components/Quizz/Quizz"

import styles from "./App.module.css"

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
            // a Real event (difficulty or number of questions) triggered
            const { name, value, type } = event.target
            setChoosenQuizz(prev => {
                return { ...prev, [name]: type === "checkbox" ? "checked" : value }
            })
        } else {
            // react-select (categories part) triggered
            setChoosenQuizz(prev => {
                return { ...prev, category: event.value }
            })
        }
    }

    return (
        <div className={styles.divQuizzical}>
            {isWelcomed
                ?
                <Welcome
                    start={() => setIsWelcomed(false)}
                    choosenQuizz={choosenQuizz}
                    selectChallengeOption={selectChallengeOption}
                />
                :
                <Quizz {...choosenQuizz} goBack={() => setIsWelcomed(true)} />
            }
        </div>

    )

}