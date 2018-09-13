import { connect } from 'react-redux'
import PlayerList from '../components/PlayerList'

const mapStateToProps = ({ clientId, playersById }) => ({
  clientId,
  playersById
})

export default connect(mapStateToProps)(PlayerList)
