import { connect } from 'react-redux'
import TypeInput from '../components/TypeInput'
import { setInputValue } from '../actions/gameActions'

const mapStateToProps = ({game: { inputValue, error, hasMistake, gameText, isJoined, isRunning }}) => ({
  value: inputValue,
  disabled: !!error || !(isJoined && isRunning) || !gameText,
  hasMistake
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (value) => {
    dispatch(setInputValue(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TypeInput)
