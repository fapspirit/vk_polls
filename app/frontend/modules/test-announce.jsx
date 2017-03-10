import React from 'react'
import { Link } from 'react-router'

export default class TestAnnounce extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="b-announce">
        <div className="b-announce__image">
          <img />
        </div>
        <div className="b-announce__info">
          <div className="b-announce__title">
            <Link to={`/tests/${this.props.test._id}`}>
              { this.props.test.title }
            </Link>
          </div>
          <div className="b-announce__subtitle">
            <Link to={`/tests/${this.props.test._id}`}>
              { this.props.test.subtitle }
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
