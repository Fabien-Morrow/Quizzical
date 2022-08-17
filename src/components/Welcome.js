import React from "react"

export default function Welcome(props) {

    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(response => response.json())
            .then(data => {
                // console.log(data.trivia_categories)
                setCategories(data.trivia_categories)
            })
    }, [])

    const wrappedCategories = categories.map(({ id, name }) => <option value={id} key={id}>{name}</option>)

    return (
        <div className="welcome-container">
            <h1>Quizzical...</h1>
            <h3>... generates Quizz upon your desires</h3>
            <div className="challenge-options-container">
                <select
                    id="category"
                    value={props.choosenChallenge.category}
                    onChange={props.selectChallengeOption}
                    name="category"
                >
                    {wrappedCategories}
                </select>
                <fieldset>
                    <legend>Difficulté</legend>

                    <input
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={props.choosenChallenge.difficulty === "easy"}
                        onChange={props.selectChallengeOption}
                    />
                    <label htmlFor="easy">Easy</label>
                    <input
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={props.choosenChallenge.difficulty === "medium"}
                        onChange={props.selectChallengeOption}
                    />
                    <label htmlFor="medium">Medium</label>
                    <input
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={props.choosenChallenge.difficulty === "hard"}
                        onChange={props.selectChallengeOption}
                    />
                    <label htmlFor="hard">Hard</label>
                </fieldset>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="1"
                    max="50"
                    onChange={props.selectChallengeOption}
                    value={props.choosenChallenge.amount}
                />
                <label htmlFor="amount">Number of Questions: </label>
            </div>
            <button className="button" onClick={props.start}>Start Quizz</button>
        </div>
    )
}