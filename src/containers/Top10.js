import React from 'react'
import axios from 'axios'
import PlayerCell from '../components/PlayerCell'

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
    return <section className='leaderboard'>
      <h2 className='leaderboard__title'>Top 10 Players</h2>
      { this.state.isFetching ? <p className='leaderboard__loading'>Loading...</p> : null }
      { this.state.hasError ? <div className='error'>Could not fetch players</div> : null }
      { this.state.users.length > 0 ?
        <table className='table table--top10'>
          <tr className='table__row'>
            <th className='table__text'>Player</th>
            <th className='table__num'>WPM</th>
            <th className='table__num'>Wins</th>
          </tr>
          {
            this.state.users.map((user, i) => (
              <tr className='table__row table__row--content'>
                <td className='table__text'>{user.username}</td>
                <td className='table__num'>{user.stats.avgWpm.toFixed(2)}</td>
                <td className='table__num'>{user.stats.wins}</td>
              </tr>
            ))
          }
        </table>
        : null
      }
    </section>
  }
}

export default Top10
