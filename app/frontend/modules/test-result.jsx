import React from 'react'

export default class TestResult extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>{this.props.test_result.text}</h1>
      </div>
    )
  }
}
