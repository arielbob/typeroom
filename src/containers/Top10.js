import React from 'react'
import axios from 'axios'

class Top10 extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      isFetching: false,
      hasError: false
    }
  }

  componentDidMount() {
    this.setState({
      isFetching: true
    })

    axios.get('/top10')
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(() => {
        this.setState({
          hasError: true
        })
      })
      .finally(() => {
        this.setState({
          isFetching: false
        })
      })
  }

  render() {
    return <section className='top10'>
      <h2>Top 10 Players</h2>
      { this.state.isFetching ? <p>Loading...</p> : null }
      { this.state.hasError ? <div className='error'>Could not fetch players</div> : null }
      { this.state.users.length > 0 ?
        <ul className='list'>
          {
            this.state.users.map((user, i) => (
              <li key={i}>
                <h3><b>{i + 1 + '. '}</b>{user.username}</h3>
                <p>Wins: {user.stats.wins}</p>
              </li>
            ))
          }
        </ul>
        : null
      }
    </section>
  }
}

export default Top10
