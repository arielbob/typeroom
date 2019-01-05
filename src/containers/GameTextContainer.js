import { connect } from 'react-redux'
import GameText from '../components/GameText'

const mapStateToProps = ({game: { gameText, inputValue, isJoined, playersById, clientId, errorMessage }}) => ({
  text: gameText,
  isVisible: !errorMessage,
  inputValue,
  nextWordId: (isJoined && playersById[clientId]) ? playersById[clientId].nextWordId : null
})

export default connect(mapStateToProps)(GameText)
