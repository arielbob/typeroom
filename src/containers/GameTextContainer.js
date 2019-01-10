import { connect } from 'react-redux'
import GameText from '../components/GameText'

const mapStateToProps = ({game: { gameText, inputValue, isJoined, playersById, clientId, error }}) => ({
  text: gameText,
  isVisible: !error,
  inputValue,
  nextWordId: (isJoined && playersById[clientId]) ? playersById[clientId].nextWordId : null
})

export default connect(mapStateToProps)(GameText)
