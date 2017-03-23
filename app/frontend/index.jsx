import React from 'react'
import { render } from 'react-dom'
import { Route, IndexRoute, NavLink as Link, HashRouter as Router, useRouterHistory } from 'react-router-dom'
import { createHashHistory } from "history"
import Test from "./modules/test"
import Top from "./modules/top"
import Admin from "./modules/admin"
import TestAnnounce from './modules/test-announce'
require('es6-promise/auto')
import fetch from 'isomorphic-fetch'

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
        <div className="b-main-banner">
          <img src={`${Settings.host}/images/main_banner_2.png`} />
        </div>
        {this.state.tests.map(test => {
          return (
            <TestAnnounce test={test} key={test._id} />
          )
        })}
      </div>
    )
  }
}

let history = createHashHistory()
if (Hash != '') {
  history.push(Hash)
}

VK.init(() => {
  render((
    <Router history={history}>
      <div>
        <div className="b-nav">
          {Menu.map((item, i) => {
            return (
              <div className="b-nav__element" key={i}>
                <Link exact to={item.path}>{item.title}</Link>
              </div>
            )
          })}
        </div>


        <Route exact path="/" component={App} />
        <Route path="/top" component={Top} />
        <Route path="/tests/:test_id" component={Test} />
        <Route path="/admin" component={Admin}/>
      </div>
    </Router>
  ), document.getElementById('app'))
}, () => {
  console.log("vk init doesn't work!")
}, '5.62')
