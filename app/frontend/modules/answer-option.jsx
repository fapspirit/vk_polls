import React from 'react'

export default class AnswerOption extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  onClick(e) {
    this.state.onClick(this.state.option)
  }

  render() {
    return (
      <div className="b-answer-option" onClick={this.onClick.bind(this)}>
        <div className="b-answer-option__image">
          <img src={this.state.option.image} />
        </div>
        <div className="b-answer-option__text">
          {this.state.option.text}
        </div>
      </div>
    )
  }
}
