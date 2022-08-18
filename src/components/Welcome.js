import React from "react"
import Select from 'react-select'

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

    function getCategorieObject(id) {
        return categories.find(categorie => categorie.value === id)
    }

    return (
        <div className="welcome-container">
            <h1>Quizzical...</h1>
            <h3>... generates Quizz upon your desires</h3>
            <div className="challenge-options-container">
                <Select
                    value={getCategorieObject(props.choosenQuizz.category)}
                    onChange={props.selectChallengeOption}
                    options={categories} />

                <fieldset>
                    <legend align="center">Difficulté</legend>
                    <div>
                        <input
                            type="radio"
                            id="easy"
                            name="difficulty"
                            value="easy"
                            checked={props.choosenQuizz.difficulty === "easy"}
                            onChange={props.selectChallengeOption}
                        />
                        <label htmlFor="easy">Easy</label>
                    </div>
                    <div>                    <input
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={props.choosenQuizz.difficulty === "medium"}
                        onChange={props.selectChallengeOption}
                    />
                        <label htmlFor="medium">Medium</label></div>
                    <div>                    <input
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={props.choosenQuizz.difficulty === "hard"}
                        onChange={props.selectChallengeOption}
                    />
                        <label htmlFor="hard">Hard</label></div>

                </fieldset>
                <div className="numberQuestionsContainer">
                    <label htmlFor="amount">Number of Questions: </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        min="1"
                        max="50"
                        onChange={props.selectChallengeOption}
                        value={props.choosenQuizz.amount}
                    />
                </div>
                <button className="button" onClick={props.start}>Start Quizz</button>
            </div>
        </div>
    )
}