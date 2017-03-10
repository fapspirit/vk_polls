import React from 'react'
import { Link } from 'react-router'

export default class TestResult extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="b-result">
        <div className="b-result__text">{this.props.test_result.text}</div>
        <div className="b-result__link">
          <Link to="/">Вернуться </Link>
        </div>
      </div>
    )
  }
}
