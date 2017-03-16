import React from 'react'
import { Link, Route } from 'react-router-dom'
import AdminTestsList from "./admin-tests-list"
import AdminTestEdit from "./admin-test-edit"

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Link to="/admin/tests">Список тестов</Link>

        <div>
          <Route path='/admin/tests' exact component={AdminTestsList} />
          <Route path="/admin/tests/:test_id" component={AdminTestEdit} />
        </div>
      </div>
    )
  }
}
