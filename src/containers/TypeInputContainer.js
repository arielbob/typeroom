import { connect } from 'react-redux'
import TypeInput from '../components/TypeInput'
import { setInputValue } from '../actions'

const mapStateToProps = ({game: { inputValue, errorMessage, gameText, isJoined, isRunning }}) => ({
  value: inputValue,
  disabled: !!errorMessage || !(isJoined && isRunning) || !gameText
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (value) => {
    dispatch(setInputValue(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TypeInput)
