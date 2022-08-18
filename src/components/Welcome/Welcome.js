import React from "react"
import Select from 'react-select'

import Radio from "./Radio/Radio"
import ChooseNumberQuestions from "./ChooseNumberQuestions/ChooseNumberQuestions"

import styles from "./Welcome.module.css"

export default function Welcome(props) {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        function retrieveAndBuildCategories(url) {
            fetch(url)
                .then(response => response.json())
                .then(primitivesCategories => {
                    let dataShaped = primitivesCategories.trivia_categories.map(({ id, name }) => {
                        return {
                            value: id,
                            label: name
                        }
                    })
                    setCategories(dataShaped)
                })
        }

        retrieveAndBuildCategories("https://opentdb.com/api_category.php")
    }, [])

    function formatOptionLabel({ value, label }) {
        return (
            <div className={styles.divOptionCategory}>{label}</div>
        )
    }

    function getCategorieObject(id) {
        return categories.find(categorie => categorie.value === id)
    }

    return (
        <div className={styles.divWelcome}>
            <h1>Quizzical...</h1>
            <h3>... generates Quizz upon your desires</h3>
            <div className={styles.divQuizzOptions}>
                <Select
                    value={getCategorieObject(props.choosenQuizz.category)}
                    formatOptionLabel={formatOptionLabel}
                    onChange={props.selectChallengeOption}
                    options={categories} />

                <fieldset className={styles.fieldsetDifficulty}>
                    <legend align="center">Difficulté</legend>
                    <Radio
                        onChange={props.selectChallengeOption}
                        difficulty={props.choosenQuizz.difficulty}
                        value="easy"
                    />
                    <Radio
                        onChange={props.selectChallengeOption}
                        difficulty={props.choosenQuizz.difficulty}
                        value="medium"
                    />
                    <Radio
                        onChange={props.selectChallengeOption}
                        difficulty={props.choosenQuizz.difficulty}
                        value="hard"
                    />
                </fieldset>
                <ChooseNumberQuestions
                    onChange={props.selectChallengeOption}
                    value={props.choosenQuizz.amount}
                />

                <button className={styles.buttonStart} onClick={props.start}>Start Quizz</button>
            </div>
        </div>
    )
}