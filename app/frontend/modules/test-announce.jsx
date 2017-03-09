import React from 'react'

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
            { this.props.title }
          </div>
          <div className="b-announce__subtitle">
            { this.props.subtitle }
          </div>
        </div>
      </div>
    )
  }
}
