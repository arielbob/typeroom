import { connect } from 'react-redux'
import TypeInput from '../components/TypeInput'
import { setInputValue } from '../actions'

const mapStateToProps = ({ inputValue, errorMessage, gameText }) => ({
  value: inputValue,
  disabled: !!errorMessage || !gameText
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (value) => {
    dispatch(setInputValue(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TypeInput)
