import React from 'react'
import { Link } from 'react-router-dom'
import fetch from 'isomorphic-fetch'

const TestSchema = {
  title: 'Новый тест',
  subtitle: '',
  image: '',
}

export default class AdminTestsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tests: []
    }
  }

  componentDidMount() {
    fetch(`${Settings.host}/api/tests/`)
      .then(res => res.json())
      .then(res => {
        this.setState({tests: res.tests})
      })
  }

  addTest() {
    let tests = this.state.tests.slice()
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TestSchema)
    }
    fetch(`${Settings.host}/api/tests`, options)
      .then(res => res.json())
      .then(res => {
        tests.unshift(Object.assign({}, res.test))
        this.setState({tests})
      })
  }

  deleteTest(e, i) {
    let tests = this.state.tests.slice()
    let test = tests[i]
    let options = {
      method: 'DELETE'
    }
    fetch(`${Settings.host}/api/tests/${test._id}`, options)
      .then(() => {
        tests.splice(i, 1)
        this.setState({tests})
      })
  }

  render() {
    return (
      <div className="b-admin-tests">
        <div onClick={this.addTest.bind(this)} className="b-admin-test__add">
          Добавить
        </div>
        {this.state.tests.map((test, i) => (
          <div className="b-admin-test" key={test._id}>
            <div className="b-admin-test__title">
              <Link to={`/admin/tests/${test._id}`}>{test.title}</Link>
              <span onClick={(e) => this.deleteTest(e, i)} className="b-admin-test__remove">
                Удалить
              </span>
            </div>

          </div>
        ))}
      </div>
    )
  }
}
