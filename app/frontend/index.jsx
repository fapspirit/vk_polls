import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Test from "./modules/test"

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
    <Route path="/tests/:test_id" component={Test} />
  </Router>
), document.getElementById('app'))
