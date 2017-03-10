import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory, useRouterHistory } from 'react-router'
import { createHashHistory } from "history"
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

let history = useRouterHistory(createHashHistory)()
if (Hash != '') {
  history.push(Hash)
}
render((
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/tests/:test_id" component={Test} />
  </Router>
), document.getElementById('app'))

VK.init(() => {
  console.log('vk init success')
}, () => {
  console.log("vk init doesn't work!")
}, '5.62')
