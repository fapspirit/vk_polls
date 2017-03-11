import React from 'react'
import Question from './question'
import TestResult from './test-result'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
require('es6-promise/auto')

export default class Test extends React.Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      test: {},
      answers: [],
      currentQuestion: {
        answer_options: []
      }
    }
  }

  componentDidMount() {
    fetch(`${Settings.host}/api/tests/${this.props.match.params.test_id}`)
      .then(res => res.json())
      .then(res => {
        let state = {
          test: res.test,
          currentQuestion: res.test.questions[0],
          currentQuestionIndex: 0,
          totalWeight: 0
        }
        this.setState(state)
      })
  }

  getTestResults(totalWeight, answers) {
    let options = {
      method: 'POST',
      body: JSON.stringify({answers, score: totalWeight}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`${Settings.host}/api/users/${User._id}/tests/${this.props.match.params.test_id}/answers` ,options)
      .then(res => res.json())
      .then(res => {
        fetch(`${Settings.host}/api/tests/${this.props.match.params.test_id}/test_results`)
          .then(res => res.json())
          .then(res => {
            let total_weight = this.state.totalWeight
            let testResult = _.find(res.test_results, result => {
              return (total_weight >= result.min_weight && total_weight <= result.max_weight)
            })
            this.setState({testResult, currentQuestion: undefined})
          })
      })
  }

  onClick(question, answer_option) {
    let totalWeight = this.state.totalWeight + answer_option.weight
    let answers = this.state.answers
    answers.push(answer_option)
    if (this.state.currentQuestionIndex + 1 >= this.state.test.questions.length) {
      this.setState({totalWeight, answers})
      this.getTestResults(totalWeight, answers)
    } else {
      let currentQuestionIndex = this.state.currentQuestionIndex + 1
      let state = {
        answers,
        totalWeight,
        currentQuestionIndex,
        currentQuestion: this.state.test.questions[currentQuestionIndex]
      }
      this.setState(state)
    }
  }

  render() {
    let nextStep
    if (this.state.currentQuestion != undefined) {
      nextStep = <Question question={this.state.currentQuestion} onClick={this.onClick.bind(this)} />
    } else if (this.state.testResult != undefined) {
      nextStep = <TestResult test_result={this.state.testResult} />
    } else {
      nextStep = <div> something wrong :( </div>
    }
    return (
      <div className="b-test">
        <div className="b-test__title">
          {this.state.test.title}
        </div>
        <div className="b-test__image">
          <img />
        </div>
        <div className="b-test__question">
          {nextStep}
        </div>
      </div>
    )
  }
}
