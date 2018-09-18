import { connect } from 'react-redux'
import GameText from '../components/GameText'

const mapStateToProps = ({ gameText, errorMessage }) => ({
  text: gameText,
  isVisible: !errorMessage
})

export default connect(mapStateToProps)(GameText)
