import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory, useRouterHistory } from 'react-router'
import { createHashHistory } from "history"
import Test from "./modules/test"
import TestAnnounce from './modules/test-announce'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tests: [],
      user: User,
      ViewerID
    }
  }

  componentDidMount() {
    fetch(`${Settings.host}/api/tests`)
      .then(res => res.json())
      .then(res => {
        this.setState({tests: res.tests})
      })
  }

  render() {
    return (
      <div className="b-app">
        {this.state.tests.map(test => {
          return (
            <TestAnnounce test={test} key={test._id} />
          )
        })}
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
