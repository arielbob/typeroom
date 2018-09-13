import { connect } from 'react-redux'
import GameText from '../components/GameText'

const mapStateToProps = ({ gameText }) => ({
  text: gameText
})

export default connect(mapStateToProps)(GameText)
