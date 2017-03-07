import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>THIS IS APP!!!</h1>
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('app'))
