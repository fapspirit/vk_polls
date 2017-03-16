import React from 'react'
import AnswerOption from './answer-option'



export default class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    let props = Object.assign({}, nextProps)
    props.correct_answer = undefined
    this.setState(props)
  }

  onClick(answer_option) {
    let right_answer = this.state.question.answer_options.reduce((curr, next) => {
      return curr.weight > next.weight ? curr : next
    })
    this.setState({
      answer_option: answer_option,
      correct_answer: answer_option._id === right_answer._id
    })
  }

  next() {
    this.state.onClick(this.state.question, this.state.answer_option)
  }

  render() {
    let text
    let image = this.state.question.image ? <img src={this.state.question.image} /> : null
    let buttons = <div className="b-question__next" onClick={this.next.bind(this)}> Далее </div>
    if (this.state.correct_answer == undefined) {
      text = <div className="b-question__text">{this.state.question.text}</div>
      buttons = this.state.question.answer_options.map(option => {
        return (
          <AnswerOption key={option._id} option={option} onClick={this.onClick.bind(this)} />
        )
      })
    } else if (this.state.correct_answer == true) {
      text = <div className="b-question__text b-question__text--right">{this.state.answer_option.result_text}</div>
    } else {
      text = <div className="b-question__text b-question__text--wrong">{this.state.answer_option.result_text}</div>

    }


    return (
      <div className="b-question">
        <div className="b-question__header">
          <div className="b-question__image">
            <div className="b-question__overlay"></div>
            {image}
          </div>
          {text}
        </div>
        <div className="b-question__options">
          {buttons}
        </div>
      </div>
    )
  }
}
