import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <FeedbackButton onClick={() => setGood(good + 1)} feedback={"Good"} />
      <FeedbackButton onClick={() => setNeutral(neutral + 1)} feedback={"Neutral"} />
      <FeedbackButton onClick={() => setBad(bad + 1)} feedback={"Bad"} />
      <Message message={"Statistics"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Header = () => {
  return (
    <h1>
      Give Feedback
    </h1>
  )
}

const Message = ({ message }) => {
  return (
    <h2>
      {message}
    </h2>
  )
}

const FeedbackButton = (props) => {
  const { onClick, feedback } = props;

  return (
    <button onClick={onClick}>
      {feedback}
    </button>
  )
}

const Statistics = (props) => {
  const { good, bad, neutral } = props;
  let total = good + bad + neutral, average = (good - bad) / total, positive = (good / total) * 100;

  return (
    total == 0 ?
      <div>
        No feedback given
      </div>
      :
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"total"} value={total} />
          <StatisticsLine text={"average"} value={average} />
          <StatisticsLine text={"positive"} value={positive} />
        </tbody>
      </table>
  )
}

const StatisticsLine = (props) => {
  const { text, value } = props;

  return (
    text === "positive" ?
      <tr>
        <td> {text} </td>
        <td> {Math.round(value * 10) / 10}% </td>
      </tr>
      :
      <tr>
        <td> {text} </td>
        <td> {Math.round(value * 10) / 10} </td>
      </tr>
  )
}

export default App