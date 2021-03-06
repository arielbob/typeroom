import { connect } from 'react-redux'
import PlayerList from '../components/PlayerList'

const mapStateToProps = ({game: { clientId, playersById, gameText }}) => ({
  clientId,
  playersById,
  textLength: gameText.split(' ').length
})

export default connect(mapStateToProps)(PlayerList)
