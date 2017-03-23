import React from 'react'
import fetch from 'isomorphic-fetch'
require('es6-promise/auto')

export default class Top extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch(`${Settings.host}/api/users/top`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        let user_ids = res.users.map(user => user.viewer_id)
        VK.api('users.get', {user_ids, fields: 'photo_50, first_name, last_name'}, (data) => {
          let users = data.response.map((user, i) => {
            user.score = res.users[i].score
            return user
          })
          this.setState({users})
        })
      })
  }

  render() {
    return (
      <div className="b-top">
        <div className="b-row b-top__row--info">
        </div>
        {this.state.users.map((user, i) => {
          return (
            <div className="b-row" key={user.id}>
              <div className="b-row__image">
                <a href={`https://vk.com/id${user.id}`} target="_blank" >
                  <img src={user.photo_50} />
                </a>
              </div>
              <div className="b-row__name">
                <a href={`https://vk.com/id${user.id}`} target="_blank" >{user.first_name + ' ' + user.last_name}</a>
              </div>
              <div className="b-row__score">
                {user.score}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
