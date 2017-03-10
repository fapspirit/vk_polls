import React from 'react'
import Question from './question'
import TestResult from './test-result'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
require('es6-promise/auto')

export default class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: {},
      currentQuestion: {
        answer_options: []
      }
    }
  }

  componentDidMount() {
    fetch(`${Settings.host}/api/tests/${this.props.params.test_id}`)
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

  getTestResults() {
    return fetch(`${Settings.host}/api/tests/${this.props.params.test_id}/test_results`)
      .then(res => res.json())
      .then(res => {
        let total_weight = this.state.totalWeight
        let testResult = _.find(res.test_results, result => {
          return (total_weight >= result.min_weight && total_weight <= result.max_weight)
        })
        this.setState({testResult, currentQuestion: undefined})
      })
  }

  onClick(question, answer_option) {
    let totalWeight = this.state.totalWeight + answer_option.weight
    fetch(`${Settings.host}/api/users/58c1ba62b6eb8f49427c0196/questions/${question._id}/answer_options/${answer_option._id}`,
      {method: 'PUT'}
    )
    .then(res => {
      if (this.state.currentQuestionIndex + 1 >= this.state.test.questions.length) {
        this.setState({totalWeight})
        this.getTestResults()
      } else {
        let currentQuestionIndex = this.state.currentQuestionIndex + 1
        let state = {
          totalWeight,
          currentQuestionIndex,
          currentQuestion: this.state.test.questions[currentQuestionIndex]
        }
        this.setState(state)
      }
    })
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
